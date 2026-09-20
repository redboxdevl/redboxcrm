import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import Navigation from '../../../Includes/Navigation'
import QuickNav from '../../../Includes/QuickNav'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InventoriesAction } from '../../../redux/action/InventoriesAction';
import { SingleInventories } from '../../../redux/action/SingleInventories';

import { useCSVDownloader } from 'react-papaparse';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import { ListInventoriesFilterAction } from '../../../redux/action/ListInventoriesFilterAction';

const AddInventories = () => {

  const navigate = useNavigate();

  const resultDasboard = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultInvtFilters = useSelector(state => state.Listinventorisfiltersreducers.listinventoriesfilterdata);
  const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);
  const resultSingleProject = useSelector(state => state.SingleInventoriesreducer.singleinventoriesdata);
  const dispatch = useDispatch();

  const [userValue,setuserValue]=useState('');

  const { CSVDownloader, Type } = useCSVDownloader();

  const [blockType, setblockType] = useState([]);
  const [SizeType, setSizeType] = useState(['Sqft', 'Sqyd',"Marla"]);
  const [FloorType, setFloorType] = useState(['Floor', 'Unit']);
  const [CategoryType, setCategoryType] = useState(['Plot', 'Apartment','Villa','Shop']);
  const [Category, setCategory] = useState(['Category']);
  const [PlotCategory, setPlotCategory] = useState(['Corner','Park Facing','West Open','General']);
  const [PaymentCategory, setPaymentCategory] = useState(['Full Paid','Installement']);
  const [PaymentItemCategory, setPaymentItemCategory] = useState(['Total Amount','Down Payment','Possession Fee','Digging']);
  
  const [Proresult,setProResult]= useState([]);
  const [SingleProjectresult,setSingleProjectresult]= useState([]);
  const [NewData,setNewData]= useState([]);
  
  const [ProjectId,setProjectId]=useState('');

  useEffect(() => {
    dispatch(ListInventoriesFilterAction());
    dispatch(getDashCountData('all',''));
},[]);

  useEffect(() => {
    dispatch(InventoriesAction());
    dispatch(SingleInventories(ProjectId));
},[ProjectId]);

console.log("blockType",blockType);

// const HandleProjectId = (id) =>{
//    dispatch(SingleInventories(id));
// }

const [BlockChecked,setBlockChecked]=useState('');
const [SizeChecked,setSizeChecked]=useState('');
const [FloorChecked,setFloorChecked]=useState('');
const [CategoryChecked,setCategoryChecked]=useState('');
const [CategoriesChecked,setCategoriesChecked]=useState('');
const [PlotCategoriesChecked,setPlotCategoriesChecked]=useState('');
const [PaymentCatChecked,SetPaymentCatChecked]=useState('');
const [PaymentItemCatChecked,SetPaymentItemCatChecked]=useState('');


const [TitleItem,setTitleItem]=useState('');
const [AttributeVal,setAttributeVal]=useState('');


const [Cond,setCond]=useState(true);
const [show, setShow] = useState(false);

  const handleClose = () => {
      setShow(false);
  }
  const handleShow = (dataval) => {
    setAttributeVal(dataval);
      setShow(true);
      setTitleItem('');
  }

const BlogTypeChange = (event) => {
  var updatedList = [...BlockChecked];
  if (event.target.checked) {
  updatedList = [...BlockChecked, event.target.value];
  } else {
  updatedList.splice(BlockChecked.indexOf(event.target.value), 1);
  }
  setBlockChecked(updatedList);
}
const SizeTypeChange = (event) => {
  var updatedList = [...SizeChecked];
  if (event.target.checked) {
  updatedList = [...SizeChecked, event.target.value];
  } else {
  updatedList.splice(SizeChecked.indexOf(event.target.value), 1);
  }
  setSizeChecked(updatedList);
}
const FloorTypeChange = (event) => {
  var updatedList = [...FloorChecked];
  if (event.target.checked) {
  updatedList = [...FloorChecked, event.target.value];
  } else {
  updatedList.splice(FloorChecked.indexOf(event.target.value), 1);
  }
  setFloorChecked(updatedList);
}
const CategoryTypeChange = (event) => {
  var updatedList = [...CategoryChecked];
  if (event.target.checked) {
  updatedList = [...CategoryChecked, event.target.value];
  } else {
  updatedList.splice(CategoryChecked.indexOf(event.target.value), 1);
  }
  setCategoryChecked(updatedList);
}
const CategoryChange = (event) => {
  var updatedList = [...CategoriesChecked];
  if (event.target.checked) {
  updatedList = [...CategoriesChecked, event.target.value];
  } else {
  updatedList.splice(CategoriesChecked.indexOf(event.target.value), 1);
  }
  setCategoriesChecked(updatedList);
}
const PlotCategoryChange = (event) => {
  var updatedList = [...PlotCategoriesChecked];
  if (event.target.checked) {
  updatedList = [...PlotCategoriesChecked, event.target.value];
  } else {
  updatedList.splice(PlotCategoriesChecked.indexOf(event.target.value), 1);
  }
  setPlotCategoriesChecked(updatedList);
}
const PaymentCategoryChange = (event) => {
  var updatedList = [...PaymentCatChecked];
  if (event.target.checked) {
  updatedList = [...PaymentCatChecked, event.target.value];
  } else {
  updatedList.splice(PaymentCatChecked.indexOf(event.target.value), 1);
  }
  SetPaymentCatChecked(updatedList);
}
const PaymentItemCategoryChange = (event) => {
  var updatedList = [...PaymentItemCatChecked];
  if (event.target.checked) {
  updatedList = [...PaymentItemCatChecked, event.target.value];
  } else {
  updatedList.splice(PaymentItemCatChecked.indexOf(event.target.value), 1);
  }
  SetPaymentItemCatChecked(updatedList);
}


const ListProjects = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setProResult(await GetArray);
}

const AddTitleFormData = (e) =>{

  e.preventDefault();
  dispatch(ListInventoriesFilterAction());
  
  if(AttributeVal == 'block'){
    
    setblockType(current => [...current,TitleItem]);
    setTitleItem('');
    setShow(false);

     const formData = new FormData();
  
      formData.append('fieldName', TitleItem);
      
      const requestOptions = {
          method: 'POST',
          body: formData
      };
      
      fetch(`${actionConfig.REACT_APP_URL}inventoriesfilters`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log("result",result);
            if(result.code == '200'){
               Swal.fire(
               'Good job!',
               result.message,
               'success'
               );
               navigate("/add-inventories");
               setShow(false);
               dispatch(ListInventoriesFilterAction());
               
            }else if(result.code == '201'){
              Swal.fire(
                'Warning!',
                result.message,
                'warning'
                );
                setShow(true);
            }else{
               Swal.fire(
               'Error!',
               result.message,
               'error'
               );
               
            }
            
  
          }).catch((error) => {
            //console.error('Error:', error);
          });
    
  }else if(AttributeVal == null){
    alert("Error");
  }


  // if(AttributeVal == 'block'){
  //   setTitleItem('');
  //   setShow(false);
  //   setblockType(current => [...current, TitleItem]);
  // }else if(AttributeVal == "size"){
  //   setTitleItem('');
  //   setShow(false);
  //   setSizeType(current => [...current, TitleItem]);
  // }else if(AttributeVal == "category"){
  //   setTitleItem('');
  //   setShow(false);
  //   setCategoryType(current => [...current, TitleItem]);
  // }
  // else if(AttributeVal == "plotcategory"){
  //   setTitleItem('');
  //   setShow(false);
  //   setPlotCategory(current => [...current, TitleItem]);
  // }
  // else if(AttributeVal == "paymentitem"){
  //   setTitleItem('');
  //   setShow(false);
  //   setPaymentItemCategory(current => [...current, TitleItem]);
  // }
  
}

var finalarray = [...BlockChecked, ...SizeChecked, ...FloorChecked, ...CategoryChecked, ...CategoriesChecked,...PlotCategoriesChecked, ...PaymentCatChecked , ...PaymentItemCatChecked] ;

let jsonObject = blockType.map(JSON.stringify);

let uniqueSet = new Set(jsonObject);
let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  
// console.log("uniqueArray",uniqueArray);
              
// console.log("jsonObject",jsonObject);

// console.log("blockType",blockType);

console.log("resultInvtFilters",resultInvtFilters);
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
    <h2 className="hk-pg-title font-weight-600">Add Inventories</h2>
</div>
</div>

<Navigation/>

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div className="row mt-10">
<div className="col-md-6">
<div className="form-group">
<select name="projectname" className="form-control prodatat" onChange={e=>setProjectId(e.target.value)} value={ProjectId}>
<option value="">Select Projects</option>

{
resultInventories == '' || resultInventories == null ? (
  <></>
):(
resultInventories.data.length > 0 ? (

resultInventories.data.map((curElem,index) => {

return (
<option value={curElem.id} key={curElem.id}>{curElem.project_name}</option>

)

})
): (
<>
<option>No Record Found</option>
</>
)

)

}

</select>
</div>
</div>
<div className="col-md-6">
{

  <>
  <div className="row">
<div className="col-sm-3">
  {
    resultSingleProject == '' ? '' : (
      <img className="w-120p" src={resultSingleProject == '' ? '' : resultSingleProject[0].project_asset_path == '' ? '' : `${actionConfig.REACT_APP_MAIN}${resultSingleProject[0].project_asset_path}`} alt="icon" />
    )
  }
</div>
<div className="col-sm-9">
<h2>{resultSingleProject == '' ? '' : resultSingleProject[0].project_name}</h2>
{
resultSingleProject == '' ? '' : resultSingleProject[0].project_category.map((curElem) => {
  return (
    <span className="badge badge-success mr-2">{curElem.project_category_name}</span>
  )
  })
}
</div>
</div>
  </>
  
}


</div>

</div>
<div className="mt-10 row">
{


resultInvtFilters.length == 0 || resultInvtFilters.code == 'ERR_NETWORK' ? '' : resultInvtFilters.data.length > 0 ? (

  resultInvtFilters.data.map((curElem,index) => {

  return (
    <div className="col-12 ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="blocktype" value={curElem.fieldName} onChange={BlogTypeChange}/>{curElem.fieldName}
        </label>
      </div>
    </div>
  )
  })
  ): (
  <>
  <div className="col-12 ml-15 mr-15 mt-1">
    <p>No Fields Found</p>
  </div>
  </>
  )

}

<div className="col-12 mr-15">
<button className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm" data-value={'block'} onClick={()=>handleShow('block')}><span className="btn-text">Add New Fields</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button>
</div>
</div>
{/* <hr /> */}
{/* <div className="row mt-10">
{

SizeType.length > 0 ? (

SizeType.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-radio">
        <label className="form-radio-label">
          <input type="radio" className="form-radio-input" name="SizeType" value={curElem} onChange={SizeTypeChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}
<div className="col- mr-15">
<button className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm" data-value={'size'} onClick={handleShow}><span className="btn-text">Add</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button>
</div>

</div>
<hr /> */}
{/* <div className="mt-10 row">

{

FloorType.length > 0 ? (

FloorType.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="floor" value={curElem} onChange={FloorTypeChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

</div> */}
{/* <hr />
<div className="mt-10 row">
{

CategoryType.length > 0 ? (

  CategoryType.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="categorytype" value={curElem} onChange={CategoryTypeChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

<div className="col- mr-15">
<button className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm" data-value={'category'} onClick={handleShow}><span className="btn-text">Add</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button>
</div>
</div> */}
{/* <hr />
<div className="mt-10 row">
{

Category.length > 0 ? (

  Category.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="category" value={curElem} onChange={CategoryChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

</div> */}
{/* <hr />
<div className="mt-10 row">
{

PlotCategory.length > 0 ? (

  PlotCategory.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="plotcategory" value={curElem} onChange={PlotCategoryChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

<div className="col- mr-15">
<button className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm" data-value={'plotcategory'} onClick={handleShow}><span className="btn-text">Add</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button>
</div>
</div> */}
{/* <hr />
<div className="row mt-10">
{

PaymentCategory.length > 0 ? (

  PaymentCategory.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-radio">
        <label className="form-radio-label">
          <input type="radio" className="form-radio-input" name="paymentcategory" value={curElem} onChange={PaymentCategoryChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

</div> */}
{/* <hr />
<div className="mt-10 row">
{

PaymentItemCategory.length > 0 ? (

  PaymentItemCategory.map((curElem,index) => {

  return (
    <div className="col- ml-15 mr-15 mt-1" key={index+1}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="paymentitemcategory" value={curElem} onChange={PaymentItemCategoryChange}/>{curElem}
        </label>
      </div>
    
    </div>
  )
  })
  ): (
  <>
  <p>No Record Found</p>
  </>
  )

}

<div className="col- mr-15">
<button className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm" data-value={'paymentitem'} onClick={handleShow}><span className="btn-text">Add</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button>
</div>
</div> */}
<hr />



<CSVDownloader
  filename={`${resultSingleProject == '' ? '' : resultSingleProject[0].project_name}`}
  className="btn btn-primary mr-10 mt-4 text-white"
  data={() => {
      return [
        finalarray
      ]}
  }
>
Generate Csv
    </CSVDownloader>
<button type="submit" className="btn btn-light mt-4">Cancel</button>
</section>
</div>
</div>

</div>

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title></Modal.Title>
</Modal.Header>
<Modal.Body>
<form onSubmit={AddTitleFormData}>
<div className="form-group">
<label for="exampleDropdownFormEmail1">Field Name</label>
<input type="text" name="TitleItem" className="form-control" placeholder="Enter Field Name" onChange={e=>setTitleItem(e.target.value)} value={TitleItem} required/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</Modal.Body>
</Modal>

</>
)
}

export default AddInventories