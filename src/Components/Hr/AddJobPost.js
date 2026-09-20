import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import Swal from 'sweetalert2'
import QuickNav from '../../Includes/QuickNav';
import { actionConfig } from '../../configuration';

const AddJobPost = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        SinglePostRecords();
    },[]);

    const [SinglePostresult,setSinglePostresult]= useState([]);

    const [JobTitleItem,setJobTitleItem]=useState('');
    const [DescriptionItem,setDescriptionItem]=useState('');
    const [PostId,setPostId]=useState(id);
    const [DeadlineItem,setDeadlineItem]=useState('');
    const [PublishDate,setPublishDate]=useState('');
   

    const SinglePostRecords = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}jobpost/${id}`);
        const dataxs = await response.json();
        setSinglePostresult(await dataxs.data);
        
        setJobTitleItem(dataxs.data.job_title);
        setDescriptionItem(dataxs.data.description);
        setDeadlineItem(dataxs.data.deadline);
        setPublishDate(dataxs.data.published_date);
        setPostId(id);
        
    }
    
    const AddJobPostFormData = (e) =>{
        e.preventDefault();
        
        const FeildData = { job_title:JobTitleItem,description:DescriptionItem,status:'active',published_date:PublishDate,deadline:DeadlineItem}
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}jobpost`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.message == 'Data saved successfully!'){
                  Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                  );
                  navigate("/job-post");
                   
                }else{
                  Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                  );
                }
        
        
            });
        
        }
        
        
        const UpdateJobPostFormData = (e) =>{
          e.preventDefault();
          
          const FeildData = { job_title:JobTitleItem,description:DescriptionItem,status:'active',published_date:PublishDate,deadline:DeadlineItem}
          
          const requestOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(FeildData)
          };
          
          fetch(`${actionConfig.REACT_APP_URL}jobpost/${PostId}`, requestOptions)
              .then(response => response.json())
              .then(dataexe => {
                  if(dataexe.message == 'Data updated successfully!'){
                    Swal.fire(
                      'Good job!',
                      dataexe.message,
                      'success'
                    );
                    navigate("/job-post");
                     
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
<h2 className="hk-pg-title font-weight-600">Job Post</h2>

</div>
<div class="d-flex">
<NavLink to="/job-post" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>


<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">

        <form onSubmit={id == null ? AddJobPostFormData : UpdateJobPostFormData}>
<div class="row">



<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Job Title</label>
<input type="text" className="form-control" name="job_title" onChange={e=>setJobTitleItem(e.target.value)} value={JobTitleItem}/>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Description*</label>
<input type="text" class="form-control" name="description" placeholder="Postal Code" required="" autocomplete="off" onChange={e=>setDescriptionItem(e.target.value)} value={DescriptionItem}/>
</div>
</div>
<div class="form-group col-md-6">
<label for="inputPassword4">Deadline</label>
<input type="text" class="form-control" name="contact_number" placeholder="Contact No" required="" autocomplete="off" onChange={e=>setDeadlineItem(e.target.value)} value={DeadlineItem}/>
</div>
<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Publish Date*</label>
<input type="text" class="form-control" name="address" placeholder="Address" required="" autocomplete="off" onChange={e=>setPublishDate(e.target.value)} value={PublishDate}/>
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

export default AddJobPost