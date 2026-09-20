import React from 'react'

const Step5 = ({ formData, setFormData }) => {
  return (
    <>
    <h3>Salary</h3>
        <div class="row">

<div class="form-group col-md-4">
    <label >Salary Amount</label>
    <input type="text" class="form-control" name="salaryAmount" placeholder="Salary Amount" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              salaryAmount: e.target.value,
            });
          }}
          value={formData.salaryAmount} />
</div>
  <div class="form-group col-md-4">
    <label >Currency</label>
     <input type="text" class="form-control" name="Currency" disabled placeholder="PKR" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              Currency: e.target.value,
            });
          }}
          value={`PKR ${formData.salaryAmount == '' || formData.salaryAmount == null ? '' : formData.salaryAmount}`} />
</div>
<div class="form-group col-md-4">
    <label >Salary Mode</label>
   <select name="SalaryMode" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              SalaryMode: e.target.value,
            });
          }}
          value={formData.SalaryMode}>
        <option value="" selected="">Select Mode</option>
        <option value="Bank">Bank</option>
         <option value="Cash">Cash</option>
         <option value="Cheque">Cheque</option>
    </select>
</div>
<div class={`form-group col-md-6 ${formData.SalaryMode == 'Bank' ? '' : 'd-none'}`}>
    <label >Bank Name</label>
     <input type="text" class="form-control" name="bankName" placeholder="Bank Name" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              bankName: e.target.value,
            });
          }}
          value={formData.bankName} />
</div>
<div class={`form-group col-md-6 ${formData.SalaryMode == 'Bank' ? '' : 'd-none'}`}>
    <label >Bank A/C No.</label>
     <input type="text" class="form-control" name="bankAccount" placeholder="Bank Account No" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              bankAccount: e.target.value,
            });
          }}
          value={formData.bankAccount} />
</div>
</div>
    </>
  )
}

export default Step5