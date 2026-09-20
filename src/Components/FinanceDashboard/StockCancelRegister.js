import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';

const StockCancelRegister = () => {

    const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch();


  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  
  const [StockOutId,setStockOutId]=useState(id);

  const [StockOutDate,setStockOutDate]=useState('');
  const [StockTypeId,setStockTypeId]=useState('');
  const [ProjectId,setProjectId]=useState('');
  const [StockNatureId,setStockNatureId]=useState('');
  const [QuantityBalance,setQuantityBalance]=useState('0');
  const [QuantityOut,setQuantityOut]=useState('');
  const [StockdelBy,setStockdelBy]=useState('');
  const [AfterOutCount,setAfterOutCount]=useState('0');
  const [SerialFrom,setSerialFrom]=useState('');
  const [SerialTo,setSerialTo]=useState('');
  

  const [SingleRes,setSingleRes]= useState([]);
  const [StockRegResult,setStockRegResult]= useState([]);
  

  const [ProjectResult,setProjectResult]= useState([]);

  const Listproject = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setProjectResult(await GetArray);
    }

    const ListStockReg = async (StockTypeId,ProjectId,QuantityOut) => {
      if(StockTypeId == null || StockTypeId == '' || ProjectId == null || ProjectId == '') {
        setStockOutId('0');
      }else{

        const response = await fetch(`${actionConfig.REACT_APP_URL}stockregister?tid=${StockTypeId}&pid=${ProjectId}`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setStockRegResult(await GetArray);
      setQuantityBalance(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : dataxs.data[0].remainingQty);
      setAfterOutCount(dataxs.code == '403' || dataxs.data.length == 0 ? '0' : QuantityOut > dataxs.data[0].remainingQty ? 'Out of Stock' : dataxs.data[0].remainingQty - QuantityOut)
      }
      


    }


  const SingleDocRecords = async (id) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}stockregister/${id}`);
    const dataxs = await response.json();
    setSingleRes(await dataxs.data);
    setStockOutId(dataxs.data[0].id);
  }

  useEffect(() => {
    ListStockReg(StockTypeId,ProjectId,QuantityOut);
},[StockTypeId,ProjectId,QuantityOut]);

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

    // formData.append('stockdeliveredby', StockdelBy);
    // formData.append('stockrecby', StockrecBy);
    // formData.append('quantityIn', QuantityIn);
    // formData.append('stocknatureid', StockNatureId);
    // formData.append('projectid', ProjectId);
    // formData.append('stocktypeid', StockTypeId);
    // formData.append('stockIndate', StockinDate);
    // formData.append('stockImg', DocFiles);
    
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}stockoutregister`, requestOptions)
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
    

    // const formData = new FormData();

    // formData.append('stockdeliveredby', StockdelBy);
    // formData.append('stockrecby', StockrecBy);
    // formData.append('quantityIn', QuantityIn);
    // formData.append('stocknatureid', StockNatureId);
    // formData.append('projectid', ProjectId);
    // formData.append('stocktypeid', StockTypeId);
    // formData.append('stockIndate', StockinDate);
    // formData.append('stockImg', DocFiles);
    // formData.append('_method', 'PATCH');
    

    // const requestOptions = {
    //   method: 'POST',
    //   body: formData
    // };
      
    //   fetch(`${actionConfig.REACT_APP_URL}stockregister/${StockId}`, requestOptions)
    //   .then(response => response.json())
    //   .then(dataex => {
    //     if(dataex.code == '200'){
    //       Swal.fire(
    //         'Good job!',
    //         dataex.message,
    //         'success'
    //       );
    //       navigate("/stock-list");
           
    //     }else{
    //       Swal.fire(
    //         'Error!',
    //         dataex.message,
    //         'error'
    //       );
    //     }
    //   });

  }

  console.log("ProjectResult",ProjectResult);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Stock Cancel Register</h2>

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

<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Stock Out Date*</label>
  <input type="date" class="form-control" name="stockoutdate" placeholder="Stock Out Date" autocomplete="off" onChange={e=>setStockOutDate(e.target.value)} value={StockOutDate} required/> 
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
    </select>
  </div>

  <div class={`form-group col-md-4 ${StockTypeId == 3 || StockTypeId == 4 || StockTypeId == 5 || StockTypeId == 6 || StockTypeId == 7 || StockTypeId == 8 || StockTypeId == 9 || StockTypeId == 13 ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Serial From*</label>
  <input type="text" class="form-control" name="serialFrom" placeholder="Serial From" autocomplete="off" onChange={e=>setSerialFrom(e.target.value)} value={SerialFrom}/> 
  </div>

  <div class={`form-group col-md-4 ${StockTypeId == 3 || StockTypeId == 4 || StockTypeId == 5 || StockTypeId == 6 || StockTypeId == 7 || StockTypeId == 8 || StockTypeId == 9 || StockTypeId == 13 ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Serial To*</label>
  <input type="text" class="form-control" name="serialTo" placeholder="Serial To" autocomplete="off" onChange={e=>setSerialTo(e.target.value)} value={SerialTo}/> 
  </div>

<div class="form-group col-md-4">
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
{/* 
  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Quantity Balance*</label>
  <input type="number" class="form-control" name="quantitybalance" placeholder={AfterOutCount == null || AfterOutCount == '' ? QuantityBalance : AfterOutCount} autocomplete="off" onChange={e=>setQuantityBalance(e.target.value)} value={AfterOutCount == null || AfterOutCount == '' ? QuantityBalance : AfterOutCount} disabled/> 
  </div> */}

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Quantity Out*</label>
  <input type="text" class="form-control" name="quantityout" placeholder="Quantity Out" autocomplete="off" onChange={e=>setQuantityOut(e.target.value)} value={QuantityOut} required/> 
  </div>

    <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Stock Delivered by*</label>
  <input type="text" class="form-control" name="stockdelby" placeholder="Stock Delivered by" autocomplete="off" onChange={e=>setStockdelBy(e.target.value)} value={StockdelBy} required/> 
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

export default StockCancelRegister