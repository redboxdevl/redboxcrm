import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Navigation from '../../Includes/Navigation';
import { actionConfig } from '../../configuration';
import axios from 'axios';

const AddProperty = () => {

const navigate = useNavigate();

useEffect(() => {
if(!localStorage.getItem('authdata')){
navigate('/');
}
},[]);

const [BuyerName,setBuyerName]=useState('');
const [ContactNo,setContactNo]=useState('');
const [WhatsappNo,setWhatsappNo]=useState('');
const [EmailAddress,setEmailAddress]=useState('');
const [UnitType,setUnitType]=useState('');
const [PropertyType,setPropertyType]=useState('');
const [UsageType,setUsageType]=useState('');
const [TypeOfBuyer,setTypeOfBuyer]=useState('');
const [PropertyShouldBe,setPropertyShouldBe]=useState('');


return (
<>
<Navigation />
<div class="container-fluid mt-xl-50 mt-sm-30 mt-15" style={{paddingTop:"3rem"}}>

<div class="hk-pg-header">
<div>
<h2 class="hk-pg-title font-weight-600 mb-10">Add Property</h2>
</div>
<div class="d-flex">
</div>
</div>

<div class="row">
<div class="col-xl-12">

<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<form>
<div class="row">
<div class="col-md-4 form-group">
<label for="BuyerName">Buyer Name<span class="text-danger">*</span></label>
<input class="form-control" name="BuyerName" id="BuyerName" placeholder="Name" onChange={e=>setBuyerName(e.target.value)} value={BuyerName} type="text" required/>
</div>

<div class="col-md-4 form-group">
<label for="ContactNo">Contact number <span class="text-danger">*</span></label>
<input class="form-control" name="ContactNo" id="ContactNo" placeholder="Name" onChange={e=>setContactNo(e.target.value)} value={ContactNo} type="text" required/>
</div>

<div class="col-md-4 form-group">
<label for="WhatsappNo">Whatsapp number <span class="text-danger">*</span></label>
<input class="form-control" name="WhatsappNo" id="WhatsappNo" placeholder="Name" onChange={e=>setWhatsappNo(e.target.value)} value={WhatsappNo} type="text" required/>
</div>

<div class="col-md-4 form-group">
<label for="EmailAddress">Email address <span class="text-danger">*</span></label>
<input class="form-control" name="EmailAddress" id="EmailAddress" placeholder="Name" onChange={e=>setEmailAddress(e.target.value)} value={EmailAddress} type="text" required/>
</div>

<div class="col-md-4 form-group">
<label for="UnitType">Unit Type<span class="text-danger"></span></label>
<select class="form-control custom-select d-block w-100" name="UnitType" id="UnitType" onChange={e=>setUnitType(e.target.value)} value={UnitType} >
<option value="">Select Unit Type...</option>
<option value="Studo">Studo</option>
<option value="1">1 Bed</option>
<option value="2">2 Bed</option>
<option value="3">3 Bed</option>
<option value="4">4 Bed</option>
<option value="5">5 Bed</option>
</select>
</div>

<div class="col-md-4 form-group">
<label for="UnitType">Unit Type<span class="text-danger"></span></label>
<select class="form-control custom-select d-block w-100" name="UnitType" id="UnitType" onChange={e=>setUnitType(e.target.value)} value={UnitType} >
<option value="">Select Unit Type...</option>
<optgroup label="Apartment">
<option value="Studo">Studo</option>
<option value="1">1 Bed</option>
<option value="2">2 Bed</option>
<option value="3">3 Bed</option>
<option value="4">4 Bed</option>
<option value="5">5 Bed</option>
</optgroup>

<optgroup label="Town House">
<option value="1">1 Bed</option>
<option value="2">2 Bed</option>
<option value="3">3 Bed</option>
<option value="4">4 Bed</option>
<option value="5">5 Bed</option>
</optgroup>

<optgroup label="Villa">
<option value="1">1 Bed</option>
<option value="2">2 Bed</option>
<option value="3">3 Bed</option>
<option value="4">4 Bed</option>
<option value="5">5 Bed</option>
<option value="6">6 Bed</option>
<option value="7">7 Bed</option>
<option value="8">8 Bed</option>
<option value="9">9 Bed</option>
<option value="10">10 Bed</option>
</optgroup>

<option value="Office">Office</option>
<option value="Retail">Retail</option>
<option value="Warehouse">Warehouse</option>

</select>
</div>

<div class="col-md-4 form-group">
<label for="PropertySize">Property Size</label>
<input class="form-control" id="PropertySize" name="PropertySize" placeholder="" value="" type="text" />
</div>

<div class="col-md-4 form-group">
<label for="Location">Location</label>
<input class="form-control" id="Location" name="Location" placeholder="" value="" type="text" />
</div>

<div class="col-md-4 form-group">
<label for="City">City</label>
<input class="form-control" id="City" name="City" placeholder="" value="" type="text" />
</div>

<div class="col-md-4 form-group">
<label for="AreaOfInterest">Area Of Interest</label>
<input class="form-control" id="AreaOfInterest" name="AreaOfInterest" placeholder="" value="" type="text" />
</div>

<div class="col-md-4 form-group">
<label for="AreaOfInterest">Budget</label>
<input class="form-control" id="AreaOfInterest" name="AreaOfInterest" placeholder="" value="" type="number" />
</div>

<div class="col-md-4 form-group">
<label for="PropertyType">Property Type<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="PropertyType" id="PropertyType" onChange={e=>setPropertyType(e.target.value)} value={PropertyType} required>
<option value="">Select Property Type...</option>
<option value="">Ready</option>
<option value="">Off Plan</option>
</select>
</div>

<div class="col-md-4 form-group">
<label for="UsageType">Usage type<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="UsageType" id="UsageType" onChange={e=>setUsageType(e.target.value)} value={UsageType} required>
<option value="">Select Usage Type...</option>
<option value="">For Investment</option>
<option value="">Self Use</option>
</select>
</div>

<div class="col-md-4 form-group">
<label for="TypeOfBuyer">Type Of Buyer<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="TypeOfBuyer" id="TypeOfBuyer" onChange={e=>setTypeOfBuyer(e.target.value)} value={TypeOfBuyer} required>
<option value="">Select Type Of Buyer...</option>
<option value="">Cash</option>
<option value="">Financed</option>
</select>
</div>

<div class="col-md-4 form-group">
<label for="PropertyShouldBe">Property Should be<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="PropertyShouldBe" id="PropertyShouldBe" onChange={e=>setPropertyShouldBe(e.target.value)} value={PropertyShouldBe} required>
<option value="">Select Property Should Be...</option>
<option value="">Vacant</option>
<option value="">Rented</option>
<option value="">Vacant on Transfer</option>
<option value="">Near Vacant</option>
</select>
</div>

<div class="col-md-4 form-group">
<label for="UnitType">Unit Type<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="UnitType" id="UnitType" onChange={e=>setUnitType(e.target.value)} value={UnitType} required>
<option value="">Select Unit Type...</option>
<option value="">Building</option>
<option value="">Floor</option>
<option value="">Plot</option>
</select>
</div>

</div>

<button class="btn btn-primary" type="submit">Save Properties</button>
</form>
</div>
</div>
</section>
</div>
</div>

</div>
</>
)
}

export default AddProperty