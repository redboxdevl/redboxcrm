import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import OtherNavigation from '../../Includes/OtherNavigation'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2';
import { RoleCategoryAction } from '../../redux/action/RoleCategoryAction';
import { actionConfig } from '../../configuration';
import ReactPaginate from 'react-paginate';

const RoleCategory = () => {


    const resultRoleListing = useSelector(state => state.RoleCategoryreducers.rolecategorydata);
    console.log("resultRoleListing",resultRoleListing);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const [ROleCatresult,setROleCatresult]= useState([]);


    const [show, setShow] = useState(false);
    const [RoleCatName,setRoleCatName] = useState('');
    const [RoleId,setRoleId]=useState(id);

    const GetRoleDetails = async () => {
        if(id == null){

        }else{
            const response = await fetch(`${actionConfig.REACT_APP_URL}rolecategory/${id}`);
            const dataxs = await response.json();
            setROleCatresult(await dataxs.data);
            setRoleCatName(dataxs.data.role_category_name);
            setRoleId(id);
        }
        
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }


    useEffect(() => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        dispatch(RoleCategoryAction(AuthData.id));
      },[]);


    useEffect(() => {

        GetRoleDetails();
        if(id == null){
        }else{
            setShow(true); 
        }
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        dispatch(RoleCategoryAction(AuthData.id));
        // const interval = setInterval(() => {
         
        // }, 3000);
        //   return () => clearInterval(interval);
      },[id == null || id == '' ? '' : id]);


      const handlePageClick = (data) => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        let currentPage = data.selected + 1
        dispatch(RoleCategoryAction(AuthData.id,currentPage,12));
        
        }

    const AddRoleCatFormData = (e) => {
        e.preventDefault();

        const FeildData = { role_category_name:RoleCatName }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}rolecategory`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                navigate("/role-category");
                setShow(false);
                setRoleCatName('');
                    
                }else{
                Swal.fire(
                    'Error!',
                    dataex.message,
                    'error'
                );
                }


            });


    }

    const UpdateRoleCatFormData = (e) => {
        e.preventDefault();

        const FeildData = { role_category_name:RoleCatName }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}rolecategory/${RoleId}`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                navigate("/role-category");
                setShow(false);
                setRoleCatName('');
                    
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
<h2 className="hk-pg-title font-weight-600">Role Category</h2>

</div>
<div class="d-flex">
<NavLink to="" className="btn btn-primary btn-rounded btn-sm" onClick={handleShow}>Add New Role Category</NavLink>
</div>


</div>

<OtherNavigation/>


<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>Category Name</th>
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
        <td>{curElem.role_category_name}</td>
        <td><span class="badge badge-sm badge-green">Active</span></td>
        <td>
        <NavLink to={`/role-category/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
        {/* <NavLink to={`/crm-modules/${curElem.id}`}><button class="btn btn-secondary btn-sm btn-rounded">Permissions</button></NavLink> */}
        <button class="btn btn-danger btn-rounded btn-sm">Delete</button>
        </td>
    </tr>

 )
  

})

): (
  <>
  <tr>
        <td colspan="4">No Record Found</td>  
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

</div>


<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
    <Modal.Title>{id == null ? 'Add' : 'Update'} Role Category</Modal.Title>
</Modal.Header>
<Modal.Body>

<form onSubmit={id == null ? AddRoleCatFormData : UpdateRoleCatFormData}>

<div class="form-group col-md-12">
<label for="inputPassword4">Role Category Name*</label>
<input type="text" class="form-control" name="agent_name" placeholder="Name" required="" autocomplete="off" onChange={e=>setRoleCatName(e.target.value)} value={RoleCatName}/>
</div>

<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<button type="submit" class="btn btn-primary">Save changes</button>
</div>
</form>
</Modal.Body>
</Modal>

    </>
  )
}

export default RoleCategory