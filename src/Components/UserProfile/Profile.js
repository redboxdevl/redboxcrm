import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, Link } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';

const Profile = () => {

    const EmpData = useSelector(state => state.SingleEmpreducers.singleempdata);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        dispatch(SingleEmpAction(AuthData.id));
      },[]);

    // const AuthData = JSON.parse(localStorage.getItem('authdata'));
   console.log("profile page",EmpData);
  return (
    <>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-2">

    <OtherNavigation/>


	<div class="row">
<div class="col-xl-12 pa-0">
<div class="profile-cover-wrap overlay-wrap">
<div class="profile-cover-img" style={{backgroundImage:"url('FrontAsset/dist/img/trans-bg.jpg')"}}></div>
<div class="bg-overlay bg-trans-dark-60"></div>
<div class="container profile-cover-content py-50">
<div class="hk-row"> 
<div class="col-lg-6">
<div class="media align-items-center">
	<div class="media-img-wrap  d-flex">
		<div class="avatar">
			<img src={EmpData.profile_pic == '' ? `https://via.placeholder.com/150x150` : `${actionConfig.REACT_APP_MAIN}${EmpData.profile_pic}`} alt="user" class="avatar-img rounded-circle" />
		</div>
	</div>
	<div class="media-body">
		<div class="text-white text-capitalize display-6 mb-5 font-weight-400">{EmpData == '' ? '' : EmpData.emp_name}</div>
		<div class="font-14 text-white"><span class="mr-5"><span class="font-weight-500 pr-5">{EmpData == '' ? '' : EmpData.email}</span></span></div>
	</div>
</div>
</div>
<div class="col-lg-6">
<div class="button-list">
	<Link to="/chat" class="btn btn-dark btn-wth-icon icon-wthot-bg btn-rounded"><span class="btn-text">Message</span><span class="icon-label"><i class="icon ion-md-mail"></i> </span></Link>
</div>
</div>
</div>
</div>
</div>	
<div class="tab-content mt-30">
<div class="tab-pane fade show active" role="tabpanel">
<div class="container">
<div class="hk-row">
<div class="col-lg-8">
	<div class="card card-profile-feed">
        
		<div class="card-body">
			<div class="row">



<div class="col-md-12 col-sm-12 noDesktopInfoLeftPadding">
<div class="row">

<div class="col-md-6">
    <div class="infoInnerBox">
        <div class="contentBox">
            <h6 class="notranslate">Father Name</h6><br />
            <h5><span id="j_id0:j_id7:j_id74">-</span>
            </h5>
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Birth Date</h6><br />
            <h5><span id="j_id0:j_id7:j_id79">{EmpData == '' ? '-' : EmpData.dob}</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">CNIC</h6><br />
            <h5><span id="j_id0:j_id7:j_id84">-</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Marital Status</h6><br />
            <h5><span id="j_id0:j_id7:j_id89">{EmpData == '' ? '-' : EmpData.marital_status}</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Contact Number</h6><br />
            <h5><span id="j_id0:j_id7:j_id94">{EmpData == '' ? '-' : EmpData.phone_number}</span>
            </h5><br />
        </div>
    </div>
</div>
<div class="col-md-6">
    <div class="infoInnerBox">
        <div class="contentBox">
            <h6 class="notranslate">Official Mobile No</h6><br />
            
            <h5><span id="j_id0:j_id7:j_id99">{EmpData == '' ? '-' : EmpData.mobile_number}</span>
            </h5><br />
        </div>
         <div class="contentBox">
            <h6 class="notranslate">Department Name</h6><br />
            
            <h5><span id="j_id0:j_id7:j_id106">{EmpData.get_department == null ? '-' : EmpData.get_department.department_name}</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Designation</h6><br />
            <h5><span id="j_id0:j_id7:j_id109">{EmpData.get_designation == null ? '-' : EmpData.get_designation.designation_name}</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Joining Date</h6><br />
            <h5><span id="j_id0:j_id7:j_id114">{EmpData == '' ? '-' : EmpData.joining_date}</span>
            </h5><br />
        </div>
        <div class="contentBox">
            <h6 class="notranslate">Address</h6><br />
            <h5><span id="j_id0:j_id7:j_id120">-</span>
            </h5><br />
        </div>
    </div>
</div>
</div>
</div> 
</div>
			
		</div>
    </div>
	
	
</div>
<div class="col-lg-4">
	<div class="card card-profile-feed">
		<ul class="list-group list-group-flush">
            <li class="list-group-item"><span><i class="ion ion-md-calendar font-18 text-light-20 mr-10"></i><span>Went to:</span></span><span class="ml-5 text-dark">Pakistan</span></li>
            <li class="list-group-item"><span><i class="ion ion-md-briefcase font-18 text-light-20 mr-10"></i><span>Worked at:</span></span><span class="ml-5 text-dark">Redbox</span></li>
            {/* <li class="list-group-item"><span><i class="ion ion-md-home font-18 text-light-20 mr-10"></i><span>Lives in:</span></span><span class="ml-5 text-dark">San Francisco, CA</span></li>
            <li class="list-group-item"><span><i class="ion ion-md-pin font-18 text-light-20 mr-10"></i><span>City:</span></span><span class="ml-5 text-dark">Settle, WA</span></li> */}
        </ul>
	 </div>
</div>
</div>
</div>
</div>
</div>	
</div>
</div>z

</div>

    </>
  )
}

export default Profile