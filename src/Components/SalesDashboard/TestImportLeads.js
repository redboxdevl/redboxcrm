import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation'
import Swal from 'sweetalert2'
import Moment from 'moment';
import $ from 'jquery';
import { ImportLeadAction } from '../../redux/action/ImportLeadAction';
import { actionConfig } from '../../configuration';
import { useCSVDownloader } from 'react-papaparse';
import { ImportEmployeeAction } from '../../redux/action/ImportEmployeeAction';
import ReactPaginate from 'react-paginate';
import Checkbox from './Checkbox';
import DataTable from 'react-data-table-component';

const TestImportLeads = () => {

    const { CSVDownloader, Type } = useCSVDownloader();

    const resulImportLeads = useSelector(state => state.ImportLeadreducers.singleimport);
    const resulImportEmployee = useSelector(state => state.ImportEmployeereducers.importempdata);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
    const listDashboard = useSelector(state => state.dashCountReducer.dashboardcount);

    const dispatch = useDispatch();
    const [currentPage,setcurrentPage]=useState('');

    const columns = [
        {
            name:"Phone No",
            selector:(row) => row.clientPhone
        },{
            name:"Project Name",
            selector:(row) => row.clientProject
        },{
            name:"Nature Project",
            selector:(row) => row.nature
        },     
    ];

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        dispatch(ImportLeadAction('inactive',currentPage,15));
        setcurrentPage(currentPage);
      }

  return (
    <>
      <Navigation/>
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
    <div>
        <h2 className="hk-pg-title font-weight-600">Test Import Leads</h2>
    </div>
    </div>

    <DataTable title="Client Leads" columns={columns} data={resulImportLeads.data} pagination paginationTotalRows={resulImportLeads.TotalCount} selectableRows />


    </div>
    </>
  )
}

export default TestImportLeads