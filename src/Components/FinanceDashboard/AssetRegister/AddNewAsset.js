import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import moment from 'moment/moment';

const AddNewAsset = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  
  var CurrentDate = moment().format('YYYY-MM-DD');


  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));


  const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const HrCOn = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 16);
  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

  const AssetRegister = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 153 && edx.sub_features === 'Import');
  const SUperFinance = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);
  const [SingleRes,setSingleRes]= useState([]);
  const [AssetLocationResult,setAssetLocationResult]= useState([]);
  
  const [AssetId,setAssetId]=useState('');
  const [AssetType,setAssetType]=useState('');
  const [OtherAssetType,setOtherAssetType]=useState('');
  const [PurchaseDate,setPurchaseDate]=useState(CurrentDate);
  const [AssetBookValue,setAssetBookValue]=useState('0');
  const [AssetLife,setAssetLife]=useState('');
  const [AssetLocation,setAssetLocation]=useState('-');
  const [CompanyId,setCompanyId]=useState('');
  const [DepartementId,setDepartementId]=useState('');
  const [Quantity,setQuantity]=useState('0');
  const [AssetImage,setAssetImage]=useState('');
  const [AssetImageExtension,setAssetImageExtension]=useState('');
  const [AssetImage1,setAssetImage1]=useState('');
  const [AssetImage1Extension,setAssetImage1Extension]=useState('');
  const [AssetImage2,setAssetImage2]=useState('');
  const [AssetImage2Extension,setAssetImage2Extension]=useState('');
  const [Description,setDescription]=useState('');
  const [Status,setStatus]=useState('');
  const [AssetLocationId,setAssetLocationId]=useState('');
  const [OtherLocation,setOtherLocation]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [SalesConsul,setSalesConsul]= useState('');

  const changeHandler = (event) => {
		setAssetImage(event.target.files[0]);
	};

  const changeHandler2 = (event) => {
    setAssetImage1(event.target.files[0]);
  };
  
  const changeHandler3 = (event) => {
    setAssetImage2(event.target.files[0]);
  };

  useEffect(() => {
   dispatch(getDashCountData('all',''));
},[]);

console.log("resultDashboard",resultDashboard);

const [CompaniesResult,setCompaniesResult]= useState([]);
const [DepartmentResult,setDepartmentResult]= useState([]);

const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
}


  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartmentResult(await GetArray);
    }


    const SingleAssetRecords = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}assetregister/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data);
      setAssetId(dataxs.data[0].id);
      
      setAssetType(dataxs.data[0].assetTypeId);
      setPurchaseDate(dataxs.data[0].purchasedDate);
      setAssetBookValue(dataxs.data[0].AssetBookValue);
      setAssetLife(dataxs.data[0].assetLifeId);
      setAssetLocation(dataxs.data[0].Location);
      setCompanyId(dataxs.data[0].CompanyId);
      setDepartementId(dataxs.data[0].DepartmentId);
      setAssetImage(dataxs.data[0].AssetImage);
      setAssetImageExtension(dataxs.data[0].AssetImageExtension);
      setAssetImage1(dataxs.data[0].AssetImage2);
      setAssetImage1Extension(dataxs.data[0].AssetImage2Extension);
      setAssetImage2(dataxs.data[0].AssetImage3);
      setAssetImage2Extension(dataxs.data[0].AssetImage3Extension);
      setDescription(dataxs.data[0].AssetDesc);
      setQuantity(dataxs.data[0].Quantity);
      setStatus(dataxs.data[0].status);
      setAssetLocationId(dataxs.data[0].AssetLocationId);
      setSalesConsul(dataxs.data[0].agentId);
      

    }

    useEffect(() => {
      if(id == undefined){
      }else{
        SingleAssetRecords(id);
      }
  },[id == undefined ? '' : id]);

  const ListAssetLocation = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}assetlocation?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setAssetLocationResult(await GetArray);
    }
    

  useEffect(() => {
    ListCompanies();
    ListDepartment();
    ListAssetLocation();
},[]);


const AddNewAssetForm = (e) => {
  e.preventDefault();

  setLoadingS(true);

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const formData = new FormData();
  
  formData.append('assetTypeId',AssetType);
  formData.append('otherassetTypeId', OtherAssetType == null || OtherAssetType == '' ? '0' : OtherAssetType);
  formData.append('purchasedDate', PurchaseDate);
  formData.append('AssetBookValue', AssetBookValue);
  formData.append('assetLifeId', AssetLife);
  formData.append('Location', AssetLocation);
  formData.append('SalesConsul', SalesConsul);
  formData.append('AssetLocationId', AssetLocationId);
  formData.append('OtherLocationId', OtherLocation == null || OtherLocation == '' ? '0' : OtherLocation);
  formData.append('CompanyId', CompanyId);
  formData.append('DepartmentId', DepartementId);
  formData.append('Quantity', Quantity);
  formData.append('AssetImage', AssetImage);
  formData.append('AssetImage1', AssetImage1);
  formData.append('AssetImage2', AssetImage2);
  formData.append('AssetDesc', Description);
  formData.append('company_id', AuthData.company_id);
  formData.append('uploadBy', AuthDataxs == '' || AuthDataxs == null || AuthDataxs == undefined ? '' : AuthDataxs.id);
  
  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}assetregister`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

      console.log("dataex",dataex);
     
      if(dataex.code == '200'){
        Swal.fire(
          'Good job!',
          dataex.message,
          'success'
        );
        navigate("/fixed-asset-register");
        setLoadingS(false);
         
      }else{
        Swal.fire(
          'Error!',
          dataex.message,
          'error'
        );
      }

    });


}

const UpdateNewAssetForm = (e) => {
  e.preventDefault();
  
  setLoadingS(true);
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const formData = new FormData();
  
  formData.append('assetTypeId',AssetType);
  formData.append('otherassetTypeId', OtherAssetType == null || OtherAssetType == '' ? '0' : OtherAssetType);
  formData.append('purchasedDate', PurchaseDate);
  formData.append('AssetBookValue', AssetBookValue);
  formData.append('assetLifeId', AssetLife);
  formData.append('Location', AssetLocation);
  formData.append('AssetLocationId', AssetLocationId);
  formData.append('OtherLocationId', OtherLocation == null || OtherLocation == '' ? '0' : OtherLocation);
  formData.append('CompanyId', CompanyId);
  formData.append('DepartmentId', DepartementId);
  formData.append('Quantity', Quantity);
  formData.append('AssetImage', AssetImage);
  formData.append('AssetImage1', AssetImage1);
  formData.append('AssetImage2', AssetImage2);
  formData.append('AssetDesc', Description);
  formData.append('SalesConsul', SalesConsul);
  formData.append('uploadBy', AuthDataxs == '' || AuthDataxs == null || AuthDataxs == undefined ? '' : AuthDataxs.id);
  formData.append('status', Status);
  formData.append('company_id', AuthData.company_id);
  
  
  formData.append('_method', 'PATCH');

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}assetregister/${AssetId}`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
      console.log("dataex",dataex);
      if(dataex.code == '200'){
        Swal.fire(
          'Good job!',
          dataex.message,
          'success'
        );
        setLoadingS(false);
        navigate("/fixed-asset-register");
         
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
<h2 className="hk-pg-title font-weight-600">Add New Asset</h2>

</div>
<div class="d-flex">
<NavLink to="/fixed-asset-register" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>


{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddNewAssetForm : UpdateNewAssetForm}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Asset Type*</label>
    <select name="assetType" id="" className="form-control" onChange={e=>setAssetType(e.target.value)} value={AssetType} required>
      <option value="" selected>Select Asset Type</option>
      {
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
      <></>
    ):(
      resultDashboard.AssetTypeData.length > 0 ? (
        resultDashboard.AssetTypeData.map((curElem,index) => {
        return (
          <option value={curElem.id}>{curElem.assetType}</option>
        )
      })
      ): (
      <>
      <option>No Record Found....</option>
      </>
      )
    )

        }


        {SUperFinance.length == 0 ? '' : <option value="others">Others</option>}
    </select>
  </div>

  <div class={`form-group col-md-4 ${AssetType == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Asset Type*</label>
  <input type="text" class="form-control" name="otherAssetType" placeholder="Other Asset Type" autocomplete="off" onChange={e=>setOtherAssetType(e.target.value)} value={OtherAssetType}/> 
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Purchase Date / Acquisition*</label>
    <input type="date" name="purchasedDate" className="form-control" onChange={e=>setPurchaseDate(e.target.value)} value={PurchaseDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Asset Book Value</label>
    <input type="text" name="assetBookValue" className="form-control" onChange={e=>setAssetBookValue(e.target.value)} value={AssetBookValue} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Asset Life (Year)*</label>
    <select name="assetLife" id="" className="form-control" onChange={e=>setAssetLife(e.target.value)} value={AssetLife} required>
      <option value="" selected>Select Asset Life</option>
      {
      resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
        <></>
      ):(
        resultDashboard.AssetLifeData.length > 0 ? (
          resultDashboard.AssetLifeData.map((curElem,index) => {
          return (
            <option value={curElem.id}>{curElem.LifeTitle} Years</option>
          )
        })
        ): (
        <>
        <option>No Record Found....</option>
        </>
        )
      )

          }
    </select>
  </div>

<div className="form-group col-md-4">
<label htmlFor="">Location</label>
  <select name="AssetLocationId" id="" className="form-control" onChange={e=>setAssetLocationId(e.target.value)} value={AssetLocationId} required>
  <option value="">Select Location</option>
  {
  AssetLocationResult && AssetLocationResult.map((item,key) => {
  return (
  <option value={item.id}>{item.locationName}</option>
  )
  })
  }
  {SUperFinance.length == 0 ? '' : <option value="others">Others</option>}
  </select>
</div>

<div class={`form-group col-md-4 ${AssetLocationId == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Location*</label>
  <input type="text" class="form-control" name="otherAssetType" placeholder="Other Location" autocomplete="off" onChange={e=>setOtherLocation(e.target.value)} value={OtherLocation}/> 
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Company*</label>
    <select name="Company" id="" className="form-control"  onChange={e=>setCompanyId(e.target.value)} value={CompanyId} required>
      <option value="" selected>Select Company</option>
      {
        CompaniesResult && CompaniesResult.map((item,key) => {
          return (
            <option value={item.id}>{item.company_name}</option>
          )
        })
      }
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Department*</label>
    <select name="Department" id="" className="form-control" onChange={e=>setDepartementId(e.target.value)} value={DepartementId} required>
      <option value="" selected>Select Department</option>
      {
        DepartmentResult && DepartmentResult.map((item,key) => {
          return (
            <option value={item.id}>{item.department_name}</option>
          )
        })
      }
      
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Quantity*</label>
    <input type="number" name="Quantity" className="form-control" onChange={e=>setQuantity(e.target.value)} value={Quantity} />
  </div>

  <div class="col-md-4">
<div class="form-group">
<label for="">Assigned To</label>
<select name="ConsultantNmae" id="" class="form-control" onChange={(e) => setSalesConsul(e.target.value)} value={SalesConsul}>
  <option value="">Select All</option>
  {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAllS.map((items,key) => {
        return (
        items.id == '' ? (
          <></>
        ):(
            <option value={items.id} key={key+1}>{items.emp_name}</option>
          )
        )
    
    })
    )
  }
</select>
</div>
</div>

  <div className="col-md-12"></div>


<div className="form-group col-md-4">
    <label htmlFor="">Asset Image 1</label>
    <input type="file" name="assetImage" className="form-control" onChange={changeHandler} />

    {
    id == null ? (
      <></>
    ):(
      
      AssetImageExtension == 'jpg' || AssetImageExtension == 'png' ||  AssetImageExtension == 'webp' ||  AssetImageExtension == 'jpeg' ? (
        <><img src={`${actionConfig.REACT_APP_MAIN}${AssetImage}`} width="50" /></>
      ):(
        <a href={`${actionConfig.REACT_APP_MAIN}${AssetImage}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>
      )
      

    
    )
  }
  </div>
  <div className="form-group col-md-4">
    <label htmlFor="">Asset Image 2</label>
    <input type="file" name="assetImage2" className="form-control" onChange={changeHandler2} />
  
    {
    id == null ? (
      <></>
    ):(

      AssetImage1Extension == 'jpg' || AssetImage1Extension == 'png' ||  AssetImage1Extension == 'webp' ||  AssetImage1Extension == 'jpeg' ? (
        AssetImage1 == '' || AssetImage1 == null ? '' : <img src={`${actionConfig.REACT_APP_MAIN}${AssetImage1}`} width="50" />
      ):(
        <a href={`${actionConfig.REACT_APP_MAIN}${AssetImage1}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>
      )

    
    )
  }
  </div>
  <div className="form-group col-md-4">
    <label htmlFor="">Asset Image 3</label>
    <input type="file" name="assetImage3" className="form-control" onChange={changeHandler3} />

    {
    id == null ? (
      <></>
    ):(

      
      AssetImage2Extension == 'jpg' || AssetImage2Extension == 'png' ||  AssetImage2Extension == 'webp' ||  AssetImage2Extension == 'jpeg' ? (
        AssetImage2 == '' || AssetImage2 == null ? '' : <img src={`${actionConfig.REACT_APP_MAIN}${AssetImage2}`} width="50" />
      ):(
        <a href={`${actionConfig.REACT_APP_MAIN}${AssetImage2}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>
      )
   
    )
  }
  </div>


  <div className="form-group col-md-12">
    <label htmlFor="">Description*</label>
    <textarea name="Description" id="" cols="30" rows="10" className="form-control" onChange={e=>setDescription(e.target.value)} value={Description}></textarea>
  </div>

  {
    AssetRegister.length == 0 ? <></> : 
    <div className="form-group col-md-4">
    <label htmlFor="">Status Approval*</label>
    <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
      <option value="" selected>Select Status</option>
      <option value="1">Approved</option>      
      <option value="0">Pending</option>      
    </select>
  </div>
  }

  

  
</div>

{
  LoadingS == true ? <button type="submit" class="btn btn-primary" disabled>{id == null ? 'Submit':'Update'}</button> : <button type="submit" class="btn btn-primary">{id == null ? 'Submit':'Update'}</button>
  }


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

export default AddNewAsset