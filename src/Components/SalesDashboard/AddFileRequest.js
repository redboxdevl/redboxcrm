import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink } from 'react-router-dom';

const AddFileRequest = () => {
return (
<>

<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
<div>
<h2 className="hk-pg-title font-weight-600">File Request Form</h2>
</div>
</div>

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Client Infromation</h5>
<div class="col-md-12 col-xs-12 col-sm-12">
<form>
<div class="row">
<div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Client Name <span class="text-danger">*</span></label>
<input type="text"  disabled name="guestName" class="form-control" placeholder="Client Name" />
</div>
</div>

<div class="col-md-4 col-xs-12 GuestHide">
<div class="form-group">
<label for="">Project Name</label>
<input type="text"  disabled name="guestName" class="form-control" placeholder="Project Name" /> </div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Cell No<span class="text-danger">*</span></label>
<input type="text" disabled name="videoTopic" class="form-control" placeholder="Cell No" required="" /> </div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">CNIC<span class="text-danger">*</span></label>
<input type="text" disabled name="videoTopic" class="form-control" placeholder="Cnic" required="" /> </div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Agent Name<span class="text-danger">*</span></label>
<input type="text" disabled name="videoTopic" class="form-control" placeholder="Consultant Name" required="" /> </div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">File Due Date<span class="text-danger">*</span></label>
<input type="date" name="videoTopic" class="form-control" placeholder="Video Topic" required="" /> </div>
</div>
<div class="col-md-12 col-xs-12">
<div class="form-group">
<label for="">Special Instructions<span class="text-danger">*</span></label>
<textarea class="form-control mt-15" rows="5" placeholder="Textarea"></textarea></div>
</div>
</div>
</form>
</div>
</section>
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Deal Details</h5>
<div class="row">
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Unit No<span class="text-danger">*</span></label>
<select name="videoCategory" id="" class="form-control videoCategory" required="">
<option value="">Select Unit</option>
<option>R-23</option>
<option>R-24</option>
</select> </div>
</div>
<div class="col-md-4 col-xs-12"> 
<div class="form-group">
<label for="">Size<span class="text-danger">*</span></label>
<input type="text" disabled name="videoTopic" class="form-control" placeholder="Video Topic" required="" /> </div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Block/Floor/Phase/Sector<span class="text-danger">*</span></label>
<input type="text" disabled name="videoTopic" class="form-control" placeholder="Video Topic" required="" /> </div>
</div>
</div>
</section>
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Documents Details</h5>
<div class="row">
<div class="col-md-12">
<div class="mt-10 row">
<div class="col-md-2  mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck4" />
<label class="custom-control-label" for="customCheck4">Client Pic</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck5" />
<label class="custom-control-label" for="customCheck5">Nominee Pic</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck6" />
<label class="custom-control-label" for="customCheck6">Relation Ship</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck7" />
<label class="custom-control-label" for="customCheck7">Client CNIC</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck8" />
<label class="custom-control-label" for="customCheck8">Nominee CNIC</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck9" />
<label class="custom-control-label" for="customCheck9">NDC / NOC</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck10" />
<label class="custom-control-label" for="customCheck10">Authority Latter</label>
</div>
</div>
</div>
</div>
</div>
<h5 class="hk-sec-title mt-15">Payment Method</h5>
<div class="row">
<div class="col-md-12">
<div class="mt-10 row">
<div class="col-md-2  mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck422" />
<label class="custom-control-label" for="customCheck422">Cash</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck522" />
<label class="custom-control-label" for="customCheck522">Cheque</label>
</div>
</div>
<div class="col-md-2 mr-15 mt-1">
<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="customCheck622" />
<label class="custom-control-label" for="customCheck622">Pay Order / DD</label>
</div>
</div>
</div>
</div>
</div>
<hr />
<button type="submit" class="btn btn-primary mr-10">Submit</button>
<button type="submit" class="btn btn-light">Cancel</button>
</section>
</div>
</div>

</div>

</>
)
}

export default AddFileRequest