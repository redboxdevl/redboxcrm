import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';

const StockInWordReg = () => {

    const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch();


  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  
  const [StockId,setStockId]=useState(id);

  const [StockdelBy,setStockdelBy]=useState('');
  const [StockrecBy,setStockrecBy]=useState('');
  const [QuantityIn,setQuantityIn]=useState('');
  const [StockNatureId,setStockNatureId]=useState('');
  const [ProjectId,setProjectId]=useState('');
  const [StockTypeId,setStockTypeId]=useState('');
  const [StockinDate,setStockinDate]=useState('');
  const [DocFiles,setDocFiles]=useState('');
  const [SerialFrom,setSerialFrom]=useState('');
  const [PrevSerialFrom,setPrevSerialFrom]=useState('');
  const [SerialTo,setSerialTo]=useState('');
  const [PrevSerialTo,setPrevSerialTo]=useState('');
  const [OtherRecievedBy,setOtherRecievedBy]=useState('');
  const [otherStockType,setotherStockType]=useState('');
  const [StockTypeIdx,setStockTypeIdx]=useState('');
  

  const [SingleRes,setSingleRes]= useState([]);


  const [ProjectResult,setProjectResult]= useState([]);

  const Listproject = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setProjectResult(await GetArray);
    }


  const changeHandler = (event) => {
		setDocFiles(event.target.files[0]);
	};

  const ListStockRegCheck = async (StockTypeId,ProjectId,StockNatureId) => {
    if(StockTypeId == null || StockTypeId == '') {
      // setSerialTo('10');
    }else{

    const response = await fetch(`${actionConfig.REACT_APP_URL}stockregister?tid=${StockTypeId}&pid=${ProjectId}&nid=${StockNatureId}`);
    const dataxs = await response.json();
      console.log(dataxs);
    // setSerialFrom(dataxs.code == '403' || dataxs.data.length == 0 ? '1' : parseInt(dataxs.data[0].serialTo)+1);
    // setSerialTo(dataxs.code == '403' || dataxs.data.length == 0 ? '10' : parseInt(dataxs.data[0].serialTo)+11);

      if(dataxs.data[0].serialFrom == 0 || dataxs.data[0].serialTo == 0 ){
        setPrevSerialFrom(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].remainingQty);
      }else{
        setPrevSerialFrom(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].serialToCOunt);
      }
      
      setSerialFrom(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].serialFrom);
      setStockTypeIdx(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].stocktypeid);
    
    // setPrevSerialTo(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].serialTo);
   
    }

  }

  useEffect(() => {
    ListStockRegCheck(StockTypeId,ProjectId,StockNatureId);  
},[StockTypeId,id,ProjectId,StockNatureId]);

console.log("StockTypeId",StockTypeId);
console.log("ProjectId",ProjectId);

useEffect(() => {
  setQuantityIn(parseInt(SerialTo) - parseInt(SerialFrom) +1);
  console.log(SerialTo,SerialFrom);
},[SerialTo,SerialFrom]);


  const SingleDocRecords = async (id) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}stockregister/${id}`);
    const dataxs = await response.json();
    setSingleRes(await dataxs.data);
    setStockId(dataxs.data[0].id);
    setStockinDate(dataxs.data[0].stockIndate);
    setProjectId(dataxs.data[0].projectid);
    setStockTypeId(dataxs.data[0].stocktypeid);
    setStockNatureId(dataxs.data[0].stocknatureid);
    setStockrecBy(dataxs.data[0].stockrecby);
    setStockdelBy(dataxs.data[0].stockdeliveredby);
    setDocFiles(dataxs.data[0].stockImg);
    

  }

  

  useEffect(() => {
    Listproject();
   dispatch(getDashCountData('all',''));
},[]);
  


  useEffect(() => {
    if(id == undefined){
    }else{
      SingleDocRecords(id);
    }
},[id == undefined ? '' : id]);
  
  const AddStockForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('stockdeliveredby', StockdelBy);
    formData.append('stockrecby', StockrecBy);
    formData.append('otherStockById', OtherRecievedBy == null || OtherRecievedBy == '' ? '0' : OtherRecievedBy);
    formData.append('quantityIn', QuantityIn);
    formData.append('stocknatureid', StockNatureId);
    formData.append('projectid', ProjectId);
    formData.append('stocktypeid', StockTypeId);
    formData.append('otherStockType', otherStockType == null || otherStockType == '' ? '0' : otherStockType);
    formData.append('stockIndate', StockinDate);
    formData.append('stockImg', DocFiles);
    formData.append('serialFrom', SerialFrom);
    formData.append('serialTo', SerialTo);
    formData.append('stockTypeId', StockTypeIdx);
    
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}stockregister`, requestOptions)
      .then(response => response.json())
      .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/stock-list");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
       
      });


  }

  const UpdateStockForm = (e) => {
    e.preventDefault();
    

    const formData = new FormData();

    formData.append('stockdeliveredby', StockdelBy);
    formData.append('stockrecby', StockrecBy);
    formData.append('quantityIn', QuantityIn);
    formData.append('stocknatureid', StockNatureId);
    formData.append('projectid', ProjectId);
    formData.append('stocktypeid', StockTypeId);
    formData.append('stockIndate', StockinDate);
    formData.append('stockImg', DocFiles);
    formData.append('serialFrom', SerialFrom);
    formData.append('serialTo', SerialTo);
    formData.append('prevCount', PrevSerialFrom);
    formData.append('stockId', id);
    
    formData.append('_method', 'PATCH');
    

    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}stockregister/${StockId}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/stock-list");
           
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
<h2 className="hk-pg-title font-weight-600">Stock In Register</h2>

</div>
<div class="d-flex">
<NavLink to="/stock-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddStockForm : UpdateStockForm}>
<div class="row">

<div class={`form-group col-md-6`}>
  <label for="inputPassword4">Stock In Date*</label>
  <input type="date" class="form-control" name="stockindate" placeholder="Stock in Date" autocomplete="off" onChange={e=>setStockinDate(e.target.value)} value={StockinDate} required/> 
  </div>

  <div class="form-group col-md-6">
  <label for="inputPassword4">Projects*</label>
  <select id="projectId" name="projectId" class="form-control" onChange={e=>setProjectId(e.target.value)} value={ProjectId} required>
    <option value="" selected>Select Project</option>
    {
        ProjectResult && ProjectResult.map((item,key) => {
          return (
            <option value={item.id}>{item.project_name}</option>
          )
        })
      }
  </select>
</div>

  <div className="form-group col-md-4">
    <label htmlFor="">Stock Type*</label>
    <select name="stockType" id="" className="form-control" onChange={e=>setStockTypeId(e.target.value)} value={StockTypeId} required>
      <option value="" selected>Select Stock Type</option>
      {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.stockType.length > 0 ? (
      result.stockType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.typeName}</option>
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

  <div class={`form-group col-md-4 ${StockTypeId == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Stock Type</label>
  <input type="text" class="form-control" name="otherStockType" placeholder="Other Stock Type" autocomplete="off" onChange={e=>setotherStockType(e.target.value)} value={otherStockType}/> 
  </div>

  <div class={`form-group col-md-4 ${StockTypeId == 13 || StockTypeId == 2 || StockTypeId == 6 ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Serial From* <span className='badge badge-danger'>Previous Last Serial {PrevSerialFrom}</span></label>
  <input type="number" class="form-control" name="serialFrom" placeholder="Serial From" autocomplete="off" onChange={e=>setSerialFrom(e.target.value)} value={SerialFrom}/> 
  </div>

  <div class={`form-group col-md-4 ${StockTypeId == 13 || StockTypeId == 2 || StockTypeId == 6 ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Serial To*</label>
  <input type="number" class="form-control" name="serialTo" placeholder="Serial To" autocomplete="off" onChange={e=>setSerialTo(e.target.value)} value={SerialTo} /> 
  </div>




<div className="form-group col-md-4">
    <label htmlFor="">Stock Nature*</label>
    <select name="stockNature" id="stockNature" className="form-control" onChange={e=>setStockNatureId(e.target.value)} value={StockNatureId} required>
      <option value="" selected>Select Stock Nature</option>
      {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.stockNature.length > 0 ? (
      result.stockNature.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.natureTitle}</option>
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

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Quantity In* { StockTypeId == 13 || StockTypeId == 2 || StockTypeId == 6 ? '' :  <span className='badge badge-danger'>Previous Last Quantity {PrevSerialFrom}</span> }</label>
  {
    StockTypeId == 13 || StockTypeId == 2 || StockTypeId == 6 ? (
      <input type="number" class="form-control" name="quantityIn" placeholder="Quantity In" autocomplete="off" onChange={e=>setQuantityIn(e.target.value)} value={QuantityIn} required disabled/> 
    ):(
      <input type="number" class="form-control" name="quantityIn" placeholder="Quantity In" autocomplete="off" onChange={e=>setQuantityIn(e.target.value)} value={QuantityIn} required/> 
    )
  }
  
  </div>

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Stock Recieved By*</label>
  {/* <input type="text" class="form-control" name="stockrecby" placeholder="Stock Recieved By" autocomplete="off" onChange={e=>setStockrecBy(e.target.value)} value={StockrecBy} required/>  */}
  <select name="stockrecby" className="form-control" onChange={e=>setStockrecBy(e.target.value)} value={StockrecBy} required>
      <option value="" selected>Select Stock Recieved By</option>
      {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.Stockrecby.length > 0 ? (
      result.Stockrecby.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.rec_title}</option>
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

  <div class={`form-group col-md-4 ${StockrecBy == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Stock Recieved by*</label>
  <input type="text" class="form-control" name="otherRecievedBy" placeholder="Other Stock Recieved By" autocomplete="off" onChange={e=>setOtherRecievedBy(e.target.value)} value={OtherRecievedBy}/> 
  </div>

    <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Stock Delivered By*</label>
  {/* <input type="text" class="form-control" name="stockdelby" placeholder="Stock Delivered By" autocomplete="off" onChange={e=>setStockdelBy(e.target.value)} value={StockdelBy} required/>  */}
  <select name="stockdelby" id="stockdelby" className="form-control" onChange={e=>setStockdelBy(e.target.value)} value={StockdelBy} required>
      <option value="" selected>Select Stock Delivered By</option>
      {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.Stockdeliveredby.length > 0 ? (
      result.Stockdeliveredby.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.delivered_title}</option>
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

export default StockInWordReg