import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickNav from "../../Includes/QuickNav";
import OtherNavigation from "../../Includes/OtherNavigation";
import VirginGraphs from "./DashboardGraphs/VirginGraphs";
import CallingStatusGraph from "./DashboardGraphs/CallingStatusGraph";
import LeadPieChart from "./DashboardGraphs/LeadPieChart";
import LeadLineGraph from "./DashboardGraphs/LeadLineGraph";
import TransferSharePie from "./DashboardGraphs/TransferSharePie";
import ShareTransferLine from "./DashboardGraphs/ShareTransferLine";
import YoutubePieGraph from "./DashboardGraphs/YoutubePieGraph";
import YoutubeLineChart from "./DashboardGraphs/YoutubeLineChart";
import { AnalyticsActions } from "../../redux/action/AnalyticsActions";
import { useNavigate } from "react-router-dom";
import CallingTypeGraph from "./DashboardGraphs/CallingTypeGraph";
import CallingTypeStatusGraphs from "./DashboardGraphs/CallingTypeStatusGraphs";
import CallingTypeSource from "./DashboardGraphs/CallingTypeSource";

const Callinganalytics = () => {
  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">
              Calling Analytics Dashboard
            </h2>
            <p>Welcome to Customer Relationship Management for SellMore..</p>
          </div>
          <QuickNav />
        </div>

        <OtherNavigation />

        <div className="hk-row">
          <div className="col-lg-12">
            <div className="card card-refresh">
              <div className="refresh-container">
                <div className="loader-pendulums"></div>
              </div>
              <div className="card-header card-header-action">
                <h6>Calling Source</h6>
                <div className="d-flex align-items-center card-action-wrap">
                  <a href="#" className="inline-block refresh mr-15">
                    <i className="ion ion-md-radio-button-off" />
                  </a>
                  <div className="inline-block dropdown">
                    <a
                      className="dropdown-toggle no-caret"
                      data-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="ion ion-md-more" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <CallingTypeGraph />
                {/* <VirginGraphs dataGraph={DashboardGraphs} /> */}
              </div>
            </div>
          </div>
          {/* <div className="col-lg-6">
            <div className="card card-refresh">
              <div className="refresh-container">
                <div className="loader-pendulums"></div>
              </div>
              <div className="card-header card-header-action">
                <h6>Calling Status</h6>
                <div className="d-flex align-items-center card-action-wrap">
                  <a href="#" className="inline-block refresh mr-15">
                    <i className="ion ion-md-radio-button-off" />
                  </a>
                  <div className="inline-block dropdown">
                    <a
                      className="dropdown-toggle no-caret"
                      data-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="ion ion-md-more" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <CallingTypeStatusGraphs />
              </div>
            </div>
          </div> */}
          {/* <div className="col-lg-6">
            <div className="card card-refresh">
              <div className="refresh-container">
                <div className="loader-pendulums"></div>
              </div>
              <div className="card-header card-header-action">
                <h6>Calling Source</h6>
                <div className="d-flex align-items-center card-action-wrap">
                  <a href="#" className="inline-block refresh mr-15">
                    <i className="ion ion-md-radio-button-off" />
                  </a>
                  <div className="inline-block dropdown">
                    <a
                      className="dropdown-toggle no-caret"
                      data-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="ion ion-md-more" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <CallingTypeSource />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Callinganalytics;
