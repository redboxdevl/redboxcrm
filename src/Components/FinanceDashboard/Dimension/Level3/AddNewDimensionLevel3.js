import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../LoadingSpinner';
import { BankListAction } from '../../../../redux/action/BankListAction';
import moment from 'moment/moment';
import { useCSVDownloader } from 'react-papaparse';

const AddNewDimensionLevel3 = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const { CSVDownloader, Type } = useCSVDownloader();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [Level1ListResult,setLevel1ListResult]= useState([]);
  const [DimensionLevelResult,setDimensionLevelResult]= useState([]);
  const [ChartofAccLevel2Result,setChartofAccLevel2Result]=useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [Code,setCode]=useState('0');
  const [Description,setDescription]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [Errors,setErrors]=useState('');
  const [Level1Id,setLevel1Id]=useState('');
  const [Level2Id,setLevel2Id]=useState('');
  const [CheckUnCheckStatus,setCheckUnCheckStatus]=useState('');
  const [Bulksheetupload,setBulksheetupload]=useState('');


  const changeHandler2 = (event) => {
    setBulksheetupload(event.target.files[0]);
  };

  const limit = 4;
    const handleNumChange = event => {
      setCode(event.target.value.slice(0, limit));
    };

  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

const SingleNewLevel1List = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevel3/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setLevel1ListResult(await GetArray3);

  console.log("GetArray3",GetArray3);

  setCode(GetArray3.Code);
  setLevel1Id(GetArray3.level1Code);
  setLevel2Id(GetArray3.level2Code);
  setDescription(GetArray3.Description);

  }

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewLevel1List(id);
    }
},[id == undefined || id == null ? '' : id]);

  const AddNewLevel3 = (e) => {
    
    e.preventDefault();

    // setLoadingS(true);

    const formData = new FormData();
  
    formData.append('level1Code',Level1Id);
    formData.append('level2Code',Level2Id);
    formData.append('Code',CheckUnCheckStatus == null || CheckUnCheckStatus == '' || CheckUnCheckStatus == 'unchecked' ? Code : '0000');
    formData.append('Description',CheckUnCheckStatus == null || CheckUnCheckStatus == '' || CheckUnCheckStatus == 'unchecked' ? Description : '-');
    formData.append('Bulksheetupload',Bulksheetupload);
    
    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}dimensionlevel3`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          // setErrors({type:'succ',data:dataex.message});
          Swal.fire(
          'Good job!',
          dataex.message,
          'success'
          );
          navigate("/dimension-code-level-3");
        }else if(dataex.code == '203'){
          // setErrors({type:'succ',data:dataex.message});
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }else{
          // setErrors({type:'error',data:dataex.response.message});
            Swal.fire(
              'Error!',
              dataex.response.message,
              'error'
            );
        }
        // if(dataex.code == '200'){
        //   Swal.fire(
        //     'Good job!',
        //     dataex.message,
        //     'success'
        //   );
        //   navigate("/list-cheque-book");
        //   setLoadingS(false);
           
        // }else if(dataex.code == '201'){
        //   Swal.fire(
        //     'Error!',
        //     dataex.message,
        //     'error'
        //   );
        //   setLoadingS(false);
        // }else{
        //   Swal.fire(
        //     'Error!',
        //     dataex.message,
        //     'error'
        //   );
        // }
    });

  }


  const UpdateNewLevel3 = (e) => {

    e.preventDefault();
    
    // setLoadingS(true);
  
    const formData = new FormData();
    
    formData.append('level1Code',Level1Id);
    formData.append('level2Code',Level2Id);
    formData.append('Code',Code);
    formData.append('Description',Description);
    formData.append('Bulksheetupload',Bulksheetupload);
    
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}dimensionlevel3/${id}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          // setLoadingS(false);
          navigate("/dimension-code-level-3");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
      });

  }

  const ListChartOfAccountLevel2 = async (Level1Id) => {

    if(Level1Id == null || Level1Id == ''){
      setChartofAccLevel2Result('');
    }else{
      const response = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevelitems/${Level1Id}`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setChartofAccLevel2Result(await GetArray);
    }
    
  }

  const ListDimensionLevel1 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevelitems`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDimensionLevelResult(await GetArray);
  }

  useEffect(() => {

    if(Level1Id == null){
      setChartofAccLevel2Result('');
    }
    ListChartOfAccountLevel2(Level1Id);
  },[Level1Id == null ? '' : Level1Id]);

  useEffect(() => {
    ListDimensionLevel1();
  },[]);

console.log("Errors",Errors);

const checkboxValue = (e) => {
  if(e.target.checked){
    setCheckUnCheckStatus('checked');
  }else{
    setCheckUnCheckStatus('unchecked');
  }

};

const dataSample = [ "Code","Description"];

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Dimension Level 3</h2>

</div>
<div class="d-flex">
<NavLink to="/dimension-level-3" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
  {/* {
    Errors == null || Errors == '' || Errors.length == 0 ? '' :
    <div class={`${Errors.type == 'succ' ? 'alert alert-primary' : 'alert alert-danger'}`} role="alert">
      {Errors.data}
    </div>
  } */}

<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddNewLevel3 : UpdateNewLevel3} encType='multipart/form-data' method='post'>
<div class="row">

<div className="form-group col-md-4">
  <label htmlFor="">Level 1*</label>
  <select name="Level1Id" id="" className="form-control" onChange={e=>setLevel1Id(e.target.value)} value={Level1Id}>
    <option value="">Select Level 1</option>
    {

DimensionLevelResult.length > 0 ? (

  DimensionLevelResult.map((curElem) => {

      return (
      <option value={curElem.id}>{curElem.Code}-{curElem.Description}</option>
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

<div className="form-group col-md-4">
  <label htmlFor="">Level 2*</label>
  <select name="Level2Id" id="" className="form-control" onChange={e=>setLevel2Id(e.target.value)} value={Level2Id}>
    <option value="">Select Level 2</option>
    {

ChartofAccLevel2Result.length > 0 ? (

  ChartofAccLevel2Result.map((curElem) => {

return (
<option value={curElem.id}>{curElem.Code}-{curElem.Description}</option>
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

  <div className={`form-group col-md-4 ${CheckUnCheckStatus == '' || CheckUnCheckStatus == 'unchecked' ? '' : 'd-none'}`}>
    <label htmlFor="">Code*</label>
    <input type="number" name="Code" className="form-control" onChange={handleNumChange} value={Code} maxLength = "4" />
  </div>

  <div className={`form-group col-md-4 ${CheckUnCheckStatus == '' || CheckUnCheckStatus == 'unchecked' ? 'd-none' : ''}`}>
    <label htmlFor="">Bulk Sheet Uplad ( CSV File ) <CSVDownloader
        filename={`Bulk Upload Sample Sheet`}
        className="btn btn-primary  btn-wth-icon btn-rounded icon-right btn-sm text-white mr-1"
        data={() => {
            return [
              dataSample
            ]}
        }
      >
      Sample Bulk Uploading
          </CSVDownloader></label>
    <input type="file" name="Bulksheetupload" className="form-control" onChange={changeHandler2} accept=".csv" />
  </div>

  <div className={`form-group col-md-12 ${CheckUnCheckStatus == '' || CheckUnCheckStatus == 'unchecked' ? '' : 'd-none'}`}>
    <label htmlFor="">Description*</label>
    <textarea name="Description" id="Description" cols="30" rows="4" className="form-control" onChange={e=>setDescription(e.target.value.toUpperCase())} value={Description} placeholder='Enter Description'></textarea>
  </div>

  <div className="form-group col-md-12">
    <label htmlFor="">If u want bulk Uploading Please Check here ? <input value='yes' type='checkbox' onChange={checkboxValue} /></label>
    
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

export default AddNewDimensionLevel3