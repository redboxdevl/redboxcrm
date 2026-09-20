import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";

const QuickNav = ({ PendingTaskToday }) => {
  const [DashboardCond, setDashboardCond] = useState("");

  const resultRole = useSelector(
    (state) => state.EmployeeRolereducers.employeeroledata
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );

  const YoutubeList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 92 && edx.sub_features == "List"
        );
  const FinanceList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 105 && edx.sub_features == "List"
        );
  const HrList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 70 && edx.sub_features == "List"
        );
  const OperationList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 104 && edx.sub_features == "List"
        );
  const AnalyticsList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 88 && edx.sub_features == "List"
        );
  const TaskManagementList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 108 && edx.sub_features == "List"
        );

  const TaskManagementHrmanager =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id == 6);

  const EmployeeList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 61 && edx.sub_features == "List"
        );

  const InventoriesList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 100);
  // console.log("Quick Nav",resultRole)

  $(document).on("click", ".MyActs", function () {
    var act = $(this).attr("dataid");
    setDashboardCond(act);
  });

  console.log("HrList", HrList);

  return (
    <>
      <div>
        <div className="btn-group btn-group-sm" role="group">
          {InventoriesList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/add-lead" className="mr-1">
              <img
                src="FrontAsset/dist/img/icons/icn-add.png"
                alt=""
                width={45}
              />
            </NavLink>
          )}

          {TaskManagementHrmanager.length > 0 ? (
            <></>
          ) : HrList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/hr" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "hr"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="hr"
              >
                HR
              </button>
            </NavLink>
          )}

          {FinanceList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/finance" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "finance"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="finance"
              >
                Finance
              </button>
            </NavLink>
          )}

          {OperationList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/operation" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "operation"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="operation"
              >
                Operation
              </button>
            </NavLink>
          )}

          {YoutubeList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/youtube" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "youtube"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="youtube"
              >
                Youtube
              </button>
            </NavLink>
          )}

          {AnalyticsList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/analytics" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "analytics"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="analytics"
              >
                Analytics
              </button>
            </NavLink>
          )}

          {TaskManagementList.length == 0 ? (
            <></>
          ) : (
            <NavLink to="/task-management" className="mr-1">
              <button
                type="button"
                className={
                  DashboardCond == "task"
                    ? "btn btn-outline-primary MyActs active"
                    : "btn btn-outline-primary MyActs"
                }
                dataid="task"
              >
                TMS{" "}
                <span className="badge badge-primary badge-circle PendingXsd">
                  {PendingTaskToday}
                </span>
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickNav;
