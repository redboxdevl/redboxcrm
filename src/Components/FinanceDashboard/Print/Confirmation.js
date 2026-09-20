import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleInventorySoldAction } from '../../../redux/action/SingleInventorySoldAction';
import AffiliateNav from '../../../Includes/AffiliateNav';
import './Confirmation.css';

const Confirmation = () => {

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

{
	
<table width="100%" border="0" className='myTable'>
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
			height:'50vh',
			width:'100%',
		}} >Sample File <br />(For Customer Verification Only)</div>
	</>
)
}	
<thead>
	<tr>
		<td colSpan={12} style={{padding:0}}><img src="../../../FrontAsset/images/form-banner.jpg" alt="" width="100%" className='imgBoxx' /></td>
	</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
	<tr>
		<td colSpan="12" align="center" style={{paddingTop:27,paddingBottom:22}}><h1 style={{marginTop:'0px',fontWeight:800}} className='proIn'>CONFIRMATION</h1></td>
	</tr>
	<tr className='printF'>
		<td colSpan="6">
			<b>Date:</b> <input type="text" class="tracking" value={resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.created_at} />
		</td>
		<td align="right" colSpan="6">
			<b>Tracking #:</b> <input type="text" class="tracking" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.TrackingId}`} />
		</td>
	</tr>
	<tr>
		<td colSpan="12" align="left" style={{paddingBottom:20,paddingTop:20,fontWeight:800}} className='infoTop'>We are pleased to allocate the plot in our prestigious projects. The Particular in our record are as under:</td>
	</tr>
	<tr className="dPlot">
		<td colSpan={12} style={{padding:0}} className='paddingAdd'>
			<table className='wrapBox'>
				<tr>
				<td colSpan={3} >
		<span><b>Plot No:</b> <input type="text" value={resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.property_no} className='plotAllocate' /></span> 
	</td>
	<td colSpan={3} >
		<span><b>Size:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.size} ${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.measuring_unit}`} className='plotAllocate' /></span> 
	</td>
	<td colSpan={3} >
		<span><b>Block:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.block}`} className='plotAllocate' /></span>
	</td>
	<td colSpan={3} >
		<span><b>Category:</b> <input type="text" value={`${resultsoldinvesingle.jsonFormat == null || resultsoldinvesingle.jsonFormat == '' ? '' : resultsoldinvesingle.jsonFormat.property_category}`} className='plotAllocate' /></span>
	</td>
				</tr>
			</table>
		</td>
	
	</tr>
	<tr>
		<td colSpan={8} className='alloteName' style={{paddingTop:10,paddingBottom:10}}>
			<p style={{marginTop:'15px',marginBottom:'10px'}}><b>Allottee's Name: <input type="text" class="tracking2" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_name}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={8}>
			<p style={{marginTop:'5px',marginBottom:'15px'}}><b>S/o., D/o., W/o., <input type="text" class="tracking2" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.father_name}`} /></b></p>
		</td>
	</tr>
	<tr>
		<td colSpan={12} style={{paddingTop:10,paddingBottom:10}} className='cnicBox'>
			<ul class="flexBox">
				<li style={{paddingRight:'10px',paddingTop:'4px'}}><span><b>C.N.I.C. #</b></span></li>
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
		<td colSpan={12} className='addressBox'>
			<b>Address: <input type="text" class="tracking3 tracking4" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_address}`} style={{marginTop:'10px'}} /></b><input type="text" class="tracking3 tracking5" value="" style={{marginTop:'20px',marginBottom:'25px',width:'100%'}} />
		</td>
	</tr>

	<tr>
		<td colSpan={4} className="inquiryForm">
			<b>Landline:</b> <input type="text" class="tracking5" value="" />
		</td>
		<td colSpan={4} className="inquiryForm">
			<b>Mobile #1:</b> <input type="text" class="tracking5" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.mobileNo}`} />
		</td>
		<td colSpan={4} className="inquiryForm">
			<b>Mobile #2:</b> <input type="text" class="tracking5" value={`${resultsoldinvesingle == null || resultsoldinvesingle == '' ? '' : resultsoldinvesingle.nominee_cell}`} />
		</td>
	</tr>

	<tr>
		<td colSpan={12} className='weSuffer'>
			<p style={{paddingLeft:'0px',margin:'10px 0',paddingTop:10,paddingBottom:10,fontWeight:800}}>We are Pleased to confirm the above plot on your favour as per terms and condition specified in the Application form.</p>
		</td>
	</tr>

	<tr>
		
		<td colSpan={6} style={{paddingTop:15}}>
			<input type="text" class="tracking6" value="" />
			<p style={{paddingTop:'0px'}}>Allottee Signature</p>
		</td>
		<td colSpan={6} align="right" style={{paddingTop:15}}>
			<input type="text" class="tracking6" value="" />
			<p style={{paddingTop:'0px'}}>Authorized Signature</p>
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

}

</div>

</div>
    </>
  )
}

export default Confirmation