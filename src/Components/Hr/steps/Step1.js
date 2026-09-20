import React , {useState, useEffect} from 'react';
import { actionConfig } from '../../../configuration';
import { useDispatch, useSelector } from 'react-redux';

const Step1 = ({ formData, setFormData , resultDashboard}) => {

  const [result,setResult]= useState([]);
  const [CompanyResult,setCompanyResult]= useState([]);
  const [DepartResult,setDepartResult]= useState([]);
  const [DesignResult,setDesignResult]= useState([]);
  const [EmployementResult,setEmployementResult]= useState([]);
  const [EmployeesResult,setEmployeesResult]= useState([]);
  
  const dispatch = useDispatch();


  console.log("formData",formData);

  const DepartmentId  = formData.DepartmentId;
  
  // const resultRole = useSelector(state => state.EmployeeRolereducers.employeeroledata);
  const resultSingleEmp = useSelector(state => state.SingleEmpreducers.singleempdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145);

  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20);

  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompanyResult(await GetArray);
  }

  const ListEmployement = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listemployementtype`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setEmployementResult(await GetArray);
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

const ListDesignation = async (DepartmentId) => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}designation?agentId=1&departmentId=${DepartmentId}`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setDesignResult(await GetArray);
}

const ListEmployeeAll = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}employee?agentId=myall`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setEmployeesResult(await GetArray);
}

useEffect(() => {
    ListBranch();
    ListCompanies();
    ListDepartment();
    ListDesignation(DepartmentId);
    ListEmployement();
    ListEmployeeAll();
},[DepartmentId == '' || DepartmentId == null ? '' : DepartmentId]);

var countBranch = result.length;

const changeHandlerUtility = (event) => {
  setFormData({
    ...formData,
    UtilityBills: event.target.files[0],
  });
}

const changeHandlerCNIC = (event) => {
  setFormData({
    ...formData,
    CnicFront: event.target.files[0],
  });
}

const changeHandlerCNICBack = (event) => {
  setFormData({
    ...formData,
    CnicBack: event.target.files[0],
  });
}


const changeHandlerEMPPic = (event) => {
  setFormData({
    ...formData,
    EmployeePic: event.target.files[0],
  });
}

const changeHandlerResumeUpload = (event) => {
  setFormData({
    ...formData,
    ResumeUpload: event.target.files[0],
  });
}


return (
<>
<div className="row">

<div class="form-group col-md-3">
    <label >Title<span class="text-danger">*</span></label>
    <select id="agent_title" name="agent_title" class="form-control"  onChange={(e) => {
            setFormData({
              ...formData,
              agent_title: e.target.value,
            });
          }}
          value={formData.agent_title} required>
        <option value="" selected="">Select Title</option>
        <option value="Mr">MR</option>
        <option value="Ms">MS</option>
        <option value="Miss">MISS</option>
        <option value="Mrs">MRS</option>
    </select>
</div>

<div class="form-group col-md-3">
    <label >Full Name<span class="text-danger">*</span></label>
    <input type="text" class="form-control" name="fullName" placeholder="Full Name" onChange={(e) => {
            setFormData({
              ...formData,
              fullName: e.target.value,
            });
          }} value={formData.fullName} required autocomplete="off" />
</div>


<div class="form-group col-md-3">
    <label >Upload Your Picture</label>
    <input type="file" class="form-control" name="EmployeePic" placeholder="EmployeePic" onChange={changeHandlerEMPPic} autocomplete="off" />
    {
      formData.EmployeePic == null || formData.EmployeePic == '' ? (
        <></>
      ):(
        <img src={`${actionConfig.REACT_APP_MAIN}${formData.EmployeePic}`} alt="" width={50} />
      )
    }
</div>

<div class="form-group col-md-3">
    <label >Father Name<span class="text-danger">*</span></label>
    <input type="text" class="form-control" name="fatherName" placeholder="Father Name" onChange={(e) => {
            setFormData({
              ...formData,
              fatherName: e.target.value,
            });
          }} value={formData.fatherName} required autocomplete="off" />
</div>
<div class="form-group col-md-4">
    <label >Email<span class="text-danger">*</span></label>
    <input type="email" class="form-control" name="EmailAddress" placeholder="Email" onChange={(e) => {
            setFormData({
              ...formData,
              EmailAddress: e.target.value,
            });
          }} value={formData.EmailAddress} required autocomplete="off" />
    <small>System User (login) ID. If set, it will become default for all HR forms.</small>
</div>

    <div class="form-group col-md-4">
      <label >Password<span class="text-danger">*</span></label>
      <input type="password" class="form-control" name="Password" placeholder="Password" onChange={(e) => {
              setFormData({
                ...formData,
                Password: e.target.value,
              });
            }} value={formData.Password} required autocomplete="off" />
      <small>System User (login) ID. If set, it will become default for all HR forms.</small>
  </div>

<div class="form-group col-md-3">
    <label >CNIC<span class="text-danger">*</span></label>
    <input type="text" class="form-control" name="Cnic" placeholder="CNIC" onChange={(e) => {
            setFormData({
              ...formData,
              Cnic: e.target.value,
            });
          }} value={formData.Cnic} required autocomplete="off" />
</div>
<div class="form-group col-md-3">
    <label >Gender<span class="text-danger">*</span></label>
    <select id="Gender" name="Gender" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              Gender: e.target.value,
            });
          }} value={formData.Gender} required>
        <option value="" selected="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div>
<div class="form-group col-md-2">
    <label >Date of Birth<span class="text-danger">*</span></label>
    <input type="date" class="form-control" name="DOB" placeholder="Date Of Birth" onChange={(e) => {
            setFormData({
              ...formData,
              DOB: e.target.value,
            });
          }} value={formData.DOB} required autocomplete="off" />
</div>
<div class="form-group col-md-3">
    <label >Date of Joining<span class="text-danger">*</span></label>
    <input type="date" class="form-control" name="DOJ" placeholder="Date Of Joining" onChange={(e) => {
            setFormData({
              ...formData,
              DOJ: e.target.value,
            });
          }} value={formData.DOJ}  required autocomplete="off" />
</div>
{
  SuperCon.length == 0 && FinanceMode.length == 0 ? (
    <></>
  ):(
    <>
    <div class="form-group col-md-3">
    <label >Company<span class="text-danger">*</span></label>
    <select id="CompanyId" name="CompanyId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              CompanyId: e.target.value,
            });
          }} value={formData.CompanyId} required>
        <option value="" selected>Select Company</option>
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
<div class="form-group col-md-3">
    <label >Department<span class="text-danger">*</span></label>
<select id="DepartmentId" name="DepartmentId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              DepartmentId: e.target.value,
            });
          }} value={formData.DepartmentId} required>
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
<div class="form-group col-md-3">
    <label >Designation<span class="text-danger">*</span></label>
    <select id="DesignationId" name="DesignationId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              DesignationId: e.target.value,
            });
          }} value={formData.DesignationId} required>
        <option value="" selected>Select Designation</option>
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

<div class="form-group col-md-3">
    <label >Reports to<span class="text-danger">*</span></label>
    <select id="ReportTo" name="ReportTo" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              ReportTo: e.target.value,
            });
          }} value={formData.ReportTo} required>
        <option value="" selected="">Select Reports to</option>
        {/* <option value="1">Naveed Shah</option> */}
        {

EmployeesResult.length > 0 ? (

  EmployeesResult.map((curElem) => {

return (
<option value={curElem.id}>{curElem.emp_name}</option>
)

})
): (
<>
<option><b>No Data Found</b></option>
</>
)


}
        {/* {
        resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 ? (
          <></>
        ):(
          resultDashboard.empall.length > 0 ? (
            resultDashboard.empall.map((curElem,index) => {
            return (
              <option value={curElem.id}>{curElem.emp_name}</option>
            )

            })
            ): (
            <>
            <option>No Record Found....</option>
            </>
            )


        )

            } */}
    </select>
</div>

<div class="form-group col-md-3">
    <label >HOD</label>
    <select id="Hod" name="Hod" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              Hod: e.target.value,
            });
          }} value={formData.Hod} required>
        <option value="" selected="">Select HOD</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
    </select>
</div>
<div class="form-group col-md-3">
    <label >Branch<span class="text-danger">*</span></label>
<select id="BranchId" name="BranchId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              BranchId: e.target.value,
            });
          }} value={formData.BranchId} required>
        <option value="" selected="">Select Branch</option>
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


<div class="form-group col-md-3">
    <label >Employment Type<span class="text-danger">*</span></label>
    <select id="EmployeeTypeId" name="EmployeeTypeId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              EmployeeTypeId: e.target.value,
            });
          }} value={formData.EmployeeTypeId} required>
        <option value="" selected>Select Employment Type</option>
        {

EmployementResult.length > 0 ? (

  EmployementResult.map((curElem) => {

return (
<option value={curElem.id}>{curElem.typeName}</option>
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

<div class="form-group col-md-3">
    <label >Fuel</label>
    <input type="text" class="form-control" name="Fuel" placeholder="Fuel" onChange={(e) => {
            setFormData({
              ...formData,
              Fuel: e.target.value,
            });
          }} value={formData.Fuel} autocomplete="off" />
</div>

<div class="form-group col-md-3">
    <label >Mobile Allowance</label>
    <input type="text" class="form-control" name="mobilecharge" placeholder="Mobile Charge" onChange={(e) => {
            setFormData({
              ...formData,
              Mobilecharge: e.target.value,
            });
          }} value={formData.Mobilecharge} autocomplete="off" />
</div>
    </>
  )
}






<div class="form-group col-md-3">
    <label >Utility Bills</label>
    <input type="file" class="form-control" name="utilityBill" onChange={changeHandlerUtility} autocomplete="off" />
    {
      formData.UtilityBills == null || formData.UtilityBills == '' ? (
        <></>
      ):(
        <img src={`${actionConfig.REACT_APP_MAIN}${formData.UtilityBills}`} alt="" width={50} />
      )
    }
</div>

<div class="form-group col-md-3">
    <label >CNIC Front</label>
    <input type="file" class="form-control" name="CnicFront" placeholder="CnicFront" onChange={changeHandlerCNIC} autocomplete="off" />
    {
      formData.CnicFront == null || formData.CnicFront == '' ? (
        <></>
      ):(
        <img src={`${actionConfig.REACT_APP_MAIN}${formData.CnicFront}`} alt="" width={50} />
      )
    }
</div>

<div class="form-group col-md-3">
    <label >CNIC Back</label>
    <input type="file" class="form-control" name="CnicBack" placeholder="CnicBack" onChange={changeHandlerCNICBack} autocomplete="off" />
    {
      formData.CnicBack == null || formData.CnicBack == '' ? (
        <></>
      ):(
        <img src={`${actionConfig.REACT_APP_MAIN}${formData.CnicBack}`} alt="" width={50} />
      )
    }
</div>


<div class="form-group col-md-3">
    <label >Resume Upload</label>
    <input type="file" class="form-control" name="ResumeUpload" placeholder="ResumeUpload" onChange={changeHandlerResumeUpload} autocomplete="off" />
    {
      formData.ResumeUpload == null || formData.ResumeUpload == '' ? (
        <></>
      ):(
        <img src={`${actionConfig.REACT_APP_MAIN}${formData.ResumeUpload}`} alt="" width={50} />
      )
    }
</div>


</div>
</>
)
}

export default Step1