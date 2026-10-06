import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LeadHistory from './LeadHistory';

jest.mock('../../Includes/Navigation', () => () => null);
jest.mock('../../redux/action/LeadHistoryAction', () => ({
  LeadHistoryAction: (id) => async (dispatch) => {
    global.__historyActionIds.push(id);
    const response = await global.__historyResponse;
    dispatch({ type: 'HISTORY', payload: response });
    return response;
  },
}));

const historyRecord = {
  emp_name: 'Consultant One',
  clientName: 'Client One',
  clientPhone: '03001234567',
  clientDesignation: 'Investor',
  clientProject: 'Project A',
  leadStatus: 'My Lead',
  created_at: '2025-04-21 10:00:00',
  getvirginleads: null,
  PhoneCount: 4,
  whatsappCount: 2,
  smsCount: 1,
  emailCount: 0,
  callHistory: [{ id: 1, ext: '221', phone: '03001234567', recording: 'https://calls.example.test/recording.wav', status: 'Connected', datetime: '2025-04-22 09:30:00' }],
  activtyLog: [
    { id: 2, created_at: '2025-04-23 12:00:00', customer_activity_type: { activityName: 'Meeting' }, InterestPercentage: '50%', activityDetails: 'Second activity', actStatus: 'Complete' },
    { id: 1, created_at: '2025-04-22 12:00:00', customer_activity_type: { activityName: 'Call' }, InterestPercentage: '25%', activityDetails: 'First activity', actStatus: 'Complete' },
  ],
  MyLeads: { clientActivityDesc: 'Initial inquiry note', clientInterst: 'Investment' },
};

function mount(response = historyRecord) {
  global.__historyResponse = response;
  global.__historyActionIds = [];
  const initialState = { LeadHistoryreducers: { leadhistoryreport: [] } };
  const reducer = (state = initialState, action) => action.type === 'HISTORY'
    ? { LeadHistoryreducers: { leadhistoryreport: action.payload } }
    : state;
  const store = createStore(reducer, applyMiddleware(thunk));
  return render(
    <ProviderForTest store={store}>
      <MemoryRouter initialEntries={['/lead-history/42']}>
        <Routes><Route path="/lead-history/:id" element={<LeadHistory />} /></Routes>
      </MemoryRouter>
    </ProviderForTest>
  );
}

function ProviderForTest({ store, children }) {
  const { Provider } = require('react-redux');
  return <Provider store={store}>{children}</Provider>;
}

afterEach(() => {
  cleanup();
  delete global.__historyResponse;
  delete global.__historyActionIds;
  jest.clearAllMocks();
});

test('renders available identity, Warm mapping, communication counts, and only data-backed tabs', async () => {
  mount();
  expect(await screen.findByRole('heading', { name: 'Client One' })).toBeInTheDocument();
  expect(screen.getByText('Investor')).toBeInTheDocument();
  expect(screen.getByText('Project A')).toBeInTheDocument();
  expect(screen.getByText('Warm')).toBeInTheDocument();
  expect(screen.getByText('My Lead')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.queryByRole('tab', { name: 'Reminders' })).not.toBeInTheDocument();
  expect(global.__historyActionIds).toEqual(['42']);
});

test('preserves call fields and recording source in the compact Calls tab', async () => {
  mount();
  await screen.findByRole('heading', { name: 'Client One' });
  fireEvent.click(screen.getByRole('tab', { name: 'Calls' }));
  const callsPanel = screen.getByRole('tabpanel');
  expect(within(callsPanel).getByText('221')).toBeInTheDocument();
  expect(within(callsPanel).getByText('03001234567')).toBeInTheDocument();
  expect(within(callsPanel).getByText('Connected')).toBeInTheDocument();
  expect(within(callsPanel).getByTitle('2025-04-22 09:30:00')).toBeInTheDocument();
  const audio = callsPanel.querySelector('audio');
  expect(audio).toBeInTheDocument();
  expect(audio.querySelector('source')).toHaveAttribute('src', 'https://calls.example.test/recording.mp3');
});

test('orders available activity chronologically and preserves original notes', async () => {
  mount();
  await screen.findByRole('heading', { name: 'Client One' });
  fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
  const panel = screen.getByRole('tabpanel');
  const items = within(panel).getAllByRole('listitem');
  expect(items).toHaveLength(2);
  expect(items[0]).toHaveTextContent('First activity');
  expect(items[1]).toHaveTextContent('Second activity');

  fireEvent.click(screen.getByRole('tab', { name: 'History' }));
  expect(screen.getByText('Initial inquiry note')).toBeInTheDocument();
  expect(screen.getByText('Investment')).toBeInTheDocument();
});

test('distinguishes loading, empty, request error, and unavailable history', async () => {
  let resolveResponse;
  mount(new Promise((resolve) => { resolveResponse = resolve; }));
  expect(screen.getByRole('status')).toHaveTextContent('Loading Lead 360');
  resolveResponse({});
  expect(await screen.findByText('No lead history available')).toBeInTheDocument();

  cleanup();
  mount({ isAxiosError: true, message: 'offline' });
  expect(await screen.findByText('Lead history could not be loaded')).toBeInTheDocument();

  cleanup();
  mount({ isAxiosError: true, response: { status: 403 } });
  expect(await screen.findByText('Lead history is unavailable')).toBeInTheDocument();
});