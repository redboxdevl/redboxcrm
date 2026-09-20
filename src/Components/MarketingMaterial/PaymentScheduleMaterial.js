import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, Link, useParams } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import AffiliateNav from '../../Includes/AffiliateNav';
import OtherNavigation from '../../Includes/OtherNavigation';

const PaymentScheduleMaterial = () => {

    let { id } = useParams();

  return (
    <>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-2">
    
{
        id == '' || id == null || id == 'affiliate' ? <OtherNavigation/> : <AffiliateNav/>
    }

    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
  <div>
      <h2 className="hk-pg-title font-weight-600">Albarsha City</h2>
  </div>

</div>

<div className="row">
    <div className="col-md-12">
        <h4 className='pt-3 pb-3'>Payment Plan</h4>
        <div className='d-flex paymentPlanx'>
            <a href="../../FrontAsset/albarshamaterial/paymentplanland.jpg" download><img src="../../FrontAsset/albarshamaterial/paymentplanland.jpg" className='img-fluid' /></a>
            <a href="../../FrontAsset/albarshamaterial/paymentplanland2.jpg" download><img src="../../FrontAsset/albarshamaterial/paymentplanland2.jpg" className='img-fluid' /></a>
            <a href="../../FrontAsset/albarshamaterial/paymentplanland3.jpg" download ><img src="../../FrontAsset/albarshamaterial/paymentplanland3.jpg" className='img-fluid' /></a>
            <a href="../../FrontAsset/albarshamaterial/paymentplanland4.jpg" download ><img src="../../FrontAsset/albarshamaterial/paymentplanland4.jpg" className='img-fluid' /></a>
        </div>
    </div>
</div>

</div>
    </>
  )
}

export default PaymentScheduleMaterial