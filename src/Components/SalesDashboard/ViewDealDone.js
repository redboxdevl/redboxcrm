import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink } from 'react-router-dom';

const ViewDealDone = () => {
return (
<>

<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div class="hk-pg-header">
<div class="d-flex justify-content-between">
<div>
<h2 class="hk-pg-title font-weight-600 mb-10">Sale Form</h2>
</div>
<div>
<a href="#" class="text-secondary mr-15">
<span class="feather-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer">
<polyline points="6 9 6 2 18 2 18 9"></polyline>
<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
<rect x="6" y="14" width="12" height="8"></rect>
</svg>
</span>
</a>
<a href="#" class="text-secondary mr-15">
<span class="feather-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download">
<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
<polyline points="7 10 12 15 17 10"></polyline>
<line x1="12" y1="15" x2="12" y2="3"></line>
</svg>
</span>
</a>
</div>

</div>
</div>


<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper hk-invoice-wrap pa-35">
<div class="invoice-from-wrap">
<div class="row">
<div class="col-md-7 mb-20">
<img class="d-block img-fluid invoice-brand-img mb-20" width="25%" src="../FrontAsset/dist/img/logo2.png" alt="brand"/>
<h6 class="mb-5">PAKISTAN'S #1 PROPERTY FOR SALE | REAL ESTATE CONSULTANCY KARACHI</h6>
<address>
<span class="d-block">B-275, Gulshan-E-Iqbal</span>
<span class="d-block">Block 10, Karachi, Pakistan.</span>
<span class="d-block">info@redbox.estate</span>
</address>
</div>
<div class="col-md-5 mb-20">
<h4 class="mb-35 font-weight-600">Invoice / Receipt</h4>
<span class="d-block">Date:<span class="pl-10 text-dark">Nov 17,2017 11:23 AM</span></span>
<span class="d-block">Invoice / Receipt #<span class="pl-10 text-dark">21321434</span></span>

</div>
</div>
</div>
<div class="row">


<div class="col-md-4 mb-10">
<div class="sno">
<p>Allotee: </p>
<input class="inputfield" type="text" disabled="" value="Abdul Sami Khan" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p> Father Name: </p>
<input class="inputfield" type="text" disabled="" value="Abdul Majeed Khan" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>CNIC: </p>
<input class="inputfield" type="text" disabled="" value="42101-8874438-7" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Cell No: </p>
<input class="inputfield" type="text" disabled="" value="03452702203" />
</div>
</div>

<div class="col-md-6">
<div class="sno">
<p>Address </p>
<input class="inputfield" type="text" disabled="" value="R-23, Block B, Sheet No 68, Saima Arabian Villas" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Nominee : </p>
<input class="inputfield" type="text" disabled="" value="Nauman  Bajwa" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Relation: <input class="inputfield" type="text" disabled="" value="Cozn" />
</p>
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>CNIC: </p>
<input class="inputfield" type="text" disabled="" value="42101-1674752-9" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Cell No: </p>
<input class="inputfield" type="text" disabled="" value="03002896042 " />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Address <input class="inputfield" type="text" disabled="" value="70/5 Sector 5D New Karachi
" />
</p>
</div>
</div>

<div class="col-md-12 mb-10 mt-10">
<h3 class="font-30 text-primary">Details</h3>
<hr />
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Project </p>
<input class="inputfield" type="text" disabled="" value="ASF City" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Category: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Size: </p>
<input class="inputfield" type="text" disabled="" value="125 Sq/Yd" />
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Block/Floor/Phase/Sector: </p>
<input class="inputfield" type="text" disabled="" value="R-23, Block B, Sheet No 68, ASF City Karachi" />
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Deal Amount: </p>
<input class="inputfield" type="text" disabled="" value="1600000" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Revenue: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-4 mb-10">
<div class="sno">
<p>Commission: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-12 mb-10 mt-10">
<h3 class="font-30 text-primary">Purpose Of Pyament</h3>
<hr />
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox mycheck" checked="" disabled="" /> Token: </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Down Payment: </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Installment: </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Full Cash </p>
</div>
</div>
<div class="col-md-12 mb-10 mt-10">
<h3 class="font-30 text-primary">Mode of Pyament</h3>
<hr />
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" checked="" disabled="" /> Chq </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Cash </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Bank Transfer </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" checked="" /> REDBOX </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Builder </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Naveed Shah </p>
</div>
</div>
<div class="col-md-3 mb-10">
<div class="box">
<p><input type="checkbox" class="inline-checkbox" disabled="" /> Saeed Shah </p>
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Chq No: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Amount: </p>
<input class="inputfield" type="text" disabled="" value="1300000" />
</div>
</div>
<div class="col-md-12">
<div class="sno amountword">
<p>Amount in Words: </p>
<input class="inputfield" type="text" disabled="" value="thirteen lakhs Rupees " />
</div>
</div>
<div class="col-md-12">
<div class="table-responsive">
<table class="table table-striped mb-0">
<thead class="thead-dark">
<tr>
<th>Due Date</th>
<th>Due Amount</th>
<th>Recived Amount</th>
<th>Status</th>
<th>Reference</th>
<th>Recived Date</th>
</tr>
</thead>
<tbody>
<tr>
<td>2021-09-14</td>
<td>200000</td>
<td>1300000</td>
<td>Pending</td>
<td></td>
<td>2021-09-06</td>
</tr>
<tr>
<td>2021-09-23</td>
<td>300000</td>
<td>1300000</td>
<td>Pending</td>
<td></td>
<td>2021-09-18</td>
</tr>
</tbody>
</table>
</div>
</div>
<div class="col-md mt-15">
<img src="assets/signatures/simran.png" alt="" class="signatureimg" />
<div class="signature">
<p>Sales Consultant</p>
</div>
</div>
<div class="col-md mt-15">
<img src="" alt="" class="signatureimg" />
<div class="signature">
<p>Finance</p>
</div>
</div>
<div class="col-md mt-15">
<img src="" alt="" class="signatureimg" />
<div class="signature">
<p>Team Lead</p>
<p>
</p>
</div>
</div>
<div class="col-md mt-15">
<img src="" alt="" class="signatureimg" />
<div class="signature">
<p>Operation</p>
</div>
</div>
<div class="col-md mt-15">
<img src="" alt="" class="signatureimg" />
<div class="signature">
<p>Partner</p>
</div>
</div>
<div class="col-md-12">
<hr style={{border:'2px dotted'}}/>
</div>
<div class="col-md-12">
<div class="officeuse">
<h1 class="font-32 text-center text-danger" style={{fontWeight:'bold'}}>FOR OFFICE USE</h1>
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Deal Amount: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-6">
<div class="sno">
<p>Revenue: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-6 mb-35">
<div class="sno">
<p>Expenses (if any): </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md-6 mb-35">
<div class="sno">
<p>Commission: </p>
<input class="inputfield" type="text" disabled="" />
</div>
</div>
<div class="col-md mb-10 mt-25">
<div class="signature">
<p>Finance</p>
</div>
</div>
<div class="col-md-4 mb-10">
<div class="blacnk">
<p></p>
</div>
</div>
<div class="col-md mb-10 mt-25">
<div class="signature">
<p>Partner</p>
</div>
</div>

</div>
</section>
</div>
</div>

</div>

</>
)
}

export default ViewDealDone