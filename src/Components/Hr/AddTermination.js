import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import Swal from 'sweetalert2'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';

const AddTermination = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
      ListEmployee();
      SingleTerminationRecords();
    },[]);

    const [ListEmployeeResult,setListEmployeeResult]= useState([]);
    const [SingleTermResult,setSingleTermResult]= useState([]);

    const [TerminationType,setTerminationType]=useState('');
    const [Subject,setSubject]=useState('');
    const [TerminationId,setTerminationId]=useState(id);
    const [TerminatedBy,setTerminatedBy]=useState('');
    const [NoticeDate,setNoticeDate]=useState('');
    const [TerminationDate,setTerminationDate]=useState('');
    const [TerminationDesc,setTerminationDesc]=useState('');
    const [EmployeeName,setEmployeeName]=useState('');

    function convertDatePickerTimeToMySQLTime(str) {
      var month, day, year, hours, minutes, seconds;
      var date = new Date(str),
          month = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
      hours = ("0" + date.getHours()).slice(-2);
      minutes = ("0" + date.getMinutes()).slice(-2);
      seconds = ("0" + date.getSeconds()).slice(-2);
  
      var mySQLDate = [date.getFullYear(), month, day].join("-");
      var mySQLTime = [hours, minutes, seconds].join(":");
      return [mySQLDate, mySQLTime].join(" ");
  }
  
    const NoticeDateApply = (event, picker) => {
      const dateDatax = convertDatePickerTimeToMySQLTime(picker._d);
      const newDatax = dateDatax.split(" ");
      setNoticeDate(newDatax[0]);
    };

    const TerminationDateApply = (event, picker) => {
      const dateData = convertDatePickerTimeToMySQLTime(picker._d);
      const newData = dateData.split(" ");
      setTerminationDate(newData[0]);
    };

    const locale = {
      format: 'YYYY-MM-DD HH:mm:ss',
    };

    const ListEmployee = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employee?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setListEmployeeResult(await GetArray);
    }


    const SingleTerminationRecords = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}termination/${id}`);
        const dataxs = await response.json();
        setSingleTermResult(await dataxs.data);
        
        setTerminationType(dataxs.data.type);
        setSubject(dataxs.data.subject);
        setTerminatedBy(dataxs.data.termination_by);
        setNoticeDate(dataxs.data.notice_date);
        setTerminationDate(dataxs.data.termination_date);
        setTerminationDesc(dataxs.data.description);
        setEmployeeName(dataxs.data.emp_id);
        setTerminationId(id);
        
    }
    

    const AddTerminationFormData = (e) =>{
        e.preventDefault();
        
        const FeildData = { emp_id:EmployeeName,subject:Subject,type:TerminationType,description:TerminationDesc,notice_date:NoticeDate,termination_date:TerminationDate,termination_by:TerminatedBy }
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}termination`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.message == 'Data saved successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/termination");
                   
                }else{
                  Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                  );
                }
        
        
            });
        
        }
        
        
        const UpdateTerminationFormData = (e) =>{
          e.preventDefault();
          
          const FeildData = { emp_id:EmployeeName,subject:Subject,type:TerminationType,description:TerminationDesc,notice_date:NoticeDate,termination_date:TerminationDate,termination_by:TerminatedBy }
          
          const requestOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(FeildData)
          };
          
          fetch(`${actionConfig.REACT_APP_URL}termination/${TerminationId}`, requestOptions)
              .then(response => response.json())
              .then(dataexe => {
                  if(dataexe.message == 'Data updated successfully!'){
                    Swal.fire(
                      'Good job!',
                      dataexe.message,
                      'success'
                    );
                    navigate("/termination");
                     
                  }else{
                    Swal.fire(
                      'Error!',
                      dataexe.message,
                      'error'
                    );
                  }
          
          
              });
          
          }
    

  return (
    <>
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Termination</h2>

</div>
<div class="d-flex">
<NavLink to="/termination" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>


<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">

        <form onSubmit={id == null ? AddTerminationFormData : UpdateTerminationFormData}>
<div class="row">


<div class="form-group col-md-6">
<label for="inputPassword4">Employee Name</label>
<select class="form-control" name="company_id" required="" onChange={e=>setEmployeeName(e.target.value)} value={EmployeeName}>
<option value="" selected="">Select Employee</option>
{

ListEmployeeResult.length > 0 ? (

  ListEmployeeResult.map((curElem) => {
return (
<option value={curElem.id}>{curElem.emp_name}</option>
)

})
): (
<>
<option><b>Loading....</b></option>

</>
)


}
</select>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Termination Type</label>
<input type="text" className="form-control" name="type" onChange={e=>setTerminationType(e.target.value)} value={TerminationType}/>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Subject</label>
<input type="text" className="form-control" name="subject" onChange={e=>setSubject(e.target.value)} value={Subject}/>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Terminated By</label>
<input type="text" className="form-control" name="termination_by" onChange={e=>setTerminatedBy(e.target.value)} value={TerminatedBy}/>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Notice Date</label>
{/* <input type="text" className="form-control" name="notice_date" onChange={e=>setNoticeDate(e.target.value)} value={NoticeDate}/> */}
<DateRangePicker
initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale ,opens: 'center',drops:'up' }}
onCallback={NoticeDateApply}
>
  <input class="form-control" type="text" value={NoticeDate} />
</DateRangePicker>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Termination Date</label>
{/* <input type="text" className="form-control" name="termination_date" onChange={e=>setTerminationDate(e.target.value)} value={TerminationDate}/> */}
<DateRangePicker
initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale ,opens: 'center',drops:'up' }}
onCallback={TerminationDateApply}
>
  <input class="form-control" type="text" value={TerminationDate} />
</DateRangePicker>
</div>
</div>

<div class="form-group col-md-12">
<div class="form-group">
<label for="inputAddress">Description</label>
<textarea name="description" id="" cols="30" rows="10" className="form-control" onChange={e=>setTerminationDesc(e.target.value)} value={TerminationDesc}></textarea>
</div>
</div>


</div>

<button type="submit" class="btn btn-primary">Save</button>
</form>

        </section>
    </div>
</div>

</div>
    
    </>
  )
}

export default AddTermination