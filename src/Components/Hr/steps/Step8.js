import React from 'react'

const Step8 = () => {
  return (
    <>
    <h3>Exit</h3>
        <div class="row">

<div class="form-group col-md-4">
    <label >Resignation Letter Date</label>
    <input type="date" class="form-control" name="agent_name" placeholder="Full Name" autocomplete="off" />
</div>
  <div class="form-group col-md-4">
    <label >Exit Interview Held On</label>
     <input type="date" class="form-control" name="agent_name" placeholder="PKR" value="PKR" autocomplete="off" />
</div>
<div class="form-group col-md-4">
    <label >Leave Encashed?</label>
   <select id="agent_title" name="agent_title" class="form-control">
        <option value=""></option>
        <option value="Yes">Yes</option>
         <option value="No">No</option>
    </select>
</div>
<div class="form-group col-md-6">
    <label >Relieving Date</label>
     <input type="date" class="form-control" name="agent_name" placeholder="Full Name" autocomplete="off" />
</div>
<div class="form-group col-md-6">
    <label >New Workplace</label>
     <input type="text" class="form-control" name="agent_name" placeholder="Full Name" autocomplete="off" />
</div>
 <div class="form-group col-md-6">
    <label >Reason for Leaving</label>
    <textarea class="form-control" rows="4"></textarea>
</div>
 <div class="form-group col-md-6">
    <label >Feedback</label>
    <textarea class="form-control" rows="4"></textarea>
</div>
</div>
    </>
  )
}

export default Step8