import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Dashboard, { dashboardNumber } from './Dashboard';
import CrmLayout from '../../Includes/CrmLayout';
import { hasFeature, isStandaloneRoute, visibleNavigation } from '../../Includes/crmNavigation';
import { getDashboardListACtion } from '../../redux/action/getDashboardListACtion';

jest.mock('echarts-for-react', () => props => <div data-testid="chart" data-option={JSON.stringify(props.option)} />);
jest.mock('../../redux/action/getDashboardListACtion', () => ({
  getDashboardListACtion: jest.fn(() => () => Promise.resolve()),
  loadingToggleAction: status => ({ type: 'LOADING', status }),
}));
jest.mock('../../redux/action/SingleEmpAction', () => ({ SingleEmpAction: () => ({ type: 'EMPLOYEE' }) }));

const permissions = [50, 53, 54, 56, 59, 100, 108, 128, 132].map(feature_id => ({ feature_id, sub_features: 'List', role_id: 3 }));
const sampleData = {
  assignTotal: '12,400', assignToday: 0, TotalMyLead: 740, TodayMyLead: 5,
  TotalDealsDOne: 12, TodayDealsDOne: 1, TotalOutgoingCallData: 230,
  TodayOutgoingCallData: 10, TodayIncommingCallData: 5, TotalIncommingCallData: 60,
  ubtabbedGraphDashboard: { assignleadweekly: [{ format: 'Mon', assignleadweekly: 8, myleadweekly: 5, hotleadweekly: 2 }] },
  myEmpData: [{ emp_name: 'Agent A', AttemptedCalls: 10, connectedCalls: 2 }, { emp_name: 'Agent B', AttemptedCalls: 20, connectedCalls: 1 }],
  AssignLeadsDashboard: [{ id: 1, getleads: { clientName: 'Test client', clientProject: 'Test project' }, publishAgentDate: '2026-09-30' }],
};
function mount(data = sampleData, access = permissions, shell = false) {
  const state = { Permissiondatareducers: { singledataredu: access }, dashboardListReducers: { dashboardlistcount: data } };
  const store = createStore((current = state) => current, applyMiddleware(thunk));
  const content = <Routes><Route path="/dashboard" element={<Dashboard />} /><Route path="/list-assign-leads" element={<h1>Assigned lead records</h1>} /><Route path="/" element={<h1>Sign in</h1>} /></Routes>;
  return render(<Provider store={store}><MemoryRouter initialEntries={['/dashboard']}>{shell ? <CrmLayout>{content}</CrmLayout> : content}</MemoryRouter></Provider>);
}
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('authdata', JSON.stringify({ id: 7, company_id: 2, emp_name: 'Test User' }));
  getDashboardListACtion.mockImplementation(() => () => Promise.resolve());
  window.scrollTo = jest.fn();
});
afterEach(() => jest.clearAllMocks());

test('renders live totals and allows zero without treating missing values as zero', async () => {
  mount();
  expect(await screen.findByText('12,400')).toBeInTheDocument();
  expect(screen.getByText('Test client')).toBeInTheDocument();
  expect(dashboardNumber(0)).toBe(0);
  expect(dashboardNumber('1,234')).toBe(1234);
  [null, undefined, '', ' ', {}, [], true, '1,2', 'invalid'].forEach(value => expect(dashboardNumber(value)).toBeNull());
  expect(getDashboardListACtion).toHaveBeenCalledWith('all', '', 2);
});

test('switches call periods and sorts team performance by the selected metric', async () => {
  mount();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Refresh' })).toBeEnabled());
  fireEvent.change(screen.getByLabelText('Call distribution period'), { target: { value: 'today' } });
  const donut = screen.getAllByTestId('chart').map(chart => JSON.parse(chart.dataset.option)).find(option => option.series[0].type === 'pie');
  expect(donut.series[0].data.map(item => item.value)).toEqual([10, 5]);
  fireEvent.click(screen.getByRole('button', { name: 'Team performance' }));
  expect(JSON.parse(screen.getByTestId('chart').dataset.option).yAxis.data).toEqual(['Agent B', 'Agent A']);
  fireEvent.change(screen.getByLabelText('Measure'), { target: { value: 'connectedCalls' } });
  expect(JSON.parse(screen.getByTestId('chart').dataset.option).yAxis.data).toEqual(['Agent A', 'Agent B']);
});

test('uses an actual totals chart when weekly activity is unavailable', async () => {
  mount({ ...sampleData, ubtabbedGraphDashboard: null });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Refresh' })).toBeEnabled());
  expect(screen.getByRole('heading', { name: 'Sales snapshot' })).toBeInTheDocument();
  const chart = JSON.parse(screen.getAllByTestId('chart')[0].dataset.option);
  expect(chart.series[0].data.map(point => point.value)).toEqual([12400, 740, 12]);
});

test('handles missing data and refresh failures without inventing chart values', async () => {
  getDashboardListACtion.mockImplementation(() => () => Promise.reject(new Error('Offline')));
  mount({});
  expect(await screen.findByRole('alert')).toHaveTextContent('couldn’t refresh');
  expect(screen.queryByTestId('chart')).not.toBeInTheDocument();
  expect(screen.getByText('Call data unavailable')).toBeInTheDocument();
  getDashboardListACtion.mockImplementation(() => () => Promise.resolve());
  fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
});

test('permission checks hide inaccessible data and sidebar modules', async () => {
  mount(sampleData, [], true);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Refresh' })).toBeEnabled());
  expect(screen.queryByRole('link', { name: 'Assigned leads' })).not.toBeInTheDocument();
  expect(screen.queryByText('12,400')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Team performance' })).not.toBeInTheDocument();
  expect(hasFeature([{ feature_id: '50', sub_features: 'List' }], 50)).toBe(true);
  expect(hasFeature([{ feature_id: 50, sub_features: 'Create' }], 50)).toBe(false);
});

test('shows seven primary areas and keeps future destinations non-navigable', () => {
  mount(sampleData, permissions, true);
  const sidebar = screen.getByRole('complementary', { name: 'Main navigation' });
  ['HOME', 'CRM', 'PROPERTIES', 'NETWORK', 'BUSINESS', 'INTELLIGENCE', 'SETTINGS'].forEach(area => {
    expect(within(sidebar).getByRole('button', { name: area })).toBeInTheDocument();
  });

  const myDay = within(sidebar).getByText('My Day');
  expect(myDay.closest('[aria-disabled="true"]')).toBeInTheDocument();
  expect(myDay.closest('a')).toBeNull();

  const futureItems = visibleNavigation(permissions).flatMap(group => group.comingSoon);
  expect(futureItems.length).toBeGreaterThan(0);
  expect(futureItems.every(entry => entry.comingSoon && !entry.path)).toBe(true);
});

test('sidebar navigation loads records inside the persistent main workspace', async () => {
  mount(sampleData, permissions, true);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Refresh' })).toBeEnabled());
  const sidebar = screen.getByRole('complementary', { name: 'Main navigation' });
  expect(within(sidebar).queryByRole('link', { name: 'Assigned leads' })).not.toBeInTheDocument();
  fireEvent.click(within(sidebar).getByRole('button', { name: 'CRM' }));
  fireEvent.click(within(sidebar).getByRole('link', { name: 'Assigned leads' }));
  expect(within(screen.getByRole('main')).getByRole('heading', { name: 'Assigned lead records' })).toBeInTheDocument();
  expect(within(sidebar).getByRole('link', { name: 'Assigned leads' })).toHaveAttribute('aria-current', 'page');
  fireEvent.change(screen.getByLabelText('Find a module'), { target: { value: 'nothing-matches' } });
  expect(screen.getByText('No matching modules.')).toBeInTheDocument();
});

test('locked accounts cannot navigate to restricted modules', () => {
  const paths = visibleNavigation(permissions, true).flatMap(group => group.items).map(item => item.path);
  expect(paths).toEqual(['/dashboard']);
});

test('public, affiliate and printable documents remain outside the admin shell', () => {
  ['/', '/forgot-password', '/reset/abc', '/affiliate-dashboard', '/affiliates/inventories', '/print-sales-form/12', '/booking-form/12', '/admin/dashboard'].forEach(path => expect(isStandaloneRoute(path)).toBe(true));
  ['/dashboard', '/employee', '/finance', '/list-view-deals'].forEach(path => expect(isStandaloneRoute(path)).toBe(false));
});

test('signed-out users return to login without fetching dashboard data', async () => {
  localStorage.removeItem('authdata');
  mount();
  expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  expect(getDashboardListACtion).not.toHaveBeenCalled();
});

test('specialist finance roles retain access to their overview and accounting modules', () => {
  const paths = visibleNavigation([{ role_id: 20, module_id: 4 }]).flatMap(group => group.items).map(item => item.path);
  expect(paths).toContain('/finance');
  expect(paths).toContain('/chart-of-account-level-1');
  expect(visibleNavigation([]).flatMap(group => group.items).map(item => item.path)).not.toContain('/chart-of-account-level-1');
});
