import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Select from 'react-select'
import Swal from 'sweetalert2'
import QuickNav from '../../../Includes/QuickNav'
import OtherNavigation from '../../../Includes/OtherNavigation'
import { VideoCatAction } from '../../../redux/action/VideoCatAction'
import { InventoriesAction } from '../../../redux/action/InventoriesAction';
import { EducationAction } from '../../../redux/action/EducationAction';
import { useNavigate } from 'react-router-dom';
import { actionConfig } from '../../../configuration';

const GenderOpt = [
   { value: 'Male', label: 'Male' },
   { value: 'Female', label: 'Female' },
   { value: 'Both', label: 'Both' }
 ]

 const AgeOpt = [
   { value: '10-20', label: '10-20' },
   { value: '20-25', label: '20-25' },
   { value: '25-30', label: '25-30' },
   { value: '30-35', label: '30-35' },
   { value: '35-40', label: '35-40' },
   { value: '40-50', label: '40-50' },
 ]

 const LocationOpt = [
   { value: 'Karachi', label: 'Karachi' },
   { value: 'Interior', label: 'Interior' },
   { value: 'Interior Sindh', label: 'Interior Sindh' },
   { value: 'Pakistan', label: 'Pakistan' },
   { value: 'Overseas', label: 'Overseas' },
 ]

const VideoRequest = () => {
    
   const navigate = useNavigate();

   const AuthData = JSON.parse(localStorage.getItem('authdata'));

   const VideoCatresult = useSelector(state => state.VideoCatreducers.videocatleaddata);
   const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);
   const resultEducations = useSelector(state => state.Educationreducers.educationdata);
   const dispatch = useDispatch();
   
   const [inputFields, setInputFields] = useState([
      {outline: ''},
      {outline: ''},
      {outline: ''},
      {outline: ''},
      {outline: ''},
  ])

   const [EducatonData,setEducatonData]= useState([]);
   const [VideoCatId,setVideoCatId]= useState('');
   const [VideoFormat,setVideoFormat]= useState('');
   const [VideoTopic,setVideoTopic]= useState('');
   const [VideoProjectId,setVideoProjectId]= useState('0');
   const [OtherCategory,setOtherCategory]= useState('-');
   const [Gender,setGender]= useState('');
   const [AgeGroup,setAgeGroup]= useState('');
   const [VideoEducation,setVideoEducation]= useState('');
   const [VideoLocation,setVideoLocation]= useState('');
   const [VideoOutline,setVideoOutline]= useState('');
   const [GuestName,setGuestName]= useState('-');
   const [refPpt,setrefPpt]= useState('');
   const [refPdf,setrefPdf]= useState('');
   const [refWeb,setrefWeb]= useState('');
   const [refVideo,setrefVideo]= useState('');
   const [SpecialInst,setSpecialInst]= useState('');

   const [Cond,setCond]= useState(false);
   const [VideoCond,setVideoCond]= useState(false);
   const [VideoFormatCond,setVideoFormatCond]= useState(false);


   const handleFormChange = (index, event) => {
      let data = [...inputFields];
      data[index][event.target.name] = event.target.value;
      setVideoOutline(data);
   }

   useEffect(() => {
      dispatch(VideoCatAction());
      dispatch(InventoriesAction());
      dispatch(EducationAction());
      if(VideoCatId == '4'){
         setCond(true);
         setVideoCond(false);
      }else if(VideoCatId == '3'){
         setVideoCond(true);
         setCond(false);
      }else{
         setCond(false);
         setVideoCond(false);
      }

      if(VideoFormat == 'Solo'){
         setVideoFormatCond(false);
      }else if(VideoFormat == 'As a Guest'){
         setVideoFormatCond(true);
      }else{
         setVideoFormatCond(false);
      }
      var optionsxs = [];
      resultEducations.map((datax)=>{
         optionsxs.push({
            value: datax.id,
            label: datax.education_name
        });
      })
      setEducatonData(optionsxs)
    },[VideoCatId,VideoFormat]);


    const GenderdHandler = (value)=>{
      setGender(value);
    }
    const AgedHandler = (value)=>{
      setAgeGroup(value);
    }
    const EducationHandler = (value)=>{
      setVideoEducation(value);
    }
    const LocationHandler = (value)=>{
      setVideoLocation(value);
    }

    
  const changeHandler = (event) => {
   // setEmployeePic(event.target.files[0]);
};

const AddVideoRequestForm = (e) => {
 e.preventDefault();
 
 const FeildData = { emp_id:AuthData.id,video_category_id:VideoCatId,project_id:VideoProjectId,video_format:VideoFormat,video_topic:VideoTopic,guest_name:GuestName,other_category:OtherCategory,gender:Gender,age_group:AgeGroup,education:VideoEducation,location:VideoLocation,video_outline:VideoOutline,video_instructions:SpecialInst,video_ref_image:'test',video_ref_ppt:refPpt,video_ref_pdf:refPdf,video_ref_web:refWeb,video_ref_video:refVideo}
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FeildData)
    };

    fetch(`${actionConfig.REACT_APP_URL}videorequest`, requestOptions)
        .then(response => response.json())
        .then(dataexe => {
            if(dataexe.code == 200){
              Swal.fire(
                'Good job!',
                dataexe.message,
                'success'
              );
              navigate("/view-video-request");
               
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
<h2 className="hk-pg-title font-weight-600">Video Request Form</h2>
<p>Welcome to Customer Relationship Management for SellMore..</p>
</div>

<QuickNav />

</div>

<OtherNavigation/>
<form onSubmit={AddVideoRequestForm}>
<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">

<div class="row">
<div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Video Category <span class="text-danger">*</span></label>
<select name="videoCategory" id="" class="form-control videoCategory" required onChange={e=>setVideoCatId(e.target.value)} value={VideoCatId}>
<option value="">Select Video Category</option>
{
   VideoCatresult.length > 0 ? (
      VideoCatresult.map((catData)=>{
         return (
            <>
               <option value={catData.id}>{catData.video_category_name}</option>
            </>
         )
      })
   ):(
      <></>
   )
}
</select>
</div>
</div>
{
   VideoCond == true ? (
      <>
      <div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Projects</label>
<select name="Projects" id="" class="form-control" onChange={e=>setVideoProjectId(e.target.value)} value={VideoProjectId}>
<option value="">Select Projects</option>
{
   resultInventories.length > 0 ? (
      resultInventories.map((InvData)=>{
         return (
            <><option value={InvData.id}>{InvData.project_name}</option></>
         )
      })
   ):(
      <></>
   )
}
</select>
</div>
</div></>
   ):(
      <></>
   )
}

{
   Cond == true ? (
      <>
      <div class="col-md-4 col-xs-6 categoryOtherHide">
<div class="form-group">
<label for="">Others</label>
<input type="text" name="otherCategory" class="form-control" placeholder="Write Your Video Category" onChange={e=>setOtherCategory(e.target.value)} value={OtherCategory}/> </div>
</div>
      </>
   ):(
      <></>
   )
}


<div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Video Format <span class="text-danger">*</span></label>
<select name="videoFormat" id="" class="form-control videoFormat" required onChange={e=>setVideoFormat(e.target.value)} value={VideoFormat}>
<option value="">Select Video Format</option>
<option value="Solo">Solo</option>
<option value="As a Guest">As a Guest</option>
</select>
</div>
</div>
{
   VideoFormatCond == true ? (
      <>
      <div class="col-md-4 col-xs-12 GuestHide">
<div class="form-group">
<label for="">Guest Name</label>
<input type="text" name="guestName" class="form-control" placeholder="Write The Name Of Guest" onChange={e=>setGuestName(e.target.value)} value={GuestName}/> </div>
</div>
      </>
   ):(
      <></>
   )
}

<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Video Topic <span class="text-danger">*</span></label>
<input type="text" name="videoTopic" class="form-control" placeholder="Video Topic" required="" onChange={e=>setVideoTopic(e.target.value)} value={VideoTopic}/> </div>
</div>
</div>

</div>
</section>
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Choose Your Viewers</h5>
<div class="row">
<div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Gender <span class="text-danger">*</span></label>
<Select isMulti defaultInputValue='' placeholder='Select Gender' options={GenderOpt} onChange={GenderdHandler} />
</div>
</div>

<div class="col-md-4 col-xs-6">
<div class="form-group">
<label for="">Age Group <span class="text-danger">*</span></label>
<Select isMulti defaultInputValue='' placeholder='Select Age' options={AgeOpt} onChange={AgedHandler}/>
</div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Education <span class="text-danger">*</span></label>
<Select isMulti defaultInputValue='' placeholder='Select Education' options={EducatonData} onChange={EducationHandler}/>
</div>
</div>
<div class="col-md-4 col-xs-12">
<div class="form-group">
<label for="">Locaton *</label>
<Select isMulti defaultInputValue='' placeholder='Select Gender' options={LocationOpt} onChange={LocationHandler}/>
</div>
</div>
</div>
</section>
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Details</h5>
<div class="row">
<div class="col-md-12">
<div class="row">
<div class="col-md-6">
<div class="table-responsive">
<table class="table table-bordered">
<thead>
   <tr class="table-dark">
      <th class="">Video Outline ( Must 5 Field Required )</th>
   </tr>
</thead>
<tbody>
{inputFields.map((input, index) => {
          return (
   <tr key={index}>
      <td>
         <input type="text" name="outline" class="form-control" required placeholder="Outline 1" value={input.outline} onChange={event => handleFormChange(index, event)}/>
      </td>
   </tr>
       )
      })}
</tbody>
</table>
</div>
</div>
<div class="col-md-6">
<div class="table-responsive">
<table class="table table-bordered">
<thead>
   <tr class="table-dark">
      <th class="">References</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td colspan="2">
      <div class="form-group mb-0 col-md-12 d-flex">
<label for="inputCity" class="pr-3">Reference Image ( If Any )</label>
<input type="file" onChange={changeHandler}/>
</div>
      </td>
   </tr>
   <tr>
      <td >
         <input type="text" class="form-control" required placeholder="Video Links" onChange={e=>setrefVideo(e.target.value)} value={refVideo}/>
      </td>
   </tr>
   <tr>
      <td >
         <input type="text" class="form-control" required placeholder="PPT" onChange={e=>setrefPpt(e.target.value)} value={refPpt}/>
      </td>
   </tr>
   <tr>
      <td >
         <input type="text" class="form-control" required placeholder="PDF" onChange={e=>setrefPdf(e.target.value)} value={refPdf}/>
      </td>
   </tr>
   <tr>
      <td>
         <input type="text" class="form-control" required placeholder="Web Links" onChange={e=>setrefWeb(e.target.value)} value={refWeb}/>
      </td>
   </tr>
</tbody>
</table>
</div>
</div>
<div class="col-md-6">
<div class="table-responsive">
<table class="table table-bordered">
<thead>
   <tr class="table-dark">
      <th class="">Special Instructions ( If Any )</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td >
         <textarea name="" id="" cols="30" rows="3" className="form-control" onChange={e=>setSpecialInst(e.target.value)} value={SpecialInst}></textarea>
      </td>
   </tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
<hr />
<button type="submit" class="btn btn-primary mr-10">Submit</button>
<button type="submit" class="btn btn-light">Cancel</button>
</section>
</div>
</div>
</form>

</div>
</>
)
}

export default VideoRequest