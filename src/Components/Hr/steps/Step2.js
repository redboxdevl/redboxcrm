import React from 'react'

const Step2 = ({ formData, setFormData }) => {
  return (
    <>
    <h3>Joining</h3>
       <div class="row">

<div class="form-group col-md-4">
    <label >Date Of Confrimation</label>
    <input type="date" class="form-control" name="dateOfConfirmation" placeholder="Date Of Confirmation" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              dateOfConfirmation: e.target.value,
            });
          }} value={formData.dateOfConfirmation} />
</div>
  <div class="form-group col-md-4">
    <label >Probation Period</label>
    <select id="agent_title" name="ProbationPeriod" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              ProbationPeriod: e.target.value,
            });
          }} value={formData.ProbationPeriod}>
        <option value="" selected>Select Probation</option>
        <option value="3m">3 Months</option>
         <option value="6m">6 Months</option>
         <option value="9m">9 Months</option>
        <option value="1y">1 Year</option>
    </select>
</div>
<div class="form-group col-md-4">
    <label >Date Of Probation</label>
    <input type="date" class="form-control" name="dateOfProbation" placeholder="Date Of Probation" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              dateOfProbation: e.target.value,
            });
          }} value={formData.dateOfProbation}/>
</div>
</div> 
    </>
  )
}

export default Step2