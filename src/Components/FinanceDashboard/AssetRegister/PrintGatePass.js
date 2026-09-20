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

const PrintGatePass = () => {
  
//   const [SingleRes,setSingleRes]= useState([]);
    const componentRef = useRef();
    const [SingleRes,setSingleRes]= useState([]);
// 	const dispatch = useDispatch();

	let { id } = useParams();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>console.log("Print Success")
    });

    const SingleAssetRecords = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}assetregister/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data[0]);
    }

    useEffect(() => {
      if(id == undefined){
      }else{
        SingleAssetRecords(id);
      }
  },[id == undefined ? '' : id]);

// 	useEffect(() => {
// 		dispatch(SingleInventorySoldAction(id));
// 	  },[id == '' ? '' : id]);

//     const SinglePettyCash = async (id) => {
//       const response = await fetch(`${actionConfig.REACT_APP_URL}pettycash/${id}`);
//       const dataxs = await response.json();
//       setSingleRes(await dataxs.data[0]);
//       const finalItems = dataxs.data[0];
//     }
  
//     useEffect(() => {
//       if(id == undefined){
//       }else{
//         SinglePettyCash(id);
//       }
//   },[id == undefined ? '' : id]);


console.log("SingleRes",SingleRes);
  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">GATE PASS PRINT</h2>

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
  <h2 className='pageTitle'>GATE PASS (OUT)</h2>
</div>
<div className='d-flex'>
	<div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="RecNo">
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Date:</td>
                    <td>{SingleRes.Getpass == '' || SingleRes.Getpass == null ? '' : SingleRes.Getpass.GatePassDate}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Name:</td>
                    <td>{SingleRes.Employee == '' || SingleRes.Employee == null ? '' : SingleRes.Employee.emp_name}</td>
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
                    <td className='theadBG'>Time:</td>
                    <td>{SingleRes.Getpass == '' || SingleRes.Getpass == null ? '' : SingleRes.Getpass.GatePassTime}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Department:</td>
                    <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.department_name}</td>
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
      <td className='theadBG'>Asset ID</td>
      <td className='theadBG'>Asset Description</td>
      <td className='theadBG'>Asset Type</td>
      <td className='theadBG'>Asset Location</td>
      <td className='theadBG'>Quantity</td>
      <td className='theadBG'>Place to Go</td>
      <td className='theadBG'>Reason</td>
    </tr>

    <tr>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.rec_id}</td>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.AssetDesc}</td>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.assetType}</td>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.locationName}</td>
        <td>{SingleRes.Getpass == '' || SingleRes.Getpass == null ? '' : SingleRes.Getpass.Quantity}</td>
        <td>{SingleRes.Getpass == '' || SingleRes.Getpass == null ? '' : SingleRes.Getpass.PlaceToGo}</td>
        <td>{SingleRes.Getpass == '' || SingleRes.Getpass == null ? '' : SingleRes.Getpass.Purpose}</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
	{/* <tr>
      <td className='amInWord' colSpan={4}>Rupees  Only</td>
      <td className='headTitle'>Total:</td>
      <td className='headTitle'>Rs. 0</td>
      <td colSpan={3}></td>
    </tr> */}
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

export default PrintGatePass