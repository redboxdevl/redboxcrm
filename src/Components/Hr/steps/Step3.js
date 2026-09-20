import React from 'react'

const Step3 = ({ formData, setFormData }) => {
  return (
    <>
    <h3>Address & Contacts</h3>
       <div class="row">
<div class="form-group col-md-4">
    <label >Personal Mobile No#</label>
    <input type="text" class="form-control" name="pMobileNo" placeholder="Personal Mobile No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              pMobileNo: e.target.value,
            });
          }} value={formData.pMobileNo}/>
</div>
<div class="form-group col-md-4">
    <label >Offical Mobile No#</label>
    <input type="text" class="form-control" name="oMobileNo" placeholder="Official Mobile No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              oMobileNo: e.target.value,
            });
          }} value={formData.oMobileNo}/>
</div>
<div class="form-group col-md-4">
    <label >Personal Email</label>
    <input type="text" class="form-control" name="pEmail" placeholder="Personal Email" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              pEmail: e.target.value,
            });
          }} value={formData.pEmail}/>
</div>
<div class="form-group col-md-4">
    <label >Offical Email</label>
    <input type="text" class="form-control" name="oEmail" placeholder="Official Email" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              oEmail: e.target.value,
            });
          }} value={formData.oEmail}/>
</div>
</div>
<h4 class="mt-5">Address</h4>
<hr />
<div class="row">
<div class="form-group col-md-6">
    <label >Current Address</label>
    <textarea class="form-control mt-15" name="currentAddress" rows="4" placeholder="Textarea" onChange={(e) => {
            setFormData({
              ...formData,
              currentAddress: e.target.value,
            });
          }} value={formData.currentAddress}></textarea>
</div>
<div class="form-group col-md-6">
    <label >Permanent Address</label>
    <textarea class="form-control mt-15" name="PermanentAddress" rows="4" placeholder="Textarea" onChange={(e) => {
            setFormData({
              ...formData,
              PermanentAddress: e.target.value,
            });
          }} value={formData.PermanentAddress}></textarea>
</div>
<div class="form-group col-md-6">
    <label >Current Address is</label>
    <select id="agent_title" name="CurrentAddressType" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              CurrentAddressType: e.target.value,
            });
          }} value={formData.CurrentAddressType}>
        <option value="Rented">Rented</option>
         <option value="Owned">Owned</option>
    </select>
</div>
<div class="form-group col-md-6">
    <label >Permanent Address is</label>
    <select id="agent_title" name="PermanantAddressType" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              PermanantAddressType: e.target.value,
            });
          }} value={formData.PermanantAddressType}>
        <option value="Rented">Rented</option>
         <option value="Owned">Owned</option>
    </select>
</div>
</div>
<h4 class="mt-5">Emergency Contact</h4>
<hr />
<div class="row">
<div class="form-group col-md-4">
    <label >Emergency Contact Name</label>
    <input type="text" class="form-control" name="emergencyContactNo" placeholder="Emergency Contact No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              emergencyContactNo: e.target.value,
            });
          }} value={formData.emergencyContactNo}/>
</div>
<div class="form-group col-md-4">
    <label >Emergency Phone</label>
    <input type="text" class="form-control" name="emergencyPhoneNo" placeholder="Emergency Phone No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              emergencyPhoneNo: e.target.value,
            });
          }} value={formData.emergencyPhoneNo}/>
</div>
<div class="form-group col-md-4">
    <label >Relation</label>
    <input type="text" class="form-control" name="Relation" placeholder="Relation" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              Relation: e.target.value,
            });
          }} value={formData.Relation}/>
</div>
</div>
<h4 class="mt-5">Reference</h4>
<hr />
<div class="row">
<div class="form-group col-md-6">
    <label >Reference Contact Name</label>
    <input type="text" class="form-control" name="refContactName" placeholder="Reference Contact Name" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              refContactName: e.target.value,
            });
          }} value={formData.refContactName}/>
</div>
<div class="form-group col-md-6">
    <label >Reference Phone</label>
    <input type="text" class="form-control" name="refPhoneNo" placeholder="Reference Phone No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              refPhoneNo: e.target.value,
            });
          }} value={formData.refPhoneNo}/>
</div>

</div> 
    </>
  )
}

export default Step3