import React , {useState, useEffect} from 'react';
import { actionConfig } from '../../../configuration';

const Step4 = ({ formData, setFormData }) => {

  const [HolyDaysResult,setHolyDaysResult]= useState([]);
  const [EmpShiftResult,setEmpShiftResult]= useState([]);
  
  const ListHolyDays = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listholydays`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setHolyDaysResult(await GetArray);
  }


  const Listemployeeshift = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employeeshift`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setEmpShiftResult(await GetArray);
  }

  useEffect(() => {
    ListHolyDays();
    Listemployeeshift();
},[]);

  return (
    <>
    <h3>Attendance & Leaves</h3>
        <div class="row">

<div class="form-group col-md-4">
    <label >Attendance Device ID (Biometric/RF tag ID)</label>
    <input type="text" class="form-control" name="DeviceId" placeholder="Device Id" autocomplete="off" onChange={(e) => {
            setFormData({
              ...formData,
              DeviceId: e.target.value,
            });
          }}
          value={formData.DeviceId}/>
</div>
  {/* <div class="form-group col-md-4">
    <label >Holiday List</label>
    <select id="agent_title" name="HoldayId" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              HoldayId: e.target.value,
            });
          }}
          value={formData.HoldayId}>
        <option value="" selected="">Select Holiday List</option>
        {

HolyDaysResult.length > 0 ? (

  HolyDaysResult.map((curElem) => {

        return (
        <option value={curElem.id}>{curElem.holydays} <br /> {curElem.holydayDate}</option>
        )

        })
        ): (
        <>
        <option><b>No Data Found</b></option>
        </>
        )


        }
    </select>
    <small>Applicable Holiday List</small>
</div> */}
<div class="form-group col-md-4">
    <label >Default Shift</label>
   <select id="agent_title" name="EmpShift" class="form-control" onChange={(e) => {
            setFormData({
              ...formData,
              EmpShift: e.target.value,
            });
          }}
          value={formData.EmpShift}>
        <option value="" selected>Select Default Shift</option>
        {

EmpShiftResult.length > 0 ? (

  EmpShiftResult.map((curElem) => {

        return (
        <option value={curElem.id}>{curElem.shift_name} <br /> {curElem.shift_in} <br /> {curElem.shift_out}</option>
        )

        })
        ): (
        <>
        <option><b>No Data Found</b></option>
        </>
        )


        }
    </select>
</div>
</div>    
    </>
  )
}

export default Step4