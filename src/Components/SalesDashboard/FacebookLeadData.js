import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
// import VirginData from './AssignLeads/VirginData';
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink } from 'react-router-dom';
import { AssignLeadsAction } from '../../redux/action/AssignLeadsAction';
import { NotinterestedReasonAction } from '../../redux/action/NotinterestedReasonAction';
import { CallingActions } from '../../redux/action/CallingActions';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import { actionConfig } from '../../configuration';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Select from 'react-select'
import axios from 'axios';


const FacebookLeadData = () => {

    const [search,setSearch]= useState('');


    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios(`https://www.towerfiftyone.com/zongapi/facebookLeads/checkingfb.php`,{cancelToken: source.token}).then((res)=>{
            console.log("res",res);
        }).catch((thrown) => {
            console.log(thrown);
        });
        
    },[]);

    

    const handleSearch = () => {

    }

return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Facebook Leads</h2>
</div>
<div>

</div>
</div>

<div class="row pb-3">
  <div className="col-md-4">
    <div className="form-group">
      <label htmlFor="">Search Anything</label>
    <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  </div>
   
<div class="col-md-2">
  <div class="form-group" style={{marginTop:'33px'}}>
      <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
  </div>
</div>
</div>
<section className='hk-sec-wrapper'>
<div className="row">
<div className="col-sm">
<div className="table-wrap table-responsive">

<table id="datable_1" className="table table-hover w-100 display pb-30 no-footer dtr-inline">
<thead className="thead-dark">
<tr>
<th>Client Name</th>
<th>Project Name</th>
<th>Phone Number</th>
<th>Job Title</th>
<th>i_am_buying_this_farmhouse_for</th>
<th>created_at</th>
</tr>
</thead>
<tbody>

    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>


</tbody>
</table>

</div>
</div>
</div>
</section>


</div>


</>
)
}

export default FacebookLeadData