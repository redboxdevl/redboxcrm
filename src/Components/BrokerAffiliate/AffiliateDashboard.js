import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import AffiliateNav from '../../Includes/AffiliateNav'
import { AffiliateLeadsAction } from '../../redux/action/AffiliateLeadsAction';
const AffiliateDashboard = () => {

const resultListing = useSelector(state => state.AffiliateLeadsreducers.affiliateleadsdata);
const dispatch = useDispatch();

const AffiliateAuthData = JSON.parse(localStorage.getItem('affiliateauthdata'));


useEffect(() => {
const AffiliateAuthDatas = JSON.parse(localStorage.getItem('affiliateauthdata'));
dispatch(AffiliateLeadsAction(AffiliateAuthDatas[0].id));
const interval = setInterval(() => {
}, 3000);
return () => clearInterval(interval);
},[]);

console.log(resultListing);


return (
<>
<AffiliateNav />
<div className="hk-pg-wrapper">
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15">
<div className="hk-pg-header">
<div>
<h2 className="hk-pg-title font-weight-600 mb-10">Affilate Dashboard </h2>
</div>
<div className="d-flex">
<button style={{display:'none'}} type="button" className="btn btn-primary mr-1 btn-sm">Bluk Upload</button>
<NavLink to="/affiliate-leads" className="btn btn-primary btn-sm">Add Lead</NavLink>
</div>
</div>

<div className="row">
<div className="col-xl-12">
{/* <div className="row">
<div className="col-lg-3 col-md-6 col-sm-12">
<div className="card mb-20">
<iframe width="100%" height="100" src="https://www.youtube.com/embed/bL9EvyaMXsU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<div className="pl-10 pt-10">
<h5 className="card-title">Video No lore ismpum...</h5>
</div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-sm-12">
<div className="card">
<iframe width="100%" height="100" src="https://www.youtube.com/embed/bL9EvyaMXsU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<div className="pl-10 pt-10">
<h5 className="card-title">Video No lore ismpum...</h5>
</div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-sm-12">
<div className="card">
<iframe width="100%" height="100" src="https://www.youtube.com/embed/bL9EvyaMXsU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<div className="pl-10 pt-10">
<h5 className="card-title">Video No lore ismpum...</h5>
</div>
</div>
</div>

</div> */}
<section className="hk-sec-wrapper">

<div className="row">
<div className="col-sm">
<div className="table-wrap">
<table id="datable_1" className="table table-hover w-100 display pb-30">
<thead className="thead-dark">
<tr>
<th>Lead No</th>
<th>CLient No</th>
<th>Client Name</th>
<th>Project</th>
<th>Created Date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>

{
resultListing == null ? (
<><tr>
<td colSpan="6"><b>Loading....</b></td>
</tr></>
):(

resultListing.length > 0 ? (
resultListing.map((curElem , index) => {
return (
<tr>
<td><NavLink to={`/view-affiliate-leads/${curElem.id}`}>LED-{curElem.id}</NavLink></td>
<td><a href={`tel:${curElem.mobileNo}`}>{curElem.mobileNo}</a></td>
<td>{curElem.clientName}</td>
<td>{curElem.projectid}</td>

<td>{curElem.created_at}</td>
<td><span className="badge badge-primary  badge-pill">Active</span></td>
<td><NavLink to={`/affiliate-activity/${curElem.id}`} className="btn btn-primary btn-sm"> Add Activity</NavLink></td>
</tr>
)
})

):(
<>
<tr>
<td colSpan="6"><b>No record Found....</b></td>
</tr>
</>
)

)
}



</tbody>
</table>
</div>
</div>
</div>
</section>
</div>
</div>
</div>

</div>
</>
)
}

export default AffiliateDashboard