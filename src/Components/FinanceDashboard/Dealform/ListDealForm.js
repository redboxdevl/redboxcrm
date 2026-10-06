import React from 'react';
import { NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';

const ListDealForm = () => (
  <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
      <div>
        <h2 className="hk-pg-title font-weight-600">Deal Form List</h2>
      </div>
      <div>
        <NavLink to="/add-deal-form" className="btn btn-primary btn-rounded btn-sm">
          Add New Deal Form
        </NavLink>
      </div>
    </div>

    <OtherNavigation />

    <div className="alert alert-warning" role="status">
      Deal Form records are unavailable. This list was connected to Petty Cash data, so its record actions are disabled until the correct Deal Form source is verified.
    </div>
  </div>
);

export default ListDealForm;