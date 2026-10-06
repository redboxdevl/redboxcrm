import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import {
  FiHome, FiRefreshCw, FiCalendar, FiUserPlus, FiDatabase, FiBriefcase,
  FiPhone, FiArrowRight, FiBarChart2, FiPieChart, FiActivity, FiUsers,
  FiClock, FiBell, FiCheckSquare, FiGrid, FiAlertCircle,
} from 'react-icons/fi';
import { getDashboardListACtion, loadingToggleAction } from '../../redux/action/getDashboardListACtion';
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';
import { hasFeature, readStoredUser, visibleNavigation } from '../../Includes/crmNavigation';

export const dashboardNumber = value => {
  if (!['number', 'string'].includes(typeof value)) return null;
  const normalized = typeof value === 'string' ? value.trim() : value;
  if (normalized === '') return null;
  const number = Number(typeof normalized === 'string' && /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(normalized) ? normalized.replace(/,/g, '') : normalized);
  return Number.isFinite(number) && number >= 0 ? number : null;
};
const displayNumber = value => dashboardNumber(value)?.toLocaleString() ?? '—';
const rows = value => Array.isArray(value) ? value : [];
const colors = ['#b3232a', '#7599d9', '#51ad97', '#b394d4'];
const baseChart = {
  color: colors,
  aria: { enabled: true },
  textStyle: { fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', color: '#8993a2', fontSize: 11 },
  tooltip: { trigger: 'axis', renderMode: 'richText' },
  legend: { bottom: 4, icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: { color: '#8390a1', fontSize: 11 } },
  grid: { top: 24, left: 18, right: 22, bottom: 48, containLabel: true },
  yAxis: { type: 'value', minInterval: 1, splitLine: { lineStyle: { color: '#f0f2f6', type: 'dashed' } } },
};

function EmptyState({ icon: Icon = FiBarChart2, title, children }) {
  return <div className="crm-empty"><Icon aria-hidden="true" /><strong>{title}</strong>{children && <span>{children}</span>}</div>;
}

function PanelHeading({ icon: Icon, title, subtitle, children }) {
  return <div className="crm-panel-header"><div><h2><Icon aria-hidden="true" />{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{children}</div>;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const permissionState = useSelector(state => state.Permissiondatareducers.singledataredu);
  const permissions = useMemo(() => rows(permissionState), [permissionState]);
  const data = useSelector(state => state.dashboardListReducers.dashboardlistcount) || {};
  const user = readStoredUser();
  const userId = user?.id;
  const companyId = user?.company_id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [view, setView] = useState('overview');
  const [callRange, setCallRange] = useState('all');
  const [teamMetric, setTeamMetric] = useState('AttemptedCalls');
  const alive = useRef(false);
  const can = (feature, action = 'List') => hasFeature(permissions, feature, action);
  const canSeeLeads = can(50);
  const canSeeCalls = can(132);
  const canSeeTodos = can(128);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    dispatch(loadingToggleAction(true));
    let team = null;
    try { team = JSON.parse(localStorage.getItem('empTeam')); } catch { /* Use the signed-in employee scope. */ }
    const allAccess = permissions.some(permission => [3, 4].includes(Number(permission.role_id)) || Number(permission.feature_id) === 145);
    const hasTeam = team && typeof team === 'object' && team.teamObj;
    try {
      await dispatch(getDashboardListACtion(allAccess || hasTeam ? 'all' : userId, allAccess ? '' : hasTeam || '', companyId));
      if (alive.current) setUpdatedAt(new Date());
    } catch {
      if (alive.current) setError('We couldn’t refresh your dashboard. Check your connection and try again.');
    } finally {
      dispatch(loadingToggleAction(false));
      if (alive.current) setLoading(false);
    }
  }, [dispatch, userId, companyId, permissions]);

  useEffect(() => {
    alive.current = true;
    refresh();
    if (userId) Promise.resolve(dispatch(SingleEmpAction(userId))).catch(() => {});
    return () => { alive.current = false; };
  }, [refresh, dispatch, userId]);

  const weekly = rows(data.ubtabbedGraphDashboard?.assignleadweekly);
  const team = rows(data.myEmpData);
  const leads = rows(data.AssignLeadsDashboard);
  const todos = rows(data.TodosTodayData);
  const metrics = [
    { label: 'Assigned leads', value: data.assignTotal, today: data.assignToday, icon: FiUserPlus, to: '/list-assign-leads', visible: canSeeLeads },
    { label: 'Client database', value: data.TotalMyLead, today: data.TodayMyLead, icon: FiDatabase, to: '/list-super-database-report', visible: canSeeLeads },
    { label: 'Deals closed', value: data.TotalDealsDOne, today: data.TodayDealsDOne, icon: FiBriefcase, to: '/list-view-deals', visible: can(59) },
    { label: 'Outgoing calls', value: data.TotalOutgoingCallData, today: data.TodayOutgoingCallData, icon: FiPhone, to: '/list-view-calling', visible: canSeeCalls },
  ].filter(metric => metric.visible);
  const snapshotMetrics = metrics.filter(metric => metric.to !== '/list-view-calling');
  const hasSnapshot = snapshotMetrics.some(metric => dashboardNumber(metric.value) !== null);
  const snapshotOption = {
    ...baseChart,
    legend: { show: false },
    xAxis: { type: 'category', data: snapshotMetrics.map(metric => metric.label), axisTick: { show: false }, axisLine: { lineStyle: { color: '#e8ecf2' } } },
    series: [{ name: 'Total', type: 'bar', barMaxWidth: 55, itemStyle: { borderRadius: [5, 5, 0, 0] }, data: snapshotMetrics.map((metric, index) => ({ value: dashboardNumber(metric.value), itemStyle: { color: colors[index] } })) }],
  };
  const trendSeries = [
    ['Assigned leads', 'assignleadweekly', 50], ['My leads', 'myleadweekly', 53], ['Hot leads', 'hotleadweekly', 54],
  ].filter(([, , feature]) => can(feature));
  const leadOption = {
    ...baseChart,
    xAxis: { type: 'category', boundaryGap: false, data: weekly.map(record => record.format), axisLine: { lineStyle: { color: '#e8ecf2' } }, axisTick: { show: false }, axisLabel: { color: '#939dab' } },
    series: trendSeries.map(([name, key], index) => ({ name, type: 'line', smooth: true, showSymbol: false, symbolSize: 6, lineStyle: { width: 3 }, areaStyle: index === 0 ? { opacity: .055 } : undefined, data: weekly.map(record => dashboardNumber(record[key])) })),
  };
  const calls = callRange === 'today'
    ? [dashboardNumber(data.TodayOutgoingCallData), dashboardNumber(data.TodayIncommingCallData)]
    : [dashboardNumber(data.TotalOutgoingCallData), dashboardNumber(data.TotalIncommingCallData)];
  const hasCalls = calls.every(value => value !== null) && calls.some(value => value > 0);
  const callOption = {
    ...baseChart,
    tooltip: { trigger: 'item', renderMode: 'richText' },
    xAxis: undefined, yAxis: undefined,
    title: { text: displayNumber(calls.reduce((sum, count) => sum + (count || 0), 0)), subtext: callRange === 'today' ? 'calls today' : 'total calls', left: 'center', top: '34%', textStyle: { fontSize: 30, fontWeight: 600, color: '#334158' }, subtextStyle: { fontSize: 11, color: '#939daa' } },
    series: [{ type: 'pie', radius: ['61%', '78%'], center: ['50%', '45%'], label: { show: false }, itemStyle: { borderWidth: 5, borderColor: '#fff', borderRadius: 5 }, data: [{ name: 'Outgoing', value: calls[0] }, { name: 'Incoming', value: calls[1] }] }],
  };
  const teamMetricLabels = { AttemptedCalls: 'Attempted calls', connectedCalls: 'Connected calls', VerifiedCalls: 'Verified calls', mettingAlligned: 'Meetings aligned', mettingDone: 'Meetings done', SelfLeadsdata: 'Self leads' };
  const topTeam = [...team].sort((a, b) => (dashboardNumber(b[teamMetric]) || 0) - (dashboardNumber(a[teamMetric]) || 0)).slice(0, 8);
  const teamOption = {
    ...baseChart,
    grid: { top: 10, left: 16, right: 35, bottom: 22, containLabel: true },
    legend: { show: false },
    xAxis: { ...baseChart.yAxis },
    yAxis: { type: 'category', inverse: true, data: topTeam.map(employee => employee.emp_name || 'Team member'), axisLine: { show: false }, axisTick: { show: false }, axisLabel: { width: 100, overflow: 'truncate' } },
    series: [{ name: teamMetricLabels[teamMetric], type: 'bar', barMaxWidth: 18, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: topTeam.map(employee => dashboardNumber(employee[teamMetric])) }],
  };
  const moduleLinks = visibleNavigation(permissions, user?.lockStatus === 'new').flatMap(group => group.items).filter(entry => entry.path !== '/dashboard');
  const notice = typeof data.noticeData?.description === 'string' ? data.noticeData.description : '';
  const firstName = user?.emp_name?.trim().split(' ')[0] || 'there';

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="crm-home" aria-busy={loading}>
      <div className="crm-page-heading">
        <div><h1><FiHome aria-hidden="true" />Home overview</h1><p>Welcome back, {firstName}. Here’s your workspace at a glance.</p></div>
        <div className="crm-heading-actions"><span className="crm-date-label"><FiCalendar aria-hidden="true" />{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span><button className="crm-button" onClick={refresh} disabled={loading}><FiRefreshCw aria-hidden="true" />{loading ? 'Refreshing…' : 'Refresh'}</button></div>
      </div>
      <div className="crm-home-tabs" aria-label="Dashboard views"><button aria-pressed={view === 'overview'} onClick={() => setView('overview')}><FiGrid aria-hidden="true" />Overview</button>{canSeeCalls && <button aria-pressed={view === 'team'} onClick={() => setView('team')}><FiUsers aria-hidden="true" />Team performance</button>}</div>
      {error && <div className="crm-error" role="alert"><FiAlertCircle aria-hidden="true" /><span>{error}</span></div>}
      {loading && <p className="crm-loading" role="status">Loading your latest CRM data…</p>}
      {metrics.length > 0 && <div className="crm-metrics">{metrics.map(({ label, value, today, icon: Icon, to }) => <Link className="crm-metric" to={to} key={label}><span className="crm-metric-label">{label}<span className="crm-metric-icon"><Icon aria-hidden="true" /></span></span><strong className="crm-metric-value">{loading && !updatedAt ? '—' : displayNumber(value)}</strong><span className="crm-metric-note"><FiActivity aria-hidden="true" /><strong>{displayNumber(today)}</strong>today<span aria-hidden="true"> · </span>All-time total above</span></Link>)}</div>}
      {view === 'overview' ? <>
        <div className="crm-chart-grid">
          <section className="crm-panel"><PanelHeading icon={FiActivity} title={canSeeLeads ? weekly.length ? 'Lead activity' : 'Sales snapshot' : 'Your workspace'} subtitle={canSeeLeads ? weekly.length ? 'Weekly activity across your sales leads' : 'Current totals across your sales workspace' : 'Open a module to continue your work'} />
            {canSeeLeads ? (weekly.length && trendSeries.length) || hasSnapshot ? <div className="crm-chart"><ReactECharts option={weekly.length ? leadOption : snapshotOption} notMerge style={{ height: 282 }} /></div> : <EmptyState title={loading ? 'Loading lead activity…' : 'No lead activity available'}>Your weekly trend will appear when data is available.</EmptyState> : <div className="crm-quick-links">{moduleLinks.slice(0, 8).map(({ label, path, icon: Icon }) => <Link className="crm-button" to={path} key={path}><Icon aria-hidden="true" />{label}</Link>)}</div>}
            <div className="crm-panel-footer"><FiClock aria-hidden="true" />{updatedAt ? `Updated ${updatedAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : 'Waiting for dashboard data'}{error && ' · Last available data'}</div>
          </section>
          <section className="crm-panel"><PanelHeading icon={canSeeCalls ? FiPieChart : FiGrid} title={canSeeCalls ? 'Call distribution' : 'Quick access'} subtitle={canSeeCalls ? 'Incoming and outgoing calls' : 'Your available CRM modules'}>{canSeeCalls && <label className="crm-select"><select aria-label="Call distribution period" value={callRange} onChange={event => setCallRange(event.target.value)}><option value="today">Today</option><option value="all">All time</option></select></label>}</PanelHeading>
            {canSeeCalls ? hasCalls ? <div className="crm-chart"><ReactECharts option={callOption} notMerge style={{ height: 282 }} /></div> : <EmptyState icon={FiPhone} title={loading ? 'Loading calls…' : calls.some(value => value === null) ? 'Call data unavailable' : 'No calls in this period'}>Incoming and outgoing calls will appear here.</EmptyState> : <div className="crm-quick-links">{moduleLinks.slice(0, 5).map(({ label, path, icon: Icon }) => <Link className="crm-button" to={path} key={path}><Icon aria-hidden="true" />{label}</Link>)}</div>}
          </section>
        </div>
        <div className="crm-chart-grid">
          {canSeeLeads && <section className="crm-panel"><PanelHeading icon={FiUsers} title="Recent assigned leads" subtitle="Your latest opportunities to connect"><Link to="/list-assign-leads">View all<FiArrowRight aria-hidden="true" /></Link></PanelHeading>
            {leads.length ? <div className="crm-table-wrap"><table className="crm-table"><thead><tr><th scope="col">Client</th><th scope="col">Project</th><th scope="col">Assigned</th><th scope="col">Status</th></tr></thead><tbody>{leads.slice(0, 5).map((lead, index) => <tr key={lead.id ?? index}><td><span className="crm-lead-name"><span className="crm-avatar" aria-hidden="true">{(lead.getleads?.clientName || 'U')[0]}</span>{lead.getleads?.clientName || 'Unnamed client'}</span></td><td>{lead.getleads?.clientProject || '—'}</td><td>{lead.publishAgentDate || '—'}</td><td><span className="crm-status-label">Assigned</span></td></tr>)}</tbody></table></div> : <EmptyState icon={FiUsers} title={loading ? 'Loading assigned leads…' : 'No recent assignments'}>New assignments will appear here.</EmptyState>}
          </section>}
          {canSeeTodos && <section className="crm-panel"><PanelHeading icon={FiCheckSquare} title="Today’s follow-ups" subtitle="Keep every customer conversation moving">{can(56) && <Link to="/list-reminders">View all<FiArrowRight aria-hidden="true" /></Link>}</PanelHeading>{todos.length ? <ul className="crm-todos">{todos.slice(0, 4).map((todo, index) => <li key={todo.id ?? index}><FiClock aria-hidden="true" /><div><strong>{todo.clientName || todo.clientNameShort || 'Customer follow-up'}</strong><p>{todo.reminderinfoShort || todo.clientProject || 'Follow-up reminder'}</p><small>{todo.reminderSetTime || todo.reminderSet || 'Today'}{todo.emp_name ? ` · ${todo.emp_name}` : ''}</small></div></li>)}</ul> : <EmptyState icon={FiCheckSquare} title={loading ? 'Loading follow-ups…' : 'No follow-ups scheduled'}>Your reminders for today will appear here.</EmptyState>}</section>}
        </div>
      </> : canSeeCalls && <section className="crm-panel" style={{ marginBottom: 20 }}><PanelHeading icon={FiBarChart2} title="Team performance" subtitle="Top 8 team members by the selected metric"><label className="crm-select">Measure<select value={teamMetric} onChange={event => setTeamMetric(event.target.value)}>{Object.entries(teamMetricLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></PanelHeading>{topTeam.length ? <div className="crm-chart"><ReactECharts option={teamOption} notMerge style={{ height: Math.max(280, topTeam.length * 40) }} /></div> : <EmptyState icon={FiUsers} title={loading ? 'Loading team performance…' : 'No team activity available'}>Performance will appear when your team has activity.</EmptyState>}</section>}
      {notice && <aside className="crm-notice" aria-label="Company notice"><FiBell aria-hidden="true" /><p>{notice}</p></aside>}
    </div>
  );
}
