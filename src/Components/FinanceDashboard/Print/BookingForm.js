import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleInventorySoldAction } from '../../../redux/action/SingleInventorySoldAction';
import './Booking.css';
import AffiliateNav from '../../../Includes/AffiliateNav';

const BookingForm = () => {

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


	  let DOBValue =[];

	  if(resultsoldinvesingle == '' || resultsoldinvesingle == undefined || resultsoldinvesingle == null){
		DOBValue =[];
	  }else{
		DOBValue = resultsoldinvesingle.date_of_birth.split("");
	  }

	
	  console.log("resultsoldinvesingle",resultsoldinvesingle);
	  

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Booking Form</h2>

</div>
<div class="d-flex">
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</div>


</div>

{
	AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? <OtherNavigation/> : <AffiliateNav />
}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<table width="100%" border="0" className='myBookingTable'>
{
vid == '' || vid == null ? '' : (
	<>
		<div style={{
			position:'absolute',
			fontSize:'50px',
			fontWeight:'bold',
			textTransform:"uppercase",
			opacity:0.2,
			transform:'rotate(42deg)',
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
			textAlign:'center',
			height:'100vh',
			width:'100%',
		}} >Sample File <br />(For Customer Verification Only)</div>
	</>
)
}	
<tbody style={{border:'10px solid #F88D25'}}>
<tr>
		<td>
			
				<img src={`${actionConfig.REACT_APP_MAIN}${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.client_image}`} className='profilePic'/>
			
		</td>
	</tr>
	<tr>
		<td colSpan="4">
		<img src='https://www.redbox.estate/backoffice/projectData/ProjectLogo/cbd8c707a283d8b95860b21ba754ae71.png' width={150}></img>
		</td>
		<td colSpan="4" align="center"><h1 style={{marginTop:'30px',fontWeight:800,position:'absolute',left:'35%'}} className='proIn'>BOOKING FORM</h1></td>
		<td align="right" colSpan="4">
			<div className='bookingTR'>
				<div><b className='cap'>No:</b> <input type="text" class="bookingNo" value={resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.created_at} /></div>
				<div><b className='cap'>Tracking #:</b> <input type="text" class="bookingTracking" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.TrackingId}`} /></div>
			</div>
		</td>
	</tr>
	<tr className=''>
		
		
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p><b className='cap'>Applicant Name: <input type="text" class="tracking24booking" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.clientName}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8}>
			<p><b className='cap'>Father's/Husband's Name: <input type="text" class="tracking2booking" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.father_name}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={12} className='cnicBox'>
			<ul class="flexBoxBooking">
				<li style={{paddingRight:'130px',paddingTop:'4px'}}><span><b className='cap'>CNIC/NICOP:</b></span></li>
				{
					CnicValue.length == 0 ? (
						<></>
					):(
						CnicValue.map((itemV,key)=>{
							return (
								<li><input type="text" value={itemV} /></li>
							)
						})
					)
				}
			</ul>
		</td>
	</tr>
	<tr>
		<td colSpan={12} style={{paddingTop:10,paddingBottom:10}} className='cnicBox'>
			<ul class="flexBoxBooking">
				<li style={{paddingRight:'43px',paddingTop:'4px'}}><span><b className='cap'>Passport No. (if any):</b></span></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
				<li><input type="text" value="0" /></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td colSpan={12} className='cnicBox'>
			<ul class="flexBoxBooking">
				<li style={{paddingRight:'102px',paddingTop:'4px'}}><span><b className='cap'>Date of Birth:</b></span></li>
				{
					DOBValue.length == 0 ? (
						<></>
					):(
						DOBValue.map((itemV,key)=>{
							return (
								<li><input type="text" value={itemV} /></li>
							)
						})
					)
				}
			</ul>
		</td>
	</tr>
	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Nationailty: <input type="text" class="booking45" value="Pakistani"/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Occupation: <input type="text" class="booking46" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.OccuptationTitle}`}/></b>
		</td>
	</tr>
	<tr>
		<td colSpan={12} className='addressBox'>
			<b className='cap'>Address: <input type="text" class="bookingAddress" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_address}`} style={{marginTop:'10px'}} /></b><input type="text" class="bookingAddLine2" value="" />
		</td>
	</tr>
	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Email: <input type="text" class="booking50" value={resultsoldinvesingle == null || resultsoldinvesingle == '' || resultsoldinvesingle.email == null ? '' : resultsoldinvesingle.email}/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Landline No: <input type="text" class="booking501" value="-"/></b>
		</td>
	</tr>
	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Mobile No 1: <input type="text" class="booking502" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.mobileNo}`}/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Mobile No 2: <input type="text" class="booking503" value="-"/></b>
		</td>
	</tr>
	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>for booking pay order/cheque no: <input type="text" class="booking504" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.cheque_no}`}/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Bank: <input type="text" class="booking505" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.bank_name}`}/></b>
		</td>
	</tr>
	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Date: <input type="text" class="booking506" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.created_at}`}/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Amount in figure: <input type="text" class="booking507" value="-"/></b>
		</td>
	</tr>
	<tr>
		<td colSpan={12} className='addressBox'>
			<b className='cap'>Amount in words: <input type="text" class="ainw" value="" style={{marginTop:'10px'}} /></b>
		</td>
	</tr>
	<tr>
		<td colSpan={12} style={{padding:0,paddingTop:10}}>
			<table className='wrapBox'>
				<tr>
				<td colSpan={3} >
		<span><b className='cap'>Plot No:</b> <input type="text" value={resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.property_no} className='plotAllocateBooking' /></span> 
	</td>
	<td colSpan={3} >
		<span><b className='cap'>Size:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.size} ${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.measuring_unit}`} className='plotAllocateBooking' /></span> 
	</td>
	<td colSpan={3} >
		<span><b className='cap'>Block:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.block}`} className='plotAllocateBooking' /></span>
	</td>
	<td colSpan={3} >
		<span><b className='cap'>Category:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.property_category}`} className='plotAllocateBooking' /></span>
	</td>
				</tr>
			</table>
		</td>
	
	</tr>
	
	<tr>
		<td colSpan={12}>
		<hr></hr>
		</td>
	</tr>
	<tr>
		<td colSpan={12}>
		<span className='nomDetails'>Nominee Detail</span>
		</td>
	</tr>
	<tr>
		<td>
			
				<img src={`${actionConfig.REACT_APP_MAIN}${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_image}`} className='nomineePic'/>
			
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p ><b className='cap'>Name: <input type="text" class="bookingNomine" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_name}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p ><b className='cap'>Father's/husband's Name: <input type="text" class="bookingNomine2" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nomineeFatherHusbandName}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p ><b className='cap'>Mobile No: <input type="text" class="bookingNomine" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_cell}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p ><b className='cap'>CNIC/Nicop: <input type="text" class="bookingNomine" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_cnic}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p ><b className='cap'>Relation with applicant: <input type="text" class="bookingNomine2" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.relationship_title}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8} className='alloteName'>
			<p><b className='cap'>Address: <input type="text" class="bookingNomine" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_address}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={12}>
		<hr></hr>
		</td>
	</tr>
	<tr>
		<td colSpan={12} className='weSuffer'>
			<p className='bookingNote'>i certify that (1) The above particulars are correct (2) i shall abide by the instructions/terms and conditions give over leaf</p>
		</td>
	</tr>

	<tr>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Applicant's Signature: <input type="text" class="bookingapp" value="-"/></b>
		</td>
		<td colSpan={6} className='addressBox'>
		<b className='cap'>Date: <input type="text" class="bookingdate" value="-"/></b>
		</td>
	</tr>
	
	<tr>
		<td colSpan={12} style={{paddingTop:15,paddingBottom:15,paddingLeft:0,paddingRight:0}}>
			<p className='StrikerPic' style={{backgroundColor:'#000',fontSize:'11px',padding:'5px',textTransform:'uppercase',color:'white',letterSpacing:'5.8px',textAlign:'center'}}>al-barsha Developer al-barsha Developer al-barsha Developer al-barsha Developer al-barsha Developer al-</p>
		</td>
	</tr>
	<tr>
		<td colSpan={1} className="footerS">
			<img src="../FrontAsset/images/footerlogo.png" alt="" width="60" style={{display:'block',marginLeft:'auto',marginRight:17}}/>
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

export default BookingForm