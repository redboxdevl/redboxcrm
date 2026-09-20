import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import DashboardBox from '../SalesDashboard/DashboardBox';
import QuickNav from '../../Includes/QuickNav';
import FinanceDashboard from '../FinanceDashboard/FinanceDashboard';
import OtherNavigation from '../../Includes/OtherNavigation';
import { getDashboardListACtion, loadingToggleAction } from '../../redux/action/getDashboardListACtion';
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-daterangepicker/daterangepicker.css';
import HrDashboard from '../Hr/HrDashboard';
import { actionConfig } from '../../configuration';

const Dashboard = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dashboardLOading = useSelector(state => state.dashboardListReducers.showloading);

  const TodosList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 128 && edx.sub_features === 'List');
  const FinanceSupervisor = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);
  const FinanceInputor = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 19 || edx.role_id === 21);
  const SuperAdmin = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 2 || edx.role_id === 18);

  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

  console.log("AuthDataxs",AuthDataxs);

  const DashboardLeads = resultlistdashboard.AssignLeadsDashboard;
  const DashboardTodos = resultlistdashboard.TodosTodayData;
  const DashboardGraphs = resultlistdashboard.ubtabbedGraphDashboard;
  const DashboardGraphsCalling = resultlistdashboard.GraphCallingZOng;
  const empAll = resultlistdashboard.myEmpData;
  const timeData = resultlistdashboard.timeData;
  const PendingTaskToday = resultlistdashboard.PendingTaskToday;

  const [SingleNoticeresult, setSingleNoticeresult] = useState([]);
  const [NoticeDesc, setNoticeDesc] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('authdata')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145);
    dispatch(loadingToggleAction(true))
    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === '') {
        dispatch(getDashboardListACtion(AuthData.id, '',AuthData.company_id));
      } else {
        dispatch(getDashboardListACtion('all', EmpData.teamObj,AuthData.company_id));
      }
    } else {
      dispatch(getDashboardListACtion('all', '',AuthData.company_id));
    }
    dispatch(SingleEmpAction(AuthData.id));
  }, [dispatch, resultRolePermssion]);

  const SingleNoticeRecords = async (resultlistdashboard) => {
    setNoticeDesc(resultlistdashboard.noticeData.description);
  }

  useEffect(() => {
    SingleNoticeRecords(resultlistdashboard);
  }, [resultlistdashboard]);

  return (

    <>

{
          FinanceSupervisor.length > 0 ? (
            <><FinanceDashboard /></>
          ) : FinanceInputor.length > 0 ? (
            <><FinanceDashboard /></>
          ) : SuperAdmin.length > 0 ? (
            <>
                  <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-md-flex justify-content-between align-items-center" style={{ gap: 20 }}>
          <div className='d-md-flex align-items-center borderBxs'>
            <div className="circleImg">
              <img src={AuthDataxs.get_company == null ? '' : actionConfig.REACT_APP_MAIN+AuthDataxs.get_company.companyLogo} alt="" width={130} />
            </div>
            <div className="noteT">
              {NoticeDesc == null ? 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti eaque quas, deserunt blanditiis hic saepe numquam similique laborum adipisci? Molestiae vel accusantium ducimus tempora debitis expedita quos obcaecati aliquid odit.' : NoticeDesc}
              <p className='text-right font-weight-bolder text-dark'>{AuthDataxs.get_company == null ? '' : AuthDataxs.get_company.ownerTitle}</p>
            </div>
          </div>
          <QuickNav PendingTaskToday={PendingTaskToday} />
        </div>
        <OtherNavigation />

        <DashboardBox DashboardTodos={DashboardTodos} TodosList={TodosList} DashboardLeads={DashboardLeads} loading={dashboardLOading} empAll={empAll} />
      </div>
            </>
          ):(
            <><HrDashboard /></>
          )
        }


    </>
  )
}

export default Dashboard