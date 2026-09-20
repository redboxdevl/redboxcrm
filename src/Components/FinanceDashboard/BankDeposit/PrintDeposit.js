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
import './PayRec.css';

const PrintDeposit = () => {
  
  const [SingleRes,setSingleRes]= useState([]);
    const componentRef = useRef();
	const dispatch = useDispatch();

	let { id } = useParams();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>console.log("Print Success")
    });

	useEffect(() => {
		dispatch(SingleInventorySoldAction(id));
	  },[id == '' ? '' : id]);

    const SinglePettyCash = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}pettycash/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data[0]);
      const finalItems = dataxs.data[0];
    }
  
    useEffect(() => {
      if(id == undefined){
      }else{
        SinglePettyCash(id);
      }
  },[id == undefined ? '' : id]);

  console.log("SingleRes",SingleRes);

  const convertNumberToWords = (amount) => {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">PETTY CASH REPORT (PCR)</h2>

</div>
<div className="d-flex">
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</div>


</div>

<OtherNavigation/>

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<section className='hk-sec-wrapper'>
<div className='d-flex'>
	<div className='col-6'>
  {
      SingleRes.CompanyId == 27 ? (
          <img src='../FrontAsset/images/albarshalogo.svg' width={150} />
      ):(
        SingleRes.CompanyId == 29 ? (
          <img src='../FrontAsset/images/saeedshahlogo.png' width={150} />
        ):(
          <img src='https://www.redbox.estate/assets/img/logo-hibiscus.png' width={150} />
        )
      )
    }
    <br />
	</div>
	<div className='col-6'>
  
	</div>
</div>
<div className='col-12 mt-10'>
  <h2 className='pageTitle'>PETTY CASH REPORT (PCR)</h2>
</div>
<div className='d-flex'>
	<div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="RecNo">
    <table class="table table-bordered table-sm mb-20">
            <tbody className='br3'>
                <tr>
                    <td className='theadBG'>Receipt No.</td>
                    <td>{SingleRes.referenceId}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Assign To:</td>
                    <td>{SingleRes.emp_name}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Assign Amount:</td>
                    <td>{SingleRes.CashAmountFormat}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Untilized Amount.</td>
                    <td>{SingleRes.sumAmountFormat}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Balance:</td>
                    <td>{SingleRes.balanceAmountFormat}</td>
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
                    <td className='theadBG'>Date:</td>
                    <td>{SingleRes.dateOfCash}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Mode:</td>
                    <td>{SingleRes.ModeOfPayment}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Instrument No:</td>
                    <td>{SingleRes.ChequeNo}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Bank Name.</td>
                    <td>{SingleRes.bankName}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Instrument Date:</td>
                    <td>{SingleRes.ChhequeDate}</td>
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
      <td className='pageTitle' colSpan={5}>
      Payment Details
      </td>
    </tr>
    <tr className='brTopBlack'>
      <td className='theadBG'>Transaction Date</td>
      <td className='theadBG'>Transaction Amount</td>
      <td className='theadBG'>Transaction Details</td>
      <td className='theadBG'>Paid To</td>
      <td className='theadBG'>Mode</td>
    </tr>

    {
      SingleRes == '' || SingleRes == null || SingleRes.length == 0 ? (
        <></>
      ) :
      (
        JSON.parse(SingleRes.PettyCashEntry).map((items,key) => {
        return (
        <tr>
            <td>{items.PayDate}</td>
            <td>{items.PayAmt}</td>
            <td>{items.PayDetails}</td>
            <td>{items.PayTo}</td>
            <td>Cash</td>
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
        <td>&nbsp;</td>
    </tr>
    <tr>
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
    </tr>
	<tr>
      <td className='amInWord' colSpan={2}>Rupees {SingleRes == '' || SingleRes == null ? '' : convertNumberToWords(SingleRes.sumAmount)} Only</td>
      <td className='headTitle'>Total:</td>
      <td className='headTitle'>Rs. {SingleRes.sumAmountFormat}</td>
      <td colSpan={3}></td>
    </tr>
  </tbody>
</table>
</div>

<div className='row col-12 mt-100'>
	<div className='col-4'>
    <span className='text-left d-block'>Checked By:</span>
		<p className='sigTitle'>Operations</p>
	</div>
	<div className='col-4'>
    <span className='text-left d-block'>Authorized By:</span>
	<p className='sigTitle'>Finanace</p>
	</div>
	<div className='col-4'>
    <span className='text-left d-block'>Approved By: </span>
	<p className='sigTitle'>CEO</p>
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

export default PrintDeposit