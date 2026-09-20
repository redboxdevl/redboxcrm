import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import { actionConfig } from '../../configuration';

const LeaveType = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    const [ProDetailsresult,setProDetailsresult]= useState([]);

    const [LeaveTypeName,setLeaveTypeName]=useState('');
    const [NoOfDays,setNoOfDays]=useState('');
    const [TypeId,setTypeId]=useState(id);
    
    
    const [Cond,setCond]=useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        setNoOfDays("");
        setLeaveTypeName("");
        
    }

    const [LeaveTypeResult,setLeaveTypeResult]= useState([]);

    const ListLaveTypes = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}leavetype?agentId=1`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setLeaveTypeResult(await GetArray);
      }

      const GetTypeDetails = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}leavetype/${id}`);
        const dataxs = await response.json();
        setProDetailsresult(await dataxs.data);
        setLeaveTypeName(dataxs.data.leave_type_name);
        setNoOfDays(dataxs.data.num_of_days);
        setTypeId(id);
        
        }

      useEffect(() => {
        GetTypeDetails();
        ListLaveTypes();
        if(id == null){
            
        }else{
            setShow(true); 
            
        }
      },[id]);


    const AddLeaveTypeFormData = (e) =>{
        e.preventDefault();
        
        const FeildData = { leave_type_name:LeaveTypeName,num_of_days:NoOfDays}
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}leavetype`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.message == 'Data saved successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/leave-type");

                    setLeaveTypeName("");
                    setNoOfDays("");

                    setShow(false);

                    ListLaveTypes();

                   
                }else{
                  Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                  );
                }
        
        
            });
        
        }


        const UpdateLeaveTypeFormData = (e) =>{
            e.preventDefault();
            
            const FeildData = { leave_type_name:LeaveTypeName,num_of_days:NoOfDays}
            
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FeildData)
            };
            
            fetch(`${actionConfig.REACT_APP_URL}leavetype/${TypeId}`, requestOptions)
                .then(response => response.json())
                .then(dataex => {
                    
                    if(dataex.message == 'Data updated successfully!'){
                      Swal.fire(
                        'Good job!',
                        dataex.message,
                        'success'
                      );
                      navigate("/leave-type");
    
                        setLeaveTypeName("");
                        setNoOfDays("");
    
                        setShow(false);

                        ListLaveTypes();
    
                       
                    }else{
                      Swal.fire(
                        'Error!',
                        dataex.message,
                        'error'
                      );
                    }
            
            
                });
            
            }

            console.log(LeaveTypeResult);

  return (
    
    <>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Leave Type</h2>

</div>
<div class="d-flex">
<button type="button" class="btn btn-primary btn-rounded btn-sm" onClick={handleShow}>
Add New Leave Type
</button>
</div>


</div>

<OtherNavigation/>


<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
   <thead class="thead-dark">
      <tr>
         <th>Des ID</th>
         <th>Leave Type Name</th>
         <th>No Of Days</th>
         <th>Status</th>
         <th>Actions</th>
      </tr>
   </thead>
   <tbody>
   {

LeaveTypeResult.length > 0 ? (

    LeaveTypeResult.map((curElem,index) => {

return (
<tr>
<td>Des-{index+1}</td>
<td>{curElem.leave_type_name}</td>
<td>{curElem.num_of_days}</td>
<td><span class="badge badge-sm badge-green">Active</span></td>
<td><NavLink to={`/leave-type/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
<button class="btn btn-danger btn-rounded btn-sm">Delete</button>
</td>
</tr>
)

})
): (
<>
<tr>
<td colspan="4"><b>No Record Found....</b></td>
</tr>
</>
)


}
   
      
   </tbody>
</table>
</div>
</div>
</div>


</div>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Leave Type</Modal.Title>
  </Modal.Header>
  <Modal.Body>

  <form onSubmit={id == null ? AddLeaveTypeFormData : UpdateLeaveTypeFormData}>

<div class="form-group col-md-12">
<label for="inputPassword4">Leave Type Name*</label>
<input type="text" class="form-control" name="agent_name" placeholder="Name" required="" autocomplete="off" onChange={e=>setLeaveTypeName(e.target.value)} value={LeaveTypeName}/>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">No Of Days*</label>
<input type="text" class="form-control" name="noofdays" placeholder="No Of Days" required="" autocomplete="off" onChange={e=>setNoOfDays(e.target.value)} value={NoOfDays}/>
</div>

<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<button type="submit" class="btn btn-primary">Save changes</button>
</div>
</form>
  </Modal.Body>
</Modal>


        
    </>
  )
}

export default LeaveType