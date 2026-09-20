import React , {useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import DashboardBox from '../SalesDashboard/DashboardBox';
import DashboardDeals from '../SalesDashboard/DashboardDeals';
import SalesTodos from '../SalesDashboard/SalesTodos';
import DataAnalytics from '../SalesDashboard/DataAnalytics';
import VirginGraphs from './DashboardGraphs/VirginGraphs';
import CallingStatusGraph from './DashboardGraphs/CallingStatusGraph';
import QuickNav from '../../Includes/QuickNav';
import ProductionDashboard from '../YoutubeDashboard/Production/ProductionDashboard';
import HrDashboard from '../Hr/HrDashboard';
import OperationDashboard from '../OperationDashboard/OperationDashboard';
import FinanceDashboard from '../FinanceDashboard/FinanceDashboard';
import OtherNavigation from '../../Includes/OtherNavigation';
// import { getDashCountData , loadingToggleAction } from '../../redux/action/DashboardCountAction';
import { getDashboardListACtion , loadingToggleAction } from '../../redux/action/getDashboardListACtion';
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegSmile } from 'react-icons/fa';


const Dashboard = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dashboardLOading = useSelector(state => state.dashboardListReducers.showloading);

  const CalingStatusList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 49 && edx.sub_features === 'List');
  const TodosList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 128 && edx.sub_features === 'List');
  const AssignLeadsList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 50 && edx.sub_features === 'List');
  const ZongPortalList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 49 && edx.sub_features === 'List');
  const VirginList = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 48 && edx.sub_features === 'List');
  const ProductionView = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 140 && edx.sub_features === 'List');
  const TaskManagementHrmanager = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 6 || edx.role_id === 11 || edx.role_id === 10 || edx.role_id === 8);
  const OperationMUser = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 13 || edx.module_id === 3 || edx.module_name === 'Operations');
  const FinanceMode = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20 || edx.module_id === 4 || edx.module_name === 'Finance');
  const FinanceSuper = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.module_id === 10);

  const DashboardLeads = resultlistdashboard.AssignLeadsDashboard;
  const DashboardTodos = resultlistdashboard.TodosTodayData;
  const DashboardGraphs = resultlistdashboard.ubtabbedGraphDashboard;
  const DashboardGraphsCalling = resultlistdashboard.GraphCallingZOng;

  useEffect(() => {
    if(!localStorage.getItem('authdata')){
      navigate('/');
    }
  },[navigate]);

  useEffect(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      const EmpData = JSON.parse(localStorage.getItem('empTeam'));
      const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145);
      dispatch(loadingToggleAction(true))
      if(SuperCon.length === 0){
        if(EmpData === null || EmpData === ''){
          dispatch(getDashboardListACtion(AuthData.id,''));
        }else{
          dispatch(getDashboardListACtion('all',EmpData.teamObj));
        }
      }else{
        dispatch(getDashboardListACtion('all',''));
      }
      dispatch(SingleEmpAction(AuthData.id));
  },[dispatch,resultRolePermssion]);

  console.log("resultlistdashboard",resultlistdashboard);

return (
  
<>

{
  FinanceMode.length > 0 && FinanceSuper.length === 0 ? (
    <FinanceDashboard />
  ) : OperationMUser.length > 0 && FinanceSuper.length === 0 ? (
    <OperationDashboard />
  ) : TaskManagementHrmanager.length > 0 && FinanceSuper.length === 0 ? (
    <HrDashboard />
  ): ProductionView.length > 0 ?(
    <ProductionDashboard />
  ):(
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
    <div>
        <h2 className="hk-pg-title font-weight-600">Welcome <FaRegSmile size={30} color="#0092ee" /> ! Enter with a Happy <FaHeart size={30} color="red" /></h2>
        <p className='pl-md-3'>Welcome to Customer Relationship Management for SellMore..</p>
    </div>
    <QuickNav />
    </div>

<OtherNavigation />

<div className="hk-row">
{
VirginList === '' ? '' : VirginList.length === 0 ? (
<></>
):(
<div className="col-lg-6">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>

<div className="card-header card-header-action">
<h6>Vigrin Leads</h6>
</div>
<div className="card-body p-0">
<VirginGraphs dataGraph={DashboardGraphs} loading={dashboardLOading}/>
</div>
</div>
</div>
)
}

{
ZongPortalList === '' ? '' : ZongPortalList.length === 0 ? (
<></>
):(
<div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Calling Status</h6>
</div>
<div className="card-body">
<CallingStatusGraph dataCalling={DashboardGraphsCalling} loading={dashboardLOading}/>
</div>
</div>
</div>
)
}

</div>

<DashboardBox loading={dashboardLOading}/>
<div className="hk-row">
{
CalingStatusList === '' ? '' : CalingStatusList.length === 0 ? (
<></>
):(
<DashboardDeals/>
)
}

{
TodosList.length === 0 ? (
<></>
):(
<SalesTodos TodosData={DashboardTodos}/>
)
}

{
AssignLeadsList === '' ? '' : AssignLeadsList.length === 0 ? (
<></>
):(
<DataAnalytics CallDatax={DashboardLeads}/>
)
}
</div>

</div>
    </>
  )

}



</>
)
}

export default Dashboard