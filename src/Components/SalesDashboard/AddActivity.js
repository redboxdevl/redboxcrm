import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navigation from "../../Includes/Navigation";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import $ from "jquery";
import { actionConfig } from "../../configuration";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";

const AddActivity = () => {
  const AuthData = JSON.parse(localStorage.getItem("authdata"));

  var CurrentDate = moment().format("YYYY-MM-DD hh:mm:ss");

  let { cid, id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [ResultParent, setResultParent] = useState([]);

  const [resultOutcome, setResultOutcome] = useState([]);
  const [SingleActivityResult, setSingleActivityResult] = useState([]);
  const [SingleCustomerDetails, setSingleCustomerDetails] = useState([]);

  const [GetActivityId, setGetActivityId] = useState("");
  const [GetActivityOutcomeId, setActivityOutcomeId] = useState("");
  const [ActivityInterestId, setActivityInterestId] = useState("");
  const [ActivityDescId, setActivityDescId] = useState("");
  const [ActivityStatusId, setActivityStatusId] = useState("");
  const [Mettingtime, setMettingtime] = useState("");
  const [MettingLocation, setMettingLocation] = useState("");
  const [ReminderSetItem, setItemReminder] = useState(CurrentDate);
  const [ReminderPriority, setReminderPriority] = useState("");
  const [ReminderInformation, setReminderInformation] = useState("");
  const [ReminderType, setReminderType] = useState("");
  const [ReminderOtherTypes, setReminderOtherTypes] = useState("");
  const [MettingTypes, setMettingTypes] = useState("");
  const [NextActivityDate, setNextActivityDate] = useState("");
  const [Whatsappscreenshot, setWhatsappscreenshot] = useState("");
  const [Whatsapptalkduration, setWhatsapptalkduration] = useState(0);

  const changeHandler = (event) => {
    setWhatsappscreenshot(event.target.files[0]);
  };

  const dispatch = useDispatch();
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );

  function convertDatePickerTimeToMySQLTime(str) {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate, mySQLTime].join(" ");
  }

  const onApply = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
    setMettingtime(dateData);
    setItemReminder(dateData);
  };

  const locale = {
    format: "YYYY-MM-DD HH:mm:ss",
  };

  useEffect(() => {
    GetActivityTypes();
    GetActivityOutcomeTypes(GetActivityId);
    GetActivityParentTypes(GetActivityId);
  }, [GetActivityId]);

  const GetActivityTypes = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}myleadactivitytype`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    const FinalArray = GetArray.data;
    setResult(await GetArray);
  };

  const GetActivityParentTypes = async (GetActivityId) => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}myleadactivityparenttype?id=${GetActivityId}`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    const FinalArray = GetArray.data;
    setResultParent(await GetArray);
  };

  const GetActivityOutcomeTypes = async (activityId) => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}myleadactivityoutcome?activityId=${activityId}`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    const FinalArray = GetArray.data;
    setResultOutcome(await GetArray);
  };

  $("body").find(".modal-backdrop").removeClass();
  $("body").removeClass("modal-open");

  const AddReminderFormData = (e) => {
    e.preventDefault();

    const FeildData = {
      agentid: AuthData.id,
      customerid: cid,
      leadid: id,
      ActivityType: GetActivityId == 18 ? MettingTypes : GetActivityId,
      Outcome:
        GetActivityOutcomeId == null || GetActivityOutcomeId == ""
          ? 0
          : GetActivityOutcomeId,
      reminderSet: ReminderSetItem,
      priority: ReminderPriority,
      reminderinfo: ActivityDescId,
      activityStatus: ActivityStatusId,
      clientInterest: ActivityInterestId,
      reminderTypeId: ReminderType,
      otherreminderTypeId:
        ReminderOtherTypes == null || ReminderOtherTypes == ""
          ? "0"
          : ReminderOtherTypes,
      companyId: AuthData.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    console.log("requestOptions", requestOptions);

    fetch(`${actionConfig.REACT_APP_URL}myleadactivityReminder`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        console.log(dataex);
        if (dataex.success == true) {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-super-database-report");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const AddActivitiesFormData = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("customerid", cid);
    formData.append("agentid", AuthData.id);
    formData.append("ActivityType", GetActivityId);
    formData.append(
      "Outcome",
      GetActivityOutcomeId == null || GetActivityOutcomeId == ""
        ? 0
        : GetActivityOutcomeId
    );
    formData.append("clientInterest", ActivityInterestId);
    formData.append("desc", ActivityDescId);
    formData.append("activityStatus", ActivityStatusId);
    formData.append("Mettingtime", Mettingtime);
    formData.append("MettingLocation", MettingLocation);
    formData.append("NextActivityDate", NextActivityDate);
    formData.append("ReminderPriority", ReminderPriority);
    formData.append("companyId", AuthData.company_id);
    formData.append("Whatsappscreenshot", Whatsappscreenshot);
    formData.append("Whatsapptalkduration", Whatsapptalkduration);

    const FeildData = {
      //   customerid: cid,
      //   agentid: AuthData.id,
      //   ActivityType: GetActivityId,
      //   Outcome:
      //     GetActivityOutcomeId == null || GetActivityOutcomeId == ""
      //       ? 0
      //       : GetActivityOutcomeId,
      //   clientInterest: ActivityInterestId,
      //   desc: ActivityDescId,
      //   activityStatus: ActivityStatusId,
      //   Mettingtime: Mettingtime,
      //   MettingLocation: MettingLocation,
      //   NextActivityDate: NextActivityDate,
      //   ReminderPriority: ReminderPriority,
      //   companyId: AuthData.company_id,
      //   Whatsappscreenshot: Whatsappscreenshot,
      //   Whatsapptalkduration: Whatsapptalkduration,
    };

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(FeildData),
    // };

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}myleadactivity`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        console.log(dataex);
        if (dataex.success == true) {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-super-database-report");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const SingleActivityLog = async (cid) => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}listactivity?customerId=${cid}`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setSingleActivityResult(await GetArray);

    const responseSingle = await fetch(
      `${actionConfig.REACT_APP_URL}singlemyleads/${cid}`
    );
    const dataxsSingle = await responseSingle.json();
    const GetArraySingle = dataxsSingle.data[0];
    setSingleCustomerDetails(await GetArraySingle);
  };
  useEffect(() => {
    SingleActivityLog(cid);
  }, [cid == undefined || cid == null || cid == "" ? "" : cid]);

  console.log("SingleCustomerDetails", SingleCustomerDetails);

  return (
    <>
      <Navigation />

      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
          <div>
            <h2 className="hk-pg-title font-weight-600 pb-3">Client Details</h2>
            <h4>
              {SingleCustomerDetails == "" || SingleCustomerDetails == null
                ? "N/a"
                : SingleCustomerDetails.clientName}
            </h4>
            <h5>Karachi , Pakistan</h5>
            <p>
              On{" "}
              <b>
                On {CurrentDate}, He Connected via Lead Form and wants to buy a
                2 in AQ Penthouse.
              </b>
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm">
            <form
              onSubmit={
                GetActivityId == 25
                  ? AddReminderFormData
                  : AddActivitiesFormData
              }
              encType="multipart/form-data"
            >
              <div class="row">
                <div class="col-md-4 form-group">
                  <label for="clientStatus">
                    Activity Type<span class="text-danger">*</span>
                  </label>
                  <select
                    class="form-control custom-select d-block w-100 select2 ActivityType"
                    name="ActivityType"
                    id="ActivityType"
                    onChange={(e) => setGetActivityId(e.target.value)}
                    value={GetActivityId}
                  >
                    <option value="">Select Type...</option>
                    {result.map((curElem, index) => {
                      return (
                        <option key={index} value={curElem.id}>
                          {curElem.activityName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {GetActivityId == 24 ? (
                  <>
                    <div class="col-md-4 form-group">
                      <label for="clientName">
                        Metting Time<span class="text-danger">*</span>
                      </label>
                      <DateRangePicker
                        initialSettings={{
                          singleDatePicker: true,
                          timePicker: true,
                          timePicker24Hour: true,
                          locale,
                        }}
                        onCallback={onApply}
                      >
                        <input class="form-control" type="text" />
                      </DateRangePicker>
                      {/* <input type="datetime-local" name="Mettingtime" class="form-control" onChange={e=>setMettingtime(e.target.value)} value={Mettingtime} /> */}
                    </div>

                    <div class="col-md-4 form-group">
                      <label for="clientName">
                        Metting Location<span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="MettingLocation"
                        class="form-control"
                        onChange={(e) => setMettingLocation(e.target.value)}
                        value={MettingLocation}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {GetActivityId == 18 ? (
                  <>
                    <div class="col-md-4 form-group">
                      <label for="clientStatus">Metting Types</label>
                      <select
                        class="form-control custom-select d-block w-100 Outcome"
                        name="MettingTypes"
                        id="MettingTypes"
                        onChange={(e) => setMettingTypes(e.target.value)}
                        value={MettingTypes}
                      >
                        <option value="">Select Metting Type...</option>
                        {ResultParent.map((curElem, index) => {
                          return (
                            <option key={index} value={curElem.id}>
                              {curElem.activityName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {GetActivityId == 24 ||
                GetActivityId == 25 ||
                GetActivityId == 16 ? (
                  <></>
                ) : (
                  <div class="col-md-4 form-group">
                    <label for="clientStatus">Activity Outcome</label>
                    <select
                      class="form-control custom-select d-block w-100 Outcome"
                      name="Outcome"
                      id="Outcome"
                      onChange={(e) => setActivityOutcomeId(e.target.value)}
                      value={GetActivityOutcomeId}
                    >
                      <option value="">Select Outcome...</option>
                      {resultOutcome.map((curElem, index) => {
                        return (
                          <option key={index} value={curElem.id}>
                            {curElem.outcomeTitle}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {GetActivityId == 16 ? (
                  <>
                    <div class="col-md-4 form-group">
                      <label for="clientStatus">Whatsapp Screenshoot </label>
                      <input
                        name="Whatsappscreenshot"
                        type="file"
                        class="form-control"
                        onChange={changeHandler}
                      />
                    </div>
                    <div class="col-md-4 form-group">
                      <label for="clientStatus">Whatsapp Talk Duration </label>
                      <input
                        name="Whatsapptalkduration"
                        type="number"
                        class="form-control"
                        placeholder="0"
                        onChange={(e) =>
                          setWhatsapptalkduration(e.target.value)
                        }
                        value={Whatsapptalkduration}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {GetActivityId == 25 ? (
                  <>
                    <div class="col-md-4 form-group">
                      <label for="clientStatus">
                        Reminder Type<span class="text-danger">*</span>
                      </label>
                      <select
                        class="form-control custom-select d-block w-100 select2"
                        name="ReminderType"
                        id="clientStatus"
                        onChange={(e) => setReminderType(e.target.value)}
                        value={ReminderType}
                        required
                      >
                        <option value="">Select Reminder Type...</option>
                        {resultlistdashboard == "" ||
                        resultlistdashboard == null ||
                        resultlistdashboard == undefined ||
                        resultlistdashboard.code == "ERR_NETWORK" ? (
                          <></>
                        ) : (
                          resultlistdashboard.Assignreminderlist.map(
                            (items, key) => {
                              return items.id == "" ? (
                                <></>
                              ) : (
                                <option value={items.id} key={key + 1}>
                                  {items.typeTitle}
                                </option>
                              );
                            }
                          )
                        )}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div
                      class={`col-md-3 form-group ${
                        ReminderType == "Other" ? "" : "d-none"
                      }`}
                    >
                      <label for="gender">Other Types</label>
                      <input
                        type="text"
                        name="reminderinfo"
                        id=""
                        class="form-control"
                        onChange={(e) => setReminderOtherTypes(e.target.value)}
                        value={ReminderOtherTypes}
                        placeholder="Reminder Other Type"
                      />
                    </div>
                    <div class="col-md-4 form-group">
                      <label for="clientName">
                        Reminder Set<span class="text-danger">*</span>
                      </label>
                      <DateRangePicker
                        initialSettings={{
                          singleDatePicker: true,
                          timePicker: true,
                          timePicker24Hour: true,
                          locale,
                        }}
                        onCallback={onApply}
                      >
                        <input class="form-control" type="text" />
                      </DateRangePicker>
                    </div>

                    <div class="col-md-4 form-group">
                      <label for="clientStatus">
                        Reminder Priority<span class="text-danger">*</span>
                      </label>
                      <select
                        class="form-control custom-select d-block w-100 select2"
                        name="priority"
                        id="clientStatus"
                        onChange={(e) => setReminderPriority(e.target.value)}
                        value={ReminderPriority}
                      >
                        <option value="">Select Priority...</option>
                        <option value="Very hot">Very hot</option>
                        <option value="Hot">Hot</option>
                        <option value="Cold">Cold</option>
                        <option value="Very cold">Very cold</option>
                        <option value="Moderate">Moderate</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="col-md-4 form-group">
                      <label for="clientStatus">
                        Priority<span class="text-danger">*</span>
                      </label>
                      <select
                        class="form-control custom-select d-block w-100 select2"
                        name="priority"
                        id="clientStatus"
                        onChange={(e) => setReminderPriority(e.target.value)}
                        value={ReminderPriority}
                      >
                        <option value="">Select Priority...</option>
                        <option value="Very hot">Very hot</option>
                        <option value="Hot">Hot</option>
                        <option value="Cold">Cold</option>
                        <option value="Very cold">Very cold</option>
                        <option value="Moderate">Moderate</option>
                      </select>
                    </div>
                  </>
                )}

                {/* <div class="col-md-4 form-group">
<label for="clientStatus">Client Interest<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100" name="clientInterest" id="clientInterest" onChange={e=>setActivityInterestId(e.target.value)} value={ActivityInterestId}>
<option value="">Select Interest...</option>
<option value="10">10%</option>
<option value="20">20%</option>
<option value="30">30%</option>
<option value="40">40%</option>
<option value="50">50%</option>
<option value="60">60%</option>
<option value="70">70%</option>
<option value="80">80%</option>
<option value="90">90%</option>
<option value="100">100%</option>
</select>
</div> */}

                <div class="col-md-4 form-group">
                  <label for="clientStatus">
                    Next Activity Date<span class="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="nextactivitydate"
                    className="form-control"
                    onChange={(e) => setNextActivityDate(e.target.value)}
                    value={NextActivityDate}
                  />
                </div>

                <div class="col-md-12 form-group">
                  <label for="clientName">
                    Description<span class="text-danger">*</span>
                  </label>
                  <textarea
                    name="desc"
                    id=""
                    cols="30"
                    rows="5"
                    class="form-control"
                    onChange={(e) => setActivityDescId(e.target.value)}
                    value={ActivityDescId}
                  >
                    {ActivityDescId}
                  </textarea>
                </div>

                <div class="col-md-12 form-group">
                  <label for="clientName">
                    Activity Status<span class="text-danger">*</span>
                  </label>
                  <select
                    name="activityStatus"
                    id=""
                    class="form-control"
                    onChange={(e) => setActivityStatusId(e.target.value)}
                    value={ActivityStatusId}
                  >
                    <option value="">Select Status</option>
                    <option value="On Going" selected>
                      On Going
                    </option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
              </div>
              <hr />
              <button class="btn btn-primary" type="submit">
                Update Activity
              </button>
            </form>
          </div>
        </div>

        <div class="row pt-20">
          <div class="col-sm">
            <div class="table-wrap">
              <table
                id="datable_1"
                class="table table-hover w-100 display pb-30 "
              >
                <thead class="thead-dark">
                  <tr>
                    <th>Activity Type</th>
                    <th>Activity Outcome</th>
                    <th>Client Percentage</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {SingleActivityResult == null ||
                  SingleActivityResult == undefined ||
                  SingleActivityResult == "" ? (
                    <>Loading.....</>
                  ) : SingleActivityResult.data.length > 0 ? (
                    SingleActivityResult.data.map((curElem, index) => {
                      return (
                        <tr>
                          <td>
                            {curElem.customer_activity_type == null
                              ? ""
                              : curElem.customer_activity_type.activityName}
                          </td>
                          <td>
                            {curElem.customer_activity_outcome == null
                              ? ""
                              : curElem.customer_activity_outcome.outcomeTitle}
                          </td>
                          <td>{curElem.InterestPercentage}%</td>
                          <td>{curElem.activityDetails}</td>
                          <td>
                            {curElem.actStatus == ""
                              ? "Ongoing"
                              : curElem.actStatus}
                          </td>
                          <td>{curElem.created_at}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan="7">
                          <b>Loading.....</b>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
