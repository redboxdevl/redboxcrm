import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation'
import Swal from 'sweetalert2'
import Moment from 'moment';
import $ from 'jquery';
import { ImportLeadAction } from '../../redux/action/ImportLeadAction';
import { actionConfig } from '../../configuration';
import { useCSVDownloader } from 'react-papaparse';
import { ImportEmployeeAction } from '../../redux/action/ImportEmployeeAction';
import ReactPaginate from 'react-paginate';
import Checkbox from './Checkbox';
import DataTable from 'react-data-table-component';
import { EmployeemanagerAction } from '../../redux/action/EmployeemanagerAction';



const Datadrive = () => {

  const { CSVDownloader, Type } = useCSVDownloader();

  const resulImportLeads = useSelector(state => state.ImportLeadreducers.singleimport);
  const resulImportEmployee = useSelector(state => state.ImportEmployeereducers.importempdata);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const listDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultemployeemanager = useSelector(state => state.Employeemanagerreducers.employeemanagerdata);
  const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);

  const dispatch = useDispatch();

  const importLeadsImport = resultRolePermssion.filter(edx => edx.feature_id == 86 && edx.sub_features == 'Import');

  const [ImpAct,setImpAct] = useState('agent');
  const [AgentIdAct,setAgentIdAct] = useState('');
  const [search,setSearch]= useState('');

  const EmpData = JSON.parse(localStorage.getItem('empTeam'));
  const EmpData2 = JSON.parse(localStorage.getItem('empTeam'));
  
  $(document).on('click','.ImpList',function(){
    var TodosL = $(this).attr("datatext");
    setImpAct(TodosL);
  });

  $(document).on('click','.getEmpId',function(){
    var agentId = $(this).attr("attrId");
    setAgentIdAct(agentId);
  });

  const navigate = useNavigate();

  const [ProjectNature,setProjectNature]=useState('');
  const [uploadFile, setUploadFile] = useState();
  const [checked, setChecked] = useState([]);
  const [ImportLeadList, setImportLeadList] = useState(resulImportLeads);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);


  const [ProjectFilter,setProjectFilter]=useState('');
  const [NatureFilter,setNatureFilter]=useState('');
  const [StatusFilter,setStatusFilter]=useState('');
  const [ShowEntries,setShowEntries]=useState('');
  const [currentPage,setcurrentPage]=useState('');
  const [LeadSource,setLeadSource]=useState('');
  const [LeadFormCreator,setLeadFormCreator]=useState('');
  const [Supervisor,setSupervisor]=useState('');
  const [CampaignKv,setCampaignKv]=useState('');
  const [AdSpend,setAdSpend]=useState('');
  const [CPL,setCPL]=useState('');
  const [CampaignName,setCampaignName]=useState('');
  const [ProjectName,setProjectName]=useState('');


  const [ItemSelectableRows,setItemSelectableRows]=useState([]);

  
    useEffect(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      const EmpData = JSON.parse(localStorage.getItem('empTeam'));
      if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
        dispatch(ImportEmployeeAction(1,12,search,''));
        dispatch(ImportLeadAction('inactive',1,ShowEntries,ProjectFilter,''));
        dispatch(EmployeemanagerAction(1,12));
      }else{
        dispatch(ImportEmployeeAction(1,12,search,EmpData.teamObj));
        dispatch(ImportLeadAction('inactive',1,ShowEntries,ProjectFilter,AuthData.id));
        dispatch(EmployeemanagerAction(1,12));
      }
       
       
        // const interval = setInterval(() => {
          
        // }, 3000);
        // return () => clearInterval(interval);
      
  },[ShowEntries == '' || ShowEntries == null ? '' : ShowEntries]);

  const changeHandler = (event) => {
    setUploadFile(event.target.files[0]);
	};

  const handleInputChange = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  }

  const AddImportLeadData = (e) =>{
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('uploadFile', uploadFile);
    formData.append('nature', ProjectNature);
    formData.append('leadSourceId', LeadSource);
    formData.append('leadProid', ProjectName);
    formData.append('creatorId', LeadFormCreator);
    formData.append('supervisorId', Supervisor);
    formData.append('adSpend', AdSpend);
    formData.append('cpl', CPL);
    formData.append('campaignName', CampaignName);

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    
    fetch(`${actionConfig.REACT_APP_URL}importleads`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          if(result.code == '200'){
            Swal.fire(
              'Good job!',
              result.message,
              'success'
            );
            navigate("/import-leads");
            dispatch(ImportLeadAction('inactive'));
             
          }else{
            Swal.fire(
              'Error!',
              result.message,
              'error'
            );
          }

        }).catch((error) => {
          console.error('Error:', error);
        });


        e.target.reset();
  
  }

  const LeadsAssignData = (agentId) => {

    if(window.confirm('Do You want to Move Leads')){
      const getData = agentId;
      const formData = new FormData();
  
      formData.append('agentid', getData);
      formData.append('leadid', JSON.stringify(ItemSelectableRows));
  
      const requestOptions = {
          method: 'POST',
          body: formData
      };
      
      fetch(`${actionConfig.REACT_APP_URL}employeeleaddistribution`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("result",result);
          if(result.code == '200'){
            Swal.fire(
              'Good job!',
              result.message,
              'success'
            );
            navigate("/import-leads");
            setChecked('');
            const AuthData = JSON.parse(localStorage.getItem('authdata'));
            dispatch(ImportLeadAction('inactive',1,ShowEntries,ProjectFilter,AuthData.id));
            window.location.reload();
          }else{
            Swal.fire(
              'Error!',
              result.message,
              'error'
            );
          }
  
        }).catch((error) => {
          console.error('Error:', error);
        });
    }

  }
  
  const LeadsShift = (agentId) =>{
    // event.preventDefault();
    //  const getData = event.target.parentNode.getAttribute("attrId");

    if(window.confirm('Do You want to Move Leads')){

      const getData = agentId;
    const formData = new FormData();

    formData.append('agentid', getData);
    formData.append('leadid', JSON.stringify(ItemSelectableRows));

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    
    fetch(`${actionConfig.REACT_APP_URL}assignconsultantleads`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("result",result);
        if(result.code == '200'){
          Swal.fire(
            'Good job!',
            result.message,
            'success'
          );
          navigate("/import-leads");
          setChecked('');
          dispatch(ImportLeadAction('inactive'));
          window.location.reload();
           
        }else{
          Swal.fire(
            'Error!',
            result.message,
            'error'
          );
        }

      }).catch((error) => {
        console.error('Error:', error);
      });

    }else{

    }

     

  }

  const dataSample = [ "name","email","phone","project","designation","gender"];

const handlePageClick = (data) => {
  let currentPage = data.selected + 1;
  dispatch(ImportLeadAction('inactive',currentPage,20));
  setcurrentPage(currentPage);
  // setImportLeadList(resulImportLeads.data);
}

const handlePageClickEmp = (data) => {
  let currentPage = data.selected + 1;

      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      const EmpData = JSON.parse(localStorage.getItem('empTeam'));
      if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
        dispatch(ImportEmployeeAction(currentPage,12,search,''));
      }else{
        dispatch(ImportEmployeeAction(currentPage,12,search,EmpData.teamObj));
      }
  // dispatch(ImportEmployeeAction(currentPage,12,search));
  // setImportLeadList(resulImportLeads.data);
}

const handleSelectAll = e => {
  setIsCheckAll(!isCheckAll);
  setIsCheck(resulImportLeads.data.map(li => li.id));
  if (isCheckAll) {
    setIsCheck([]);
  }
};

const handleClick = e => {
  const { id, checked } = e.target;
  setIsCheck([...isCheck, id]);
  if (!checked) {
    setIsCheck(isCheck.filter(item => item !== id));
  }
};

const FilterSearch = () => {

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const EmpData = JSON.parse(localStorage.getItem('empTeam'));
  if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
    dispatch(ImportLeadAction('inactive',currentPage,ShowEntries,ProjectFilter,''));
  }else{
    dispatch(ImportLeadAction('inactive',currentPage,ShowEntries,ProjectFilter,AuthData.id));
  }
  // dispatch(ImportLeadAction('inactive',currentPage,ShowEntries,ProjectFilter));
}


const myHandleChange = (e) => {

  const {name,checked}=e.target;
  if(name ==="allselect"){
    if(ImportLeadList == '' || ImportLeadList == null){

    }else{
      const checkedvalue = ImportLeadList.data.map((importlead)=>{ return {...importlead,isChecked:checked} });
      console.log("checkedvalue",checkedvalue);
      setImportLeadList(checkedvalue);
    }
   
    
  }

}


const columns = [
  {
      name: 'Name',
      selector: row => 'name',
  },
  {
      name: 'Phone',
      selector: row => 'Phone',
  },
  {
    name: 'Project Name',
    selector: row => row.clientProject,
  },
  {
    name: 'Email',
    selector: row =>'@',
  },
  {
    name: 'City',
    selector: row => 'Karachi',
  },
  {
    name: 'Nature',
    selector: row => 'Nature',
  },
  {
    name: 'Project',
    selector: row => 'Bahria Town',
  },
  {
    name: 'Country',
    selector: row => 'Country',
  },
  {
    name: 'Gender',
    selector: row => 'Gender',
  },
];

const columnsEMp = [
  {
      name: 'Agent',
      selector: row => <img className="img-fluid rounded" src={row.profile_pic == null ? `https://via.placeholder.com/150x150` : `${actionConfig.REACT_APP_MAIN}${row.profile_pic}`} alt="icon" style={{width:'48%'}}/>,
  },
  {
      name: 'Employee Name',
      selector: row => row.emp_name,
  },
  {
    name: 'Assign Leads',
    selector: row => row.AssignLeadsTotal,
  },
  {
    name: 'Today Leads',
    selector: row => row.AssignLeadsToday,
  },
  {
    name: 'Total Leads',
    selector: row => row.AssignLeadsAll,
  },
];

const paginationComponentOptions = {
    rowsPerPageText: 'Per Page Record',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};


const handlePageChange = page => {
    console.log("page",page);
  // let currentPage = data.selected + 1;
  dispatch(ImportLeadAction('inactive',page,12,ProjectFilter));
  // setcurrentPage(currentPage);
};

const handlePageEmpChange = page => {
  console.log("page",page);
// let currentPage = data.selected + 1;
dispatch(ImportEmployeeAction(page,12,search));
// setcurrentPage(currentPage);
};

const handlePerRowsChange = async (newPerPage, page) => {
  console.log("newPerPage",newPerPage);
  dispatch(ImportLeadAction('inactive',page,newPerPage,ProjectFilter));
};

const handlePerRowsEmpChange = async (newPerPage, page) => {
  console.log("newPerPage",newPerPage);
  // dispatch(ImportLeadAction('inactive',page,newPerPage));
  dispatch(ImportEmployeeAction(page,newPerPage,search,ProjectFilter));
};

const handleChangeSelectableRow = ({selectedRows}) => {
  console.log("selectableRow",selectedRows);
  setItemSelectableRows(selectedRows);
}

const onRowClicked = (row, event) => {
  console.log(row.id);
}

  return (
    
    <>
      <Navigation/>
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
    <div>
        <h2 className="hk-pg-title font-weight-600">Data Drive</h2>
    </div>
    </div>

    <div className="row">
<div className="col-xl-12">
<div className="hk-row">
<div className="col-sm-12">
<div className="card-group hk-dash-type-2">

{
    EmpData == '' || EmpData == null || EmpData == undefined ? (
      <>
      <div className="card card-sm">
<div className="card-body">
 
      <form onSubmit={AddImportLeadData}>
<div className="d-flex justify-content-between mb-5">
<div>
<span className="d-block font-15 text-dark font-weight-500">File Import</span>
</div>
<div>
<CSVDownloader
  filename={`sampleimportleadss`}
  className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm text-white mr-1"
  data={() => {
      return [
        dataSample
      ]}
  }
>
Generate Sample Csv
    </CSVDownloader>
  {
    importLeadsImport.length == 0 ? (
      <></>
    ):(
    <button type='submit' className="btn btn-danger btn-wth-icon btn-rounded icon-right btn-sm"><span className="btn-text">Upload</span> <span className="icon-label"><i className="fa fa-upload"></i> </span></button>
    )
  }

</div>

</div>
<div className="row">
  <div className="col-md-6">
  <div className="form-group">
<span className="input-group-text">Excel/CSV <input type="file" onChange={changeHandler} style={{marginLeft:10}} required/></span>
</div>
  </div>
  <div className="col-md-6">
    <div className="form-group">
      <input type="text" className="form-control" required placeholder="Nature Sheet" onChange={e=>setProjectNature(e.target.value)} value={ProjectNature}/>
    </div>
  </div>
</div>


<div>




</div>
</form>
 
  
</div>
</div>

      </>
    ):(
      <>
      
      </>
    )
  }







</div>
</div>
</div>
<div className="hk-row">
<div className="col-lg-12">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>

<div className="card-body pa-0">

<DataTable
    title="Data Drive"
    columns={columns}
    data={resulImportLeads.data}
    selectableRows
    onSelectedRowsChange={handleChangeSelectableRow}
    pagination
    paginationServer
    paginationTotalRows={Math.round(resulImportLeads.TotalCount / 12)}
    onChangeRowsPerPage={handlePerRowsChange}
    onChangePage={handlePageChange}
    paginationComponentOptions={paginationComponentOptions}
/>
</div>
</div>
</div>

</div>
</div>
</div>


    </div>
    </>
  )
}

export default Datadrive