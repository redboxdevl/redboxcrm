import React from 'react'
import Navigation from '../../Includes/Navigation'

function DormentLeads() {
return (
<>
<Navigation />
  <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
  <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
      <div>
          <h2 className="hk-pg-title font-weight-600">Dorment Leads</h2>
      </div>
  </div>

  {/* <div className="row">
      <div className="col-xl-12">
      <section className="hk-sec-wrapper">
      <div className="align-items-center d-flex justify-content-between mb-10">
      <div>
      <label>Select Project</label>
      <select className="form-control custom-select-sm custom-select d-block w-100 select2" id="projects">
      <option value="">Select Project...</option>
      </select>
      </div>
      <div>
      <label >Date Filter</label>
      <input className="form-control" type="text" name="Assigndaterange" value="" />
      </div>
      </div>
      </section>
  </div>
  </div> */}



  <div className="row">
  <div className="col-sm">
  <div className="table-wrap">

  <table id="datable_1" className="table table-hover w-100 display pb-30">
  <thead className="thead-dark">
  <tr>
  <th>Name</th>
  <th>Project Name</th>
  <th>Assign By</th>
  <th>Reminder Priority</th>
  <th>Lead Status</th>
  <th>Date</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td></td>
  <td></td>
  <td> </td>
  <td></td>
  <td></td>
  <td></td>
  </tr>
  </tbody>
  </table>
  </div>
  </div>
  </div>



</div>
</>
)
}

export default DormentLeads