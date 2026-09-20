import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';

const AddTrainingType = () => {

  const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
      SingleTrainingRecords();
},[id]);

  
    const [SingleTrainingresult,setSingleTrainingresult]= useState([]);
    const [TrainingTResult,setTrainingTResult]= useState([]);

    const [TrainingTypeTitle,setTrainingTypeTitle]=useState('');
    const [TrainingId,setTrainingId]=useState(id);

    const ListTrainingType = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}trainingtype?agentId=1`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setTrainingTResult(await GetArray);
      }

      const SingleTrainingRecords = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}trainingtype/${id}`);
        const dataxs = await response.json();
        setSingleTrainingresult(await dataxs.data);
        setTrainingId(id);
        setTrainingTypeTitle(dataxs.data.training_type_name);
        console.log(id);
    }

      useEffect(() => {
        ListTrainingType();
  },[]);

    const AddTrainingTYpeFormData = (e) =>{
      e.preventDefault();
      
      const FeildData = { training_type_name:TrainingTypeTitle}
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}trainingtype`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.message == 'Data saved successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/training");
                   
                }else{
                  Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                  );
                }
        
        
            });
        
      
    }
      
      
      const UpdateTrainingTYpeFormData = (e) =>{
        e.preventDefault();

        const FeildData = { training_type_name:TrainingTypeTitle}
        
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}trainingtype/${TrainingId}`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
              
                if(dataex.message == 'Data updated successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/training");
                   
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
<h2 className="hk-pg-title font-weight-600">Training Type</h2>

</div>

</div>

<OtherNavigation/>

<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">
        <form onSubmit={id == null ? AddTrainingTYpeFormData : UpdateTrainingTYpeFormData}>
<div class="row">



<div class="form-group col-md-12">
<label for="inputPassword4">Title</label>
<input type="text" class="form-control" name="father_name" placeholder="Enter Title" required="" autocomplete="off" onChange={e=>setTrainingTypeTitle(e.target.value)} value={TrainingTypeTitle}/>
</div>

</div>

<button type="submit" class="btn btn-primary">Save</button>
</form>
        </section>
    </div>
</div>


<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Type Name</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {

TrainingTResult.length> 0 ? (

  TrainingTResult.map((curElem,index) => {

return (
<tr>
    <td>{index+1}</td>
    <td>{curElem.training_type_name}</td>
    <td><NavLink to={`/add-training-type/${curElem.id}`}><button className="btn btn-primary btn-rounded btn-sm">Update</button></NavLink>
    
    </td>
</tr>
)

})
): (
<>
<tr>
<td colspan="7"><b>No Record Found....</b></td>
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
    
    
    </>
  )
}

export default AddTrainingType