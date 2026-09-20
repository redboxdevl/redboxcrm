import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import $ from 'jquery';

const QuickNav = () => {

const [DashboardCond,setDashboardCond]=useState('');

$(document).on('click','.MyActs',function(){
var act = $(this).attr("dataId");
setDashboardCond(act);
});

console.log(DashboardCond);

  return (
    <>
        <div>
        <div className="btn-group btn-group-sm" role="group">
        <NavLink to="" className="mr-1"><button type="button" className={DashboardCond == 'hr' ? ('btn btn-outline-primary MyActs active') : ('btn btn-outline-primary MyActs')} dataId="hr">HR</button></NavLink>
        <NavLink to="" className="mr-1"><button type="button" className={DashboardCond == 'finance' ? ('btn btn-outline-primary MyActs active') : ('btn btn-outline-primary MyActs')} dataId="finance">Finance</button></NavLink>
        <NavLink to="" className="mr-1"><button type="button" className={DashboardCond == 'operation' ? ('btn btn-outline-primary MyActs active') : ('btn btn-outline-primary MyActs')} dataId="operation">Operation</button></NavLink>
        <NavLink to="" className="mr-1"><button type="button" className={DashboardCond == 'youtube' ? ('btn btn-outline-primary MyActs active') : ('btn btn-outline-primary MyActs')} dataId="youtube">Youtube</button></NavLink>

        <NavLink to="" className="mr-1"><button type="button" className={DashboardCond == 'analytics' ? ('btn btn-outline-primary MyActs active') : ('btn btn-outline-primary MyActs')} dataId="analytics">Analytics</button></NavLink>
        </div>
    </div> 
    </>
  )
}

export default QuickNav