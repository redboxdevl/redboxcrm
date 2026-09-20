import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { actionConfig } from "../../configuration";
import OtherNavigation from "../../Includes/OtherNavigation";
import QuickNav from "../../Includes/QuickNav";
import { SingleEmpAction } from "../../redux/action/SingleEmpAction";
import { ListformAction } from "../../redux/action/ListformAction";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import LoadingSpinner from "../FinanceDashboard/LoadingSpinner";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import moment from "moment";

const AddTask = () => {
  const navigate = useNavigate();

  const EmpData = useSelector((state) => state.SingleEmpreducers.singleempdata);
  const ListData = useSelector((state) => state.Listformreducer.listformdata);
  const dispatch = useDispatch();

  const [result, setResult] = useState([]);
  const [ResultDepartments, setResultDepartments] = useState([]);
  const [AssignEmpData, setAssignEmpData] = useState([]);

  const [inputList, setinputList] = useState([{ checkList: "" }]);
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDesc, setTaskDesc] = useState("");
  const [TaskPriority, setTaskPriority] = useState("");
  const [TaskStatus, setTaskStatus] = useState("7");
  const [Taskcomment, setTaskcomment] = useState("");
  const [Taskcommentdatetime, setTaskcommentdatetime] = useState("");
  const [TaskAssignTo, setTaskAssignTo] = useState("");
  const [TaskDueDate, setTaskDueDate] = useState("");

  console.log("TaskDueDate", TaskDueDate);
  const [AttachementPic, setAttachementPic] = useState("");
  const [DepartmentsId, setDepartmentsId] = useState("");
  const [LoadingS, setLoadingS] = useState(false);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(SingleEmpAction(AuthData.id));
    dispatch(ListformAction(AuthData.id));
  }, []);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const ListEmployee = async (DepartmentsId) => {
    if (DepartmentsId == null || DepartmentsId == "") {
      setResult("");
    } else {
      const response = await fetch(
        `${actionConfig.REACT_APP_URL}departmentwise/${DepartmentsId}`
      );
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setResult(await GetArray);

      var optionsxs = [];
      GetArray.map((datax) => {
        optionsxs.push({
          value: datax.id,
          label: datax.emp_name,
        });
      });

      console.log("optionsxs", optionsxs);
      setAssignEmpData(optionsxs);
    }
  };

  const ListDepartment = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}department?agentId=1`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResultDepartments(await GetArray);
  };

  useEffect(() => {
    ListEmployee(DepartmentsId);
    ListDepartment();
  }, [DepartmentsId == "" || DepartmentsId == null ? "" : DepartmentsId]);

  const changeHandler = (event) => {
    setAttachementPic(event.target.files[0]);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { checkList: "" }]);
  };

  const handleinputchangeData = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const AddTaskAction = (e) => {
    e.preventDefault();
    setLoadingS(true);
    let randomNo = randomNumberInRange(1, 99999);

    const formData = new FormData();

    formData.append("task_id", randomNo);
    formData.append("task_title", TaskTitle);
    formData.append("description", TaskDesc);
    formData.append("checklist_item", JSON.stringify(inputList));
    formData.append("emp_id", EmpData.id);
    formData.append("attachement", AttachementPic);
    formData.append("priority", TaskPriority);
    formData.append("assigned_by", EmpData.id);
    formData.append("assigned_to", JSON.stringify(TaskAssignTo));
    formData.append("due_date", TaskDueDate);
    formData.append("departmentId", DepartmentsId);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}task`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/task-management");
          setLoadingS(false);
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  var countEmployee = result.length;

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

  const locale = {
    format: "YYYY-MM-DD hh:mm:ss",
  };

  const onApply = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
    setTaskDueDate(dateData);
  };

  const AssignEmployeeHandler = (value) => {
    console.log("value", value);

    if (
      value.length == 0 ||
      value == "" ||
      value == undefined ||
      value == null
    ) {
      setTaskAssignTo("");
    } else {
      var optionsxs = [];
      value.map((datax) => {
        optionsxs.push(datax.value);
      });
      setTaskAssignTo(optionsxs);
    }
  };

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Add Task Management</h2>
          </div>
        </div>

        <OtherNavigation />
        {LoadingS == true ? <LoadingSpinner /> : ""}

        <div class="row">
          <div class="col-xl-12">
            <section class="hk-sec-wrapper">
              <div class="row">
                <div class="col-sm">
                  <form
                    method="post"
                    onSubmit={AddTaskAction}
                    encType="multipart/form-data"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="taskTitle">Task *</label>
                          <input
                            class="form-control"
                            name="task_title"
                            id="task_title"
                            placeholder="Task Name"
                            type="text"
                            required
                            onChange={(e) => setTaskTitle(e.target.value)}
                            value={TaskTitle}
                          />
                        </div>
                        <div class="form-group">
                          <label for="address">Task List</label>
                          {inputList.map((x, i) => {
                            return (
                              <>
                                <div className="ChecListData">
                                  <input
                                    type="text"
                                    name="checkList"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleinputchangeData(e, i)
                                    }
                                    placeholder="Task List"
                                  />
                                  {
                                    inputList.length !== 1 && (
                                      <MdRemoveCircleOutline
                                        size={30}
                                        color="red"
                                        onClick={() => handleremove(i)}
                                      />
                                    )
                                    // <button type="button" class="btn btn-block btn-danger btn-sm RemoveCx"  >Remove</button>
                                  }
                                  {
                                    inputList.length - 1 === i && (
                                      <BsFillPlusCircleFill
                                        size={30}
                                        onClick={handleaddclick}
                                      />
                                    )
                                    // <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
                                  }
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="email">Descripation*</label>
                          <textarea
                            name="description"
                            class="form-control"
                            rows="5"
                            placeholder="Task Description"
                            required
                            onChange={(e) => setTaskDesc(e.target.value)}
                            value={TaskDesc}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div class="form-group">
                          <label for="input_tags">Attachment</label>
                          <input
                            type="file"
                            name="attachement"
                            className="form-control"
                            onChange={changeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label for="country">Priority*</label>
                          <select
                            class="form-control custom-select d-block w-100"
                            name="priority"
                            id="priority"
                            required
                            onChange={(e) => setTaskPriority(e.target.value)}
                            value={TaskPriority}
                          >
                            <option value="">Choose...</option>
                            {ListData == "" ||
                            ListData == null ||
                            ListData == undefined ||
                            ListData.length == 0 ? (
                              <></>
                            ) : (
                              ListData.PriorityData.map((item, key) => {
                                return (
                                  <option value={item.id}>
                                    {item.priorityTitle}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <label for="zip">Departments*</label>
                        <select
                          class="form-control custom-select d-block w-100"
                          name="assignto"
                          id="assignto"
                          required
                          onChange={(e) => setDepartmentsId(e.target.value)}
                          value={DepartmentsId}
                        >
                          <option value="">Select Department</option>
                          {ResultDepartments.length > 0 ? (
                            ResultDepartments.map((curElem, index) => {
                              return curElem.id == 6 ? (
                                <></>
                              ) : (
                                <option value={curElem.id}>
                                  {curElem.department_name}
                                </option>
                              );
                            })
                          ) : (
                            <>
                              <p>No Record Found</p>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label for="zip">Assign To Employees*</label>
                        <Select
                          isMulti
                          defaultInputValue=""
                          placeholder="Select Employees"
                          options={AssignEmpData}
                          onChange={AssignEmployeeHandler}
                        />
                        {/* <select class="form-control custom-select d-block w-100" name="assignto" id="assignto" required onChange={e=>setTaskAssignTo(e.target.value)} value={TaskAssignTo}>
        <option value="">Select Employees</option>
        {

countEmployee > 0 ? (

  result.map((curElem,index) => {

return (
        <option value={curElem.id}>{curElem.emp_name}</option>
    )

})
): (
<>
<p>No Record Found</p>
</>
)


}
    </select> */}
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">CC*</label>
                          <select
                            name="cctask"
                            id=""
                            className="form-control"
                            required
                          >
                            <option value="">Select CC</option>
                            <option value="1">Naveed Shah</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label for="zip">Due Date*</label>
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              timePicker: true,
                              timePicker24Hour: true,
                              locale,
                              startDate: moment().startOf("hour").toDate(),
                            }}
                            onCallback={onApply}
                          >
                            <input
                              class="form-control"
                              type="text"
                              placeholder="asdsad"
                            />
                          </DateRangePicker>
                          {/* <input class="form-control" name="duedate" id="duedate" placeholder="" type="date" required onChange={e=>setTaskDueDate(e.target.value)} value={TaskDueDate}/> */}
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="text-center">
                      {LoadingS == true ? (
                        <button
                          type="submit"
                          class="btn btn-primary w-15"
                          disabled
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="submit" class="btn btn-primary w-15">
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
