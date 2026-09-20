import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import OtherNavigation from '../../Includes/OtherNavigation'
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';


const Permission = [
{ value:'List',label:'List',selected:true },
{ value:'View',label:'View',selected:true },
{ value:'Create',label:'Create',selected:true},
{ value:'Import',label:'Import',selected:true },
{ value:'Export',label:'Export',selected:true },
{ value:'Report',label:'Report',selected:true },
]

const ModuleSetup = () => {


const resultRoleListing = useSelector(state => state.RoleModulereducers.rolemoduledata);

const dispatch = useDispatch();
const navigate = useNavigate();
let { id } = useParams();

const [show, setShow] = useState(false);
const [ModuleName,setModuleName] = useState('');
const [FeatureId,setFeatureId] = useState('');

const [inputList, setinputList]= useState([{featureId:'',module_id:ModuleName,feature_name:''}]);

const handleinputchangeData=(e, index)=>{
   
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);
 
  }

  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }
  
  const handleaddclick=()=>{ 
    setinputList([...inputList, { featureId:'',module_id:ModuleName,feature_name:''}]);
  }

  useEffect(() => {
    moduleFeaturesAct(ModuleName);
  },[ModuleName]);


  const moduleFeaturesAct = async (modulename) => {
    
    const response = await fetch(`${actionConfig.REACT_APP_URL}modulefeature?moduleId=${modulename}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;

    // console.log("GetArray",GetArray);

    if(GetArray.length > 0){
        setinputList(JSON.parse(GetArray));
    }else{
        setinputList([{featureId:'',module_id:ModuleName,feature_name:''}]);
    }
    
    inputList.map((datas,index)=>{
        // console.log(datas.id);
    })

  }




const AddModuleSetupFormData = (e) => {
e.preventDefault();

//   var inputComma = inputList.map(function(val) {
//     return val.feature_name;
//   }).join(',');


 const FeildData = { module_id:ModuleName,feature_name:JSON.stringify(inputList) }
 console.log("FeildData",FeildData);
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}modulefeature`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        // console.log("dataex",dataex);

        if(dataex.code == '200'){
        Swal.fire(
            'Good job!',
            dataex.message,
            'success'
        );
        navigate("/module-setup");
            
        }else{
        Swal.fire(
            'Error!',
            dataex.message,
            'error'
        );
        }


    });


}


// const UpdateFeatures = () => {
 
//     var inputComma = inputList.map(function(val) {
//         return val.feature_name;
//       }).join(',');
    
//       var inputCommaId = inputList.map(function(val) {
//         return val.id;
//       }).join(',');
    
//      const FeildData = { module_id:ModuleName,feature_name:inputComma,feature_id:inputCommaId };

//      const requestOptions = {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(FeildData)
//     };
    
//     fetch(`${actionConfig.REACT_APP_URL}modulefeature/${ModuleName}`, requestOptions)
//         .then(response => response.json())
//         .then(dataex => {

//             console.log(dataex);
//             if(dataex.code == '200'){
//             Swal.fire(
//                 'Good job!',
//                 dataex.message,
//                 'success'
//             );
//             navigate("/module-setup");
                
//             }else{
//             Swal.fire(
//                 'Error!',
//                 dataex.message,
//                 'error'
//             );
//             }
    
    
//         });

// }

// console.log("resultRoleListing",resultRoleListing);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Module Setups</h2>

</div>
{/* <div class="d-flex">
<NavLink to="" className="btn btn-primary btn-rounded btn-sm" onClick={handleShow}>Add New Role Category</NavLink>
</div> */}


</div>

<OtherNavigation/>

<div class="row">
<div class="col-xl-12">
<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<form onSubmit={AddModuleSetupFormData}>
<div class="col-md-4">
<div class="form-group">
<label for="" class="labeldata">Module <span class="text-danger">*</span></label>
<select name="moduleId" id="" class="form-control invblock" required onChange={e=>setModuleName(e.target.value)} value={ModuleName}>
<option value="">Select Module</option>
{
    resultRoleListing == '' ? (
        <>Loading....</>
    ):(

        resultRoleListing.data.map((item,index)=>{
            return (
                <option value={item.id}>{item.module_name}</option>
            )
        })

    )
    
}
</select>
</div>
</div>
<div class="col-md-12">
<div class="table-responsive">
<table class="table table-bordered">
<thead>
<tr class="table-dark">
<th class="">Features</th>
<th class="">Action</th>
</tr>
</thead>
<tbody>
{ 
    inputList.map( (x,i)=>{
        return(
    <>
    <tr>
        <td><input type="text" name="feature_name" class="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="Feature Name" dataId={x.id} value={x.feature_name}/></td>
        <td>
        {
            inputList.length!==1 &&
            <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i)}>Remove</button>
        }
        { inputList.length-1===i &&
            <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
        }
        </td>
    </tr>
    </>
    );
    } )}

</tbody>
</table>
</div>
</div>
<hr />
<button class="btn btn-primary" type="submit">Submit</button>
{/* <button class="btn btn-danger ml-10" type="button" onClick={UpdateFeatures}>Update</button> */}
</form>
</div>
</div>
</section>
</div>
</div>


</div>


</>
)
}

export default ModuleSetup