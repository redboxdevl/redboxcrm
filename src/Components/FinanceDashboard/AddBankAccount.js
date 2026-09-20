import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';

const AddBankAccount = () => {

    const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch();


  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  
  const [BankId,setBankId]=useState(id);

  const [Cityresult,setCityresult]= useState([]);
  
  const [BankTitle,setBankTitle]=useState('');
  const [BranchTitle,setBranchTitle]=useState('');
  const [AccountNo,setAccountNo]=useState('');
  const [Iban,setIban]=useState('');
  const [BankName,setBankName]=useState('');
  const [BranchCode,setBranchCode]=useState('');
  const [BankImage,setBankImage]=useState('');
  const [City,setCity]=useState('');
  const [SwiftCode,setSwiftCode]=useState('');
  const [NiftCode,setNiftCode]=useState('');
  const [ShortTitle,setShortTitle]=useState('');
  
  const [SingleRes,setSingleRes]= useState([]);


  const changeHandler = (event) => {
        setBankImage(event.target.files[0]);
	};

  const SingleBankRecords = async (id) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}banklist/${id}`);
    const dataxs = await response.json();
    setSingleRes(await dataxs.data);
    setBankId(dataxs.data[0].id);

    setBankTitle(dataxs.data[0].title);
    setBranchTitle(dataxs.data[0].branch);
    setAccountNo(dataxs.data[0].accountno);
    setIban(dataxs.data[0].iban);
    setBankImage(dataxs.data[0].bankimage);
    setBankName(dataxs.data[0].bankname);
    setBranchCode(dataxs.data[0].branchcode);
    setCity(dataxs.data[0].City);
    setSwiftCode(dataxs.data[0].SwiftCode);
    setNiftCode(dataxs.data[0].NiftCode);
    setShortTitle(dataxs.data[0].ShortTitle);
  }

  const GetCity = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}assigncity?countryid=1`);
    const dataxs = await response.json();
    setCityresult(await dataxs.data);
  }

  useEffect(() => {
    GetCity();
  },[]);

  useEffect(() => {
    if(id == undefined){
    }else{
        SingleBankRecords(id);
    }
},[id == undefined ? '' : id]);

const handleChange = (e) => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === "" || regex.test(e.target.value)) {
    setNiftCode(e.target.value);
  }
};
  

  const AddBankForm = (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const formData = new FormData();
    
    formData.append('title', BankTitle);
    formData.append('branchtitle', BranchTitle);
    formData.append('accountno', AccountNo);
    formData.append('iban', Iban);
    formData.append('bankname', BankName);
    formData.append('branchcode', BranchCode);
    formData.append('Attachement', BankImage);
    formData.append('City', City);
    formData.append('SwiftCode', SwiftCode);
    formData.append('NiftCode', NiftCode);
    formData.append('ShortTitle', ShortTitle);
    formData.append('company_id', AuthData.company_id);
    
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}banklist`, requestOptions)
      .then(response => response.json())
      .then(dataex => {

        console.log("dataex",dataex);
       
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );

          navigate("/bank-list");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }

      });


  }

  const UpdateBankForm = (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const formData = new FormData();
    
    formData.append('title', BankTitle);
    formData.append('branchtitle', BranchTitle);
    formData.append('accountno', AccountNo);
    formData.append('iban', Iban);
    formData.append('bankname', BankName);
    formData.append('branchcode', BranchCode);
    formData.append('Attachement', BankImage);
    formData.append('City', City);
    formData.append('SwiftCode', SwiftCode);
    formData.append('NiftCode', NiftCode);
    formData.append('ShortTitle', ShortTitle);
    formData.append('company_id', AuthData.company_id);
    formData.append('_method', 'PATCH');
    

    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}banklist/${BankId}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
       
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/bank-list");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
      });

  }


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add Bank Account List</h2>

</div>
<div class="d-flex">
<NavLink to="/security-files" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddBankForm : UpdateBankForm}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Title*</label>
    <input type="text" name="Title" className="form-control" onChange={e=>setBankTitle(e.target.value)} value={BankTitle} placeholder='Title' required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Short Title*</label>
    <input type="text" name="ShortTitle" className="form-control" onChange={e=>setShortTitle(e.target.value)} value={ShortTitle} placeholder='Short Title' required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Branch Title*</label>
    <input type="text" name="BranchTitle" className="form-control" onChange={e=>setBranchTitle(e.target.value)} value={BranchTitle} placeholder='Branch Title' required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Branch Code*</label>
    <input type="text" name="BranchCode" className="form-control" onChange={e=>setBranchCode(e.target.value)} value={BranchCode} placeholder='Branch Code' required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bank Name*</label>
    <input type="text" name="BankName" className="form-control" onChange={e=>setBankName(e.target.value)} value={BankName} placeholder='Bank Name' required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Account No* (e.g 1234-5678912345)</label>
    <input type="text" name="AccountNo" className="form-control" onChange={e=>setAccountNo(e.target.value)} value={AccountNo} placeholder='Account No' maxLength={15} required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">IBAN*</label>
    <input type="text" name="Iban" className="form-control" onChange={e=>setIban(e.target.value)} value={Iban} placeholder='IBAN' maxLength={24} required/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">City*</label>
    <select name="City" id="City" className="form-control" onChange={e=>setCity(e.target.value)} value={City} required >
      <option value="">Select City</option>
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

  <div className="form-group col-md-4">
    <label htmlFor="">Swift Code</label>
    <input type="text" name="SwiftCode" className="form-control" onChange={e=>setSwiftCode(e.target.value)} value={SwiftCode} placeholder='Swift Code' maxLength={11} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Nift Code</label>
    <input type="text" name="NiftCode" className="form-control" onChange={(e)=>handleChange(e)} value={NiftCode} placeholder='Nift Code' maxLength={7} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bank Image*</label>
    <input type="file"  name="Attachement"  className="form-control" onChange={changeHandler}/>
    {
      id == null ? <></> : <img src={`${actionConfig.REACT_APP_MAIN}${BankImage}`} alt="" width={200} />
    }
    
  </div>


</div>

   <button type="submit" class="btn btn-primary">{id == null ? 'Submit':'Update'}</button>
  
</form>
</div>
</section>
</div>
</div>

</section>
</div>
</div>

</div>
</>
)
}

export default AddBankAccount