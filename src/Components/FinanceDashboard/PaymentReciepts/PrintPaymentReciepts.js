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

const PrintPaymentReciepts = () => {
  
  const [SingleRes,setSingleRes]= useState([]);
  

  const AuthDatas = JSON.parse(localStorage.getItem('authdata'));

    const componentRef = useRef();

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


    const SinglePaymentRecieptsecords = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}payreciepts/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data[0]);
      const finalItems = dataxs.data[0];
      // setAssetId(dataxs.data[0].id);
  
    }
  
    useEffect(() => {
      if(id == undefined){
      }else{
        SinglePaymentRecieptsecords(id);
      }
  },[id == undefined ? '' : id]);

	  console.log("resultsoldinvesingle",resultsoldinvesingle);

	  let CnicValue =[];

	  if(resultsoldinvesingle == '' || resultsoldinvesingle == undefined || resultsoldinvesingle == null){
		CnicValue =[];
	  }else{
		CnicValue = resultsoldinvesingle.nominee_cnic.split("");
	  }

	
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


  var QrData = "Customer Name: "+SingleRes.CustomerName + " | "+ "CNIC: " +SingleRes.Cnic + " | "+ "Project Name: "+SingleRes.ProjectTitle+ " | "+"Property Type: "+SingleRes.type_name + " | "+"Property No: "+SingleRes.ProNo+" | "+"Size: "+SingleRes.Size+" | "+"Sale Price: "+SingleRes.SaleAmount+" | "+"Total Recieved: "+SingleRes.TotalSumAmounts+" | "+"Discount Price: "+SingleRes.Discount+" | "+"Remaining Amount: "+SingleRes.sumAmxs;

  console.log("SingleRes",SingleRes);

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payment Reciepts</h2>

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
  <img src={`${actionConfig.REACT_APP_MAIN}${AuthDatas.get_company == null ? '' : AuthDatas.get_company.companyLogo}`} width={150} />
    <br />
	</div>
	<div className='col-6'>
    {
      SingleRes.ProjectLogo == '' || SingleRes.ProjectLogo == null ? <></> : <img src={SingleRes == '' || SingleRes == null ? '' : `${actionConfig.REACT_APP_MAIN}${SingleRes.ProjectLogo}`} width={150} className="float-right" />
    }
  
	</div>
</div>
<div className='col-12 mt-10'>
  <h2 className='pageTitle'>Payment Reciept</h2>
</div>
<div className='d-flex'>
	<div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="RecNo">
    <table class="table table-bordered table-sm mb-20">
            <tbody className='br3'>
                <tr>
                    <td className='theadBG'>Receipt No.</td>
                    <td>{SingleRes.RecieptNo}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Project Name:</td>
                    <td>{SingleRes.ProjectTitle}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Property Type:</td>
                    <td>{SingleRes.type_name}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Property No.</td>
                    <td>{SingleRes.ProNo}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Block:</td>
                    <td>{SingleRes.BlockNo}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Size:</td>
                    <td>{SingleRes.Size}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Sale  Price:</td>
                    <td>{SingleRes.SaleAmount}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Discount:</td>
                    <td>{SingleRes.Discount}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
	</div>
	<div className='col-4 d-flex barcode justify-content-center align-items-center'>
    <QRCode value={SingleRes == '' || SingleRes == null ? '' : QrData } size={150} />
  {/* <img src={`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${QrData}&choe=UTF-8`} width={150} height={150} /> */}
  {/* <img src='https://www.qrcode-monkey.com/img/default-preview-qr.svg' width={150} /> */}
	</div>
  <div className='col-4'>
  <div class="table-wrap mt-20">
    <div class="table-responsive">
    <table class="table table-bordered table-sm mb-20">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Receipt Date:</td>
                    <td>{SingleRes.dateOfRecieptCov}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-sm mb-0">
            <tbody className='br3'>
            
                <tr>
                    <td className='theadBG'>Client Name:</td>
                    <td>{SingleRes.CustomerName}</td>
                </tr>
                <tr>
                    <td className='theadBG'>CNIC:</td>
                    <td>{SingleRes.Cnic}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Contact No.</td>
                    <td>{SingleRes.ContactNo}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Reference:</td>
                    <td>{SingleRes.Reference}</td>
                </tr>
                <tr>
                    <td className='theadBG'>Ref. Contact:</td>
                    <td>{SingleRes.ReferenceContactNo}</td>
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
      <td className='pageTitle' colSpan={7}>
      Transaction Details
      </td>
    </tr>
    <tr className='brTopBlack'>
      <td className='theadBG'>Mode Of Payment</td>
      <td className='theadBG'>Date</td>
      <td className='theadBG'>Reference No</td>
      <td className='theadBG'>Bank</td>
      <td className='theadBG'>Amount</td>
      <td className='theadBG'>Reference</td>
      <td className='theadBG'>Transferd To</td>
    </tr>

    {
      SingleRes.PayRecieptToday == '' || SingleRes.PayRecieptToday == null || SingleRes.PayRecieptToday.length == 0 ? '' : SingleRes.PayRecieptToday.map((items,key) => {
        return (
        <tr>
            <td>{items == '' || items == null ? '' : items.payMethod == 'Cash' ? 'Cash' : items.payMethod == 'Cheque' ? 'Cheque' : items.payMethod == 'payorder' ? 'Pay Order' : items.payMethod == 'bankonline' ? 'Bank ( Online )' : items.payMethod}</td>
            <td>{items.PayDates}</td>
            <td>{items.CheqPoNo}</td>
            <td>{items.BankTitle}</td>
            <td>{items.PayAmt}</td>
            <td>{items.referenceName}</td>
            <td>{items.Transferbankname}</td>
         </tr>
        )
      })
    }
    
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
      <td className='amInWord' colSpan={3}>Rupees {SingleRes == '' || SingleRes == null ? '' : convertNumberToWords(SingleRes.TotalSumAmountsFormaTodayt)}  Only</td>
      <td className='headTitle'>Total:</td>
      <td className='headTitle'>Rs. {SingleRes.TotalSumAmountsToday} </td>
      <td colSpan={2}></td>
    </tr>
  </tbody>
</table>
</div>
<div className='col-12 mt-20'>
<table className="table table-bordered table-sm">
  <tbody className='br3'>
    <tr className='brTopBlack'>
      <td className='pageTitle' colSpan={9}>
      Payment Details
      </td>
    </tr>
    <tr className='brTopBlack'>
      <td className='theadBG'>Due Amount</td>
      <td className='theadBG'>Received Amount</td>
      <td className='theadBG'>Transaction Reference</td>
      <td className='theadBG'>Mode</td>
      <td className='theadBG'>Bank</td>
      <td className='theadBG'>Reference</td>
      <td className='theadBG'>Transferd To</td>
      <td className='theadBG'>Received Date</td>
      <td className='theadBG'>Status</td>
    </tr>
    <tr>
    <td colSpan={10}>{SingleRes.SaleAmount}</td>
    </tr>
    {
      SingleRes.PayRecieptHistory == '' || SingleRes.PayRecieptHistory == null ? '' : SingleRes.PayRecieptHistory.map((items,key) => {
        return (
        <tr>
            <td>{items.RemainingAmount}</td>
            <td>{items.Payamount}</td>
            <td>{items.CheqPoNo}</td>
            <td>{items == '' || items == null ? '' : items.payMethod == 'Cash' ? 'Cash' : items.payMethod == 'Cheque' ? 'Cheque' : items.payMethod == 'payorder' ? 'Pay Order' : items.payMethod == 'bankonline' ? 'Bank ( Online )' : items.payMethod}</td>
            <td>{items.BankTitle}</td>
            <td>{items.referenceName}</td>
            <td>{items.Transferbankname}</td>
            <td>{items.PayDates}</td>
            <td>Incomplete</td>
         </tr>
        )
      })
    }
    
    
    <tr>
        <td>{SingleRes.recivedAmt}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.recivedAmt == 0 ? 'Complete' : ''}</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
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
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
	<tr>
      
      <td className='headTitle'>Total:</td>
      <td className='headTitle'>Rs. {SingleRes.TotalSumAmounts} </td>
      <td className='amInWord' colSpan={5}>Rupees {SingleRes == '' || SingleRes == null ? '' : convertNumberToWords(SingleRes.TotalSumAmountsFormat)} Only</td>
    </tr>
  </tbody>
</table>
</div>

<div className='col-12 mt-20'>
<table className="table table-bordered table-sm">
  <tbody className='br3'>
    <tr className='brTopBlack'>
      <td className='pageTitle' colSpan={9}>
      Remarks Details
      </td>
    </tr>
    <tr>
        <td><p>{SingleRes.Remarks}</p></td>
    </tr>
  </tbody>
</table>
</div>

<div className='row col-12 mt-100'>
	<div className='col-4'>
    <span className='text-center d-block'>Received By: {SingleRes.emp_name}</span>
		<p className='sigTitle'>Finance</p>
	</div>
	<div className='col-4'>
  <span className='text-center d-block'>Authorized By: {SingleRes.AuthorizedByPerson}</span>
	<p className='sigTitle'>Partner</p>
	</div>
	<div className='col-4'>
    <span className='text-center d-block'>Acknowledged By: {SingleRes.CustomerName}</span>
	<p className='sigTitle'>Client</p>
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

export default PrintPaymentReciepts