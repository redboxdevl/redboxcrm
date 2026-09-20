import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { actionConfig } from "../../configuration";
import { getDashCountData } from "../../redux/action/DashboardCountAction";

const AffiliateRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resultDash = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );

  const [result, setResult] = useState([]);

  const [Title, setTitle] = useState("");
  const [FullName, setFullName] = useState("");
  const [CellNo, setCellNo] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [Addresss, setAddresss] = useState("");
  const [AgentId, setAgentId] = useState("");

  const ListEmployee = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}employee?agentId=sales`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
  };

  useEffect(() => {
    dispatch(getDashCountData("all", ""));
    ListEmployee();
  }, []);

  var countEmployee = result.length;

  const AddAffiliateFormData = (e) => {
    e.preventDefault();

    const FeildData = {
      title: Title,
      full_name: FullName,
      cell_no: CellNo,
      email_address: EmailAddress,
      business_name: BusinessName,
      address: Addresss,
      emp_id: AgentId,
      Password: Password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    fetch(`${actionConfig.REACT_APP_URL}affiliateprogram`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/affiliate-otp");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  return (
    <>
      <div class="hk-wrapper">
        <div class="hk-pg-wrapper hk-auth-wrapper">
          {/* <header className="d-flex justify-content-between align-items-center">
<NavLink className="d-flex auth-brand" to="">
<img className="brand-img" src="FrontAsset/dist/img/logo-white.png" style={{width:'100px'}} alt="brand" />
</NavLink>
</header> */}
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-5 pa-0">
                <div className="fadeOut item auth-cover-img bgCollxs">
                  <div class="auth-cover-info py-xl-0 pt-100 pb-50">
                    <div class="auth-cover-content w-xxl-75 w-sm-90 w-100">
                      <img
                        src="FrontAsset/images/loginBg.png"
                        alt=""
                        className="img-fluid mb-2"
                        width={350}
                      />
                      <h1 class=" text-white mb-20">
                        EarnWithRedbox - An Affiliate Program
                      </h1>
                      <p class="text-white">
                        With an aim of bringing continuous transformation,
                        REDBOX has moved a step forward by launching Affiliate
                        program in Karachi, where you can make money as a real
                        estate agent with just a sound knowledge, socializing
                        skills and an association of REDBOX Estate affiliate
                        program.
                      </p>
                      <div class="play-wrap">
                        <a class="play-btn" href="#"></a>
                        <span>How it works ?</span>
                      </div>
                    </div>
                  </div>
                  <div class="bg-overlay bg-trans-dark-50"></div>
                </div>
              </div>
              <div class="col-xl-7 pa-0">
                <div class="auth-form-wrap py-xl-0 py-50">
                  <div class="auth-form w-xxl-85 w-xl-75 w-sm-90 w-100">
                    <form onSubmit={AddAffiliateFormData}>
                      {/* <h1 class="display-4 mb-10">Affiliate Registration Program</h1> */}
                      <div class="form-row">
                        <div class="col-md-3 form-group">
                          <select
                            class="form-control custom-select"
                            onChange={(e) => setTitle(e.target.value)}
                            value={Title}
                          >
                            <option selected="">Select Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                          </select>
                        </div>
                        <div class="col-md-9 form-group">
                          <input
                            class="form-control"
                            placeholder="Full Name"
                            type="text"
                            required
                            onChange={(e) => setFullName(e.target.value)}
                            value={FullName}
                          />
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col-md-6 form-group">
                          <input
                            class="form-control"
                            placeholder="Cell No"
                            type="text"
                            required
                            onChange={(e) => setCellNo(e.target.value)}
                            value={CellNo}
                          />
                        </div>
                        <div class="col-md-6 form-group">
                          <input
                            class="form-control"
                            placeholder="Email Address"
                            type="email"
                            required
                            onChange={(e) => setEmailAddress(e.target.value)}
                            value={EmailAddress}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control"
                          placeholder="Password"
                          type="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          value={Password}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control"
                          placeholder="Business Name"
                          type="text"
                          required
                          onChange={(e) => setBusinessName(e.target.value)}
                          value={BusinessName}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control"
                          placeholder="Address"
                          type="text"
                          required
                          onChange={(e) => setAddresss(e.target.value)}
                          value={Addresss}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control"
                          name="cnic"
                          placeholder="Enter Cnic No"
                          type="text"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control"
                          name="ntnNo"
                          placeholder="Enter Ntn No"
                          type="text"
                        />
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <select
                            class="form-control custom-select"
                            required
                            onChange={(e) => setAgentId(e.target.value)}
                            value={AgentId}
                          >
                            <option selected="">Select Reference</option>
                            {result?.length > 0 ? (
                              result?.map((curElem, index) => {
                                return (
                                  <option value={curElem.id} selected>
                                    {curElem.emp_name}
                                  </option>
                                );
                              })
                            ) : (
                              <></>
                            )}
                            <optgroup label="Affiliates">
                              {resultDash?.length == 0 ||
                              resultDash == "" ||
                              resultDash == undefined ||
                              resultDash?.AffiliateRegisterModule.length ==
                                0 ? (
                                <></>
                              ) : resultDash?.AffiliateRegisterModule.length >
                                0 ? (
                                resultDash?.AffiliateRegisterModule.map(
                                  (curElem, index) => {
                                    return (
                                      <option value={curElem.id} selected>
                                        {curElem.full_name}
                                      </option>
                                    );
                                  }
                                )
                              ) : (
                                <>
                                  <option selected="">No Record Found</option>
                                </>
                              )}
                            </optgroup>
                          </select>
                        </div>
                      </div>
                      {/* <div class="custom-control custom-checkbox mb-25">
        <input class="custom-control-input" id="same-address" type="checkbox" checked />
        <label class="custom-control-label font-14" for="same-address">I have read and agree to the <a href=""><u>term and conditions</u></a></label>
    </div> */}
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                      {/* <NavLink className="btn btn-primary btn-block" to="/affiliate-otp">Register</NavLink> */}
                      <p className="text-center mt-10">
                        Already have an account?{" "}
                        <NavLink to="/affiliate-program">Sign In</NavLink>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateRegister;
