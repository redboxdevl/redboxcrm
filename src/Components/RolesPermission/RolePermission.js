import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import OtherNavigation from '../../Includes/OtherNavigation'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2';
import { RoleCategoryAction } from '../../redux/action/RoleCategoryAction';
import { RolePermissionModuleAction } from '../../redux/action/RolePermissionModuleAction';
import { SingleRolePermissiondataAction } from '../../redux/action/SingleRolePermissiondataAction';
import Select from 'react-select'
import { actionConfig } from '../../configuration';
import { getDashboardListACtion } from '../../redux/action/getDashboardListACtion';
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';
import { loadingToggleAction } from '../../redux/action/DashboardCountAction';

const RoleOpt = [
{ value: 'Development', label: 'Development' },
{ value: 'Sales Manager', label: 'Sales Manager' },
]

const Permission = [
{ value:'List',label:'List',selected:true },
{ value:'View',label:'View',selected:true },
{ value:'Create',label:'Create',selected:true},
{ value:'Import',label:'Import',selected:true },
{ value:'Export',label:'Export',selected:true },
{ value:'Report',label:'Report',selected:true },
]

const RolePermission = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRoleListing = useSelector(state => state.RoleCategoryreducers.rolecategorydata);
const resultRolePermissionListing = useSelector(state => state.RolePermissionModulereducers.rolepermissionmoduledata);
const resultRolePermissionData = useSelector(state => state.SingleRolePermissionDatareducers.singlerolepermissiondata);
const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

console.log("resultlistdashboard",resultlistdashboard);

const [EmployeeResult,setEmployeeResult]= useState([]);

const ListEmployee = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}employee`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setEmployeeResult(await GetArray);
}

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

console.log("resultRoleListing",resultRoleListing);


const [ROleCatresult,setROleCatresult]= useState([]);
const [PermissionRes,setPermissionRes]= useState(Permission);
const [Featureinfo, setFeatureinfo] = useState({
FeaturesData: [],
response: [],
});


const [EmpId,setEmpId] = useState('');
const [RoleId,setRoleId] = useState('');
const [FeatureId,setFeatureId] = useState('');
const [FeaturePermission,setFeaturePermission] = useState('');


useEffect(() => {
ListEmployee();
EmployeeHandleC(EmpId);

dispatch(RolePermissionModuleAction());
const interval = setInterval(() => {
const AuthData = JSON.parse(localStorage.getItem('authdata'));
dispatch(RoleCategoryAction(AuthData.id));
}, 3000);
return () => clearInterval(interval);

},[EmpId]);


const EmployeeHandleC = async (EmpId) => {
   
    dispatch(SingleRolePermissiondataAction(EmpId));

    // if(resultRolePermissionData == null){
    //     setRoleId('');
    // }else{
    //     setRoleId(resultRolePermissionData[0].role_id);
    // }
    
    
}

console.log("resultRolePermissionData",resultRolePermissionData);

const PermissionhandleChange = (e) => {
    const { value, checked } = e.target;
    const FeatureId = e.target.dataset.val;
    // console.log(`${value} is ${checked}`);
    
    if(checked){
        setFeaturePermission([...FeaturePermission,{value:value,FeatureId:FeatureId}]);
    }else{
        setFeaturePermission(FeaturePermission.filter((e) => e.value !== value || e.FeatureId !== FeatureId))
    }

}


const FeaturehandleChange = (e) => {
const { value, checked } = e.target;
// console.log(`${value} is ${checked} permission`);
const audioCheckbox = document.getElementsByClassName(`featureId${value}`);
let myarray = [];
if(checked == true){

    setFeatureId([...FeatureId,value]);
    setFeaturePermission([...FeaturePermission,{myarray,FeatureId:value}]);
    for (var ix = 0; ix < audioCheckbox.length; ix++) {
        audioCheckbox[ix].removeAttribute('disabled');
        audioCheckbox[ix].setAttribute('checked','checked');
        myarray.push(audioCheckbox[ix].value);
    }

}else{

    setFeatureId(FeatureId.filter((e) => e !== value))
    for (var i = 0; i < audioCheckbox.length; i++) {
            audioCheckbox[i].setAttribute('disabled','disabled');
            audioCheckbox[i].removeAttribute('checked','checked');

            setFeaturePermission(FeaturePermission.filter((er) => er.FeatureId !== value))
    }
        
    }

}

const AddRolePermission = (e) => {
    e.preventDefault();

    const FeildData = { emp_id:EmpId,role_id:RoleId,feature_id:FeatureId,permission_type:FeaturePermission,status:1 }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}employeerole`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                console.log(dataex);
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                navigate("/employee");
                    
                }else{
                    Swal.fire(
                        'Error!',
                        dataex.message,
                        'error'
                    );
                }


            });


}

console.log("resultDashboard",resultDashboard);
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Role Permission</h2>

</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-xl-12">
<section className="hk-sec-wrapper">
<div className="row">
<div className="col-sm">
<form onSubmit={AddRolePermission}>
<div className="row">
<div className="col-md-4">
<div className="form-group">
<label htmlFor="" className="labeldata">Employee <span className="text-danger">*</span></label>
<select name="empName" className="form-control" required onChange={e=>setEmpId(e.target.value)} value={EmpId}>
<option value="">Select Employee</option>
{
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAllS.map((items,key) => {
        return (
       <><option value={items.id} key={key+1}>{items.emp_name}</option></>
        )
    
    })
    )
  }
</select>
</div>
</div>
<div className="col-md-4">
<div className="form-group">
<label htmlFor='' className="labeldata">Role <span className="text-danger">*</span></label>
<select name="Rolename" id="" className="form-control" required onChange={e=>setRoleId(e.target.value)} value={RoleId}>
<option value="">Select Role</option>
{
    resultRoleListing.length == 0 || resultRoleListing == '' || resultRoleListing == null ? (
        <></>
    ):(
        resultRoleListing.data.map((roleItem)=>{
            return (
            <><option value={roleItem.id}>{roleItem.role_category_name}</option></>
            )
            })
    )

}
</select>
</div>
</div>

</div>

<div className="col-md-12 mt-10">
{
resultRolePermissionListing.length == 0 || resultRolePermissionListing == '' || resultRolePermissionListing == null ? (
    <></>
):(

resultRolePermissionListing.data.map((item,index)=>{

return (
<>
<h3>{item.module_name}</h3>
<div className="table-responsive">
<table className="table table-bordered">
<thead>
<tr className="table-dark">


<th className="w-30">Features</th>
<th className="">Permissions</th>
</tr>
</thead>
<tbody>

{
item.feature_name.map((edata,inDex)=>{

    let newarr = edata.PermissionsData.map((itx,inx) => {
        return itx.value
    });  
return (
<>
<tr>
<td>
<div className="col-md-4 mt-15">
<div className="custom-control">
<input type="checkbox" className="form-check-input" value={edata.id} data-opt={newarr} onChange={FeaturehandleChange}/>
<label className="form-check-label" htmlFor="customCheck">{edata.feature_name}</label>
</div>
</div>
</td>
<td>
<div className="row">

{
edata.PermissionsData.map((ex,inX) => {
return (
<>
<div className="col-md-4 mt-15">
<div className="custom-control">

<input type="checkbox" className={`mr-2 form-control-input featureId${edata.id}`} data-val={edata.id} value={ex.value} onChange={PermissionhandleChange} disabled/>

<label className="form-check-label" htmlFor="customCheck1">{ex.label}  {ex.featureId}</label>
</div>
</div>
</>
)
})
}

</div>
</td>
</tr>
</>
)
})
}



</tbody>
</table>
</div>
</>
)

})

    
)

}


</div>







<hr />
<button className="btn btn-primary" type="submit">Submit</button>
</form>
</div>
</div>
</section>
</div>
</div>

</div>

</>
)
}

export default RolePermission