import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleInventorySoldAction } from '../../../redux/action/SingleInventorySoldAction';
import QRCode from "react-qr-code";
import './PayRecxs.css';

const PurchasePrintVoucher = () => {
  
  const [SingleRes,setSingleRes]= useState([]);
    const componentRef = useRef();
// 	const dispatch = useDispatch();

	let { id } = useParams();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>console.log("Print Success")
    });

    useEffect(() => {
      SinglePurchasePrintRecords(id);
      },[id == '' ? '' : id]);
  
      console.log("SingleRes",SingleRes);

      const SinglePurchasePrintRecords = async (id) => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}purchasereqform/${id}`);
        const dataxs = await response.json();
        setSingleRes(await dataxs.data[0]);

      }
  
//     useEffect(() => {
//       if(id == undefined){
//       }else{
//         SinglePettyCash(id);
//       }
//   },[id == undefined ? '' : id]);



  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">REQUIREMENT FORM PRINT</h2>

</div>
<div className="d-flex">
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</div>


</div>

<OtherNavigation/>

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<section className='hk-sec-wrapper'>
<div className='d-flex'>
	<div className='col-12 text-center'>
    <img src='../FrontAsset/images/waterxs.png' className='img-fluid' />
    <br />
	</div>
	<div className='col-6'>
  
	</div>
</div>
<div className='col-12 mt-10'>
  <h2 className='pageTitle'>REQUIREMENT FORM</h2>
</div>
<div className='d-flex'>
	<div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="RecNo">
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Date:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.dateofReq}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Name:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.emp_name}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Request Type:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.typeTitle}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Estimated Budget:</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='theadBG'>Current Salary:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.CurrentSalary}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Vendor Name:</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='theadBG'>Transfer From:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.TransferFrom}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
	</div>
	<div className='col-4 d-flex barcode justify-content-center align-items-center'>
   
	</div>
  <div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="table-responsive">
    <table class="table table-bordered table-sm mb-20">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>S. No:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.id}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Department:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.department_name}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Purpose:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.Purpose}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Requested Amt:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.RequestedAmount}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Priority:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.PriorityId}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Transfer To:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.TransferTo}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Disbursed Amount:</td>
                    <td>{SingleRes == null || SingleRes == '' ? '' : SingleRes.DisbursedAmt}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
	</div>
</div>
<div className='col-12 mt-20'>
<table className="table table-bordered table-sm">
  <tbody className='br3'>
    <tr className='brTopBlack'>
      <td className='theadBG'>Date</td>
      <td className='theadBG'>Repayment Amount</td>
    </tr>

    {
      SingleRes.data3 == null || SingleRes.data3 == '' || SingleRes.data3.length == 0 ? (
        <></>
      ):(
        SingleRes.data3.map((item,key)=>{
          return(
          <tr>
            <td>{item.RepaymentDate}</td>
            <td>{item.RepaymentAmount}</td>
          </tr>
          )
        })
        
      )
    }
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
	<tr>
      <td className='amInWord' colSpan={1}>Rupees  Only</td>
      <td className='headTitle'>Total: Rs. 0</td>
    </tr>
  </tbody>
</table>

<table className="table table-bordered table-sm">
  <tbody className='br3'>
    <tr className='brTopBlack'>
      <td className='theadBG'>Item Description</td>
      <td className='theadBG'>Quantity</td>
      <td className='theadBG'>Unit Price</td>
      <td className='theadBG'>Total Price</td>
    </tr>

    {
      SingleRes.data2 == null || SingleRes.data2 == '' || SingleRes.data2.length == 0 ? (
        <></>
      ):(
        SingleRes.data2.map((item,key)=>{
          return(
          <tr>
            <td>{item.ItemName}</td>
            <td>{item.ItemQty}</td>
            <td>{item.ItemCost}</td>
            <td>{item.TotalCost}</td>
          </tr>
          )
        })
        
      )
    }

    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
	<tr>
      <td className='amInWord' >Rupees  Only</td>
      <td className='headTitle'>{SingleRes == null || SingleRes == '' ? '' : SingleRes.sumQTY}</td>
      <td className='headTitle'>-</td>
      <td className='headTitle'>Total: {SingleRes == null || SingleRes == '' ? '' : SingleRes.sumAmount}</td>
    </tr>
  </tbody>
</table>

</div>

<div className='row col-12 mt-100'>
	<div className='col-6'>
    <span className='text-left d-block'></span>
		<p className='sigTitle2'>Requested By</p>
	</div>
	<div className='col-6'>
    <span className='text-left d-block'></span>
	<p className='sigTitle2'>Authorized By</p>
	</div>
</div>
<div className="col-12 text-center pt-4">
  <p className='font-weight-bold'>This is a system generated document and does not requires any signature.</p>
  <p className='font-weight-bold'>If you have any queries, please do not hesitate to contact us at 0322-8233244.</p>
</div>
</section>

</div>

</div>
    </>
  )
}

export default PurchasePrintVoucher