import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi';
import Navigation from '../../Includes/Navigation';
import { LeadHistoryAction } from '../../redux/action/LeadHistoryAction';
import {
  ActivityTimeline,
  CommunicationMetric,
  DataQualityBadge,
  LeadIdentityHeader,
  LeadTabs,
  LeadTemperatureBadge,
  PageState,
  StatusBadge,
  deriveLeadDataQuality,
} from '../SellmoreUI/AssignedLeadsPrimitives';
import '../SellmoreUI/AssignedLeads.css';

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value || {}, key);
const historyRequestState = (response) => {
  if (response?.response?.status === 403) return 'unavailable';
  if (response?.isAxiosError || response instanceof Error || response == null) return 'error';
  if (Array.isArray(response) || Object.keys(response).length === 0) return 'empty';
  return 'success';
};
const displayDate = (value) => {
  if (!value) return null;
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format('D MMM YYYY, h:mm a') : String(value);
};

const LeadHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resultleadHistory = useSelector((state) => state.LeadHistoryreducers.leadhistoryreport);
  const [requestState, setRequestState] = useState('loading');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let active = true;
    setRequestState('loading');
    setActiveTab('overview');
    dispatch(LeadHistoryAction(id)).then((response) => {
      if (!active) return;
      setRequestState(historyRequestState(response));
    }).catch(() => {
      if (active) setRequestState('error');
    });
    return () => { active = false; };
  }, [dispatch, id]);

  const history = resultleadHistory && typeof resultleadHistory === 'object' && !Array.isArray(resultleadHistory)
    ? resultleadHistory
    : {};
  const myLeads = history.MyLeads && typeof history.MyLeads === 'object' ? history.MyLeads : {};
  const callHistory = Array.isArray(history.callHistory) ? history.callHistory : [];
  const activityLog = Array.isArray(history.activtyLog) ? history.activtyLog : [];
  const clientName = history.clientName || myLeads.clientName || '';
  const clientPhone = history.clientPhone || myLeads.clientPhone || '';
  const profession = history.clientDesignation || myLeads.clientDesignation || '';
  const project = history.clientProject || myLeads.clientProject || '';
  const consultant = history.emp_name || '';
  const leadStatus = history.leadStatus || myLeads.leadStatus || '';
  const createdAt = history.created_at || myLeads.created_at || '';
  const hasVirginState = hasOwn(history, 'getvirginleads') || hasOwn(myLeads, 'getvirginleads');
  const virginState = hasOwn(history, 'getvirginleads') ? history.getvirginleads : myLeads.getvirginleads;
  const isWarm = hasVirginState && virginState == null;
  const dataQuality = deriveLeadDataQuality({ leadid: id, clientPhone, getleads: { clientName, clientPhone } });

  const activityDates = activityLog.map((item) => item.created_at).filter((value) => value && moment(value).isValid());
  const lastActivity = activityDates.length
    ? activityDates.reduce((latest, value) => moment(value).isAfter(latest) ? value : latest, activityDates[0])
    : '';
  const chronologicalActivity = useMemo(() => {
    if (!activityLog.length || !activityLog.every((item) => item.created_at && moment(item.created_at).isValid())) return activityLog;
    return [...activityLog].sort((left, right) => moment(left.created_at).valueOf() - moment(right.created_at).valueOf());
  }, [activityLog]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    ...((activityLog.length || myLeads.clientActivityDesc || myLeads.clientInterst) ? [{ id: 'activity', label: 'Activity' }] : []),
    ...(callHistory.length ? [{ id: 'calls', label: 'Calls' }] : []),
    ...((createdAt || myLeads.clientActivityDesc || myLeads.clientInterst) ? [{ id: 'history', label: 'History' }] : []),
  ];

  const communicationCounts = [
    { icon: FiPhone, label: 'Phone calls', value: history.PhoneCount },
    { icon: FiMessageCircle, label: 'WhatsApp', value: history.whatsappCount },
    { icon: FiMessageCircle, label: 'SMS', value: history.smsCount },
    { icon: FiMail, label: 'Email', value: history.emailCount },
  ];
  const availableFacts = [
    ['Mobile', clientPhone],
    ['Profession', profession],
    ['Project', project],
    ['Assigned Consultant', consultant],
    ['Created Date', displayDate(createdAt)],
    ['Last Activity', displayDate(lastActivity)],
  ].filter(([, value]) => value !== '' && value != null);

  const renderState = () => {
    if (requestState === 'loading') return <PageState kind="loading" title="Loading Lead 360" description="Lead history is being loaded." />;
    if (requestState === 'unavailable') return <PageState kind="unavailable" title="Lead history is unavailable" description="This account cannot access this lead history." />;
    if (requestState === 'error') return <PageState kind="error" title="Lead history could not be loaded" description="The request did not return usable history data." onRetry={() => { setRequestState('loading'); dispatch(LeadHistoryAction(id)).then((response) => setRequestState(historyRequestState(response))).catch(() => setRequestState('error')); }} />;
    if (requestState === 'empty') return <PageState kind="empty" title="No lead history available" description="No history data was returned for this lead." />;
    return null;
  };

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4 sellmore-lead-360">
        {requestState !== 'success' ? renderState() : (
          <>
            <LeadIdentityHeader
              title={clientName || 'Lead 360'}
              subtitle={`Lead 360 · ${id}`}
              badges={(
                <>
                  {leadStatus && <StatusBadge>{leadStatus}</StatusBadge>}
                  {isWarm && <LeadTemperatureBadge isWarm />}
                  {dataQuality === 'incomplete' && <DataQualityBadge quality={dataQuality} />}
                </>
              )}
            >
              {availableFacts.map(([label, value]) => (
                <div className="sellmore-lead-header-detail" key={label}><small>{label}</small><strong>{value}</strong></div>
              ))}
            </LeadIdentityHeader>

            <LeadTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <section id={`lead-panel-${activeTab}`} className="sellmore-lead-panel" role="tabpanel" aria-labelledby={`lead-tab-${activeTab}`}>
              {activeTab === 'overview' && (
                <>
                  <h2>Communication summary</h2>
                  <div className="sellmore-communication-grid">
                    {communicationCounts.map((item) => <CommunicationMetric key={item.label} {...item} />)}
                  </div>
                </>
              )}

              {activeTab === 'activity' && (
                <>
                  <h2>Activity</h2>
                  {myLeads.clientActivityDesc && <p>{myLeads.clientActivityDesc}</p>}
                  {myLeads.clientInterst && <p>Client interest: {myLeads.clientInterst}</p>}
                  <ActivityTimeline
                    items={chronologicalActivity}
                    emptyMessage="No activity records are available."
                    renderItem={(item, index) => (
                      <li key={item.id ?? `${item.created_at || 'activity'}-${index}`}>
                        <span className="sellmore-activity-dot" aria-hidden="true" />
                        <div className="sellmore-activity-content">
                          <strong>{item.customer_activity_type?.activityName || 'Activity'}</strong>
                          {item.customer_activity_outcome?.outcomeTitle && <StatusBadge>{item.customer_activity_outcome.outcomeTitle}</StatusBadge>}
                          {item.activityDetails && <p>{item.activityDetails}</p>}
                          {item.InterestPercentage && <p>Interest: {item.InterestPercentage}</p>}
                          {item.actStatus && <p>Status: {item.actStatus}</p>}
                          {item.created_at && <time dateTime={item.created_at} title={item.created_at}>{displayDate(item.created_at)}</time>}
                        </div>
                      </li>
                    )}
                  />
                </>
              )}

              {activeTab === 'calls' && (
                <>
                  <h2>Call history</h2>
                  <div className="sellmore-call-table-wrap">
                    <table className="sellmore-call-table">
                      <thead><tr><th>Extension</th><th>Phone</th><th>Recording</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>{callHistory.map((call, index) => {
                        const recording = typeof call.recording === 'string' ? call.recording : '';
                        const audioSource = recording
                          ? recording.substr(0, recording.lastIndexOf('.')) + '.mp3'
                          : '';
                        return (
                          <tr key={call.id ?? `${call.datetime || 'call'}-${index}`}>
                            <td>{call.ext || '—'}</td>
                            <td>{call.phone || '—'}</td>
                            <td>{audioSource ? <audio controls preload="none"><source src={audioSource} type="audio/mp3" /></audio> : '—'}</td>
                            <td>{call.status ? <StatusBadge>{call.status}</StatusBadge> : '—'}</td>
                            <td>{call.datetime ? <time dateTime={call.datetime} title={call.datetime}>{displayDate(call.datetime)}</time> : '—'}</td>
                          </tr>
                        );
                      })}</tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <h2>Lead history</h2>
                  <ActivityTimeline
                    items={[
                      ...(createdAt ? [{ id: 'created', title: 'Lead created', detail: displayDate(createdAt), date: createdAt }] : []),
                      ...(myLeads.clientActivityDesc ? [{ id: 'first-activity', title: 'First activity', detail: myLeads.clientActivityDesc }] : []),
                      ...(myLeads.clientInterst ? [{ id: 'client-interest', title: 'Client interest', detail: myLeads.clientInterst }] : []),
                    ]}
                    emptyMessage="No additional history fields are available."
                    renderItem={(item) => (
                      <li key={item.id}>
                        <span className="sellmore-activity-dot" aria-hidden="true" />
                        <div className="sellmore-activity-content">
                          <strong>{item.title}</strong>
                          <p>{item.detail}</p>
                          {item.date && <time dateTime={item.date} title={item.date}>{displayDate(item.date)}</time>}
                        </div>
                      </li>
                    )}
                  />
                </>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default LeadHistory;
