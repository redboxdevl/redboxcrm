import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from './LoadingSpinner';
import moment from 'moment';

const PaymentStatement = () => {

let { id } = useParams();

const [PaymentPlanResult,setPaymentPlanResult]= useState([]);

const ListPlanStatement = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}paymentplan/${id}`);
const dataxs = await response.json();
const GetArray = dataxs.data[0];
setPaymentPlanResult(await GetArray);
}

useEffect(() => {
ListPlanStatement();
},[]);

console.log("PaymentPlanResult",PaymentPlanResult);

// var elements = [];

// if(elements.length == 0){
//     var sum =0;
// } else{
//     var sum = elements.reduce((a, b) => {
//         return a + b;
//      });
// }

// console.log("sum",sum);
// console.log("elements",elements);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4 bg-white PaymentStatements">

<OtherNavigation/>

<div className="hk-pg-header pt-4 pb-1 mt-2 mb-1 d-flex justify-content-around align-center">
<div>
<img src="../../FrontAsset/images/albarshalogo.svg" alt="" width={150} />
</div>
<div>
<h2 className="hk-pg-title font-weight-900 text-center">{PaymentPlanResult == '' ? '' : PaymentPlanResult.project_name}</h2>
<p>Main Super Highway Karachi</p>
</div>
<div>
<img src="../../FrontAsset/images/city108logo.svg" alt="" width={150} />
</div>
</div>

<div className="row">
<div className="col-md-12">
<h3 className='text-center pt-0 m-0 pb-3'>Statement of Accounts (Surcharge Report)</h3>
</div>
</div>

<div className="hk-pg-header pt-1 pb-1 mt-2 mb-1 d-flex justify-content-between">
<div>
<h5 className='mb-3'>Allotment Details</h5>
</div>
<div>
<h5 className='mb-3 text-right'>Dated: {PaymentPlanResult == '' ? '' : PaymentPlanResult.bookingDate}</h5>
</div>
</div>

<div className="hk-pg-header d-flex justify-content-between">
<div>
<table className='table'>
<tbody>
<tr>
<td>Name:</td>
{/* <td>Nayyer Zafar</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.clientName}</td>
</tr>
<tr>
<td>CNIC No:</td>
{/* <td>42000-0516993-1</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.cnic}</td>
</tr>
<tr>
<td>Address:</td>
{/* <td>House No. R-100, Block C, Bagh-e-Malir, Kala Board Karachi 75210</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.client_address}</td>
</tr>
<tr>
<td>Contact No:</td>
{/* <td>0332-3285699 & 0310-2936698</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.mobileNo}</td>
</tr>
<tr>
<td>Tracking ID:</td>
<td><div style={{border:'2px solid rgb(0, 0, 0)',width:'30%',textAlign:'center',background:'#afaaaa33'}}>OS061001886</div></td>
</tr>
</tbody>
</table>
</div>
<div style={{width:'30%'}}>
<table className='table'>
<tbody>
<tr>
<td>Size:</td>
{/* <td>120 Square Yards</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.Size}</td>
</tr>
<tr>
<td>Plot No:</td>
{/* <td>1</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.PropertyNo}</td>
</tr>
<tr>
<td>Block:</td>
{/* <td>Overseas</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.BlockName}</td>
</tr>
<tr>
<td>Category:</td>
{/* <td>Corner & Normal</td> */}
<td>{PaymentPlanResult == '' ? '' : PaymentPlanResult.Category}</td>
</tr>
<tr>
<td>Reference:</td>
{/* <td>Abdul Basit</td> */}
<td>-</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="row">
<div className="col-md-12">
<table className='table table-bordered table-striped'>
<thead className='bg-dark'>
<tr>
<th className='text-white'>Accoun Head</th>
<th className='text-white'>Due Amount</th>
<th className='text-white'>Due Date</th>
<th className='text-white'>Paid Amount</th>
<th className='text-white'>Paid On</th>
<th className='text-white'>Reference</th>
<th className='text-white'>Out/Stand</th>
<th className='text-white'>Surcharge</th>
<th className='text-white'>Action</th>

</tr>
</thead>
<tbody>
{
PaymentPlanResult == '' || PaymentPlanResult.paymentplandata == '' || PaymentPlanResult.paymentplandata.length == 0 ? '' : PaymentPlanResult.paymentplandata.map((curElem,index) => {
return (
<tr>
<td>{curElem.accountHead}</td>
<td>{curElem.dueAmount}</td>
<td>{curElem.dueDate}</td>
<td>
    {
        
        curElem.Paymentreciept.length == 0 ? '' : (
        curElem.Paymentreciept.map((curElem2,index) => {
            return (
                <><p>{curElem2.RecievedAmount}</p></>
            )
        })
        )
    }
    
</td>
<td>
    {
        curElem.Paymentreciept.length == 0 ? '' : (
        curElem.Paymentreciept.map((curElem2,index) => {
            return (
                <><p>{curElem2.recieptDate}</p></>
            )
        })
        )
    }
</td>
<td>
    {
        curElem.payestatement.length == 0 ? '' : (
        curElem.payestatement.map((curElem2,index) => {
            return (
                <><p>{curElem2.mode} # - {curElem2.voucherno}{curElem2.chequeNo}{curElem2.payorderno}</p></>
            )
        })
        )
    }
</td>
{/* <td>Online Funds in Al Barsha ABL A/C (Ref. 7343632410)</td> */}
<td>
{
    parseFloat(curElem.dueAmount) - parseFloat(curElem.PaymentrecieptTotal)
}
</td>
<td>-</td>
<td><NavLink to={`/add-new-payment-reciept/${curElem.id}/${id}`}><button className="btn btn-primary btn-sm btn-rounded">Update Payment Reciept</button></NavLink>
<NavLink to={`/view-payment-reciept/${curElem.id}/${id}`}><button className="btn btn-danger btn-sm btn-rounded">Payment Reciept View</button></NavLink>
</td>
</tr>
)
})
}

</tbody>
<tfoot className='bg-dark'>
<tr>
<td className='text-white'>Total</td>
<td className='text-white'>0</td>
<td className='text-white'>-</td>
<td className='text-white'>0</td>
<td className='text-white'>-</td>
<td className='text-white'>-</td>
<td className='text-white'>0</td>
<td className='text-white'>-</td>
</tr>
</tfoot>
</table>
</div>
</div>


</div>
</>
)
}

export default PaymentStatement