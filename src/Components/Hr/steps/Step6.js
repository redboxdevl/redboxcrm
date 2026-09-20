import React from 'react'

const Step6 = ({ formData, setFormData }) => {
  return (
    <>
    <h3>Personal</h3>
        <div class="row">

<div class="form-group col-md-6">
    <label >Marital Status</label>
    <select id="maritalStatus" name="maritalStatus" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              maritalStatus: e.target.value,
            });
          }}
          value={formData.maritalStatus}>
    <option value="" selected>Select Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>                   
    </select>
</div>
<div class="form-group col-md-6">
    <label >Blood Group</label>
    <select id="bloodGroup" name="bloodGroup" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              bloodGroup: e.target.value,
            });
          }}
          value={formData.bloodGroup}>
        <option value="" selected>Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
    </select>
</div>
 <div class="form-group col-md-6">
    <label >Family Background</label>
    <textarea class="form-control" rows="4" name="FamilyBackground" placeholder="Here you can maintain family details like name and occupation of parent, spouse and children" onChange={(e) => {
            setFormData({
              ...formData,
              FamilyBackground: e.target.value,
            });
          }}
          value={formData.FamilyBackground}></textarea>
</div>
<div class="form-group col-md-6">
    <label >Health Details</label>
    <textarea class="form-control" rows="4" name="healthDetails" placeholder="Here you can maintain height, weight, allergies, medical concerns etc" onChange={(e) => {
            setFormData({
              ...formData,
              healthDetails: e.target.value,
            });
          }}
          value={formData.healthDetails}></textarea>
</div>
</div>
    </>
  )
}

export default Step6