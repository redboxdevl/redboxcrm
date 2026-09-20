import React from "react";
import Navigation from "../../Includes/Navigation";
import TestPie1 from "./DashboardGraphs/TestPie1";
import Gendergraphs from "./DashboardGraphs/Gendergraphs";
import Nrplocalgraphs from "./DashboardGraphs/Nrplocalgraphs";
import Professionsgraphs from "./DashboardGraphs/Professionsgraphs";
import Sourcegraphs from "./DashboardGraphs/Sourcegraphs";

import DataTable from "react-data-table-component";

const Listimportleads = () => {
  const columns = [
    {
      name: "Assign Now",
      selector: (row) => row.assignnow,
    },
    {
      name: "Assign",
      selector: (row) => row.assigned,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Number",
      selector: (row) => row.number,
    },
    {
      name: "Sim Type",
      selector: (row) => row.simtype,
    },
    {
      name: "Resident",
      selector: (row) => row.resident,
    },
    {
      name: "Previous Status",
      selector: (row) => row.previoustatus,
    },
    {
      name: "Source",
      selector: (row) => row.source,
    },
    {
      name: "Projects",
      selector: (row) => row.projects,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Professions",
      selector: (row) => row.professions,
    },
    {
      name: "Won",
      selector: (row) => row.won,
    },
  ];

  const data = [
    {
      id: 1,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 2,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 3,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 4,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 5,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 6,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 7,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 8,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 9,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 10,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 11,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 12,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 13,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 14,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 15,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
    {
      id: 16,
      assignnow: "Javeria",
      assigned: "Iqra",
      Name: "Kamran",
      email: "kamran@yahoo.com",
      gender: "Female",
      number: "03458521468",
      simtype: "Postpaid",
      resident: "Local",
      previoustatus: "Yes",
      source: "Youtube",
      projects: "Paragon",
      country: "Pakistan",
      city: "Karachi",
      professions: "Doctor",
      won: "",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#333", // Light gray background
        color: "#fff", // Darker text color
        fontWeight: "bold", // Bold font
        fontSize: "16px", // Font size
        padding: "10px", // Padding
        textAlign: "center", // Centered text
      },
    },
    cells: {
      style: {
        padding: "15px", // Add padding to data cells
        fontSize: "17px", // Font size for data
        color: "#333", // Text color
        textAlign: "left", // Align text to the left
      },
    },
  };

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            {/* <h2 className="hk-pg-title font-weight-600">
              Import Lead Database Reporting
            </h2> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="bg-white p-4 rounded">
              <h2 className="fw-bold pb-3 text-center">Gender</h2>
              <Gendergraphs />
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded">
              <h2 className="fw-bold pb-3 text-center">NRP/Local</h2>
              <Nrplocalgraphs />
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded">
              <h2 className="fw-bold pb-3 text-center">Professions</h2>
              <Professionsgraphs />
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded">
              <h2 className="fw-bold pb-3 text-center">Source</h2>
              <Sourcegraphs />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-end py-3" style={{ gap: 8 }}>
              <a href="#" className="btn btn-primary rounded">
                Import Leads
              </a>
              <a href="#" className="btn btn-danger rounded">
                Customized Graphs
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="imptBox p-5 bg-primary text-white rounded text-center">
              <h3
                className="text-white fw-bold"
                style={{ fontSize: 50, fontWeight: "bolder" }}
              >
                Numbers
              </h3>
              <p style={{ fontSize: 30 }}>10,550</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="imptBox p-5 bg-danger text-white rounded text-center">
              <h3
                className="text-white fw-bold"
                style={{ fontSize: 50, fontWeight: "bolder" }}
              >
                Email
              </h3>
              <p style={{ fontSize: 30 }}>10,550</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="imptBox p-5 bg-secondary text-white rounded text-center">
              <h3
                className="text-white fw-bold"
                style={{ fontSize: 50, fontWeight: "bolder" }}
              >
                Overseas
              </h3>
              <p style={{ fontSize: 30 }}>650</p>
            </div>
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-md-12">
            <DataTable
              columns={columns}
              data={data}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="600px"
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Listimportleads;
