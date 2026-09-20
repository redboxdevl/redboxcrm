import React from "react";
import CallingGraphsData from "echarts-for-react";
import Navigation from "../../Includes/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import CallingStatusSkeleton from '../Skeleton/CallingStatusSkeleton';

const KpiGraphs = () => {


    const navigate = useNavigate();
const dispatch = useDispatch();
    const resultKPIREPORT = useSelector(state => state.Kpireducers.kpireport);
  //   let incommingWeekly = [];
  //   let dateFormat = [];
  //     let outgoingWeekly = [];
  //         if(dataCalling === null || dataCalling === '' || dataCalling === undefined){
  //         }else{
  //             dataCalling.map((edatax)=>{
  //                 let dateFormatx = edatax.format;
  //                 let weeklydata = edatax.incommingweekly;
  //                 let weeklyOutgoingdata = edatax.outgoingweekly;
  //                 // let callingValue = edatax.total_count;
  //                 dateFormat.push(`${dateFormatx}`);
  //                 incommingWeekly.push(`${weeklydata}`);
  //                 outgoingWeekly.push(`${weeklyOutgoingdata}`);
  //             });
  //         }

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [
        "Assign Leads",
        "TLW",
        "Attempted Calls",
        "CC 15+ Sec",
        "VC 90+ Sec",
        "Metting Aligned",
        "Metting Done",
        "Self Leads",
      ],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["2023-02-01", "2023-03-01"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Assign Leads",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "TLW",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Attempted Calls",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "CC 15+ Sec",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "VC 90+ Sec",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Metting Aligned",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Metting Done",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Self Leads",
        type: "line",
        stack: "Total",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">KPIS Graphs</h2>
          </div>
          <div>
            <Link to="/list-kpis-report" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-md-2">
            <div class="form-group">
              <label for="">KPIS Status</label>
              <select name="KpisStatus" id="" class="form-control">
                <option value="">Select Option</option>
                <option value="Assign Leads">Assign Leads</option>
                <option value="TLW">TLW</option>
                <option value="Attempted Calls">Attempted Calls</option>
                <option value="CC 15+ Sec">CC 15+ Sec</option>
                <option value="VC 90+ Sec">VC 90+ Sec</option>
                <option value="Metting Aligned">Metting Aligned</option>
                <option value="Metting Done">Metting Done</option>
                <option value="Self Leads">Self Leads</option>
              </select>
            </div>
          </div>

          <div class="col-md-2">
            <div class="form-group">
              <label for="">Consultant Name</label>
              <select name="ConsultantName" id="" class="form-control">
                <option value="">Select Option</option>
              </select>
            </div>
          </div>

          <div class="col-md-2">
            <div class="form-group" style={{ marginTop: "33px" }}>
              <button
                type="submit"
                name="find"
                class="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {resultKPIREPORT.data === null ||
          resultKPIREPORT === null ||
          resultKPIREPORT === "" ||
          resultKPIREPORT === undefined ||
          resultKPIREPORT.data === undefined ? (
            <>Loading.....</>
          ) : resultKPIREPORT.data.length > 0 ? (
            resultKPIREPORT.data.map((curElem, index) => {
              return (
                <div className="col-md-6">
                  <div
                    style={{
                      background: "#fff",
                      padding: "2rem 2rem",
                      borderRadius: "8px",
                      margin: "1rem 0",
                    }}
                  >
                    <h6 className="pb-3">{curElem.emp_name}</h6>
                    <CallingGraphsData
                      option={{
                        tooltip: {
                          trigger: "axis",
                        },
                        legend: {
                          data: [
                            "Assign Leads",
                            "TLW",
                            "Attempted Calls",
                            "CC 15+ Sec",
                            "VC 90+ Sec",
                            "Metting Aligned",
                            "Metting Done",
                            "Self Leads",
                          ],
                        },
                        grid: {
                          left: "3%",
                          right: "4%",
                          bottom: "3%",
                          containLabel: true,
                        },
                        toolbox: {
                          feature: {
                            saveAsImage: {},
                          },
                        },
                        xAxis: {
                          type: "category",
                          boundaryGap: false,
                          data: ["2023-02-01", "2023-03-01"],
                        },
                        yAxis: {
                          type: "value",
                        },
                        series: [
                          {
                            name: "Assign Leads",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "TLW",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },{
                            name: "Attempted Calls",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "CC 15+ Sec",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "VC 90+ Sec",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "Metting Aligned",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "Metting Done",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                          {
                            name: "Self Leads",
                            type: "line",
                            stack: "Total",
                            data: [0, 0, 0, 0, 0, 0, 0],
                          },
                        ],
                      }}
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
         
        </div>
      </div>
    </>
  );
};

export default KpiGraphs;
