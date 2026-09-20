import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import { actionConfig } from '../../configuration';

const Holiday = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    const [ProDetailsresult,setProDetailsresult]= useState([]);

    const [HolydaysName,setHolydaysName]=useState('');
    const [HolydaysDate,setHolydaysDate]=useState('');
    const [HolydaysId,setHolydaysId]=useState(id);
    
    
    const [Cond,setCond]=useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        setHolydaysName("");
        setHolydaysDate("");
        
    }

    const [HolydaysResult,setHolydaysResult]= useState([]);

    const ListHolydays = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}holydays`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setHolydaysResult(await GetArray);
      }

      const GetTypeDetails = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}holydays/${id}`);
        const dataxs = await response.json();
        setProDetailsresult(await dataxs.data);
        setHolydaysName(dataxs.data.holydays);
        setHolydaysDate(dataxs.data.holydayDate);
        setHolydaysId(id);
        
        }

      useEffect(() => {
        GetTypeDetails();
        ListHolydays();
        if(id == null){
            
        }else{
            setShow(true); 
            
        }
      },[id]);


    const AddHolydaysFormData = (e) =>{
        e.preventDefault();
        
        const FeildData = { holydays:HolydaysName,holydayDate:HolydaysDate}
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}holydays`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.message == 'Data saved successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/holiday");

                  setHolydaysName("");
                  setHolydaysDate("");

                    setShow(false);

                    ListHolydays();

                   
                }else{
                  Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                  );
                }
        
        
            });
        
        }


        const UpdateHolydaysFormData = (e) =>{
            e.preventDefault();
            
            const FeildData = { holydays:HolydaysName,holydayDate:HolydaysDate}

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FeildData)
            };
            
            fetch(`${actionConfig.REACT_APP_URL}holydays/${HolydaysId}`, requestOptions)
                .then(response => response.json())
                .then(dataex => {
                    
                    if(dataex.message == 'Data updated successfully!'){
                      Swal.fire(
                        'Good job!',
                        dataex.message,
                        'success'
                      );
                      navigate("/holiday");
    
                      setHolydaysName("");
                      setHolydaysDate("");
    
                        setShow(false);

                        ListHolydays();
    
                       
                    }else{
                      Swal.fire(
                        'Error!',
                        dataex.message,
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
<h2 className="hk-pg-title font-weight-600">Holidays</h2>

</div>
<div class="d-flex">
<button type="button" class="btn btn-primary btn-rounded btn-sm" onClick={handleShow}>
Add New Holiday
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
         <th>Holydays Name</th>
         <th>Holydays Date</th>
         <th>Status</th>
         <th>Actions</th>
      </tr>
   </thead>
   <tbody>
   {

HolydaysResult.length > 0 ? (

    HolydaysResult.map((curElem,index) => {

return (
<tr>
<td>Des-{index+1}</td>
<td>{curElem.holydays}</td>
<td>{curElem.holydayDate}</td>
<td><span class="badge badge-sm badge-green">Active</span></td>
<td><NavLink to={`/holiday/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
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
    <Modal.Title>Add Holydays</Modal.Title>
  </Modal.Header>
  <Modal.Body>

  <form onSubmit={id == null ? AddHolydaysFormData : UpdateHolydaysFormData}>

<div class="form-group col-md-12">
<label for="inputPassword4">Holdays Name*</label>
<input type="text" class="form-control" name="holdays_name" placeholder="Holydays Name" required autocomplete="off" onChange={e=>setHolydaysName(e.target.value)} value={HolydaysName}/>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">Holy Days Date*</label>
<input type="date" class="form-control" name="holydatsDate" placeholder="Holy Days Date" required autocomplete="off" onChange={e=>setHolydaysDate(e.target.value)} value={HolydaysDate}/>
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

export default Holiday