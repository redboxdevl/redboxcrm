import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleInventorySoldAction } from '../../../redux/action/SingleInventorySoldAction';
import './PayVou.css';

const OutwardVoucherPrint = () => {

    const componentRef = useRef();

    const AuthDatas = JSON.parse(localStorage.getItem('authdata'));
    
  const [SingleRes,setSingleRes]= useState([]);

	let { id } = useParams();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>console.log("Print Success")
    });

    const SinglePaymentVoucherRecords = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}chequeoutwardregister/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data[0]);

    }

	console.log("id",id);

	useEffect(() => {
    SinglePaymentVoucherRecords(id);
	  },[id == '' ? '' : id]);

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
<h2 className="hk-pg-title font-weight-600">Payment Voucher</h2>

</div>
<div className="d-flex">
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</div>


</div>

<OtherNavigation/>

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<section className='hk-sec-wrapper PaymentVoucher'>
<div className='d-flex'>
	<div className='col-8'>
    {/* {
      SingleRes.companyId == 27 ? (
       
          <img src='../FrontAsset/images/albarshalogo.svg' width={150} />
        
      ):(
        SingleRes.companyId == 29 ? (
          <img src='../FrontAsset/images/saeedshahlogo.png' width={150} />
        ): SingleRes.companyId == 30 ? (
          <img src='../FrontAsset/images/fatima-orchid.png' width={150} />
        ):(
          <img src='https://www.redbox.estate/assets/img/logo-hibiscus.png' width={150} />
        )
        
      )
    } */}
     <img src={`${actionConfig.REACT_APP_MAIN}${AuthDatas.get_company == null ? '' : AuthDatas.get_company.companyLogo}`} width={150} />
		
		<h2 className='text-capitalize'>Payment Voucher</h2>
		
	</div>
</div>
<div className="d-flex mt-3">
<div className='col-7'>
	<table className="table table-bordered">
  <tbody>
    <tr className='brTop'>
      <td width={200} className="MyBg"><span className='headTitle'>Vourcher Type:</span></td>
      <td>
        Bank Payment Voucher (BPV)
        {/* {SingleRes == '' || SingleRes == null ? '' : SingleRes.paymentType == 'bankPaymentVoucher' ? 'Bank Payment Voucher (BPV)' : SingleRes.paymentType == 'journalVoucher' ? 'Journal Voucher (JV)' : SingleRes.paymentType == 'cashPaymentVoucher' ? 'Cash Payment Voucher (CPV)' : SingleRes.paymentType == 'cashRecieptVoucher' ? 'Cash Reciept Voucher (CRV)' : SingleRes.paymentType == 'bankRecieptVoucher' ? 'Bank Reciept Voucher (BRV)' : SingleRes.paymentType == 'pettyCashVoucher' ? 'Petty Cash Voucher (PCV)' : SingleRes.paymentType} */}
        </td>
      <td></td>
    </tr>
	<tr>
      <td className="MyBg"><span className='headTitle'>Vourcher No:</span></td>
      <td>
        {SingleRes == '' || SingleRes == null ? '' : SingleRes.voucherNo == '' || SingleRes.voucherNo == null ? 'N/a' : SingleRes.voucherNo}
        </td>
      <td></td>
    </tr>
	<tr>
      <td className="MyBg"><span className='headTitle'>Vourcher Date:</span></td>
      <td>
        {SingleRes == '' || SingleRes == null ? '' : SingleRes.currentDate}
        </td>
      <td></td>
    </tr>
	<tr>
      <td className="MyBg"><span className='headTitle'>Issue Date:</span></td>
      <td>
        {SingleRes == '' || SingleRes == null ? '' : SingleRes.issueDateC}
        </td>
      <td></td>
    </tr>
	<tr>
      <td className="MyBg"><span className='headTitle'>
        {/* {SingleRes.paymentType == 'cashRecieptVoucher' ? 'Recieved From:' : 'Pay To:'} */}
        Issue To
        </span></td>
      <td>
        {SingleRes == '' || SingleRes == null ? '' : SingleRes.IssuedTo}
        </td>
      <td></td>
    </tr>

  </tbody>
</table>
	</div>
</div>
<div className="col-12">
  <div style={{padding:20,border:'1px solid #3333',}}>
<p><span className='headTitle'><b className='font-weight-bolder text-dark'>Description:</b> </span>
{SingleRes == '' || SingleRes == null ? '' : SingleRes.Purpose}
</p>
</div>
</div>
<div className='col-12 mt-10'>
<table className="table table-bordered table-striped">
  <tbody>
    <tr className='brTop'>
      <td className='headTitle MyBg'>Cheque Date</td>
      <td className='headTitle MyBg'>Payment Method</td>
      <td className='headTitle MyBg'>Cheque No</td>
      <td className='headTitle MyBg'>Bank Name</td>
      <td className='headTitle MyBg'>Amount</td>
    </tr>
    <tr>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.chequeDateC}</td>
        <td>Cheque</td>
        <td>{SingleRes == '' || SingleRes == null || SingleRes.Chequelist == '' || SingleRes.Chequelist == null ? '' : SingleRes.Chequelist.chequeNo}</td>
        <td>{SingleRes == '' || SingleRes == null || SingleRes.Banklist == '' || SingleRes.Banklist == null ? '' : SingleRes.Banklist.bankname}</td>
        <td>{SingleRes == '' || SingleRes == null ? '' : SingleRes.chequeAmount}</td>
    </tr>
    {/* {
      voucherEntry.length == 0 || voucherEntry == '' || voucherEntry == null ? '' : 
      voucherEntry.map((curElem) => {
        return (
          <tr>
            <td>{curElem.PayDateCoverted}</td>
            <td>{curElem.payMethod}</td>
            <td>{curElem.CheqPoNo}</td>
            <td>{curElem.BankNameList}</td>
            <td>{curElem.PayAmtConverted}</td>
        </tr>
        )
      })
    } */}
	<tr>
      <td className='amInWord' colSpan={3}>
      {SingleRes == '' || SingleRes == null ? '' : SingleRes.ChequeAmountInWord }
       </td>
      <td className='headTitle MyBg' align='right' style={{borderRight:'1px solid #e0e2e4'}}>Total:</td>
      <td className='headTitle MyBg'>PKR &nbsp;
      {SingleRes == '' || SingleRes == null ? '' : SingleRes.chequeAmount}
      </td>
    </tr>
  </tbody>
</table>
</div>
<div className='row col-12 mt-80'>
	<div className='col-3'>
		<p className='sigTitle'>Posted By</p>
	</div>
	<div className='col-3'>
	<p className='sigTitle'>Authorized By</p>
	</div>
	<div className='col-3'>
	<p className='sigTitle'>Approved By</p>
	</div>
	<div className='col-3'>
	<p className='sigTitle'>Recieved By</p>
	</div>
</div>
</section>

</div>

</div>
    </>
  )
}

export default OutwardVoucherPrint