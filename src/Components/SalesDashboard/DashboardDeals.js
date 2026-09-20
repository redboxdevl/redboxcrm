import React from 'react'
import { useSelector } from 'react-redux';

function DashboardDeals() {
  const result = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  return (
    <>
        <div className="col-lg-4">
<div className="card">
<div className="card-header card-header-action">
<h6>Deal Done</h6>
<div className="d-flex align-items-center card-action-wrap">
<div className="d-flex align-items-center card-action-wrap">
<h2>{result.TodayDealsDOne}</h2>
<small>Today</small>
</div>
</div>
</div>

<div className="card-header card-header-action">
<h6>Activity</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" /><br/>
<h4>{result.PhoneCountToday}</h4>
<small>Phone</small>
</center>
</div>
<div className="col">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" /><br/>
<h4>{result.whatsappCountToday}</h4>
<small>Whatsapp</small>
</center>
</div>
<div className="col">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" /><br/>
<h4>{result.smsCountToday}</h4>
<small>SMS</small>
</center>
</div>
<div className="col">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" /><br/>
<h4>{result.emailCountToday}</h4>
<small>Email</small>
</center>
</div>
</div>
</div>
</div>
</div>
    </>
  )
}

export default DashboardDeals