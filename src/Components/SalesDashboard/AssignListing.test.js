import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AssignListing from './AssignListing';
import { deriveLeadDataQuality } from '../SellmoreUI/AssignedLeadsPrimitives';

jest.mock('../../Includes/Navigation', () => () => null);
jest.mock('../../redux/action/AssignLeadsAction', () => ({
  AssignLeadsAction: (...args) => async (dispatch) => {
    global.__assignActionCalls.push(args);
    const response = await global.__assignResponse;
    dispatch({ type: 'ASSIGN_LEADS', payload: response });
    return response;
  },
}));
jest.mock('../../redux/action/NotinterestedReasonAction', () => ({
  NotinterestedReasonAction: () => ({ type: 'NOOP' }),
}));
jest.mock('../../redux/action/CallingActions', () => ({
  CallingActions: () => ({ type: 'NOOP' }),
}));
jest.mock('sweetalert2', () => ({ __esModule: true, default: { fire: jest.fn() } }));
jest.mock('axios', () => {
  const mockAxios = jest.fn();
  mockAxios.CancelToken = { source: () => ({ token: 'test-token' }) };
  return { __esModule: true, default: mockAxios };
});

const listPermission = { feature_id: 50, sub_features: 'List', role_id: 3 };
const exportPermission = { feature_id: 50, sub_features: 'Export', role_id: 3 };
const records = [
  {
    leadid: 101,
    agentid: 7,
    emp_name: 'Agent One',
    clientPhone: '03001234567',
    clientPhoneIos: '03001234567',
    whatsappclientPhone: '923001234567',
    PublishDate: '2026-10-01',
    timeAgo: '4 days ago',
    getvirginleads: null,
    get_transferleads: { fagentName: 'Agent Two' },
    getreminder: { reminderinfo: 'Call again', priority: 'High' },
    getleads: { clientName: 'Client One', clientPhone: '03001234567', clientProject: 'Project A', clientDesignation: 'Buyer', clientemail: 'client@example.test' },
  },
  {
    leadid: 102,
    agentid: 7,
    emp_name: 'Agent One',
    PublishDate: '2026-10-02',
    getvirginleads: { id: 5 },
    getleads: { clientName: 'Client Two', clientPhone: '03007654321', clientProject: 'Project B', clientDesignation: '-' },
  },
];

function responseWith(data = records, totalRecords = data.length) {
  return { data, totalRecords, message: '' };
}

function mount({ response = responseWith(), permissions = [listPermission, exportPermission], initialPath = '/list-assign-leads', authData = { id: 7, company_id: 2 } } = {}) {
  global.__assignResponse = response;
  global.__assignActionCalls = [];
  if (authData) localStorage.setItem('authdata', JSON.stringify(authData));
  else localStorage.removeItem('authdata');
  const initialState = {
    assignLeadsreducer: { assignleaddata: [] },
    NotinterestedOptreducers: { notinterestedoptdata: [] },
    Callingreducers: { callingcount: '' },
    Permissiondatareducers: { singledataredu: permissions },
    dashCountReducer: { dashboardcount: {} },
    dashboardListReducers: { dashboardlistcount: { empAll: [{ id: 8, emp_name: 'Consultant One' }], getAllProjects: [{ clientProject: 'Project A' }, { clientProject: 'Project B' }] } },
  };
  const reducer = (state = initialState, action) => action.type === 'ASSIGN_LEADS'
    ? { ...state, assignLeadsreducer: { assignleaddata: action.payload } }
    : state;
  const store = createStore(reducer, applyMiddleware(thunk));
  return render(
    <ProviderForTest store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/list-assign-leads" element={<AssignListing />} />
          <Route path="/lead-history/:id" element={<h1>Lead history</h1>} />
          <Route path="/add-reminder/:id" element={<h1>Reminder form for 101</h1>} />
          <Route path="/" element={<h1>Sign in</h1>} />
        </Routes>
      </MemoryRouter>
    </ProviderForTest>
  );
}

function ProviderForTest({ store, children }) {
  const { Provider } = require('react-redux');
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('authdata', JSON.stringify({ id: 7, company_id: 2 }));
  localStorage.setItem('empTeam', JSON.stringify({ teamStatus: 'manager' }));
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ code: 200, message: 'ok' }) });
  require('axios').default.mockResolvedValue({ data: [] });
  window.confirm = jest.fn(() => true);
});

afterEach(() => {
  delete global.__assignResponse;
  delete global.__assignActionCalls;
  jest.clearAllMocks();
});

test('renders assigned lead fields and preserves activity and lead-history actions', async () => {
  mount();
  expect(await screen.findByText('Client One')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Lead 360' })[0]).toHaveAttribute('href', '/lead-history/101');
  expect(screen.getByText('03001234567')).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: 'Assigned leads table' })).getByText('Project A')).toBeInTheDocument();
  expect(screen.getByText('Buyer')).toBeInTheDocument();
  expect(screen.getByText('1 Oct 2026')).toBeInTheDocument();
  expect(screen.getByTitle('2026-10-01')).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Profession' })).toBeInTheDocument();
  expect(screen.getByText('Warm')).toBeInTheDocument();
  expect(screen.queryByText('Untouch Lead')).not.toBeInTheDocument();
  expect(screen.queryByText('Hot')).not.toBeInTheDocument();
  expect(screen.queryByText('Cold')).not.toBeInTheDocument();
  expect(screen.getByText('2 records')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Open actions for Client One' }));
  const activityDialog = await screen.findByRole('dialog');
  expect(within(activityDialog).getByText('Lead Action Center')).toBeInTheDocument();
  expect(within(activityDialog).getByRole('link', { name: 'Call' })).toHaveAttribute('href', 'tel:6603001234567');
  expect(within(activityDialog).getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/923001234567');
  expect(within(activityDialog).getByRole('link', { name: 'SMS' })).toHaveAttribute('href', 'sms:+03001234567&body=hi this is testing email');
  expect(within(activityDialog).getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:client@example.test');
  expect(within(activityDialog).getByRole('button', { name: 'Not Interested' })).toBeInTheDocument();
  expect(within(activityDialog).queryByRole('button', { name: /Delete/ })).not.toBeInTheDocument();
  fireEvent.click(within(activityDialog).getByRole('button', { name: 'Reminder' }));
  expect(screen.getByRole('heading', { name: 'Reminder form for 101' })).toBeInTheDocument();
});

test('action center keeps disposition and transfer actions separate', async () => {
  mount();
  await screen.findByText('Client One');
  fireEvent.click(screen.getByRole('button', { name: 'Open actions for Client One' }));
  const dialog = await screen.findByRole('dialog');

  fireEvent.click(within(dialog).getByRole('button', { name: 'Not Interested' }));
  expect(within(dialog).getByText('Disposition: Not Interested')).toBeInTheDocument();
  expect(within(dialog).getByText('Select a reason for marking this lead not interested.')).toBeInTheDocument();
  expect(within(dialog).queryByText('Transfer lead')).not.toBeInTheDocument();

  fireEvent.click(within(dialog).getByRole('button', { name: 'Transfer' }));
  expect(within(dialog).getByText('Transfer lead')).toBeInTheDocument();
  expect(within(dialog).getByLabelText('Select Agent')).toBeInTheDocument();
});

test('derives incomplete quality only from missing identity or all contact points', () => {
  expect(deriveLeadDataQuality({ leadid: 1, getleads: { clientName: 'A', clientPhone: '03001234567' } })).toBe('complete');
  expect(deriveLeadDataQuality({ leadid: 1, getleads: { clientName: 'A', clientemail: 'a@example.test' } })).toBe('complete');
  expect(deriveLeadDataQuality({ leadid: 1, getleads: { clientName: 'A', clientDesignation: '', clientProject: '', Budget: '' } })).toBe('incomplete');
  expect(deriveLeadDataQuality({ leadid: 1, getleads: { clientName: 'A', clientemail: 'not-an-email' } })).toBe('incomplete');
  expect(deriveLeadDataQuality({ leadid: 1, getleads: { clientName: '', clientPhone: '0300' } })).toBe('incomplete');
  expect(deriveLeadDataQuality({ getleads: { clientName: 'A', clientPhone: '0300' } })).toBe('incomplete');
});

test('shows a derived Incomplete badge only for loaded rows missing required identity/contact', async () => {
  mount({ response: responseWith([{ leadid: 103, getleads: { clientName: 'Client Without Contact' } }], 1) });
  await screen.findByText('Client Without Contact');
  expect(screen.getByText('Incomplete')).toBeInTheDocument();
});

test('signed-out route redirects without crashing the page effects', async () => {
  mount({ authData: null });
  expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
});

test('shows loading, empty, error and distinguishable forbidden states without false totals', async () => {
  let resolveResponse;
  mount({ response: new Promise((resolve) => { resolveResponse = resolve; }) });
  expect(screen.getByRole('status')).toHaveTextContent('Loading assigned leads');
  resolveResponse(responseWith([], 0));
  expect(await screen.findByText('No assigned leads')).toBeInTheDocument();
  expect(screen.getByText('0 records')).toBeInTheDocument();

  cleanup();
  mount({ response: { isAxiosError: true, code: 'ERR_NETWORK', message: 'offline' } });
  expect(await screen.findByRole('alert')).toHaveTextContent('could not be loaded');
  expect(screen.queryByText(/records$/)).not.toBeInTheDocument();

  cleanup();
  mount({ response: { isAxiosError: true, response: { status: 403 } } });
  expect(await screen.findByRole('alert')).toHaveTextContent('unavailable');
  expect(screen.queryByText(/records$/)).not.toBeInTheDocument();
});

test('submits supported filters and clears them without changing request argument order', async () => {
  mount({ response: responseWith() });
  await screen.findByText('Client One');
  global.__assignActionCalls = [];

  fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'Client One' } });
  fireEvent.change(screen.getByLabelText('Consultant'), { target: { value: '8' } });
  fireEvent.change(screen.getByLabelText('Project'), { target: { value: 'Project A' } });
  fireEvent.click(screen.getByText('More filters'));
  expect(screen.getByText('Not wired to the current list request')).toBeInTheDocument();
  expect(screen.queryByLabelText('Date range')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Transfer leads search'), { target: { value: 'transfer' } });
  fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

  await waitFor(() => expect(global.__assignActionCalls).toHaveLength(1));
  expect(global.__assignActionCalls[0]).toEqual(['all', 1, 12, 'Client One', '', '8', 'transfer', '', 'Project A', 2]);

  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  await waitFor(() => expect(global.__assignActionCalls).toHaveLength(2));
  expect(global.__assignActionCalls[1]).toEqual(['all', 1, 12, '', '', '', '', '', '', 2]);
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('');
});

test('shows bulk actions only after selection and requires confirmation before delete', async () => {
  mount();
  await screen.findByText('Client One');
  expect(screen.queryByRole('region', { name: 'Selected lead actions' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('checkbox', { name: 'Select Client One' }));
  const bulkActions = screen.getByRole('region', { name: 'Selected lead actions' });
  expect(within(bulkActions).getByText('1 selected')).toBeInTheDocument();
  fireEvent.click(within(bulkActions).getByText('More'));
  fireEvent.click(screen.getByRole('button', { name: 'Delete selected' }));
  const dialog = await screen.findByRole('dialog');
  expect(within(dialog).getByText('Delete selected leads?')).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();

  fireEvent.click(within(dialog).getByRole('button', { name: 'Delete selected' }));
  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('leadsDeleteData'),
    expect.objectContaining({ method: 'POST', body: JSON.stringify({ isCheck: ['101'] }) })
  ));
});

test('preserves export permission and server pagination', async () => {
  mount({ response: responseWith(records, 24) });
  await screen.findByText('Client One');
  const exportLink = screen.getByRole('link', { name: 'Export current page' });
  expect(exportLink).toHaveAttribute('download', 'assigned-leads-current-page.csv');
  const csv = decodeURIComponent(exportLink.getAttribute('href').slice('data:text/csv;charset=utf-8,'.length));
  expect(csv).toContain('Client One');
  expect(csv).toContain('Client Two');
  expect(csv).not.toContain('client@example.test');
  expect(exportLink).toHaveAttribute('title', 'Exports only the rows loaded on this page');
  global.__assignActionCalls = [];
  fireEvent.click(screen.getByRole('button', { name: 'Page 2' }));
  await waitFor(() => expect(global.__assignActionCalls).toHaveLength(1));
  expect(global.__assignActionCalls[0]).toEqual(['all', 2, 12, '', '', '', '', '', '', 2]);

  cleanup();
  mount({ response: responseWith(), permissions: [listPermission] });
  await screen.findByText('Client One');
  expect(screen.queryByRole('link', { name: 'Export current page' })).not.toBeInTheDocument();
});