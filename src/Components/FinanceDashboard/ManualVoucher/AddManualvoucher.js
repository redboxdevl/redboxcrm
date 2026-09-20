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

const AddManualvoucher = () => {

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

var CurrentDate = moment().format('YYYY-MM-DD');

const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

const [ManualVoucherResult,setManualVoucherResult]= useState([]);
const [VoucherTyeflowResult,setVoucherTyeflowResult]= useState([]);
const [ListLevelResult,setListLevelResult]=useState([]);
const [ListDepartmentResult,setListDepartmentResult]=useState([]);
const [ListDimensionLeve3codeResult,setListDimensionLeve3codeResult]=useState([]);


const [inputList, setinputList]= useState([{ManualVoucherEntryId:'',GLcode:'',Narration:'',Department:'',DimensionCode:'',DebitAmount:'',CreditAmount:''}]);



const [Code,setCode]=useState('0');
const [VoucherType,setVoucherType]=useState('');
const [VoucherDate,setVoucherDate]=useState(CurrentDate);
const [TransactionDate,setTransactionDate]=useState(CurrentDate);
const [PostingRef,setPostingRef]=useState('');
const [PrDate,setPrDate]=useState(CurrentDate);
const [VoucherAttach1,setVoucherAttach1]=useState('');
const [VoucherAttach2,setVoucherAttach2]=useState('');
const [LoadingS,setLoadingS]=useState(false);


const handleinputchangeData=(e, index)=>{
let {name, value}= e.target;
console.log(name);
console.log("value",value);
if(name == 'DebitAmount' || name == 'CreditAmount'){
value = value.replace(/\D/g,"");
value = value.replace(/(\d)(\d{3})$/,"$1,$2");
value = value.replace(/(?=(\d{3})+(\D))\B/g,", ");
}else{
value = value;
}

const list= [...inputList];
list[index][name]= value;
setinputList(list);
}
const handleremove= index=>{
const list=[...inputList];
list.splice(index,1);
setinputList(list);
}

const handleaddclick=()=>{ 
setinputList([...inputList, {ManualVoucherEntryId:'',GLcode:'',Narration:'',Department:'',DimensionCode:'',DebitAmount:'',CreditAmount:''}]);
}

useEffect(() => {
dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

const SingleManualVoucherList = async (id) => {

const response2 = await fetch(`${actionConfig.REACT_APP_URL}manualvouchers/${id}`);
const dataxs2 = await response2.json();
const GetArray3 = dataxs2.data[0];
setManualVoucherResult(await GetArray3);

console.log("GetArray3",GetArray3);

}

useEffect(() => {
if(id == undefined || id == null){
}else{
SingleManualVoucherList(id);
}
},[id == undefined || id == null ? '' : id]);

const AddNewManualVoucher = (e) => {

e.preventDefault();
// setLoadingS(true);
const formData = new FormData();
// formData.append('Code',Code);
const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}manualvouchers`, requestOptions)
.then(response => response.json())
.then(dataex => {
console.log("dataex",dataex);
// if(dataex.code == '200'){
//   Swal.fire(
//   'Good job!',
//   dataex.message,
//   'success'
//   );
//   navigate("/dimension-code-level-1");
// }else if(dataex.code == '203'){
//   Swal.fire(
//     'Error!',
//     dataex.message,
//     'error'
//   );
// }else{
//     Swal.fire(
//       'Error!',
//       dataex.response.message,
//       'error'
//     );
// }
});

}
const UpdateNewManualVoucher = (e) => {

e.preventDefault();
// setLoadingS(true);

// const formData = new FormData();

// formData.append('Code',Code);
// formData.append('Description',Description);
// formData.append('_method', 'PATCH');

// const requestOptions = {
// method: 'POST',
// body: formData
// };

// fetch(`${actionConfig.REACT_APP_URL}manualvouchers/${id}`, requestOptions)
// .then(response => response.json())
// .then(dataex => {
// console.log("dataex",dataex);
// // if(dataex.code == '200'){
// //   Swal.fire(
// //     'Good job!',
// //     dataex.message,
// //     'success'
// //   );
// //   setLoadingS(false);
// //   navigate("/dimension-code-level-1");

// // }else{
// //   Swal.fire(
// //     'Error!',
// //     dataex.message,
// //     'error'
// //   );
// // }

// });

}


const ListVoucherTypeFlow = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}vouchertypesflow`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setVoucherTyeflowResult(await GetArray);
  }


  const ListItemLevel3 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listitemlevel3`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
      setListLevelResult(await GetArray);
  }

  const ListDepartments = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
      setListDepartmentResult(await GetArray);
  }

  const ListGetDimensionLevel3Code = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
      setListDimensionLeve3codeResult(await GetArray);
  }

  useEffect(() => {
    ListVoucherTypeFlow();
    ListItemLevel3();
    ListDepartments();
  },[]);

  const Level3Handler = (value)=>{
    // setGllevel3(value);
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add Manual Voucher</h2>
</div>
<div class="d-flex">
<NavLink to="/manual-voucher-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewManualVoucher : UpdateNewManualVoucher}>
<div class="row">

<div className="form-group col-md-3">
<label htmlFor="">Voucher Type*</label>
<select name="VoucherType" id="VoucherType" className="form-control" onChange={e=>setVoucherType(e.target.value)} value={VoucherType} >
<option value="">Select Voucher Type</option>
{

VoucherTyeflowResult.length > 0 ? (

    VoucherTyeflowResult.map((curElem) => {

      return (
      <option value={curElem.id}>{curElem.code}-{curElem.typeTitle}</option>
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

<div className="form-group col-md-3">
<label htmlFor="">Voucher Date*</label>
<input type="date" name="VoucherDate" className="form-control" onChange={e=>setVoucherDate(e.target.value)} value={VoucherDate} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Transaction Date*</label>
<input type="date" name="TransactionDate" className="form-control" onChange={e=>setTransactionDate(e.target.value)} value={TransactionDate} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Posting Reference</label>
<input type="text" name="PostingRef" className="form-control" onChange={e=>setPostingRef(e.target.value)} value={PostingRef} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">P/R Date</label>
<input type="date" name="PrDate" className="form-control" onChange={e=>setPrDate(e.target.value)} value={PrDate} />
</div>
<div className="form-group col-md-3">
<label htmlFor="">Attachement 1</label>
<input type="file" name="attachement1" className="form-control" />
</div>
<div className="form-group col-md-3">
<label htmlFor="">Attachement 2</label>
<input type="file" name="attachement2" className="form-control" />
</div>

<div className="col-md-12">
<table className='table table-striped table-bordered'>
<thead>
<tr>

<th>GL Code</th>
<th>Narration</th>
<th>Department</th>
<th>Dimension Code</th>
<th>Debit</th>
<th>Credit</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{ 
inputList.map( (x,i)=>{
return(
<tr>

<td width={250}>
<select name="GLcode" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.GLcode}>
<option value="">GL Code</option>
{

ListLevelResult.length > 0 ? (

    ListLevelResult.map((curElem) => {

      return (
      <option value={curElem.id}>{curElem.Description}</option>
      )

      })
      ): (
      <>
      <option><b>No Data Found</b></option>
      </>
      )


      }
</select>
</td>
<td>
<input type="text" name="Narration" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.Narration} />
</td>
<td>
<select name="Department" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.Department}>
<option value="">Select Department</option>
{

ListDepartmentResult.length > 0 ? (

    ListDepartmentResult.map((curElem) => {

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
</td>
<td>
<select name="DimensionCode" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.DimensionCode}>
<option value="">Select Dimension Code</option>
</select>
</td>
<td>
<input type="text" name="DebitAmount" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.DebitAmount} />
</td>
<td>
<input type="text" name="CreditAmount" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.CreditAmount} />
</td>
<td width={200}>
{
inputList.length!==1 &&
<button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i)}>Remove</button>
}
{ inputList.length-1===i &&
<button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
}
</td>
</tr>
)
} )}
</tbody>
<tfoot>
<tr>
<td></td>
<td></td>
<td></td>
<td className='text-right'>TOTAL</td>
<td>0</td>
<td>0</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td className='text-end'>DIFFERENCE</td>
<td>0</td>
<td>0</td>
<td></td>
</tr>
</tfoot>
</table>
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

export default AddManualvoucher