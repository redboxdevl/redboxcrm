import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const DataAnalytics = ({CallDatax}) => {

  return (
    <>
        <div className="card">
<div className="card-header card-header-action">
<h6>Assign Leads </h6>
<div className="d-flex align-items-center card-action-wrap">
<NavLink to={`/list-assign-leads`}><button type="button" className="btn btn-primary btn-sm">All</button></NavLink>
</div>
</div>
<div className="card-body">
<div className="col-sm">
<div className="table-wrap">
<div className="table-responsive">
<table className="table mb-0">
<tbody>
{
CallDatax === null || CallDatax === '' || CallDatax === undefined ? (
   <>Loading...</>
):(
   CallDatax.length > 0 ? (
CallDatax.map((edata)=>{

   return (

      <tr key={edata.id}>
<td className="p-0">
<div className="media align-items-center">
   <div className="media-body">
      <span className="d-block"><Link to="">{edata.getleads === null ? '' : edata.getleads.clientName === '' ? 'No Name' : edata.getleads.clientName}</Link>  <br /><small>{edata.getleads === null ? '' : edata.getleads.clientProject}</small></span>
   </div>
</div>
</td>
<td className="p-0 text-right"><small>{edata.publishAgentDate}</small></td>
</tr>
   )
})
   ):(
    <tr>
      <td>No Record Found....</td>
    </tr>
  ) 

)

}

</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
    </>
  )
}

export default DataAnalytics