import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import AffiliateNav from '../../Includes/AffiliateNav';
import { SingleAffiliateAction } from '../../redux/action/SingleAffiliateAction'

const ViewAffiliateLeads = () => {

const navigate = useNavigate();

let { id } = useParams();

const SingleresultListing = useSelector(state => state.SingleAffiliatereducers.singleaffiliatedata);
const dispatch = useDispatch();

useEffect(() => {
dispatch(SingleAffiliateAction(id));
const interval = setInterval(() => {
}, 3000);
return () => clearInterval(interval);
},[id]);

console.log(SingleresultListing);


return (
<>
<AffiliateNav />
<div class="container-fluid mt-xl-50 mt-sm-30 mt-15" style={{paddingTop:"3rem"}}>

<div class="hk-pg-header">
<div>
<h2 class="hk-pg-title font-weight-600 mb-10">Leads Details</h2>
</div>
<div class="d-flex">
</div>
</div>

<div class="row">
<div class="col-xl-12">
<section class="hk-sec-wrapper">

<div class="row">

<div class="col-md-3 col-sm-3 noDesktopInfoRightPadding">
<div class="buyerDetailInfoLeft">
<div class="avatar">
    <span class="avatar-text avatar-text-info rounded-circle"><span class="initial-wrap"><span>AM</span></span>
    </span>
</div>
<br />

<h4>{SingleresultListing == '' ? '' : SingleresultListing.clientName}</h4><br /><br />
<div class="contactBox">
<h6 class="notranslate">Contact</h6><br /><br />
<a class="notranslate" href={`mailto:${SingleresultListing == '' ? '' : SingleresultListing.email}`} style={{wordBreak:'break-all'}} >Send {SingleresultListing == '' ? '' : SingleresultListing.email} an Email</a><br /><br /><span id="j_id0:j_id7:j_id47">
    
    <h5 id="mp">{SingleresultListing == '' ? '' : SingleresultListing.mobileNo}</h5>
    <a href="#" onclick="showSendEmailPopuop();return false;">
        
    </a>
    
    <br /></span>

<br /><br />
</div>

</div>
</div>

<div class="col-md-9 col-sm-9 noDesktopInfoLeftPadding">
<div class="row">
<div class="col-md-4">
<div class="infoInnerBox">
    <h4 class="">Customer Information</h4><br /><br />
    <div class="contentBox">
        <h6 class="notranslate">Gender</h6><br />
        <h5><span id="j_id0:j_id7:j_id61">{SingleresultListing == '' ? '-' : SingleresultListing.Gender}</span>
        </h5>
    </div>
    <div class="contentBox">
        <h6 class="notranslate">Passport Number</h6><br />
        <h5><span id="j_id0:j_id7:j_id66">{SingleresultListing == '' ? '-' : SingleresultListing.passportCnic}</span>
        
        </h5>
    </div>
    <div class="contentBox">
        <h6 class="notranslate">Whatsapp No</h6><br />
        
        <h5><span id="j_id0:j_id7:j_id71">{SingleresultListing == '' ? '-' : SingleresultListing.whatsappNo}</span>
        
        </h5>
    </div>
</div>
</div>
<div class="col-md-4">
<div class="infoInnerBox">
    <h4 class="">Client preferences</h4><br /><br />
    <div class="contentBox">
        <h6 class="notranslate">PREFERRED LANGUAGE</h6><br />
        <h5><span id="j_id0:j_id7:j_id74">{SingleresultListing == '' ? '-' : SingleresultListing.prefLanguage}</span>
        </h5>
    </div>
    <div class="contentBox">
        <h6 class="notranslate">BUDGET</h6><br />
        <h5><span id="j_id0:j_id7:j_id79">{SingleresultListing == '' ? '-' : SingleresultListing.Budget}</span>
        </h5><br />
    </div>
    <div class="contentBox">
        <h6 class="notranslate">TIME FRAME</h6><br />
        <h5><span id="j_id0:j_id7:j_id84">{SingleresultListing == '' ? '-' : SingleresultListing.timeFrame}</span>
        </h5><br />
    </div>
    <div class="contentBox">
        <h6 class="notranslate">ACTIVITY MEDIUM</h6><br />
        <h5><span id="j_id0:j_id7:j_id89">{SingleresultListing == '' ? '-' : SingleresultListing.activityName}</span>
        </h5><br />
    </div>
</div>
</div>
<div class="col-md-4">
<div class="infoInnerBox">
    <h4>Additional Information</h4><br /><br />
    <div class="contentBox">
        <h6 class="notranslate">Agent Referral</h6><br />
        
        <h5><span id="j_id0:j_id7:j_id99">{SingleresultListing == '' ? '-' : SingleresultListing.agentEmp == '' || SingleresultListing.agentEmp == null ? '' : SingleresultListing.agentEmp.full_name}</span>
        </h5><br />
    </div>
        <div class="contentBox">
        <h6>CLient Interest</h6><br />
        
        <h5><span id="j_id0:j_id7:j_id106">{SingleresultListing == '' ? '-' : SingleresultListing.clientInterst}</span>
        </h5><br />
    </div>
    <div class="contentBox">
        <h6 class="notranslate">CREATED BY</h6><br />
        <h5><span id="j_id0:j_id7:j_id109">{SingleresultListing == '' ? '-' : SingleresultListing.created_at}</span>
        </h5><br />
    </div>
    <div class="contentBox">
        <h6>Created Date/Time</h6><br />
        <h5><span id="j_id0:j_id7:j_id114">{SingleresultListing == '' ? '-' : SingleresultListing.updated_at}</span>
        </h5><br />
    </div>

</div>
</div>
</div>
</div> 
</div>
</section>
</div>
</div>

</div>

</>
)
}

export default ViewAffiliateLeads