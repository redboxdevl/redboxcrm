import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';


const AddNewEmployee = () => {

  const navigate = useNavigate();

  let { id } = useParams();
  
  const [result,setResult]= useState([]);
  const [CompanyResult,setCompanyResult]= useState([]);
  const [SingleEmpresult,setSingleEmpresult]= useState([]);
  const [DepartResult,setDepartResult]= useState([]);
  const [DesignResult,setDesignResult]= useState([]);
  const [countryresult,setCountryresult]= useState([]);
  const [Cityresult,setCityresult]= useState([]);

  
  
  const [DepartmentName,setDepartmentName]= useState('');
  const [BranchItem,setBranchItem]=useState('');


  
  // const [DepartmentId,setDepartment]=useState(id);
  const [EmployeeId,setEmployeeId]=useState(id);


  const [EmpName,setEmpName]=useState('');
  const [EmpDob,setEmpDob]=useState('');
  const [EmpMaritalStatus,setMaritalStatus]=useState('');
  const [EmpGender,setEmpGender]=useState('');
  const [EmpJoiningDate,setEmpJoiningDate]=useState('');
  const [Companyid,setCompanyid]=useState('');
  const [EmpMobileNo,setEmpMobileNo]=useState('');
  const [EmpOfficial,setEmpOfficial]=useState('');
  const [BranchId,setBranchId]=useState('');
  const [DepartmentId,setDepartmentId]=useState('');
  const [DesignationId,setDesignationId]=useState('');
  const [EmpEmail,setEmpEmail]=useState('');
  const [EmpPass,setEmpPass]=useState('');
  const [EmployeePic,setEmployeePic]=useState('');
  const [EmpCode,setEmpCode]=useState('');
  const [DeviceId,setDeviceId]=useState('');
  const [countryItem,setCountryItem]=useState('');
  const [CityItem,setCityItem]=useState('');

  const GetCountry = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}assigncountry`);
    const dataxs = await response.json();
    setCountryresult(await dataxs.data);
    
 }

 const GetCity = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}assigncity?countryid=${countryItem}`);
    const dataxs = await response.json();
    setCityresult(await dataxs.data);
 }

   useEffect(() => {
    SingleEmployeeRecords();
      ListBranch();
      ListCompanies();
      ListDepartment();
      ListDesignation();
      GetCountry();
      GetCity();
  },[countryItem,CityItem]);

  const changeHandler = (event) => {
		setEmployeePic(event.target.files[0]);
	};
  
  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompanyResult(await GetArray);
  }

  
  const ListBranch = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}branch?agentId=1`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setResult(await GetArray);
  }

  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartResult(await GetArray);
}

const ListDesignation = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}designation?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setDesignResult(await GetArray);
}

function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(EmployeePic.name);
  
  const SingleEmployeeRecords = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}employee/${id}`);
  const dataxs = await response.json();
  setSingleEmpresult(await dataxs.data);
  
  console.log(dataxs);

  setEmpName(dataxs.data[0].emp_name);
  setEmpDob(dataxs.data[0].dob);
  setMaritalStatus(dataxs.data[0].marital_status);
  setEmpGender(dataxs.data[0].gender);
  setEmpJoiningDate(dataxs.data[0].joining_date);
  setCompanyid(dataxs.data[0].company_id);
  setEmpMobileNo(dataxs.data[0].phone_number);
  setEmpOfficial(dataxs.data[0].mobile_number);
  setBranchId(dataxs.data[0].branch_id);
  setDepartmentId(dataxs.data[0].department_id);
  setDesignationId(dataxs.data[0].designation_id);
  setEmpEmail(dataxs.data[0].email);
  setEmpPass(dataxs.data[0].password);
  setEmpCode(dataxs.data[0].emp_code);
  setDeviceId(dataxs.data[0].device_id);

  console.log(dataxs.data[0].profile_pic);

  if(dataxs.data[0].profile_pic == null){
    
  }else{
    setEmployeePic(dataxs.data[0].profile_pic);
  }

  setEmployeeId(dataxs.data[0].id)
  
  // setDepartmentName(dataxs.data.department_name);
  // setBranchItem(dataxs.data.branch_id);
  // setDepartment(id);
  
  }

  
  
  var countBranch = result.length;
  
  const AddEmployeeFormData = (e) =>{
  e.preventDefault();

  let randomNo = randomNumberInRange(1,10000);
  
  const formData = new FormData();
  
  formData.append('emp_code', randomNo);
  formData.append('emp_name', EmpName);
  formData.append('email', EmpEmail);
  formData.append('password', EmpPass);
  formData.append('dob', EmpDob);
  formData.append('marital_status', EmpMaritalStatus);
  formData.append('gender', EmpGender);
  formData.append('joining_date', EmpJoiningDate);
  formData.append('company_id', Companyid);
  formData.append('phone_number', EmpMobileNo);
  formData.append('mobile_number', EmpOfficial);
  formData.append('department_id', DepartmentId);
  formData.append('designation_id', DesignationId);
  formData.append('branch_id', BranchId);
  formData.append('status', 'active');
  formData.append('profile_pic', EmployeePic);
  formData.append('device_id', DeviceId);
  formData.append('Token', '0');

  const requestOptions = {
      method: 'POST',
      body: formData
  };

  // const FeildData = { emp_code:randomNo,emp_name:EmpName,email:EmpEmail,password:EmpPass,dob:EmpDob,marital_status:EmpMaritalStatus,gender:EmpGender,joining_date:EmpJoiningDate,company_id:Companyid,phone_number:EmpMobileNo,mobile_number:EmpOfficial,department_id:DepartmentId,designation_id:DesignationId,branch_id:BranchId,status:'active',profile_pic:EmployeePic.name,device_id:DeviceId}
  
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(FeildData)
  // };
  
  fetch(`${actionConfig.REACT_APP_URL}employee`, requestOptions)
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
  
  
  const UpdateEmployeeFormData = (e) =>{
    e.preventDefault();


    console.log("Pic",EmployeePic);
    
  const formData = new FormData();
  
  formData.append('emp_code', EmpCode);
  formData.append('emp_name', EmpName);
  formData.append('email', EmpEmail);
  formData.append('password', EmpPass);
  formData.append('dob', EmpDob);
  formData.append('marital_status', EmpMaritalStatus);
  formData.append('gender', EmpGender);
  formData.append('joining_date', EmpJoiningDate);
  formData.append('company_id', Companyid);
  formData.append('phone_number', EmpMobileNo);
  formData.append('mobile_number', EmpOfficial);
  formData.append('department_id', DepartmentId);
  formData.append('designation_id', DesignationId);
  formData.append('branch_id', BranchId);
  formData.append('status', 'active');
  formData.append('profile_pic', EmployeePic);
  formData.append('device_id', DeviceId);
  formData.append('Token', '0');
  formData.append('_method', 'PATCH');

  const requestOptions = {
      method: 'POST',
      body: formData
  };

    // const FeildData = { emp_code:EmpCode,emp_name:EmpName,email:EmpEmail,password:EmpPass,dob:EmpDob,marital_status:EmpMaritalStatus,gender:EmpGender,joining_date:EmpJoiningDate,company_id:Companyid,phone_number:EmpMobileNo,mobile_number:EmpOfficial,department_id:DepartmentId,designation_id:DesignationId,branch_id:BranchId,status:'active',profile_pic:EmployeePic,device_id:DeviceId}
    
    // const requestOptions = {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(FeildData)
    // };
    
    fetch(`${actionConfig.REACT_APP_URL}employee/${EmployeeId}`, requestOptions)
        .then(response => response.json())
        .then(dataexe => {

          console.log(dataexe);
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

    console.log(EmployeePic);


  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Employee') : ('Update Employee')} </h2>
</div>

</div>

<OtherNavigation/>


<div className="row">
  <div className="col-md-12">
    <section className="hk-sec-wrapper">
    <form onSubmit={id == null ? AddEmployeeFormData : UpdateEmployeeFormData}>
<div class="row">
{/* <div class="form-group col-md-4">
<label for="inputEmail4">Title*</label>
<select id="agent_title" class="form-control" >
<option value="" selected="">Select Title</option>
<option value="Mr">MR</option>
<option value="Ms">MS</option>
<option value="Miss">MISS</option>
<option value="Mrs">MRS</option>
</select>
</div> */}




</div>

<div class="row">

<div class="form-group col-md-4">
<label for="inputPassword4">Father Name*</label>
<input type="text" class="form-control" name="father_name" placeholder="Father Name" required="" autocomplete="off" />
</div>
<div class="form-group col-md-4">
<label for="inputPassword4">Full Name*</label>
<input type="text" class="form-control" name="emp_name" placeholder="Employee Name" required="" autocomplete="off" onChange={e=>setEmpName(e.target.value)} value={EmpName}/>
</div>

<div class="form-group col-md-4">
<label for="inputPassword4">Birth Date*</label>
<input type="date" class="form-control" name="dob" required="" autocomplete="off" onChange={e=>setEmpDob(e.target.value)} value={EmpDob}/>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">CNIC*</label>
<input type="text" class="form-control" name="cnic" placeholder="CNIC Number" autocomplete="off" />
</div>
</div>

<div class="form-group col-md-4">
<label for="inputPassword4">Marital Status*</label>
<select name="marital_status" class="form-control" required="" onChange={e=>setMaritalStatus(e.target.value)} value={EmpMaritalStatus}>
<option value="" selected="">Select Status</option>
<option value="Single">Single</option>
<option value="Married">Married</option>
<option value="Divorce">Divorce</option>
</select>
</div>

<div class="form-group col-md-4">
<label for="inputPassword4">Gender*</label>
<select name="gender" class="form-control" required="" onChange={e=>setEmpGender(e.target.value)} value={EmpGender}>
<option value="" selected="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>
</div>

<div class="form-group col-md-4">
<label for="inputjoiningdate">Joining Date*</label>
<input type="date" class="form-control" name="joining_date" placeholder="Address" required="" autocomplete="off" onChange={e=>setEmpJoiningDate(e.target.value)} value={EmpJoiningDate}/>
</div>

<div class="form-group col-md-4">
<label for="inputPassword4">Company*</label>
<select id="inputState" class="form-control" name="company_id" required="" onChange={e=>setCompanyid(e.target.value)} value={Companyid}>
<option selected="">Select Company</option>


{

CompanyResult.length > 0 ? (

  CompanyResult.map((curElem) => {

return (
<option value={curElem.id}>{curElem.company_name}</option>
)

})
): (
<>
<option><b>No Data Found</b></option>
</>
)


}
</select>
</div>

<div class="form-group col-md-4">
<label for="inputCity">Mobile Phone No*</label>
<input type="text" class="form-control" name="mobile_phone" placeholder="Mobile Phone No" required="" autocomplete="off" onChange={e=>setEmpMobileNo(e.target.value)} value={EmpMobileNo}/>
</div>

</div>

<div class="row">

{/* <div class="form-group col-md-4">
<label for="inputCity">Home Phone No*</label>
<input type="text" class="form-control" name="home_phone" placeholder="Home Phone No" required="" autocomplete="off" />
</div> */}


<div class="form-group col-md-4">
<label for="inputCity">Official Mobile No*</label>
<input type="text" class="form-control" name="official_mobile_no" placeholder="Mobile Phone No" required="" autocomplete="off" onChange={e=>setEmpOfficial(e.target.value)} value={EmpOfficial}/>
</div>



<div class="form-group col-md-4">
<label for="inputCity">Branch*</label>
<select name="agent_country" class="form-control" required="" onChange={e=>setBranchId(e.target.value)} value={BranchId}>
<option selected="" value="">Select Branch</option>
{

countBranch > 0 ? (

  result.map((curElem) => {

return (
<option value={curElem.id}>{curElem.branch_name}</option>
)

})
): (
<>
<option><b>No Data Found</b></option>
</>
)


}
</select>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Department Name*</label>
<select class="form-control" name="department_id" required="" onChange={e=>setDepartmentId(e.target.value)} value={DepartmentId}>
<option value="" selected="">Select Department</option>

{

DepartResult.length > 0 ? (

  DepartResult.map((curElem) => {

return (
<option value={curElem.id}>{curElem.department_name}</option>
)

})
): (
<>
<option><b>No Data Found</b></option>
</>
)


}


</select>
</div>
</div>

<div class="form-group col-md-4">
<label for="inputPassword4">Designation*</label>
<select id="inputState" class="form-control" name="designation_id" required="" onChange={e=>setDesignationId(e.target.value)} value={DesignationId}>
<option selected="">Select Option</option>
{

DesignResult.length > 0 ? (

  DesignResult.map((curElem) => {

return (
<option value={curElem.id}>{curElem.designation_name}</option>
)

})
): (
<>
<option><b>No Data Found</b></option>
</>
)


}

</select>
</div>



<div class="form-group col-md-4">
<label for="inputCity">Email*</label>
<input type="text" class="form-control" name="agent_email" placeholder="Email" required="" autocomplete="off" onChange={e=>setEmpEmail(e.target.value)} value={EmpEmail}/>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Agent Password*</label>
<input type="password" class="form-control" name="agent_pass" placeholder="Agent Password" required="" onChange={e=>setEmpPass(e.target.value)} value={EmpPass} autocomplete="off" />
</div>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Device ID*</label>
<input type="text" class="form-control" name="deviceId" placeholder="Device ID" required onChange={e=>setDeviceId(e.target.value)} value={DeviceId} autocomplete="off" />
</div>
</div>

<div class="form-group col-md-4">
<label for="inputCity">Profile Picture (*)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" onChange={changeHandler} style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">House Address*</label>
<input type="text" class="form-control" name="house_address" placeholder="Address" required="" autocomplete="off" />
</div>

<div class="form-group col-md-4">
<label for="inputCity">Country</label>
<select name="agent_country" class="form-control" onChange={e=>setCountryItem(e.target.value)} value={countryItem}>
<option selected="" value="">Select Country</option>
{
  countryresult.map((curElem) => {
  return (
  <option value={curElem.id}>{curElem.country_name}</option>
  )
  })
  }
</select>
</div>

<div class="form-group col-md-4">
<label for="inputState">City</label>
<select name="agent_city" class="form-control" onChange={e=>setCityItem(e.target.value)} value={CityItem}>
<option selected="" value="">Select City</option>
{
  Cityresult == undefined ? (
  <>No Data</>
  ) : (

  Cityresult.map((curElem) => {
  return (
  <option value={curElem.id}>{curElem.cityName}</option>
  )
  })

  )

  }
</select>
</div>

<div class="form-group col-md-4">
<label for="inputState">Alternate Email</label>
<input type="text" class="form-control" name="alternate_email" placeholder="Alternate Email" autocomplete="off" />
</div>

</div>

<div class="row">

<div class="form-group col-md-4">
<label for="inputCity">( Matric Certificate)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">( Inter Certificate)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>


<div class="form-group col-md-4">
<label for="inputCity">( Graduation Certificate)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">( Master Certificate)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">CNIC ( Front)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">CNIC ( Back)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

<div class="form-group col-md-4">
<label for="inputCity">Job Appointment Letter</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" style={{padding:5}}/></div>

</div>

</div>

{/* <div class="row">
<div class="form-group col-md-12">
<div class="title_heading">
<h2>Medical Information</h2>
</div>
</div>

<div class="form-group col-md-2">
<label for="inputCity">Height (m)</label>
<input type="number" class="form-control medical_height" name="medical_height" autocomplete="off" />
</div>

<div class="form-group col-md-2">
<label for="inputCity">Weight (Kg)</label>
<input type="number" class="form-control medical_weight" name="medical_weight" autocomplete="off" />
</div>

<div class="form-group col-md-4">
<label for="inputCity">BMI Calculate</label>
<input type="text" class="form-control bmi_calculate" name="bmi_calculate" autocomplete="off" disabled="disabled" />
</div>


<div class="form-group col-md-4">
<label for="inputCity">Blood Group</label>
<input type="text" class="form-control" name="blood_group" autocomplete="off" />
</div>

<div class="form-group col-md-12">
<label for="inputCity">Do You have any medical Issue ?</label>
<input type="text" class="form-control" name="medical_condition" autocomplete="off" />
</div>
</div> */}
{/* <div class="row">
<div class="form-group col-md-12">
<div class="title_heading">
<h2>Emergency Contact Information</h2>
</div>
</div>

<div class="form-group col-md-6">
<label for="inputCity">Emergency Name #1</label>
<input type="text" class="form-control" name="emergency_name_1" autocomplete="off" />
</div>
<div class="form-group col-md-6">
<label for="inputCity">Emergency contact #1</label>
<input type="text" class="form-control" name="emergency_contact_1" autocomplete="off" />
</div>

<div class="form-group col-md-6">
<label for="inputCity">Emergency Name #2</label>
<input type="text" class="form-control" name="emergency_name_2" placeholder="Conatct #1" autocomplete="off" />
</div>
<div class="form-group col-md-6">
<label for="inputCity">Emergency contact #2</label>
<input type="text" class="form-control" name="emergency_contact_2" placeholder="Conatct #2" autocomplete="off" />
</div>
</div> */}
<button type="submit" class="btn btn-primary">Save</button>
</form>
    </section>
  </div>
</div>


</div>
    </>
  )
}

export default AddNewEmployee