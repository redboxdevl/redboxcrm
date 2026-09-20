import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import SeoDashboard from './Seo/SeoDashboard';

const YoutubeDasboard = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const listDashboard = useSelector(state => state.dashCountReducer.dashboardcount);

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
            <div>
                <h2 className="hk-pg-title font-weight-600">Youtube Dashboard</h2>
                <p>Welcome to Customer Relationship Management for SellMore..</p>
            </div>

            <QuickNav />

        </div>

        <OtherNavigation/>


    <SeoDashboard data={listDashboard}/>

    </div>

    </>
  )
}

export default YoutubeDasboard