import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { BankListAction } from '../../../redux/action/BankListAction';
import moment from 'moment/moment';
import Select from 'react-select'

const AddNewMapping = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [Level1ListResult,setLevel1ListResult]= useState([]);
  const [DimensionLevelResult,setDimensionLevelResult]= useState([]);
  const [ChartofAccLevel2Result,setChartofAccLevel2Result]=useState([]);
  const [MappingListResult,setMappingListResult]=useState([]);
  const [ListLevelResult,setListLevelResult]=useState([]);
  const [ListDimensionLevelResult,setListDimensionLevelResult]=useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [Code,setCode]=useState('0');
  const [Description,setDescription]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [Errors,setErrors]=useState('');
  const [Level1Id,setLevel1Id]=useState('');
  const [Level2Id,setLevel2Id]=useState('');

  const [Gllevel3,setGllevel3]=useState('');
  const [Mapping,setMapping]=useState('');
  const [DimensionLevel2,setDimensionLevel2]=useState('');

  const limit = 4;
    const handleNumChange = event => {
      setCode(event.target.value.slice(0, limit));
    };

  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

const SingleMappingList = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}generatemapping/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setMappingListResult(await GetArray3);

  setGllevel3(GetArray3.glLevel3id);
  setDimensionLevel2(GetArray3 == '' || GetArray3 == null ? '' : GetArray3.dimensionL2D);

  }

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleMappingList(id);
    }
},[id == undefined || id == null ? '' : id]);

  const AddNewLevel3 = (e) => {
    
    e.preventDefault();

    const formData = new FormData();
  
    formData.append('glLevel3id',Gllevel3);
    formData.append('mappStatus',Mapping);
    formData.append('DimensionLevel2',JSON.stringify(DimensionLevel2));

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}generatemapping`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        if(dataex.code == '200'){
          Swal.fire(
          'Good job!',
          dataex.message,
          'success'
          );
          navigate("/generate-mapping");
        }else if(dataex.code == '201'){
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }else{
            Swal.fire(
              'Error!',
              dataex.response.message,
              'error'
            );
        }
       
    });

  }


  const UpdateNewLevel3 = (e) => {

    e.preventDefault();
    
    const formData = new FormData();
    
    formData.append('glLevel3id',Gllevel3);
    formData.append('mappStatus',Mapping);
    formData.append('DimensionLevel2',JSON.stringify(DimensionLevel2));
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}generatemapping/${id}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/generate-mapping");
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

  const ListItemLevel3 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listitemlevel3`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;

    var optionsxs = [];
    GetArray.map((datax)=>{
         optionsxs.push({
            value: datax.id,
            label: `${datax.Code} - ${datax.Description}`
        });
      });

      setListLevelResult(optionsxs);

  }

  const ListDimensionItemLevel2 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listdimensionitemlevel2`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    // setListDimensionLevelResult(await GetArray);

    var optionsxs = [];
    GetArray.map((datax)=>{
         optionsxs.push({
            value: datax.id,
            label: `${datax.Code} - ${datax.Description}`
        });
      });
      setListDimensionLevelResult(optionsxs);
  }

  useEffect(() => {
    ListItemLevel3();
    ListDimensionItemLevel2();
  },[]);

  const DimensionLevel2Handler = (value)=>{

    console.log("value",value);
    setDimensionLevel2(value);
  }

  const Level3Handler = (value)=>{
    setGllevel3(value);
  }

console.log("ListLevelResult",ListLevelResult);
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add Generate Mapping</h2>

</div>
<div class="d-flex">
<NavLink to="/generate-mapping" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewLevel3 : UpdateNewLevel3}>
<div class="row">

<div className="form-group col-md-4">
  <label htmlFor="">Select GL Level 3</label>
  {/* <Select defaultInputValue='' placeholder='Select Level 3 Code' options={ListLevelResult} onChange={Level3Handler}/> */}
  <select name="Gllevel3" id="" className="form-control" onChange={e=>setGllevel3(e.target.value)} value={Gllevel3}>
    <option value="">Select Level 3</option>
    {

ListLevelResult.length > 0 ? (

  ListLevelResult.map((curElem) => {

      return (
      <option value={curElem.value}>{curElem.label}</option>
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


<div className="form-group col-md-12">
  <label htmlFor="">Dimension Level 2*</label>
  {
    MappingListResult == null || MappingListResult == '' || MappingListResult.length == 0 ? (
      <Select isMulti defaultInputValue='' placeholder='Select Education' options={ListDimensionLevelResult} onChange={DimensionLevel2Handler}/>
    ):(
      <Select isMulti defaultInputValue='' value={DimensionLevel2} placeholder='Select Education' options={ListDimensionLevelResult} onChange={DimensionLevel2Handler}/>
    )
  }
  
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

export default AddNewMapping