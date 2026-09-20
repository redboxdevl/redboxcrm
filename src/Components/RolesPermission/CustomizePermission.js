import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import OtherNavigation from '../../Includes/OtherNavigation'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2';
import { RoleCategoryAction } from '../../redux/action/RoleCategoryAction';

const CustomizePermission = () => {

const resultRoleListing = useSelector(state => state.RoleCategoryreducers.rolecategorydata);

const dispatch = useDispatch();
const navigate = useNavigate();
let { id } = useParams();

useEffect(() => {

const interval = setInterval(() => {
const AuthData = JSON.parse(localStorage.getItem('authdata'));
dispatch(RoleCategoryAction(AuthData.id));
}, 3000);
return () => clearInterval(interval);
},[id]);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Customize Permission</h2>

</div>
{/* <div class="d-flex">
<NavLink to="" className="btn btn-primary btn-rounded btn-sm">Add New Modules</NavLink>
</div> */}


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
    <th>Doc Name</th>
    <th>Role</th>
    <th>Permissions</th>
    <th>Actions</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Assign Leads</td>
    <td>Sales Manger</td>
    <td>
    <table class="table table-borderless">
        
        <tbody>
        <tr style={{backgroundColor:'#f9f9f9'}}>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1" />
            <label class="custom-control-label" for="customCheck1">List</label>
        </div>
            </td>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck2" />
            <label class="custom-control-label" for="customCheck2">View</label>
        </div>
            </td>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck3" />
            <label class="custom-control-label" for="customCheck3">Create</label>
        </div>
            </td>
        </tr>
        <tr style={{backgroundColor:'#f9f9f9'}}>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck4" />
            <label class="custom-control-label" for="customCheck4">Import</label>
        </div>
            </td>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck5" />
            <label class="custom-control-label" for="customCheck5">Export</label>
        </div>
            </td>
            <td>
            <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck6" />
            <label class="custom-control-label" for="customCheck6">Report</label>
        </div>
            </td>
        </tr>
        </tbody>
    </table>
    </td>
    <td class="w-10"><button class="btn btn-primary btn-rounded btn-sm">Permissons</button>
    </td>
</tr>
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

export default CustomizePermission