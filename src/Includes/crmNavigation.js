import {
  FiHome, FiUsers, FiUserPlus, FiTarget, FiTrendingUp, FiClock, FiActivity,
  FiRepeat, FiBriefcase, FiPhone, FiBarChart2, FiCheckSquare, FiGrid,
  FiDollarSign, FiSettings, FiVideo, FiDatabase, FiUploadCloud, FiFileText,
  FiCalendar, FiBell, FiLayers, FiMapPin, FiShield, FiBookOpen, FiCreditCard,
  FiTruck, FiPackage, FiSliders, FiFlag, FiUser, FiMessageCircle, FiMail,
  FiGlobe, FiMap, FiSearch, FiZap,
} from 'react-icons/fi';

const item = (label, path, icon, feature, action = 'List', section = 'Overview', options = {}) => ({
  label, path, icon, feature, action, section, ...options,
});
const comingSoon = (label, icon, section) => ({ label, icon, section, comingSoon: true });

export const crmNavigation = [
  {
    label: 'HOME', icon: FiHome,
    items: [item('Dashboard', '/dashboard', FiHome, undefined, 'List', 'Daily work')],
    comingSoon: [comingSoon('My Day', FiCalendar, 'Daily work')],
  },
  {
    label: 'CRM', icon: FiUsers,
    items: [
      item('Assigned leads', '/list-assign-leads', FiUserPlus, 50, 'List', 'Leads'),
      item('Clients', '/list-super-database-report', FiDatabase, 50, 'List', 'Leads'),
      item('My leads', '/list-my-leads', FiUsers, 53, 'List', 'Leads'),
      item('Hot leads', '/list-hot-leads', FiTrendingUp, 54, 'List', 'Leads'),
      item('Virgin leads', '/list-virgin-leads', FiTarget, 48, 'List', 'Leads'),
      item('Dormant leads', '/list-dorment-leads', FiClock, 55, 'List', 'Leads'),
      item('Not interested', '/list-notinterested-leads', FiFlag, 51, 'List', 'Leads'),
      item('Transfers', '/list-transfer-leads', FiRepeat, 58, 'List', 'Leads'),
      item('Online leads', '/list-view-facebook', FiMessageCircle, 145, 'List', 'Lead intake'),
      item('Import leads', '/import-leads', FiUploadCloud, 86, 'List', 'Lead intake'),
      item('Data drive', '/data-drive', FiDatabase, 86, 'List', 'Lead intake'),
      item('Reminders', '/list-reminders', FiBell, 56, 'List', 'Follow-up'),
      item('Activities', '/list-activities', FiActivity, 57, 'List', 'Follow-up'),
      item('Calls', '/list-view-calling', FiPhone, 132, 'List', 'Follow-up'),
      item('Deals', '/list-view-deals', FiBriefcase, 59, 'List', 'Deals'),
    ],
    comingSoon: [
      comingSoon('Requirements', FiTarget, 'Client journey'),
      comingSoon('Meetings', FiCalendar, 'Client journey'),
      comingSoon('Viewings', FiMapPin, 'Client journey'),
      comingSoon('Offers', FiFileText, 'Client journey'),
    ],
  },
  {
    label: 'PROPERTIES', icon: FiGrid,
    items: [
      item('Inventory', '/inventories', FiGrid, 100, null, 'Inventory'),
      item('Projects', '/add-projects', FiLayers, 100, null, 'Projects'),
    ],
    comingSoon: [
      comingSoon('Properties', FiHome, 'Property workspace'),
      comingSoon('Listings', FiFileText, 'Property workspace'),
      comingSoon('Developers', FiBriefcase, 'Property workspace'),
      comingSoon('Matching', FiTarget, 'Discovery'),
      comingSoon('Saved searches', FiSearch, 'Discovery'),
      comingSoon('Locations / Maps', FiMap, 'Discovery'),
    ],
  },
  {
    label: 'NETWORK', icon: FiGlobe,
    items: [item('Valued Partners', '/affiliate-program', FiUsers, undefined, 'List', 'Partner access')],
    comingSoon: [
      comingSoon('Property Marketplace', FiHome, 'Marketplaces'),
      comingSoon('Requirements Marketplace', FiTarget, 'Marketplaces'),
      comingSoon('Broker Directory', FiUsers, 'Broker network'),
      comingSoon('Broker Rooms', FiMessageCircle, 'Broker network'),
    ],
  },
  {
    label: 'BUSINESS', icon: FiBriefcase,
    items: [
      item('Tasks', '/task-management', FiCheckSquare, 108, 'List', 'Work'),
      item('Inbox', '/inbox', FiMail, undefined, 'List', 'Work'),
      item('Chat', '/chat', FiMessageCircle, undefined, 'List', 'Work'),
      item('Operations', '/operation', FiSliders, 104, 'List', 'Work'),
      item('Documents', '/security-files', FiShield, 150, null, 'Documents'),
      item('Marketing materials', '/marketing-document', FiLayers, 100, 'Create', 'Marketing'),
      item('Sales forms', '/sales-form-list', FiFileText, 100, null, 'Operations'),
      item('Procurement requisitions', '/purchase-request-form-list', FiPackage, undefined, 'List', 'Operations'),
      item('Vehicle passes', '/vehcile-pass', FiTruck, undefined, 'List', 'Operations'),
      item('YouTube', '/youtube', FiVideo, 92, 'List', 'Marketing'),
      item('Video requests', '/view-video-request', FiVideo, 92, 'Create', 'Marketing'),
      item('Policies', '/circular-policy', FiBookOpen, undefined, 'List', 'People / HR'),
      item('HR overview', '/hr', FiUsers, 70, 'List', 'People / HR', { roles: [6, 16] }),
      item('Employees', '/employee', FiUsers, 61, 'List', 'People / HR'),
      item('Reporting structure', '/report-to', FiLayers, 61, 'List', 'People / HR'),
      item('Notices', '/notice', FiBell, 63, null, 'People / HR'),
      item('Attendance', '/attendance', FiCheckSquare, 66, 'List', 'People / HR'),
      item('Leave', '/leave', FiCalendar, 62, 'List', 'People / HR'),
      item('Training', '/training', FiBookOpen, 64, 'List', 'People / HR'),
      item('Warnings', '/warning', FiFlag, 65, 'List', 'People / HR'),
      item('Shifts', '/employee-shift', FiClock, 67, 'List', 'People / HR'),
      item('Designations', '/designation', FiUser, 69, 'List', 'People / HR'),
      item('Terminations', '/termination', FiFileText, 70, 'List', 'People / HR'),
      item('Job posts', '/job-post', FiBriefcase, 71, null, 'People / HR'),
      item('Payroll', '/payroll', FiCreditCard, 72, null, 'People / HR'),
      item('HR setup', '/setups', FiSettings, 73, 'List', 'People / HR', { roles: [6] }),
      item('Holidays', '/holiday', FiCalendar, 73, 'List', 'People / HR', { roles: [6] }),
      item('Finance overview', '/finance', FiDollarSign, 105, 'List', 'Finance', { roles: [19, 20, 21] }),
      item('Bank deposits', '/bank-deposit-list', FiCreditCard, 150, null, 'Finance'),
      item('Deal forms', '/deal-form-list', FiBriefcase, 150, null, 'Finance'),
      item('Assets', '/fixed-asset-register', FiPackage, 153, null, 'Finance'),
      item('Petty cash', '/petty-cash-list', FiDollarSign, 153, null, 'Finance'),
      item('Bills', '/bills-list', FiFileText, 153, null, 'Finance'),
      item('Payment plans', '/payment-plan', FiCalendar, 152, null, 'Finance'),
      item('Payment receipts', '/payment-reciepts', FiFileText, 152, null, 'Finance'),
      item('Payment vouchers', '/payment-voucher-list', FiFileText, 152, null, 'Finance'),
      item('Bank accounts', '/bank-list', FiCreditCard, 155, null, 'Finance'),
      item('Cheque books', '/list-cheque-book', FiBookOpen, 155, null, 'Finance'),
      item('Outgoing cheques', '/list-cheque-outward-register', FiRepeat, 155, null, 'Finance'),
      item('Post-dated cheques', '/list-post-dated-cheque', FiClock, 155, null, 'Finance'),
      item('Stock register', '/stock-list', FiPackage, 151, null, 'Finance'),
      item('Chart of accounts · L1', '/chart-of-account-level-1', FiLayers, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Chart of accounts · L2', '/chart-of-account-level-2', FiLayers, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Chart of accounts · L3', '/chart-of-account-level-3', FiLayers, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Dimensions · L1', '/dimension-code-level-1', FiGrid, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Dimensions · L2', '/dimension-code-level-2', FiGrid, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Dimensions · L3', '/dimension-code-level-3', FiGrid, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Account mapping', '/generate-mapping', FiRepeat, undefined, 'List', 'Accounting', { financeOnly: true }),
      item('Voucher types', '/voucher-type', FiFileText, undefined, 'List', 'Accounting', { financeOnly: true }),
    ],
    comingSoon: [
      comingSoon('Calendar', FiCalendar, 'Work'),
      comingSoon('Approvals', FiCheckSquare, 'Work'),
      comingSoon('Academy', FiBookOpen, 'People / HR'),
    ],
  },
  {
    label: 'INTELLIGENCE', icon: FiBarChart2,
    items: [
      item('Analytics', '/analytics', FiBarChart2, 88, 'List', 'Analytics'),
      item('Call analytics', '/calling-analytics', FiPhone, 132, 'List', 'Reports'),
      item('Call status', '/list-status-report', FiActivity, 146, 'List', 'Reports'),
      item('Lead status', '/leads-status-report', FiTarget, 146, 'List', 'Reports'),
      item('Daily leads', '/list-daily-leads-report', FiCalendar, 147, 'List', 'Reports'),
      item('Database report', '/list-import-database-leads-report', FiDatabase, 148, 'List', 'Reports'),
      item('KPI report', '/list-kpis-report', FiBarChart2, 158, 'List', 'Reports'),
    ],
    comingSoon: [comingSoon('AI Copilot', FiZap, 'AI')],
  },
  {
    label: 'SETTINGS', icon: FiSettings,
    items: [
      item('Companies', '/company', FiBriefcase, 60, 'List', 'Organization'),
      item('Branches', '/branch', FiMapPin, 67, 'List', 'Organization'),
      item('Departments', '/department', FiGrid, 68, 'List', 'Organization'),
      item('Teams', '/report-to', FiLayers, 61, 'List', 'Organization'),
      item('Users', '/employee', FiUsers, 61, 'List', 'Access'),
      item('Role categories', '/role-category', FiShield, 73, 'List', 'Access'),
      item('CRM modules', '/crm-modules', FiGrid, 73, 'List', 'Access'),
      item('Module setup', '/module-setup', FiSettings, 73, 'List', 'Access'),
      item('Roles & permissions', '/role-permission', FiShield, 73, 'List', 'Access'),
    ],
    comingSoon: [
      comingSoon('Agency', FiBriefcase, 'Agency administration'),
      comingSoon('Integrations', FiGrid, 'Agency administration'),
      comingSoon('Automation', FiZap, 'Agency administration'),
      comingSoon('Subscription / Plan', FiCreditCard, 'Agency administration'),
      comingSoon('Branding', FiLayers, 'Agency administration'),
      comingSoon('Audit', FiFileText, 'Agency administration'),
      comingSoon('Settings', FiSettings, 'Agency administration'),
    ],
  },
];

export const hasFeature = (permissions, feature, action = 'List') =>
  Array.isArray(permissions) && permissions.some(permission =>
    Number(permission.feature_id) === feature && (!action || permission.sub_features === action));

export const visibleNavigation = (permissions, locked = false) => crmNavigation
  .map(group => ({
    ...group,
    items: group.items.filter(entry =>
      (!locked || ['/employee', '/dashboard'].includes(entry.path)) &&
      (!entry.financeOnly || (Array.isArray(permissions) && permissions.some(permission => Number(permission.role_id) === 20 || Number(permission.module_id) === 4 || permission.module_name === 'Finance'))) &&
      (!entry.feature || hasFeature(permissions, entry.feature, entry.action) || (Array.isArray(permissions) && entry.roles?.some(role => permissions.some(permission => Number(permission.role_id) === role)))),
    ),
    comingSoon: locked ? [] : group.comingSoon || [],
  }))
  .filter(group => group.items.length || group.comingSoon.length);

export function readStoredUser() {
  try { return JSON.parse(localStorage.getItem('authdata')) || null; }
  catch { return null; }
}

export function isStandaloneRoute(path) {
  return path === '/' || /^\/(sign-up|forgot-password|reset|admin|document)(\/|$)/.test(path) ||
    /^\/(affiliate|affiliates|view-affiliate)/.test(path) ||
    /print|^\/(booking-form|allocation|confirmation|provisional-allotment|cheque-outward-voucher|petty-cash-voucher|list-payment-voucher|list-bank-deposit-voucher|view-payment-reciept)(\/|$)/.test(path);
}
