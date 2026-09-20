import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation';
import QuickNav from '../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleInventorySoldAction } from '../../redux/action/SingleInventorySoldAction';
import AffiliateNav from '../../Includes/AffiliateNav';
import './paymentrecieptstyle.css';

const ViewPaymentRecieptPrint = () => {

    const componentRef = useRef();

	const AffiliateAuthData = JSON.parse(localStorage.getItem('affiliateauthdata'));

	console.log("AffiliateAuthData",AffiliateAuthData);

	const resultsoldinvesingle = useSelector(state => state.Singleinventoriesoldreducer.singleinventoriessolddata);
	const dispatch = useDispatch();

	let { id,vid } = useParams();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>console.log("Print Success")
    });

	console.log("id",id);

	useEffect(() => {
		dispatch(SingleInventorySoldAction(id));
	  },[id == '' ? '' : id]);

	  console.log("resultsoldinvesingle",resultsoldinvesingle);

	  let CnicValue =[];

	  if(resultsoldinvesingle == '' || resultsoldinvesingle == undefined || resultsoldinvesingle == null){
		CnicValue =[];
	  }else{
		CnicValue = resultsoldinvesingle.cnic.split("");
	  }

	
	  

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Confirmation</h2>

</div>
<div class="d-flex">
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</div>


</div>

{
	AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? <OtherNavigation/> : <AffiliateNav />
}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<table width="100%" border="0" className='myTable'>
{/* <thead style={{border:'10px solid #F88D25',borderBottom:0}}>
	
</thead> */}

<tbody style={{border:'10px solid #F88D25'}}>

<tr>
		<td colSpan={4} style={{padding:0}}><img src="../../../FrontAsset/images/albarshalogo.svg" alt="" className='imgBoxxRec' /></td>
        <td colSpan={4} style={{padding:0,verticalAlign:'middle',textAlign:'center'}}></td>
        <td colSpan={4} style={{padding:0,verticalAlign:'middle',textAlign:'right'}}>
            <p><b>Date:</b> <input type="text" name="" id="" className='recieptInput' /></p>
            <p><b>Reciept No:</b> <input type="text" name="" id="" className='recieptInput' value="0005" /></p>
            <p><b>Tracking #:</b> <input type="text" name="" id="" className='recieptInput' /></p>
        </td>
	</tr>

	<tr className='printF'>
		<td colSpan="12">
			<b>Recieved with thanks from Mr. / Mrs. / Miss.</b> <input type="text" class="trackingReciepd" value="" />
		</td>
	</tr>

    <tr className='printF'>
		<td colSpan="6" style={{width:'70%'}}>
			<b>S/o., W/o., D/o.,</b> <input type="text" class="trackingReciepd2So" value="" />
		</td>
        <td colSpan="6" style={{width:'30%'}}>
			<b>Contact No.</b> <input type="text" class="trackingReciepdContact" value="" />
		</td>
	</tr>
    <tr className='printF'>
		<td colSpan="12">
			<b>The Sum of Rupees (In Words)</b> <input type="text" class="trackingReciepdSum" value="" />
		</td>
	</tr>
    <tr className='printF'>
		<td colSpan="6" style={{width:'70%'}}>
			<b>Cheque / Pay Order / Cash</b> <input type="text" class="trackingReciepd3Cheque" value="" />
		</td>
        <td colSpan="6" style={{width:'30%'}}>
			<b>Dated</b> <input type="text" class="trackingReciepdDate" value="" />
		</td>
	</tr>
    <tr className='printF'>
		<td colSpan="12">
			<b>Project Name</b> <input type="text" class="trackingReciepdProject" value="" />
		</td>
	</tr>

    <tr className='printF'>
		<td colSpan="3" style={{width:'25%'}}>
			<b>Plot No</b> <input type="text" class="trackingReciepdPlot" value="" />
		</td>
        <td colSpan="3" style={{width:'25%'}}>
			<b>Size</b> <input type="text" class="trackingReciepdSize" value="" />
		</td>
        <td colSpan="3" style={{width:'25%'}}>
			<b>Block</b> <input type="text" class="trackingReciepdBlock" value="" />
		</td>
        <td colSpan="3" style={{width:'25%'}}>
			<b>Category</b> <input type="text" class="trackingReciepdCategory" value="" />
		</td>
	</tr>
    <br />
	<tr>
		
		<td colSpan={6} style={{paddingTop:15}}>
			Rs.<input type="text" class="tracking6Rs" value="" />
			<p style={{paddingTop:'0px'}}>This reciept is valid subject to reliazation of cheque</p>
		</td>
		<td colSpan={6} align="right" style={{paddingTop:15}}>
			<input type="text" class="tracking6" value="" />
			<p style={{paddingTop:'0px'}}>Authorized Signature</p>
		</td>
	</tr>
	<br />
	<tr>
		<td colSpan={1} className="footerS">
			<img src="../../FrontAsset/images/footerlogo.png" alt="" width="60" style={{display:'block',marginLeft:'auto',marginRight:17}}/>
		</td>
		<td className="footerS" colSpan={11} style={{verticalAlign:'middle',paddingLeft:25,borderLeft:'1px solid #333'}}>
		<p >Head Office B-275, Block, Gulshan-E-Iqbal, Karachi.<br />info@thecity108.com | thecity108.com | 021-34833244</p>
		</td>
	</tr>

</tbody>


</table>
</div>

</div>
    </>
  )
}

export default ViewPaymentRecieptPrint