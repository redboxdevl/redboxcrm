import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { FiActivity, FiAlertCircle, FiCheck, FiChevronDown, FiLoader, FiRefreshCw } from 'react-icons/fi';
import moment from 'moment';

export function PageHeader({ title, description, actions }) {
  return (
    <header className="sellmore-list-header">
      <div className="sellmore-list-heading">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="sellmore-list-header-actions">{actions}</div>}
    </header>
  );
}

export function FilterBar({ children, onSubmit, onClear }) {
  return (
    <form className="sellmore-filter-bar" onSubmit={onSubmit}>
      <div className="sellmore-filter-fields">{children}</div>
      <div className="sellmore-filter-actions">
        <button className="sellmore-button sellmore-button-primary" type="submit">Apply</button>
        <button className="sellmore-button sellmore-button-quiet" type="button" onClick={onClear}>Clear</button>
      </div>
    </form>
  );
}

export function DataTable({ children }) {
  return (
    <div className="sellmore-table-scroll" role="region" aria-label="Assigned leads table" tabIndex={0}>
      <table className="sellmore-data-table">{children}</table>
    </div>
  );
}

export function Pagination({ pageCount, forcePage, onPageChange }) {
  if (pageCount < 2) return null;
  return (
    <nav className="sellmore-pagination" aria-label="Assigned leads pages">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        nextClassName="page-item"
        breakLinkClassName="page-link"
        breakClassName="page-item"
        activeClassName="active"
      />
    </nav>
  );
}

export function RowActions({ label, onClick, children }) {
  return (
    <button className="sellmore-row-action" type="button" aria-label={label} title={label} onClick={onClick}>
      <FiActivity aria-hidden="true" />
      <span>{children || 'Activity'}</span>
    </button>
  );
}

export function StatusBadge({ children, tone = 'neutral' }) {
  return <span className={`sellmore-status-badge sellmore-status-${tone}`}>{children}</span>;
}

export function LeadTemperatureBadge({ isWarm }) {
  return isWarm ? <span className="sellmore-status-badge sellmore-status-warm">Warm</span> : null;
}

export function deriveLeadDataQuality(record) {
  const lead = record?.getleads && typeof record.getleads === 'object' ? record.getleads : {};
  const usableName = value => {
    const normalized = String(value ?? '').trim().toLowerCase();
    return normalized !== '' && !['-', 'n/a', 'null', 'undefined', '@'].includes(normalized);
  };
  const hasName = usableName(lead.clientName);
  const phoneValues = [lead.clientPhone, record?.clientPhone, record?.clientPhoneIos, record?.whatsappclientPhone, lead.whatsappNo];
  const emailValues = [lead.clientemail, lead.email];
  const hasUsablePhone = phoneValues.some((value) => {
    const text = String(value ?? '').trim();
    return /^\+?[\d\s().-]+$/.test(text) && text.replace(/\D/g, '').length >= 7;
  });
  const hasUsableEmail = emailValues.some((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim()));
  const normalizedLeadId = String(record?.leadid ?? '').trim().toLowerCase();
  const hasLeadIdentity = normalizedLeadId !== '' && !['0', '-', 'null', 'undefined'].includes(normalizedLeadId);

  return hasName && (hasUsablePhone || hasUsableEmail) && hasLeadIdentity ? 'complete' : 'incomplete';
}

export function DataQualityBadge({ quality }) {
  return quality === 'incomplete'
    ? <span className="sellmore-status-badge sellmore-status-incomplete">Incomplete</span>
    : null;
}

export function CompactDate({ value, relativeValue }) {
  if (!value) return <span className="sellmore-date-cell">—</span>;
  const parsed = moment(value);
  const absolute = parsed.isValid() ? parsed.format('D MMM YYYY') : String(value);
  return (
    <span className="sellmore-date-cell">
      <time dateTime={parsed.isValid() ? parsed.toISOString() : undefined} title={String(value)}>{absolute}</time>
      {relativeValue && <small title={String(relativeValue)}>{relativeValue}</small>}
    </span>
  );
}

export function LeadIdentityHeader({ title, subtitle, badges, actions, children }) {
  return (
    <header className="sellmore-lead-identity-header">
      <div className="sellmore-lead-identity-copy">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {badges && <div className="sellmore-lead-header-badges">{badges}</div>}
      </div>
      {children && <div className="sellmore-lead-header-details">{children}</div>}
      {actions && <div className="sellmore-lead-header-actions">{actions}</div>}
    </header>
  );
}

export function CommunicationMetric({ icon: Icon, label, value }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className="sellmore-communication-metric">
      {Icon && <Icon aria-hidden="true" />}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function ActionCenterAction({ icon: Icon, children, href, onClick, tone = 'neutral', disabled = false }) {
  const Element = href && !disabled ? 'a' : 'button';
  return (
    <Element
      className={`sellmore-action-center-action sellmore-action-center-${tone}`}
      {...(Element === 'a' ? { href } : {})}
      onClick={onClick}
      type={Element === 'button' ? 'button' : undefined}
      disabled={Element === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
    >
      {Icon && <Icon aria-hidden="true" />}
      <span>{children}</span>
    </Element>
  );
}

export function ActionCenterSection({ title, children }) {
  return <section className="sellmore-action-center-section"><h3>{title}</h3>{children}</section>;
}

export function LeadTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="sellmore-lead-tabs" role="tablist" aria-label="Lead workspace sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`lead-tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`lead-panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function ActivityTimeline({ items, renderItem, emptyMessage = 'No activity is available.' }) {
  if (!items.length) return <div className="sellmore-lead-empty">{emptyMessage}</div>;
  return <ol className="sellmore-activity-timeline">{items.map(renderItem)}</ol>;
}

export function LeadActionCenter({ show, onHide, children }) {
  return (
    <Modal show={show} onHide={onHide} centered scrollable dialogClassName="sellmore-action-center-dialog">
      <Modal.Header closeButton>
        <Modal.Title>Lead Action Center</Modal.Title>
      </Modal.Header>
      <Modal.Body className="sellmore-action-center-body">{children}</Modal.Body>
    </Modal>
  );
}

export function PageState({ kind, title, description, onRetry }) {
  const isError = kind === 'error' || kind === 'unavailable';
  return (
    <div className={`sellmore-page-state sellmore-page-state-${kind}`} role={isError ? 'alert' : 'status'} aria-live="polite">
      {isError ? <FiAlertCircle aria-hidden="true" /> : kind === 'success' ? <FiCheck aria-hidden="true" /> : kind === 'loading' ? <FiLoader className="sellmore-loading-icon" aria-hidden="true" /> : null}
      <strong>{title}</strong>
      {description && <span>{description}</span>}
      {onRetry && <button className="sellmore-button sellmore-button-quiet" type="button" onClick={onRetry}><FiRefreshCw aria-hidden="true" />Retry</button>}
    </div>
  );
}

export function BulkActionBar({ selectedCount, children }) {
  if (!selectedCount) return null;
  return (
    <div className="sellmore-bulk-action-bar" role="region" aria-label="Selected lead actions">
      <strong>{selectedCount} selected</strong>
      <div>{children}</div>
    </div>
  );
}

export function MoreActions({ children }) {
  return (
    <details className="sellmore-more-actions">
      <summary className="sellmore-button sellmore-button-quiet">More <FiChevronDown aria-hidden="true" /></summary>
      <div className="sellmore-more-actions-menu">{children}</div>
    </details>
  );
}

export function ConfirmationDialog({ show, title, message, confirmLabel = 'Confirm', onCancel, onConfirm }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button className="sellmore-button sellmore-button-quiet" type="button" onClick={onCancel}>Cancel</button>
        <button className="sellmore-button sellmore-button-danger" type="button" onClick={onConfirm}>{confirmLabel}</button>
      </Modal.Footer>
    </Modal>
  );
}

export class PageErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageState
          kind="error"
          title="Assigned Leads could not be displayed"
          description="The page encountered an unexpected display error. Retry to load it again."
          onRetry={() => {
            this.setState({ hasError: false });
            this.props.onRetry?.();
          }}
        />
      );
    }
    return this.props.children;
  }
}