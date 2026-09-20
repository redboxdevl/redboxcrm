import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';


const Companies = () => {

  const [result,setResult]= useState([]);

  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      ListCompanies();
  },[]);


  var countCompanies = result.length;

return (
<>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Company</h2>

</div>
<div class="d-flex">
<NavLink to="/add-companies" className="btn btn-primary btn-rounded btn-sm">Add New Company</NavLink>
</div>


</div>

<OtherNavigation/>


<div class="row">
<div class="col-xl-12">
<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Company Name</th>
        <th>Country</th>
        <th>City</th>
        <th>Contact No</th>
        <th>Address</th>
        <th>Logo</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {

countCompanies > 0 ? (

  result.map((curElem) => {

return (
<tr>
      <td>COM-{curElem.id}</td>
      <td>{curElem.company_name}</td>
      <td>{curElem.country_name}</td>
      <td>{curElem.cityName}</td>
      <td>{curElem.contact_number}</td>
      <td>{curElem.address}</td>
      <td><img src={`${actionConfig.REACT_APP_MAIN}${curElem.companyLogo}`} width="50" /></td>
      <td><span class="badge badge-success badge-sm">Active</span></td>
      <td><NavLink to={`/add-companies/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink></td>
    </tr>

)

})
): (
<>
<tr>
<td colspan="7"><b>Loading....</b></td>
</tr>
</>
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

</>
)
}

export default Companies