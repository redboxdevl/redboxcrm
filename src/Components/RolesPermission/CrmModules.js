import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import OtherNavigation from '../../Includes/OtherNavigation'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2';
import { RoleCategoryAction } from '../../redux/action/RoleCategoryAction';
import { RoleModuleAction } from '../../redux/action/RoleModuleAction';
import { actionConfig } from '../../configuration';
import ReactPaginate from 'react-paginate';

const CrmModules = () => {

    const resultRoleListing = useSelector(state => state.RoleModulereducers.rolemoduledata);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const [ROleCatresult,setROleCatresult]= useState([]);

    const [show, setShow] = useState(false);
    const [RoleModuleName,setRoleModuleName] = useState('');
    const [ModuleId,setModuleId]=useState(id);

    const GetModuleDetails = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}crmmodule/${id}`);
        const dataxs = await response.json();
        setROleCatresult(await dataxs.data);
        setRoleModuleName(dataxs.data.module_name);
        setModuleId(id);
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {


        GetModuleDetails();
        if(id == null){
        }else{
            setShow(true); 
        }

        const interval = setInterval(() => {
          const AuthData = JSON.parse(localStorage.getItem('authdata'));
          dispatch(RoleModuleAction(AuthData.id));
        }, 3000);
          return () => clearInterval(interval);
      },[id == null || id == '' ? '' : id]);


      useEffect(() => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
          dispatch(RoleModuleAction(AuthData.id));
      },[]);

      
      const handlePageClick = (data) => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        let currentPage = data.selected + 1
        dispatch(RoleModuleAction(AuthData.id,currentPage,12));
        
        }


      const AddRolModuleFormData = (e) => {
        e.preventDefault();

        const FeildData = { module_name:RoleModuleName }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}crmmodule`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                navigate("/crm-modules");
                setShow(false);
                setRoleModuleName('');
                    
                }else{
                    Swal.fire(
                        'Error!',
                        dataex.message,
                        'error'
                    );
                }


            });

      }

      const UpdateRoleModuleFormData = (e) => {
        e.preventDefault();

        const FeildData = { module_name:RoleModuleName }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}crmmodule/${ModuleId}`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                navigate("/crm-modules");
                setShow(false);
                setRoleModuleName('');
                    
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
<h2 className="hk-pg-title font-weight-600">Crm Modules</h2>

</div>
<div class="d-flex">
<NavLink to="#" onClick={handleShow} className="btn btn-primary btn-rounded btn-sm">Add New Modules</NavLink>
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
<th>Module Name</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

{

resultRoleListing.data == null ? (
    <>Loading.....</>
  ):(
  
    resultRoleListing.data.length > 0 ? (
        resultRoleListing.data.map((curElem , index) => {

    return (
    <tr>
        <td>{curElem.module_name}</td>
        <td><span class="badge badge-sm badge-green">Active</span></td>
        <td>
        <NavLink to={`/crm-modules/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
        <button class="btn btn-danger btn-rounded btn-sm">Delete</button>
        </td>
    </tr>

)
  

})

): (
  <>
  <tr>
        <td colspan="3">No Record Found</td>  
    </tr>
  </>
  )

)

}
</tbody>
</table>


<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultRoleListing.TotalCount/12)}
marginPagesDisplayed={1}
pageRangeDisplayed={3}
onPageChange={handlePageClick}
containerClassName={`pagination justify-content-center `}
pageClassName={`page-item`}
pageLinkClassName={`page-link`}
previousClassName={`page-item`}
previousLinkClassName={`page-link`}
nextLinkClassName={`page-link`}
nextClassName={`page-item`}
breakLinkClassName={`page-link`}
breakClassName={`page-item`}
activeClassName={`active`}
/>

</div>
</div>
</div>
</section>
</div>
</div>



</div>

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
    <Modal.Title>{id == null ? 'Add' : 'Update'} Role Module</Modal.Title>
</Modal.Header>
<Modal.Body>

<form onSubmit={id == null ? AddRolModuleFormData : UpdateRoleModuleFormData}>

<div class="form-group col-md-12">
<label for="inputPassword4">Module Name*</label>
<input type="text" class="form-control" name="agent_name" placeholder="Name" required="" autocomplete="off" onChange={e=>setRoleModuleName(e.target.value)} value={RoleModuleName}/>
</div>

<div class="modal-footer">
<button type="button" class="btn btn-secondary" onClick={handleClose}>Close</button>
<button type="submit" class="btn btn-primary">Save changes</button>
</div>
</form>
</Modal.Body>
</Modal>


    </>
  )
}

export default CrmModules