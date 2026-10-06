import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDashCountData } from '../redux/action/DashboardCountAction';
import { FiBox, FiSearch, FiChevronRight, FiLogOut, FiUser, FiMenu, FiX, FiPlus, FiHome } from 'react-icons/fi';
import { CrmLayoutContext } from './CrmLayoutContext';
import { hasFeature, isStandaloneRoute, readStoredUser, visibleNavigation } from './crmNavigation';
import './CrmLayout.css';

function navigationSections(group) {
  const sections = new Map();
  const entries = [
    ...(group.items || []).map(entry => ({ ...entry, isComingSoon: false })),
    ...(group.comingSoon || []).map(entry => ({ ...entry, isComingSoon: true })),
  ];

  entries.forEach(entry => {
    const label = entry.section || 'Overview';
    if (!sections.has(label)) sections.set(label, []);
    sections.get(label).push(entry);
  });

  return Array.from(sections, ([label, items]) => ({ label, items }));
}

export default function CrmLayout({ children }) {
  const { pathname } = useLocation();
  const user = readStoredUser();
  if (!user || isStandaloneRoute(pathname)) return children;
  return <Workspace user={user}>{children}</Workspace>;
}

function Workspace({ user, children }) {
  const dispatch = useDispatch();
  const [countScope, setCountScope] = useState('manager');
  const permissions = useSelector(state => state.Permissiondatareducers.singledataredu);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState({});
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const groups = visibleNavigation(permissions, user.lockStatus === 'new');
  const current = groups.flatMap(group => group.items).find(entry => entry.path === pathname);
  const title = current?.label || pathname.split('/').filter(Boolean)[0]?.replace(/-/g, ' ') || 'Workspace';
  const name = user.emp_name || 'My account';
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('');

  useEffect(() => {
    setMobileOpen(false);
    setSearch('');
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  const closeMenu = () => { setMobileOpen(false); menuRef.current?.focus(); };
  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <CrmLayoutContext.Provider value={true}>
      <div className="crm-workspace" onKeyDown={event => { if (event.key === 'Escape') closeMenu(); }}>
        <a className="crm-skip" href="#crm-main">Skip to main content</a>
        {mobileOpen && <button className="crm-backdrop" aria-label="Close navigation" onClick={closeMenu} />}
        <aside id="crm-sidebar" className={`crm-sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/dashboard" className="crm-brand"><span className="crm-brand-icon"><FiBox aria-hidden="true" /></span><span>Sellmore<span className="crm-brand-caption">CRM WORKSPACE</span></span></NavLink>
          <button className="crm-mobile-close crm-icon-button" aria-label="Close navigation" onClick={closeMenu}><FiX /></button>
          <div className="crm-workspace-label"><span className="crm-status-dot" /> {user.get_company?.company_name || 'Your workspace'}</div>
          <label className="crm-nav-search"><FiSearch aria-hidden="true" /><input aria-label="Find a module" placeholder="Find a module…" value={search} onChange={event => setSearch(event.target.value)} /></label>
          <nav className="crm-nav">
            {groups.map(group => {
                const allSections = navigationSections(group);
                const sections = allSections
                  .map(section => ({ ...section, items: section.items.filter(entry => entry.label.toLowerCase().includes(search.toLowerCase())) }))
                  .filter(section => section.items.length);
                if (!sections.length) return null;
              const containsCurrent = group.items.some(entry => entry.path === pathname);
                const areaKey = `area:${group.label}`;
                const expanded = Boolean(search) || (collapsed[areaKey] === undefined ? group.label === 'HOME' || containsCurrent : !collapsed[areaKey]);
                const groupId = `crm-nav-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const currentSectionIndex = allSections.findIndex(section => section.items.some(entry => !entry.isComingSoon && entry.path === pathname));
              return <div className="crm-nav-group" key={group.label}>
                  <button className="crm-group-label" aria-expanded={expanded} aria-controls={groupId} onClick={() => setCollapsed(previous => ({ ...previous, [areaKey]: expanded }))}>
                    <span className="crm-group-title">{group.icon && <group.icon aria-hidden="true" />}{group.label}</span>
                    <FiChevronRight className={expanded ? 'is-expanded' : ''} aria-hidden="true" />
                  </button>
                  <div id={groupId} hidden={!expanded}>
                    {sections.map((section, sectionIndex) => {
                      const sectionKey = `section:${group.label}:${section.label}`;
                      const defaultExpanded = currentSectionIndex === -1 ? sectionIndex === 0 : currentSectionIndex === sectionIndex;
                      const sectionExpanded = Boolean(search) || (collapsed[sectionKey] === undefined ? defaultExpanded : !collapsed[sectionKey]);
                      const sectionId = `${groupId}-${section.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      return <div className="crm-nav-section" key={section.label}>
                        {allSections.length > 1 && <button className="crm-section-label" aria-expanded={sectionExpanded} aria-controls={sectionId} onClick={() => setCollapsed(previous => ({ ...previous, [sectionKey]: sectionExpanded }))}>
                          {section.label}<FiChevronRight className={sectionExpanded ? 'is-expanded' : ''} aria-hidden="true" />
                        </button>}
                        <div id={sectionId} hidden={allSections.length > 1 && !sectionExpanded}>
                          {section.items.map(({ label, path, icon: Icon, isComingSoon }) => isComingSoon
                            ? <div key={label} className="crm-nav-link crm-nav-link-disabled" aria-disabled="true"><Icon aria-hidden="true" /><span className="crm-nav-link-copy"><span>{label}</span><small>Coming soon</small></span></div>
                            : <NavLink key={path} to={path} end className={({ isActive }) => `crm-nav-link ${isActive ? 'is-active' : ''}`}><Icon aria-hidden="true" /><span>{label}</span></NavLink>)}
                        </div>
                      </div>;
                    })}
                  </div>
              </div>;
            })}
              {!groups.some(group => navigationSections(group).some(section => section.items.some(entry => entry.label.toLowerCase().includes(search.toLowerCase())))) && <p className="crm-no-modules">No matching modules.</p>}
          </nav>
          <div className="crm-sidebar-footer"><NavLink to="/profile" className="crm-nav-link"><FiUser aria-hidden="true" />My profile</NavLink><button className="crm-nav-link" onClick={logout}><FiLogOut aria-hidden="true" />Sign out</button></div>
        </aside>
        <div className="crm-main-column">
          <header className="crm-topbar">
            <div className="crm-breadcrumb"><button ref={menuRef} className="crm-menu-button crm-icon-button" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="crm-sidebar" onClick={() => setMobileOpen(!mobileOpen)}><FiMenu /></button><FiHome aria-hidden="true" /><span>Workspace</span><FiChevronRight aria-hidden="true" /><strong>{title}</strong></div>
            <div className="crm-topbar-actions">{hasFeature(permissions, 139) && pathname !== '/dashboard' && <label className="crm-select">Scope<select value={countScope} onChange={event => { setCountScope(event.target.value); dispatch(getDashCountData(event.target.value === 'manager' ? user.id : '')); }}><option value="manager">Manager</option><option value="team">Team</option></select></label>}{hasFeature(permissions, 100, null) && user.lockStatus !== 'new' && <NavLink className="crm-button crm-button-primary" to="/add-lead"><FiPlus aria-hidden="true" />New lead</NavLink>}<NavLink className="crm-account" to="/profile" aria-label={`Open profile for ${name}`}><span className="crm-avatar">{initials}</span><span>{name}<small>My account</small></span></NavLink></div>
          </header>
          <main id="crm-main" ref={mainRef} tabIndex={-1} className="crm-main">{children}</main>
        </div>
      </div>
    </CrmLayoutContext.Provider>
  );
}
