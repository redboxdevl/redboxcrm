import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navigation from "../../Includes/Navigation";
import { useNavigate, Link } from "react-router-dom";
import { AssignLeadsAction } from "../../redux/action/AssignLeadsAction";
import { NotinterestedReasonAction } from "../../redux/action/NotinterestedReasonAction";
import { CallingActions } from "../../redux/action/CallingActions";
import $ from "jquery";
import { actionConfig } from "../../configuration";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FaShareAlt, FaBell } from "react-icons/fa";
import { FiPhone, FiMessageCircle, FiMail, FiRepeat, FiEdit, FiXCircle, FiBell } from "react-icons/fi";
import { browserName } from "react-device-detect";
import {
  ActionCenterAction,
  ActionCenterSection,
  CompactDate,
  CommunicationMetric,
  DataQualityBadge,
  BulkActionBar,
  ConfirmationDialog,
  DataTable,
  FilterBar,
  MoreActions,
  PageErrorBoundary,
  PageHeader,
  Pagination,
  PageState,
  RowActions,
  StatusBadge,
  LeadActionCenter,
  LeadTemperatureBadge,
  deriveLeadDataQuality,
} from "../SellmoreUI/AssignedLeadsPrimitives";
import "../SellmoreUI/AssignedLeads.css";

const readStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const AssignListing = ({ dataPermission }) => {
  const EmpData2 = readStoredJson("empTeam");
  const resultListing = useSelector(
    (state) => state.assignLeadsreducer.assignleaddata
  );
  const proReasonNotInterresult = useSelector(
    (state) => state.NotinterestedOptreducers.notinterestedoptdata
  );
  const proCallingresult = useSelector(
    (state) => state.Callingreducers.callingcount
  );
  const rolePermissionData = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const resultRolePermssion = Array.isArray(rolePermissionData) ? rolePermissionData : [];
  const DashboardData = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );

  const dispatch = useDispatch();

  const AuthDataxs = readStoredJson("authdata");
  const authUserId = AuthDataxs?.id;
  const authCompanyId = AuthDataxs?.company_id;
  const storedTeamStatus = EmpData2?.teamStatus;
  const storedTeamObject = EmpData2?.teamObj;

  const SuperCon = resultRolePermssion.filter(
    (edx) => edx.role_id == 3 || edx.role_id == 4
  );
  const hasSuperConAccess = SuperCon.length > 0;
  const AssignExport = resultRolePermssion.filter(
    (edx) => edx.feature_id == 50 && edx.sub_features == "Export"
  );

  const [TransferStatus, setTransferStatus] = useState("");

  const navigate = useNavigate();

  const [Employeeresult, setEmployeeresult] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const [NotInterestedresult, setNotInterresult] = useState(false);
  const [Transferresult, setTransferresult] = useState(false);
  const [GetLeadId, setGetLeadId] = useState("");
  const [GetPhoneNo, setPhoneNo] = useState("");
  const [PhoneNoIos, setPhoneNoIos] = useState("");
  const [PhoneNoWhatsapp, setPhoneNoWhatsapp] = useState("");
  const [GetEmail, setEmailData] = useState("");
  const [GetTransferNote, setTransferNote] = useState("");
  const [GetAgentId, setGetAgentId] = useState("");
  const [GetReasonDataId, setReasonDataId] = useState("");
  const [GetBudgetPrice, setBudgetPrice] = useState("");
  const [GetOtherNote, setOtherNote] = useState("");
  const [GetBugget, setBugget] = useState(false);
  const [GetOtherNot, setOtherNot] = useState(false);
  const [search, setSearch] = useState("");
  const [LeadNature, setLeadNature] = useState("");
  const [SalesConsul, setSalesConsul] = useState("");
  const [ProjectN, setProjectN] = useState("");
  const [show, setShow] = useState(false);
  const [requestState, setRequestState] = useState("loading");
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const loadAssignedLeads = useCallback(async (page = 1, filters = {}) => {
    const AuthData = authUserId == null
      ? readStoredJson("authdata")
      : { id: authUserId, company_id: authCompanyId };
    const query = filters;

    if (!AuthData || AuthData.id == null) {
      setRequestState("unavailable");
      return;
    }

    let agentId;
    let teamObj = "";
    if (!hasSuperConAccess) {
      if (storedTeamStatus == null || storedTeamStatus === "manager") {
        agentId = AuthData.id;
      } else {
        agentId = "all";
        teamObj = storedTeamObject;
      }
    } else {
      agentId = "all";
    }

    setCurrentPage(page - 1);
    setRequestState("loading");
    try {
      const response = await dispatch(
        AssignLeadsAction(
          agentId,
          page,
          12,
          query.search,
          query.LeadNature,
          query.SalesConsul,
          query.TransferStatus,
          teamObj,
          query.ProjectN,
          AuthData.company_id
        )
      );

      if (response?.response?.status === 403) {
        setRequestState("unavailable");
      } else if (
        response?.isAxiosError ||
        response instanceof Error ||
        !Array.isArray(response?.data)
      ) {
        setRequestState("error");
      } else {
        setRequestState(response.data.length ? "success" : "empty");
      }
    } catch {
      setRequestState("error");
    }
  }, [authCompanyId, authUserId, dispatch, hasSuperConAccess, storedTeamObject, storedTeamStatus]);

  useEffect(() => {
    dispatch(NotinterestedReasonAction());
    loadAssignedLeads(1);
  }, [dispatch, loadAssignedLeads]);

  useEffect(() => {
    if (!localStorage.getItem("authdata")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    GetEmployeeData();
  }, []);

  $(document).on("click", ".client_opt", function () {
    var optVa = $(this).val();
    setReasonDataId(optVa);
    if (optVa === "Budget Issue") {
      setBugget(true);
      setOtherNot(false);
    } else if (optVa === "Others") {
      setBugget(false);
      setOtherNot(true);
      setBudgetPrice("");
    } else {
      setBugget(false);
      setOtherNot(false);
      setBudgetPrice("");
    }
  });

  const GetEmployeeData = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const response = await axios(`${actionConfig.REACT_APP_URL}listemployee`, {
      cancelToken: source.token,
    })
      .then((res) => {
        return res.data;
      })
      .catch((thrown) => {
        return thrown;
      });
    setEmployeeresult(Array.isArray(response?.data) ? response.data : []);
  };

  const callingData = async (leadid) => {
    if (!AuthDataxs?.id) return;
    dispatch(CallingActions(AuthDataxs.id, leadid, AuthDataxs.company_id));
  };
  const CallingAction = async (actionType, agentid, leadid) => {
    const FeildData = {
      impType: actionType,
      agentid: agentid,
      leadid: leadid,
      customerId: 0,
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}leadimpression`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success === false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          navigate("/list-assign-leads");
          callingData(leadid);
        }
      });
  };

  useEffect(() => {
    callingData();
  }, []);

  function MyFuncAction(ActioData) {
    if (ActioData == "transfer") {
      setNotInterresult(false);
      setTransferresult(true);
    } else if (ActioData == "remove") {
      setNotInterresult(true);
      setTransferresult(false);
    } else if (ActioData == "reminders") {
      setNotInterresult(false);
      setTransferresult(false);
    } else {
      setNotInterresult(false);
      setTransferresult(false);
    }
  }

  const addNotInterestedClient = (e) => {
    e.preventDefault();

    const FeildData = {
      agentid: AuthDataxs.id,
      leadid: GetLeadId,
      client_opt: GetReasonDataId,
      budgetPrice: GetBudgetPrice == "" ? "0" : GetBudgetPrice,
      OtherNote: GetOtherNote == "" ? "-" : GetOtherNote,
      customerId: 0,
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    fetch(`${actionConfig.REACT_APP_URL}assignnotinterested`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-assign-leads");
          // GetAssignLead();
        }
      });
  };

  const AddTransferFormData = (e) => {
    e.preventDefault();

    const FeildData = {
      fagentid: AuthDataxs.id,
      tagentid: GetAgentId,
      leadid: GetLeadId,
      transferNote: GetTransferNote,
      statusType: "transfer",
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}assignleadtransfer`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-assign-leads");
          setTransferresult(false);
        }
      });
  };

  const currentFilters = () => ({ search, LeadNature, SalesConsul, TransferStatus, ProjectN });
  const handlePageClick = (data) => loadAssignedLeads(data.selected + 1, currentFilters());

  const handleSearch = (e) => {
    e.preventDefault();
    loadAssignedLeads(1, currentFilters());
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck((selected) => checked
      ? Array.from(new Set([...selected, id]))
      : selected.filter((item) => item !== id));
  };

  const DeleteLeads = (e) => {
    e.preventDefault();

    const FeildData = { isCheck: isCheck };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}leadsDeleteData`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == 200) {
          Swal.fire("Good job!", dataex.message, "success");
          setIsCheck([]);
          navigate("/list-assign-leads");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const clearFilters = () => {
    const cleared = {
      search: "",
      LeadNature: "",
      SalesConsul: "",
      TransferStatus: "",
      ProjectN: "",
    };
    setSearch(cleared.search);
    setLeadNature(cleared.LeadNature);
    setSalesConsul(cleared.SalesConsul);
    setTransferStatus(cleared.TransferStatus);
    setProjectN(cleared.ProjectN);
    loadAssignedLeads(1, cleared);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (
    leadid,
    agentid,
    phoneNo,
    phoneNoIos,
    EmailData,
    whatsappNo
  ) => {
    setShow(true);
    setGetLeadId(leadid);
    setPhoneNo(phoneNo);
    setPhoneNoWhatsapp(whatsappNo);
    setPhoneNoIos(phoneNoIos);
    setEmailData(EmailData);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid);
  };

  const TransferLeads = (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    if (window.confirm("Do You Want to Transfer Leads")) {
      if (SalesConsul == "" || SalesConsul == null) {
        Swal.fire("Error!", "Please Select Consultant", "error");
      } else {
        const FeildData = {
          isCheck: isCheck,
          SalesConsul: SalesConsul,
          companyId: AuthData.company_id,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(FeildData),
        };
        fetch(`${actionConfig.REACT_APP_URL}leadsTransferData`, requestOptions)
          .then((response) => response.json())
          .then((dataex) => {
            if (dataex.code == 200) {
              Swal.fire("Good job!", dataex.message, "success");
              navigate("/list-assign-leads");
            } else {
              Swal.fire("Error!", dataex.message, "error");
            }
          });
      }
    }
  };

  const listingData = Array.isArray(resultListing?.data) ? resultListing.data : [];
  const exportData = listingData.map((record) => {
    const lead = record?.getleads && typeof record.getleads === "object" ? record.getleads : {};
    return {
      Name: lead.clientName || "No Name",
      "Agent Name": record?.emp_name || "",
      "Client No": lead.clientPhone || "",
      "Project Name": lead.clientProject || "",
      Profession: !lead.clientDesignation || lead.clientDesignation === "-" ? "N/a" : lead.clientDesignation,
      Date: [record?.PublishDate, record?.timeAgo].filter(Boolean).join(" "),
    };
  });
  const totalRecords = resultListing?.totalRecords === "" || resultListing?.totalRecords == null
    ? null
    : Number.isFinite(Number(resultListing.totalRecords))
      ? Number(resultListing.totalRecords)
      : null;
  const consultantOptions = Array.isArray(resultlistdashboard?.empAll) ? resultlistdashboard.empAll : [];
  const projectOptions = Array.isArray(resultlistdashboard?.getAllProjects) ? resultlistdashboard.getAllProjects : [];
  const activeFilterCount = [search, SalesConsul, ProjectN, TransferStatus].filter(Boolean).length;
  const canExport = SuperCon.length > 0 && AssignExport.length > 0;
  const visibleRecordCount = requestState === "success" || requestState === "empty"
    ? totalRecords === null
      ? `${listingData.length} on this page`
      : `${totalRecords.toLocaleString()} records`
    : null;

  const renderTableState = () => {
    if (requestState === "loading") {
      return <PageState kind="loading" title="Loading assigned leads" description="Your current lead view is being loaded." />;
    }
    if (requestState === "unavailable") {
      return <PageState kind="unavailable" title="Assigned leads are unavailable" description="This account cannot access the assigned leads response." />;
    }
    if (requestState === "error") {
      return <PageState kind="error" title="Assigned leads could not be loaded" description="The request did not return a usable lead list. No record count is shown." onRetry={() => loadAssignedLeads(currentPage + 1, currentFilters())} />;
    }
    if (listingData.length === 0) {
      return <PageState kind="empty" title={activeFilterCount ? "No leads match these filters" : "No assigned leads"} description={activeFilterCount ? "Clear or adjust filters to see other leads." : "There are no records to display in this view."} />;
    }
    return null;
  };

  return (
    <PageErrorBoundary onRetry={() => loadAssignedLeads(currentPage + 1, currentFilters())}>
      <>
        <Navigation />
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4 sellmore-assigned-leads">
          <PageHeader
            title="Assigned Leads"
            description="Manage assigned leads and follow-ups."
            actions={canExport && (
              <CSVLink
                className="sellmore-button sellmore-button-quiet"
                data={exportData}
                filename="assigned-leads-current-page.csv"
                aria-label="Export current page"
                title="Exports only the rows loaded on this page"
              >
                Export current page
              </CSVLink>
            )}
          />

          <FilterBar onSubmit={handleSearch} onClear={clearFilters}>
            <label className="sellmore-filter-field">
              <span>Search</span>
              <input
                type="search"
                name="search"
                placeholder="Name, phone or ID"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="sellmore-filter-field">
              <span>Consultant</span>
              <select name="ConsultantNmae" value={SalesConsul} onChange={(event) => setSalesConsul(event.target.value)}>
                <option value="">All consultants</option>
                {consultantOptions.filter((employee) => employee?.id !== "").map((employee, index) => (
                  <option value={employee.id} key={employee.id ?? index}>{employee.emp_name}</option>
                ))}
              </select>
            </label>
            <label className="sellmore-filter-field">
              <span>Project</span>
              <select name="projectN" value={ProjectN} onChange={(event) => setProjectN(event.target.value)}>
                <option value="">All projects</option>
                {projectOptions.filter((project) => project?.clientProject).map((project, index) => (
                  <option value={project.clientProject} key={`${project.clientProject}-${index}`}>{project.clientProject}</option>
                ))}
              </select>
            </label>
            <details className="sellmore-more-filters">
              <summary>More filters</summary>
              <div className="sellmore-more-filter-fields">
                <label className="sellmore-filter-field">
                  <span>Transfer leads search</span>
                  <select name="transferType" value={TransferStatus} onChange={(event) => setTransferStatus(event.target.value)}>
                    <option value="">All lead assignments</option>
                    <option value="transfer">Transferred</option>
                  </select>
                </label>
                {SuperCon.length > 0 && (
                  <div className="sellmore-filter-unavailable" aria-disabled="true">
                    <span>Date range</span>
                    <small>Not wired to the current list request</small>
                  </div>
                )}
              </div>
            </details>
          </FilterBar>

          <div className="sellmore-list-summary" aria-live="polite">
            <strong>{visibleRecordCount || (requestState === "loading" ? "Loading records…" : "Record count unavailable")}</strong>
            {activeFilterCount > 0 && <span>{activeFilterCount} filters selected</span>}
          </div>

          {canExport && isCheck.length > 0 && (
            <BulkActionBar selectedCount={isCheck.length}>
              <button className="sellmore-button sellmore-button-primary" type="button" onClick={TransferLeads}>Transfer</button>
              <MoreActions>
                <button className="sellmore-button sellmore-button-danger" type="button" onClick={() => setShowDeleteConfirmation(true)}>Delete selected</button>
              </MoreActions>
            </BulkActionBar>
          )}

          <section className="sellmore-table-shell">
            <DataTable>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Client No</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Profession</th>
                  <th scope="col" className="sellmore-column-date">Date</th>
                </tr>
              </thead>
              <tbody>
                {renderTableState() ? (
                  <tr><td className="sellmore-empty-cell" colSpan={6}>{renderTableState()}</td></tr>
                ) : listingData.map((record, index) => {
                  const lead = record?.getleads && typeof record.getleads === "object" ? record.getleads : {};
                  const transfer = record?.get_transferleads;
                  const reminder = record?.getreminder;
                  const leadId = record?.leadid;
                  const clientName = lead.clientName || "No Name";
                  const leadClient = browserName === "Mobile Safari" ? record?.clientPhoneIos : record?.clientPhone;
                  const rowKey = leadId ?? record?.id ?? `${currentPage}-${index}`;
                  const isUntouched = record?.getvirginleads == null;
                  const dataQuality = deriveLeadDataQuality(record);
                  return (
                    <tr key={rowKey}>
                      <td>
                        <div className="sellmore-lead-identity">
                          <input type="checkbox" aria-label={`Select ${clientName}`} id={leadId} name={leadId} checked={isCheck.includes(String(leadId))} onChange={handleClick} />
                          <RowActions
                            label={`Open actions for ${clientName}`}
                            onClick={() => handleShow(leadId, record?.agentid, lead.clientPhone, leadClient, lead.clientemail, record?.whatsappclientPhone)}
                          >
                            {clientName}
                          </RowActions>
                        </div>
                        <div className="sellmore-lead-meta">
                          {isUntouched && <LeadTemperatureBadge isWarm />}
                          {dataQuality === "incomplete" && <DataQualityBadge quality={dataQuality} />}
                          {leadId != null && <Link className="sellmore-lead-360-link" to={`/lead-history/${leadId}`}>Lead 360</Link>}
                          {transfer && <span className="sellmore-row-note" title={[transfer.fagentName, transfer.transferNote].filter(Boolean).join(" · ")}><FaShareAlt aria-hidden="true" />Transferred</span>}
                          {reminder && typeof reminder === "object" && <span className="sellmore-row-note" title={reminder.reminderinfo}><FaBell aria-hidden="true" />Reminder set</span>}
                        </div>
                      </td>
                      <td>{record?.emp_name || "—"}</td>
                      <td><span className="sellmore-row-note" title={lead.clientPhone || ""}>{lead.clientPhone || "—"}</span></td>
                      <td><span className="sellmore-row-note" title={lead.clientProject || ""}>{lead.clientProject || "—"}</span></td>
                      <td>{!lead.clientDesignation || lead.clientDesignation === "-" ? "N/a" : <span className="sellmore-row-note" title={lead.clientDesignation}>{lead.clientDesignation}</span>}</td>
                      <td className="sellmore-column-date"><CompactDate value={record?.PublishDate} relativeValue={record?.timeAgo} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </DataTable>
            {requestState === "success" && totalRecords !== null && (
              <Pagination pageCount={Math.ceil(totalRecords / 12)} forcePage={currentPage} onPageChange={handlePageClick} />
            )}
          </section>
        </div>

        <ConfirmationDialog
          show={showDeleteConfirmation}
          title="Delete selected leads?"
          message={`Confirm deletion of ${isCheck.length} selected lead${isCheck.length === 1 ? "" : "s"}.`}
          confirmLabel="Delete selected"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={(event) => {
            setShowDeleteConfirmation(false);
            DeleteLeads(event);
          }}
        />

      {/* {PopupData == true ? (

<>

<div className="modal fade" id={PopupData == true ? ('actionModal') : ('')} role="dialog" aria-labelledby="actionModalLabel" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="">
<button type="button" className="close mt-10 mr-10" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div className="modal-body p-0">
<div className="card shadow-none">
<div className="card-header card-header-action">
<h6>Activity</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href={`tel:77`+GetPhoneNo} title="Phone Call" className="PhoneCall leadimpression" onClick={()=>CallingAction('phone',AuthDataxs.id,GetLeadId)}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" />
<span className="badge badge-pill badge-warning phone impData Phone">{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.Phone}</span>
<br />
<small>Phone</small>
</center>
</a>
</div>
<div className="col">
<a href={`https://wa.me/`+GetPhoneNo} title="Whatsapp" onClick={()=>CallingAction('whatsapp',AuthDataxs.id,GetLeadId)} className="WhatsappImp leadimpression">
<center>

<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" />
<span className="badge badge-pill badge-warning whatsapp impData Whatsapp" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.whatsapp}</span>
<br />
<small>Whatsapp</small>
</center>
</a>
</div>
<div className="col">
<a href={`sms:+`+GetPhoneNo+`&body=hi this is testing email`} title="Sms" onClick={()=>CallingAction('sms',AuthDataxs.id,GetLeadId)} className="SmsImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" />
<span className="badge badge-pill badge-warning sms impData Sms" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.sms}</span>
<br />
<small>SMS</small>
</center>
</a>
</div>
<div className="col">
<a href={`mailto:`+GetEmail} title="Email" onClick={()=>CallingAction('email',AuthDataxs.id,GetLeadId)} className="EmailImp leadimpression" >
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" />
<span className="badge badge-pill badge-warning email impData Email" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.email}</span>
<br />
<small>Email</small>
</center>
</a>
</div>
</div>
</div>
<div className="card-header card-header-action">
<h6>Action</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href="#!" data="transfer" className="ActionPerform" onClick={()=>MyFuncAction('transfer')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-transfer.png" alt="icon" /><br />
<small>Transfer</small>
</center>
</a>
</div>
<div className="col">
<NavLink to={`/add-lead/${GetLeadId}`} className="addLeads" onClick={()=>MyFuncAction('addLeads')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-add.png" alt="icon" /><br />
<small>Add</small>
</center>
</NavLink>
</div>
<div className="col">
<NavLink to={`/add-reminder/${GetLeadId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div>
<div className="col">
<a href="#!" data="remove" className="ActionPerform NotInterested" onClick={()=>MyFuncAction('remove')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-remove.png" alt="icon" /><br />
<small>Remove</small>
</center>
</a>
</div>


</div>

<div className="modal-body" id={NotInterestedresult == false ? ('notinterestedX') : ('notinterestedShow') }>
<p>Why Client is not Interested ?</p>
<form onSubmit={addNotInterestedClient}>

<div className="mt-15">

{
proReasonNotInterresult.map((curElem,index) => {
return (
<div className="custom-control custom-radio mt-1 pl-0" key={curElem.id}>
<label style={{marginBottom:'5px'}}>
<input type="radio" name="client_opt" value={curElem.title} className="client_opt"/> {curElem.title}
</label>
</div>

)
})
}



<div className={GetOtherNot == true ? ('form-group mt-15') : ('form-group mt-15 OrderNote')}>
<label >Note</label>
<textarea className="form-control OtherNote" name="client_opt" rows="3" placeholder="Textarea" onChange={e=>setOtherNote(e.target.value)} value={GetOtherNote}>{GetOtherNote}</textarea>                                                        
</div>

<div className={GetBugget == true ? ('col-md-12') : ('col-md-12 PriceRange')}>
<div className="form-group">
<input className="range-slider-2" onChange={e=>setBudgetPrice(e.target.value)} value={GetBudgetPrice}/>
</div>
</div>
<div className="form-group mt-2">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</div>
<div>
</div>
</form>
</div>


<div className="modal-body transfer" id={Transferresult == false ? ('transferHide') : ('transferShow') }>
<form onSubmit={AddTransferFormData}>

<div className="form-group">
<label >Select Agent</label>
<select name="agentid" className="form-control custom-select select2 mt-15" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="">Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDataxs.id ? (<></>) : (<><option key={curElem.id} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>
<div className="form-group">
<label >Note</label>
<textarea name="transferNote" className="form-control" rows="3" placeholder="Textarea" onChange={e=>setTransferNote(e.target.value)} value={GetTransferNote} required></textarea>                                                        
</div>

<div className="form-group">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</form>
</div>


</div>
</div>
</div>
</div>
</div>
</div>

</>

) : (
<></>
)

} */}

      <LeadActionCenter show={show} onHide={handleClose}>
          <div className="modal-body p-0">
            <div className="card shadow-none">
              <div className="card-body pt-10">
                <ActionCenterSection title="Quick communication">
                  <div className="sellmore-action-center-actions">
                    <ActionCenterAction icon={FiPhone} href={`tel:66${PhoneNoIos}`} disabled={!PhoneNoIos} onClick={() => CallingAction("phone", AuthDataxs.id, GetLeadId)}>Call</ActionCenterAction>
                    <ActionCenterAction icon={FiMessageCircle} href={`https://wa.me/${PhoneNoWhatsapp}`} disabled={!PhoneNoWhatsapp} onClick={() => CallingAction("whatsapp", AuthDataxs.id, GetLeadId)}>WhatsApp</ActionCenterAction>
                    <ActionCenterAction icon={FiMessageCircle} href={`sms:+${GetPhoneNo}&body=hi this is testing email`} disabled={!GetPhoneNo} onClick={() => CallingAction("sms", AuthDataxs.id, GetLeadId)}>SMS</ActionCenterAction>
                    <ActionCenterAction icon={FiMail} href={`mailto:${GetEmail}`} disabled={!GetEmail} onClick={() => CallingAction("email", AuthDataxs.id, GetLeadId)}>Email</ActionCenterAction>
                  </div>
                  {proCallingresult?.data && (
                    <div className="sellmore-communication-grid">
                      <CommunicationMetric icon={FiPhone} label="Phone calls" value={proCallingresult.data.Phone} />
                      <CommunicationMetric icon={FiMessageCircle} label="WhatsApp" value={proCallingresult.data.whatsapp} />
                      <CommunicationMetric icon={FiMessageCircle} label="SMS" value={proCallingresult.data.sms} />
                      <CommunicationMetric icon={FiMail} label="Email" value={proCallingresult.data.email} />
                    </div>
                  )}
                </ActionCenterSection>
              </div>
              <ActionCenterSection title="Lead management">
                <div className="sellmore-action-center-actions">
                  <ActionCenterAction icon={FiRepeat} tone="primary" onClick={() => MyFuncAction("transfer")}>Transfer</ActionCenterAction>
                  <ActionCenterAction icon={FiEdit} onClick={() => { handleClose(); navigate(`/add-lead/${GetLeadId}`); }}>Edit Lead</ActionCenterAction>
                  <ActionCenterAction icon={FiBell} onClick={() => { handleClose(); navigate(`/add-reminder/${GetLeadId}`); }}>Reminder</ActionCenterAction>
                  <ActionCenterAction icon={FiXCircle} tone="danger" onClick={() => MyFuncAction("remove")}>Not Interested</ActionCenterAction>
                </div>
              </ActionCenterSection>

              {NotInterestedresult && (
                <ActionCenterSection title="Disposition: Not Interested">
                  <form onSubmit={addNotInterestedClient}>
                    <div className="mt-15">
                      <p className="sellmore-action-center-help">Select a reason for marking this lead not interested.</p>
                      {(Array.isArray(proReasonNotInterresult) ? proReasonNotInterresult : []).map((curElem, index) => {
                        return (
                          <div
                            className="custom-control custom-radio mt-1 pl-0"
                            key={curElem.id}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              <input
                                type="radio"
                                name="client_opt"
                                value={curElem.title}
                                className="client_opt"
                              />{" "}
                              {curElem.title}
                            </label>
                          </div>
                        );
                      })}

                      <div
                        className={
                          GetOtherNot == true
                            ? "form-group mt-15"
                            : "form-group mt-15 OrderNote"
                        }
                      >
                        <label>Note</label>
                        <textarea
                          className="form-control OtherNote"
                          name="client_opt"
                          rows="3"
                          placeholder="Textarea"
                          onChange={(e) => setOtherNote(e.target.value)}
                          value={GetOtherNote}
                        >
                          {GetOtherNote}
                        </textarea>
                      </div>

                      <div
                        className={
                          GetBugget == true
                            ? "col-md-12"
                            : "col-md-12 PriceRange"
                        }
                      >
                        <div className="form-group">
                          <input
                            className="range-slider-2"
                            onChange={(e) => setBudgetPrice(e.target.value)}
                            value={GetBudgetPrice}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </form>
                </ActionCenterSection>
              )}

              {Transferresult && (
                <ActionCenterSection title="Transfer lead">
                  <form onSubmit={AddTransferFormData}>
                    <div className="form-group">
                      <label htmlFor="sellmore-transfer-agent">Select Agent</label>
                      <select
                        id="sellmore-transfer-agent"
                        name="agentid"
                        className="form-control custom-select select2 mt-15"
                        onChange={(e) => setGetAgentId(e.target.value)}
                        value={GetAgentId}
                        required
                      >
                        <option value="">Select Agent...</option>
                        {Employeeresult.map((curElem, index) => {
                          return curElem.id == AuthDataxs.id ? (
                            <></>
                          ) : (
                            <>
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.emp_name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Note</label>
                      <textarea
                        name="transferNote"
                        className="form-control"
                        rows="3"
                        placeholder="Textarea"
                        onChange={(e) => setTransferNote(e.target.value)}
                        value={GetTransferNote}
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </ActionCenterSection>
              )}
            </div>
          </div>
      </LeadActionCenter>
    </>
    </PageErrorBoundary>
  );
};

export default AssignListing;
