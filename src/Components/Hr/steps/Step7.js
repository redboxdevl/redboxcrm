import React , {useState, useEffect} from 'react';

const Step7 = ({ formData, setFormData }) => {

  const [inputEduList, setinputEduList]= useState([{EducationId:'',school_Univ:'',Qualification:'',Level:'',YearOfPassing:''}]);

  const [inputWorkList, setinputWorkList]= useState([{WorkId:'',Company:'',Designation:'',Salary:'',Address:'',tenureFrom:'',tenureTo:''}]);
   
  useEffect(() => {
    if(formData.WorkExperience.length == 0){

    }else{
      setinputWorkList(formData.WorkExperience);
      setinputEduList(formData.EducationQualify);
    }
 
},[]);


  const handleinputchangeData=(e, index)=>{
      const {name, value}= e.target;
      const list= [...inputEduList];
      list[index][name]= value;
      setinputEduList(list);

      setFormData({
        ...formData,
        EducationQualify: list,
      });

   }
  
    const handleremove= index=>{

      const list=[...inputEduList];
      list.splice(index,1);
      setinputEduList(list);
      setFormData({
        ...formData,
        EducationQualify: list,
      });
    }
    
    const handleaddclick=()=>{ 
      setinputEduList([...inputEduList, {EducationId:'', school_Univ:'', Qualification:'', Level:'', YearOfPassing:''}]);
      setFormData({
        ...formData,
        EducationQualify: inputEduList,
      });
    }


    const handleinputchangeDataWork=(e, index)=>{
      const {name, value}= e.target;
      const list= [...inputWorkList];
      list[index][name]= value;
      setinputWorkList(list);

      setFormData({
        ...formData,
        WorkExperience: list,
      });

   }
  
    const handleremoveWork= index=>{
      const list=[...inputWorkList];
      list.splice(index,1);
      setinputWorkList(list);
      setFormData({
        ...formData,
        WorkExperience: list,
      });
    }
    
    const handleaddclickWork=()=>{ 
      setinputWorkList([...inputWorkList, {WorkId:'',Company:'',Designation:'',Salary:'',Address:'',tenureFrom:'',tenureTo:''}]);
      setFormData({
        ...formData,
        WorkExperience: inputWorkList,
      });
    }

  return (
    <>
    <h2>Profile</h2>
        <h5 class="mt-5 pt-4 font-weight-bolder">Educational Qualification</h5>
<hr />
<table class="table table-success table-bordered mb-0">
<thead class="thead-success">
<tr>
<th>#</th>
<th>School/University</th>
<th>Qualification</th>
<th>Level</th>
<th>Year of Passing</th>
<th>Degree / Certificate</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{ 
  inputEduList.map( (x,i)=>{
      return(
      <>
      <tr>
      <th scope="row">{i+1}</th>
      <td><input type="text" name="school_Univ" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeData(e,i)} placeholder="School/University" dataId={x.id} value={x.school_Univ}/></td>
      <td><input type="text" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeData(e,i)} placeholder="Qualification" name="Qualification" dataId={x.id} value={x.Qualification} /></td>
      <td><input type="text" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeData(e,i)} placeholder="Level" name="Level" dataId={x.id} value={x.Level} /></td>
      <td><input type="text" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeData(e,i)} placeholder="Year Of Passing" name="YearOfPassing" dataId={x.id} value={x.YearOfPassing} /> </td>
      <td><input type="file" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeData(e,i)} placeholder="Education Document" name="EducationDoc" dataId={x.id} value={x.EducationDoc} /> </td>
      <td>{
        inputEduList.length!==1 &&
        <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i)}>Remove</button>
      }
      { inputEduList.length-1===i &&
        <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add More</button>
      }</td>
      </tr>
      </>
    );
  } )}

</tbody>
<tfoot>
<tr>
<th colspan="5">
  
    {/* <button class="btn btn-sm btn-primary float-right" type='button'>Add Row</button> */}
</th>
</tr>
</tfoot>
</table>

<h5 class="mt-5 pt-4 font-weight-bolder">Previous Work Experience</h5>
<hr />
<table class="table table-info table-bordered mb-0">
<thead class="thead-info">
<tr>
<th>#</th>
<th>Company</th>
<th>Designation</th>
<th>Last Salary</th>
<th>Address</th>
<th>Tenure</th>
<th>Experience Letter</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{ 
inputWorkList.map( (x,i)=>{
return(
<>
<tr>
<th scope="row">{i+1}</th>
<td><input type="text" name="Company" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="Company" dataId={x.id} value={x.Company}/></td>
<td><input type="text" name="Designation" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="Designation" dataId={x.id} value={x.Designation} /></td>
<td><input type="text" name="Salary" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="Salary" dataId={x.id} value={x.Salary} /></td>
<td><input type="text" name="Address" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="Address" dataId={x.id} value={x.Address} /> </td>
<td>
From : <input type="date" name="tenureFrom" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="From Tenure" dataId={x.id} value={x.tenureFrom} />
To: <input type="date" name="tenureTo" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="To Tenure" dataId={x.id} value={x.tenureTo} />
</td>
<td><input type="file" name="ExperienceLetter" class="form-control" autocomplete="off" onChange={ e=>handleinputchangeDataWork(e,i)} placeholder="ExperienceLetter" dataId={x.id} value={x.ExperienceLetter} /> </td>
<td>
{
  inputWorkList.length!==1 &&
  <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremoveWork(i)}>Remove</button>
}
{ inputWorkList.length-1===i &&
  <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclickWork}>Add More</button>
}
</td>
</tr>
</>
  );
} )}
</tbody>
<tfoot>
<tr>
<th colspan="5">
    {/* <button class="btn btn-sm btn-primary float-right">Add Row</button> */}
</th>
</tr>
</tfoot>
</table>
    </>
  )
}

export default Step7