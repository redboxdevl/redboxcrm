import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import LoadingSpinner from './LoadingSpinner';

const AddSecurityFiles = () => {

    const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch();


  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  
  const [DocId,setDocId]=useState(id);

  const [DocumentType,setDocumentType]=useState('');
  const [OtherDocumentType,setOtherDocumentType]=useState('');
  const [PropertyType,setPropertyType]=useState('');
  const [OtherPropertyType,setOtherPropertyType]=useState('');
  
  const [DocumentReference,setDocumentReference]=useState('');
  const [DocumentStatus,setDocumentStatus]=useState('');
  const [ReleasedTo,setReleasedTo]=useState('');
  const [ReleasedDate,setReleasedDate]=useState('');
  const [DocFiles,setDocFiles]=useState('');
  const [OwnerShip,setOwnerShip]=useState('');
  const [DocumentNature,setDocumentNature]=useState('');
  const [DocumentDesc,setDocumentDesc]=useState('');
  const [DocApStatus,setDocApStatus]=useState('');
  const [IssuingAuthority,setIssuingAuthority]=useState('');
  const [OtherIssuingAuthority,setOtherIssuingAuthority]=useState('');
  const [CompaniesId,setCompaniesId]=useState('');
  const [Purpose,setPurpose]=useState('');
  const [OtherPurpose,setOtherPurpose]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  

  const [SingleRes,setSingleRes]= useState([]);


  const [CompaniesResult,setCompaniesResult]= useState([]);

  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompaniesResult(await GetArray);
    }


  const changeHandler = (event) => {
		setDocFiles(event.target.files[0]);
	};

  const SingleDocRecords = async (id) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}securityfiles/${id}`);
    const dataxs = await response.json();
    setSingleRes(await dataxs.data);
    setDocId(dataxs.data[0].id);
    
    setDocumentType(dataxs.data[0].docTypeId);
    setOtherDocumentType(dataxs.data[0].docTypeId);
    setIssuingAuthority(dataxs.data[0].issuingauthorityId);
    setPropertyType(dataxs.data[0].proTypeId);
    setDocumentReference(dataxs.data[0].docRef);
    setDocumentStatus(dataxs.data[0].docStatus);
    setReleasedTo(dataxs.data[0].releaseName);
    setReleasedDate(dataxs.data[0].releaseDate);
    setDocFiles(dataxs.data[0].Attachement);
    setOwnerShip(dataxs.data[0].ownerShipTitle);
    setDocumentNature(dataxs.data[0].docNature);
    setDocumentDesc(dataxs.data[0].docDesc);
    setDocApStatus(dataxs.data[0].status);
    setCompaniesId(dataxs.data[0].CompaniesId);
    setPurpose(dataxs.data[0].PurposeId);
  }

  useEffect(() => {
    ListCompanies();
   dispatch(getDashCountData('all',''));
},[]);
  


  useEffect(() => {
    if(id == undefined){
    }else{
      SingleDocRecords(id);
    }
},[id == undefined ? '' : id]);
  



  const AddSecurityForm = (e) => {
    e.preventDefault();

    setLoadingS(true);
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const formData = new FormData();
    
    formData.append('docTypeId', DocumentType);
    formData.append('otherdocTypeId', OtherDocumentType == null || OtherDocumentType == '' ? '0' : OtherDocumentType);
    formData.append('proTypeId', PropertyType);
    formData.append('otherproTypeId', OtherPropertyType == null || OtherPropertyType == '' ? '0' : OtherPropertyType);
    formData.append('docRef', DocumentReference);
    formData.append('docStatus', DocumentStatus);
    formData.append('releaseName', ReleasedTo);
    formData.append('releaseDate', ReleasedDate);
    formData.append('Attachement', DocFiles);
    formData.append('uploadedBy', AuthData.id);
    formData.append('docNature', DocumentNature);
    formData.append('ownerShipTitle',OwnerShip);
    formData.append('docDesc',DocumentDesc);
    formData.append('issuingAuthority',IssuingAuthority);
    formData.append('OtherissuingAuthority',OtherIssuingAuthority);
    formData.append('CompaniesId',CompaniesId);
    formData.append('Purpose',Purpose);
    formData.append('OtherPurpose',OtherPurpose == null || OtherPurpose == '' ? '0' : OtherPurpose);
    formData.append('company_id',AuthData.company_id);

    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}securityfiles`, requestOptions)
      .then(response => response.json())
      .then(dataex => {

        console.log("dataex",dataex);
       
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );

          dispatch(getDashCountData('all',''));
          navigate("/security-files");
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

  const UpdateSecurityForm = (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
    
    formData.append('docTypeId', DocumentType);
    formData.append('otherdocTypeId', OtherDocumentType == null || OtherDocumentType == '' ? '0' : OtherDocumentType);
    formData.append('proTypeId', PropertyType);
    formData.append('otherproTypeId', OtherPropertyType == null || OtherPropertyType == '' ? '0' : OtherPropertyType);
    formData.append('docRef', DocumentReference);
    formData.append('docStatus', DocumentStatus);
    formData.append('releaseName', ReleasedTo);
    formData.append('releaseDate', ReleasedDate);
    formData.append('Attachement', DocFiles);
    formData.append('uploadedBy', AuthData.id);
    formData.append('docNature', DocumentNature);
    formData.append('ownerShipTitle',OwnerShip);
    formData.append('docDesc',DocumentDesc);
    formData.append('status',DocApStatus);
    formData.append('issuingAuthority',IssuingAuthority);
    formData.append('OtherissuingAuthority',OtherIssuingAuthority == null || OtherIssuingAuthority == '' ? '0' : OtherIssuingAuthority);
    formData.append('CompaniesId',CompaniesId);
    formData.append('company_id',AuthData.company_id);

    formData.append('Purpose',Purpose);
    formData.append('OtherPurpose',OtherPurpose == null || OtherPurpose == '' ? '0' : OtherPurpose);
    
    formData.append('_method', 'PATCH');
    

    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}securityfiles/${DocId}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
       
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          setLoadingS(false);
          navigate("/security-files");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
      });

  }

  console.log("result",result);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add Security Files</h2>

</div>
<div class="d-flex">
<NavLink to="/security-files" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddSecurityForm : UpdateSecurityForm}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Companies*</label>
    <select name="companyId" id="" className="form-control" onChange={e=>setCompaniesId(e.target.value)} value={CompaniesId} required>
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

<div class="form-group col-md-4">
  <label for="inputPassword4">Document Type*</label>
  <select id="docTypeId" name="docTypeId" class="form-control" onChange={e=>setDocumentType(e.target.value)} value={DocumentType} required>
    <option value="" selected>Select Option</option>
    {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
    result.DocumentType.length > 0 ? (
      result.DocumentType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.document_title}</option>
    )

    })
    ): (
    <>
    <option>No Record Found....</option>
    </>
    )


)

    }
    <option value="others">Others</option>
  </select>
</div>
  <div class={`form-group col-md-4 ${DocumentType == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Document Type*</label>
  <input type="text" class="form-control" name="otherDocumentType" placeholder="Other Document Type" autocomplete="off" onChange={e=>setOtherDocumentType(e.target.value)} value={OtherDocumentType}/> 
  </div>
 
  <div class="form-group col-md-4">
  <label for="inputPassword4">Property Type*</label>
  <select id="proTypeId" name="proTypeId" class="form-control" onChange={e=>setPropertyType(e.target.value)} value={PropertyType} required>
    <option value="" selected>Select Option</option>
    {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
    result.propertyType.length > 0 ? (
      result.propertyType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.type_name}</option>
    )

    })
    ): (
    <>
    <option>No Record Found....</option>
    </>
    )

)

    }
    <option value="others">Others</option>
  </select>
</div>

<div class={`form-group col-md-4 ${PropertyType == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Property Type*</label>
  <input type="text" class="form-control" name="otherPropertyType" placeholder="Other Property Type" autocomplete="off" onChange={e=>setOtherPropertyType(e.target.value)} value={OtherPropertyType}/> 
  </div>

<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Document Reference*</label>
  <input type="text" class="form-control" name="docRef" placeholder="Document Reference" autocomplete="off" onChange={e=>setDocumentReference(e.target.value)} value={DocumentReference} required/> 
  </div>

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Ownership Title*</label>
  <input type="text" class="form-control" name="ownerShipTitle" placeholder="Ownership Title" autocomplete="off" onChange={e=>setOwnerShip(e.target.value)} value={OwnerShip} required/> 
  </div>

  <div class="form-group col-md-4">
  <label for="inputPassword4">Document Status*</label>
  <select id="docStatus" name="docStatus" class="form-control" onChange={e=>setDocumentStatus(e.target.value)} value={DocumentStatus} required>
    <option value="" selected>Select Option</option>
    {
      id == null || id == '' ? (
        <>
        <option value="Held">Held</option>
        </>
      ):(
        <>
        <option value="Held">Held</option>
        <option value="Released">Released</option>
        </>
      )
    }
    
  </select>
</div>

<div class="form-group col-md-4">
  <label for="inputPassword4">Issuing Authority*</label>
  <select id="IssuingAuthority" name="IssuingAuthority" class="form-control" onChange={e=>setIssuingAuthority(e.target.value)} value={IssuingAuthority} required>
    <option value="" selected>Select Option</option>
    {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
    result.Issuingauthority.length > 0 ? (
      result.Issuingauthority.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.issuingTitle}</option>
    )

    })
    ): (
    <>
    <option>No Record Found....</option>
    </>
    )

)

    }
    <option value="others">Others</option>
  </select>
</div>

<div class={`form-group col-md-4 ${IssuingAuthority == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other issuing Authority*</label>
  <input type="text" class="form-control" name="otherIssuingAuthority" placeholder="Other issuing Authority" autocomplete="off" onChange={e=>setOtherIssuingAuthority(e.target.value)} value={OtherIssuingAuthority}/> 
  </div>


<div class="form-group col-md-4">
  <label for="inputPassword4">Document Nature*</label>
  <select id="docNature" name="docNature" class="form-control" onChange={e=>setDocumentNature(e.target.value)} value={DocumentNature} required>
    <option value="" selected>Select Option</option>
    <option value="Original">Original</option>
    <option value="Copy">Copy</option>
    <option value="Certified Copy">Certified Copy</option>
  </select>
</div>

<div class={`form-group col-md-4 ${DocumentStatus == 'Held' || DocumentStatus == '' ? 'd-none' : 'd-block'}`}>
  <label for="inputPassword4">Released To*</label>
  <input type="text" name="ReleasedTo" class="form-control" placeholder="Released To" onChange={e=>setReleasedTo(e.target.value)} value={ReleasedTo} /> 
  </div>

  <div class={`form-group col-md-4 ${DocumentStatus == 'Held' || DocumentStatus == '' ? 'd-none' : 'd-block'}`}>
  <label for="inputPassword4">Released Date*</label>
  <input type="date" name="ReleasedDate" class="form-control" placeholder="Released Date" onChange={e=>setReleasedDate(e.target.value)} value={ReleasedDate} /> 
  </div>

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Attachement</label>
  <input type="file" class="form-control" name="Attachement" onChange={changeHandler}/> 
  {
    id == null ? (
      <></>
    ):(
      <a href={`${actionConfig.REACT_APP_MAIN}${DocFiles}`} download target='_blank'>Download File</a>
    )
  }
  </div>

  <div class={`form-group col-md-12`}>
  <label for="inputPassword4">Document Description*</label>
  <textarea name="docDesc" id="docDesc" cols="30" rows="5" className="form-control" onChange={e=>setDocumentDesc(e.target.value)} value={DocumentDesc} required></textarea>

  </div>

{
  FiltersSecurity.length == 0 ? (
    <></>
  ):(
    id == null ? (
      <></>
    ):(
    <div class="form-group col-md-4">
      <label for="inputPassword4">Status*</label>
      <select id="docAPStatus" name="docAPStatus" class="form-control" onChange={e=>setDocApStatus(e.target.value)} value={DocApStatus} required>
        <option value="" selected>Select Option</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
      </select>
    </div>
    )

  )
}


<div class="form-group col-md-4">
  <label for="inputPassword4">Purpose*</label>
  <select id="docAPStatus" name="Purpose" class="form-control" onChange={e=>setPurpose(e.target.value)} value={Purpose} required>
    <option value="" selected>Select Option</option>
    {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
    result.Purposeprop.length > 0 ? (
      result.Purposeprop.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.purposetitle}</option>
    )

    })
    ): (
    <>
    <option>No Record Found....</option>
    </>
    )

)

    }
    <option value="others">Others</option>
  </select>
</div>

<div class={`form-group col-md-4 ${Purpose == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Purpose</label>
  <input type="text" class="form-control" name="otherPropertyType" placeholder="Other Purpose" autocomplete="off" onChange={e=>setOtherPurpose(e.target.value)} value={OtherPurpose}/> 
  </div>
  
  

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

export default AddSecurityFiles