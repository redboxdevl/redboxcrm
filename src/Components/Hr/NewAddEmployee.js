import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { HrEmployeesAction } from '../../redux/action/HrEmployeesAction';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';

const NewAddEmployee = () => {

    const navigate = useNavigate();
  
    const dispatch = useDispatch();
    
    const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);

function randomNumberInRange(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

let { id } = useParams();

const [EmployeeId,setEmployeeId]=useState(id);
const [SingleEmpresult,setSingleEmpresult]= useState([]);


const [PageInput,setPageInput]=useState(1);

useEffect(() => {
      dispatch(getDashCountData('all',''));
},[]);

const [formDatas, setFormData] = useState({
agent_title: '',
fullName: '',
fatherName: '',
EmailAddress: '',
Cnic: '0',
Gender: '',
DOB: '',
DOJ: '',
CompanyId: '',
DesignationId: '',
BranchId: '',
DepartmentId: '',
ReportTo: '',
EmployeeTypeId: '',
dateOfConfirmation:'',
ProbationPeriod:'',
dateOfProbation:'',
pMobileNo:'0',
oMobileNo:'0',
pEmail:'-',
oEmail:'-',
currentAddress:'-',
PermanentAddress:'-',
CurrentAddressType:'-',
PermanantAddressType:'-',
emergencyContactNo:'0',
emergencyPhoneNo:'0',
Relation:'-',
refContactName:'-',
refPhoneNo:'-',
DeviceId:'0',
HoldayId:'0',
EmpShift:'0',
salaryAmount:'0',
Currency:'-',
SalaryMode:'-',
bankName:'-',
bankAccount:'-',
maritalStatus:'-',
bloodGroup:'-',
FamilyBackground:'-',
healthDetails:'-',
Password:'',
Fuel:'0',
Mobilecharge:'0',
EducationQualify:[],
WorkExperience:[],
Hod:'no',
});


const SingleEmployeeRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}employee/${id}`);
const dataxs = await response.json();
setSingleEmpresult(await dataxs.data);

console.log("dataxs",dataxs);
setEmployeeId(dataxs.data[0].id);
setFormData({
    agent_title: dataxs.data[0].emp_title,
    fullName: dataxs.data[0].emp_name,
    fatherName: dataxs.data[0].fatherName,
    EmailAddress: dataxs.data[0].email,
    Cnic: dataxs.data[0].cnic,
    Gender: dataxs.data[0].gender,
    DOB: dataxs.data[0].dob,
    DOJ: dataxs.data[0].joining_date,
    CompanyId: dataxs.data[0].company_id,
    DesignationId: dataxs.data[0].designation_id,
    BranchId: dataxs.data[0].branch_id,
    DepartmentId: dataxs.data[0].department_id,
    ReportTo: dataxs.data[0].ReportTo,
    EmployeeTypeId: dataxs.data[0].employment_type,
    dateOfConfirmation:dataxs.data[0].date_of_confirmation,
    ProbationPeriod:dataxs.data[0].probation_period,
    dateOfProbation:dataxs.data[0].date_of_probation_period,
    pMobileNo:dataxs.data[0].phone_number,
    oMobileNo:dataxs.data[0].mobile_number,
    pEmail:dataxs.data[0].personal_email,
    oEmail:dataxs.data[0].email,
    currentAddress:dataxs.data[0].current_address,
    PermanentAddress:dataxs.data[0].permanent_address,
    CurrentAddressType:dataxs.data[0].current_address_type,
    PermanantAddressType:dataxs.data[0].permanent_address_type,
    emergencyContactNo:dataxs.data[0].emergency_contact_no,
    emergencyPhoneNo:dataxs.data[0].emergency_phone_no,
    Relation:dataxs.data[0].relationship,
    refContactName:dataxs.data[0].ref_contact_name,
    refPhoneNo:dataxs.data[0].ref_phone_no,
    DeviceId:dataxs.data[0].device_id,
    HoldayId:dataxs.data[0].holidy_id,
    EmpShift:dataxs.data[0].default_shift,
    salaryAmount:dataxs.data[0].salary_amount,
    Currency:dataxs.data[0].currency,
    SalaryMode:dataxs.data[0].salary_mode,
    bankName:dataxs.data[0].bank_name,
    bankAccount:dataxs.data[0].bank_account,
    maritalStatus:dataxs.data[0].marital_status,
    bloodGroup:dataxs.data[0].blood_group,
    FamilyBackground:dataxs.data[0].family_background,
    healthDetails:dataxs.data[0].family_background,
    Password:dataxs.data[0].password,
    Fuel:dataxs.data[0].fuel,
    Mobilecharge:dataxs.data[0].mobilecharge,
    EmployeePic:dataxs.data[0].profile_pic,
    UtilityBills:dataxs.data[0].utilityBill,
    CnicFront:dataxs.data[0].CnicFront,
    CnicBack:dataxs.data[0].CnicBack,
    ResumeUpload:dataxs.data[0].resumeUpload,
    WorkExperience:JSON.parse(dataxs.data[0].dataWork),
    EducationQualify:JSON.parse(dataxs.data[0].dataeduc),
    Hod:dataxs.data[0].Hod,
    
})

}
// console.log(id);

useEffect(() => {
    if(id == undefined){
    }else{
        SingleEmployeeRecords(id);
    }
    
  },[id == undefined ? '' : id]);


const [page,setPage]=useState(1);

useEffect(() => {
    const nextPage = PageInput;
    setPage(nextPage);
  },[PageInput]);

const AddEmployeeFormData = (e) =>{
e.preventDefault();
const AuthData = JSON.parse(localStorage.getItem('authdata'));
let randomNo = randomNumberInRange(1,10000);

const formData = new FormData();

formData.append('emp_code', randomNo);
formData.append('agent_title', formDatas.agent_title);
formData.append('emp_name', formDatas.fullName);
formData.append('fatherName', formDatas.fatherName);
formData.append('email', formDatas.EmailAddress);
formData.append('cnic', formDatas.Cnic);
formData.append('gender', formDatas.Gender);
formData.append('dob', formDatas.DOB);
formData.append('joining_date', formDatas.DOJ);
formData.append('company_id', formDatas.CompanyId);
formData.append('designation_id', formDatas.DesignationId);
formData.append('branch_id', formDatas.BranchId);
formData.append('department_id', formDatas.DepartmentId);
formData.append('ReportTo', formDatas.ReportTo);
formData.append('employment_type', formDatas.EmployeeTypeId);
formData.append('date_of_confirmation', formDatas.dateOfConfirmation);
formData.append('probation_period', formDatas.ProbationPeriod);
formData.append('date_of_probation_period', formDatas.dateOfProbation);
formData.append('mobile_number', formDatas.pMobileNo);
formData.append('phone_number', formDatas.oMobileNo);
formData.append('personal_email', formDatas.pEmail);
formData.append('current_address', formDatas.currentAddress);
formData.append('permanent_address', formDatas.PermanentAddress);
formData.append('current_address_type', formDatas.CurrentAddressType);
formData.append('permanent_address_type', formDatas.PermanantAddressType);
formData.append('emergency_contact_no', formDatas.emergencyContactNo);
formData.append('emergency_phone_no', formDatas.emergencyPhoneNo);
formData.append('relationship', formDatas.Relation);
formData.append('ref_contact_name', formDatas.refContactName);
formData.append('ref_phone_no', formDatas.refPhoneNo);
formData.append('device_id', formDatas.DeviceId);
formData.append('holidy_id', formDatas.HoldayId);
formData.append('default_shift', formDatas.EmpShift);
formData.append('salary_amount', formDatas.salaryAmount);
formData.append('currency', formDatas.Currency);
formData.append('salary_mode', formDatas.SalaryMode);
formData.append('bank_name', formDatas.bankName);
formData.append('bank_account', formDatas.bankAccount);
formData.append('marital_status', formDatas.maritalStatus);
formData.append('blood_group', formDatas.bloodGroup);
formData.append('family_background', formDatas.FamilyBackground);
formData.append('health_details', formDatas.healthDetails);
formData.append('education_qualify', JSON.stringify(formDatas.EducationQualify));
formData.append('work_experience', JSON.stringify(formDatas.WorkExperience));
formData.append('password', formDatas.Password);
formData.append('fuel', formDatas.Fuel);
formData.append('mobilecharge', formDatas.Mobilecharge);
formData.append('profile_pic', formDatas.EmployeePic);
formData.append('utilityBill', formDatas.UtilityBills);
formData.append('CnicFront', formDatas.CnicFront);
formData.append('CnicBack', formDatas.CnicBack);
formData.append('resumeUpload', formDatas.ResumeUpload);
formData.append('Hod', formDatas.Hod);
formData.append('Token', '0');
formData.append('status', 'active');



const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}employee`, requestOptions)
.then(response => response.json())
.then(dataex => {
    // console.log("dataex",dataex);
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

const UpdateEmployeeFormData = (e) =>{
    e.preventDefault();

const formData = new FormData();
// console.log("formDatas",formDatas);

formData.append('agent_title', formDatas.agent_title);
formData.append('emp_name', formDatas.fullName);
formData.append('fatherName', formDatas.fatherName);
formData.append('email', formDatas.EmailAddress);
formData.append('cnic', formDatas.Cnic);
formData.append('gender', formDatas.Gender);
formData.append('dob', formDatas.DOB);
formData.append('joining_date', formDatas.DOJ);
formData.append('company_id', formDatas.CompanyId);
formData.append('designation_id', formDatas.DesignationId);
formData.append('branch_id', formDatas.BranchId);
formData.append('department_id', formDatas.DepartmentId);
formData.append('ReportTo', formDatas.ReportTo == null ? 0 : formDatas.ReportTo);
formData.append('employment_type', formDatas.EmployeeTypeId);
formData.append('date_of_confirmation', formDatas.dateOfConfirmation  == '' || formDatas.dateOfConfirmation == null ? '1990-01-01' : formDatas.dateOfConfirmation);
formData.append('probation_period', formDatas.ProbationPeriod);
formData.append('date_of_probation_period', formDatas.dateOfProbation == '' || formDatas.dateOfProbation == null ? '1990-01-01' : formDatas.dateOfProbation);
formData.append('mobile_number', formDatas.pMobileNo);
formData.append('phone_number', formDatas.oMobileNo);
formData.append('personal_email', formDatas.pEmail);
formData.append('current_address', formDatas.currentAddress);
formData.append('permanent_address', formDatas.PermanentAddress);
formData.append('current_address_type', formDatas.CurrentAddressType);
formData.append('permanent_address_type', formDatas.PermanantAddressType);
formData.append('emergency_contact_no', formDatas.emergencyContactNo);
formData.append('emergency_phone_no', formDatas.emergencyPhoneNo);
formData.append('relationship', formDatas.Relation);
formData.append('ref_contact_name', formDatas.refContactName);
formData.append('ref_phone_no', formDatas.refPhoneNo);
formData.append('device_id', formDatas.DeviceId);
formData.append('holidy_id', formDatas.HoldayId);
formData.append('default_shift', formDatas.EmpShift);
formData.append('salary_amount', formDatas.salaryAmount);
formData.append('currency', formDatas.Currency);
formData.append('salary_mode', formDatas.SalaryMode);
formData.append('bank_name', formDatas.bankName);
formData.append('bank_account', formDatas.bankAccount);
formData.append('marital_status', formDatas.maritalStatus);
formData.append('blood_group', formDatas.bloodGroup);
formData.append('family_background', formDatas.FamilyBackground);
formData.append('health_details', formDatas.healthDetails);
formData.append('education_qualify', JSON.stringify(formDatas.EducationQualify));
formData.append('work_experience', JSON.stringify(formDatas.WorkExperience));
formData.append('password', formDatas.Password);
formData.append('fuel', formDatas.Fuel);
formData.append('mobilecharge', formDatas.Mobilecharge);
formData.append('Token', '0');
formData.append('profile_pic', formDatas.EmployeePic);
formData.append('utilityBill', formDatas.UtilityBills);
formData.append('CnicFront', formDatas.CnicFront);
formData.append('CnicBack', formDatas.CnicBack);
formData.append('resumeUpload', formDatas.ResumeUpload);
formData.append('Hod', formDatas.Hod);
formData.append('status', 'active');
formData.append('_method', 'PATCH');

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}employee/${EmployeeId}`, requestOptions)
.then(response => response.json())
.then(dataexe => {
if(dataexe.code == '200'){
    Swal.fire(
    'Good job!',
    dataexe.message,
    'success'
    );
    navigate("/employee");
}else{
    Swal.fire(
    'Error!',
    dataexe.message,
    'error'
    );
}


});
    
}

return (
<>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-4 mb-3 d-flex justify-content-between flex-row">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Employees</h2>

</div>
<div>
<NavLink to="/employee" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
{/* <NavLink to="/role-category" className="btn btn-warning btn-rounded btn-sm">Role Category</NavLink> */}
{/* <NavLink to="/crm-modules" className="btn btn-danger btn-rounded btn-sm">Crm Module</NavLink> */}
</div>


</div>

<h4 className='pb-4'>page {page} / 7</h4>

<ul className='d-flex MyMenu' style={{gap:10}}>
    <li><a href="#" className={`${page == 1 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 1;
        setPage(nextPage);
    }}>Step 1</a></li>
     <li><a href="#" className={`${page == 2 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 2;
        setPage(nextPage);
    }}>Address & Contact</a></li>
    <li><a href="#" className={`${page == 3 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 3;
        setPage(nextPage);
    }}>Personal</a></li>
     <li><a href="#" className={`${page == 4 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 4;
        setPage(nextPage);
    }}>Profile</a></li>
    <li><a href="#" className={`${page == 5 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 5;
        setPage(nextPage);
    }}>Joining</a></li>
   
    <li><a href="#" className={`${page == 6 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 6;
        setPage(nextPage);
    }}>Attendance & Leave</a></li>
    <li><a href="#" className={`${page == 7 ? 'active' : ''}`} onClick={()=>{
        const nextPage = 7;
        setPage(nextPage);
    }}>Salary</a></li>
    
   
</ul>
{/* 
<input type="text" className='form-control' onChange={e=>setPageInput(e.target.value)} value={PageInput}/> */}

<OtherNavigation/>


<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<form onSubmit={id == '' || id == null ? AddEmployeeFormData : UpdateEmployeeFormData} method='post' encType='multipart/form-data'>
{
page === 1 ? <Step1 formData={formDatas} setFormData={setFormData} resultDashboard={resultDashboard} /> : page === 2 ? <Step3 formData={formDatas} setFormData={setFormData}/> : page === 3 ? <Step6 formData={formDatas} setFormData={setFormData}/> : page === 4 ? <Step7 formData={formDatas} setFormData={setFormData} /> : page === 5 ?  <Step2 formData={formDatas} setFormData={setFormData} /> : page === 6 ? <Step4 formData={formDatas} setFormData={setFormData} /> : page === 7 ? <Step5 formData={formDatas} setFormData={setFormData} />  : <Step7 formData={formDatas} setFormData={setFormData} />
}
<center>
{
page > 1 && (
    <>
    <button type="button" className="btn btn-danger btn-circle" onClick={()=>{
        const nextPage = page - 1;
        setPage(nextPage);
    }}>Back</button>
    </>
)
}

{
page == 7 && (
    <button type="submit" className="btn btn-secondary">{id == null || id == '' ? 'Save' : 'Update'}</button>
)
}

{
page < 7 && (
    <button type="button" className="btn btn-primary mx-3" onClick={()=>{
        const nextPage = page + 1;
        setPage(nextPage);
    }}>Next</button>
)
}


</center>
</form>
</section>
</div>
</div>
</div>
</>
)
}

export default NewAddEmployee