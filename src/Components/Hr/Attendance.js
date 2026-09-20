import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { AttendanceACtion } from '../../redux/action/AttendanceACtion';
import ReactPaginate from 'react-paginate';
import { useCSVDownloader } from 'react-papaparse';
import Swal from 'sweetalert2';

const Attendance = () => {

  const navigate = useNavigate();
  const { CSVDownloader, Type } = useCSVDownloader();

  const resultListing = useSelector(state => state.Attendancereducers.singleattendancedata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 6 || edx.role_id == 18);
  const dispatch = useDispatch();
console.log("SuperCon",SuperCon);
  const [uploadFile, setUploadFile] = useState();

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if(SuperCon.length == 0){
      dispatch(AttendanceACtion(AuthData.id,1,12));
      }else{
        dispatch(AttendanceACtion('all',1,12));
      }
   
  },[]);

  const changeHandler = (event) => {
    setUploadFile(event.target.files[0]);
	};

  const importAttendance = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('uploadFile', uploadFile);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch(`${actionConfig.REACT_APP_URL}importattendance`, requestOptions)
        .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        if(result.code == '200'){
          Swal.fire(
            'Good job!',
            result.message,
            'success'
        );
        navigate("/attendance");
        }else{
          Swal.fire(
            'Error!',
            result.message,
            'error'
        );
        }

      }).catch((error) => {
        console.error('Error:', error);
     });


  }

  const handlePageClick = (data) => {

  let currentPage = data.selected + 1
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  
  if(SuperCon.length == 0){
  dispatch(AttendanceACtion(AuthData.id,currentPage,12));
  }else{
  dispatch(AttendanceACtion('all',currentPage,12));
  }

  }

  console.log("resultListing",resultListing);

  const dataSample = [ "deviceId","date","checkin","checkout"];

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Attendance</h2>

</div>
<div class="d-flex">
<NavLink to="/add-attendance" className="btn btn-primary btn-rounded btn-sm">Manual Attendance</NavLink>
<CSVDownloader
  filename={`sampleattendance`}
  className="btn btn-danger btn-wth-icon btn-rounded icon-right btn-sm text-white mr-1"
  data={() => {
      return [
        dataSample
      ]}
  }
>
Generate Attendance Upload Sample
    </CSVDownloader>
</div>



</div>

<div className="d-flex">
  <form onSubmit={importAttendance}>
    <div className='form-group'>
      <input type='file' onChange={changeHandler} required accept=".csv"/>
      <button type='submit' className="btn btn-danger btn-rounded btn-sm">Bulk Import Attendance</button>
    </div>
</form>
</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Emp Name</th>
        <th>Checkin</th>
        <th>Checkout</th>
        <th>Date</th>
        <th>Machine Id</th>
        {/* <th>Actions</th> */}
    </tr>
  </thead>
  <tbody>
  {

resultListing == null || resultListing.code == 'ERR_BAD_RESPONSE' || resultListing.code == 'ERR_NETWORK' ? (
  <>Loading.....</>
):(

    resultListing.data && resultListing.data.map((curElem , index) => {
    
    return (
    <tr>
      <td><NavLink to={`/add-attendance/${curElem.id}`}>LR-{index+1}</NavLink></td>
      <td>{curElem.emp_name}</td>
      <td>{curElem.checkin}</td>
      <td>{curElem.checkout}</td>
      <td>{curElem.attendance_date}</td>
      <td>{curElem.machine_id}</td>
      {/* <td><NavLink to="/add-attendance"><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink></td> */}
    </tr>

)
    
    })
    )

}

  </tbody>
</table>

<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultListing.TotalCount/12)}
marginPagesDisplayed={3}
pageRangeDisplayed={3}
onPageChange={handlePageClick}
containerClassName={`pagination justify-content-center`}
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
</>
)
}

export default Attendance