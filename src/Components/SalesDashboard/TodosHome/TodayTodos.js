import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

const TodayTodos = ({dataTodos}) => {
  
return (
<>

<div className="col-sm">
<div className="table-wrap">
<div className="table-responsive">
<table className="table mb-0 table-bordered table-striped">
  <thead className="thead-dark">
    <tr>
      <th>Agent</th>
      <th>Client</th>
      <th>Project</th>
      <th>TTD</th>
      <th>Note</th>
      <th>Datetime</th>
    </tr>
  </thead>
<tbody className="todoDatas">
{

dataTodos === null || dataTodos === '' || dataTodos === undefined ? (
<>Loading...</>
):(
  dataTodos.length > 0 ? (
dataTodos.map((dataTodosx)=>{

return (
<tr key={dataTodosx.id}>
  {/* <td><span className={`badge badge-${dataTodosx.priority == 'high' ? 'danger' : 'primary'}`}>{dataTodosx.priority}</span></td> */}
  <td>{dataTodosx.emp_name}</td>
  <td>{dataTodosx.clientName == '' || dataTodosx.clientName == null ? 'No Name' : dataTodosx.clientNameShort}</td>
  <td>{dataTodosx.clientProject === '' ? 'No Name' : dataTodosx.clientProject}</td>
  <td>{dataTodosx.reminderTypeId == null || dataTodosx.reminderTypeId == '' ? 'N/a' : dataTodosx.reminderTypeId}</td>
  <td style={{width:230}}>{dataTodosx.reminderinfoShort}</td>
  <td style={{width:150}}>{dataTodosx.reminderSet} <br /> <span>{dataTodosx.reminderSetTime}</span></td>
</tr>
)
})

):(
  <><tr><td>No Data Found</td></tr></>
)

)


}
</tbody>

<tbody className="Overdues">
<tr>
<td colSpan="2">No Record Found</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

</>
)
}

export default TodayTodos