import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, Link, useParams } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation';
import AffiliateNav from '../../Includes/AffiliateNav';

const RedboxMaterial = () => {

    let { id } = useParams();

  return (
    <>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-2">
    
    {
        id == '' || id == null || id == 'affiliate' ? <OtherNavigation/> : <AffiliateNav/>
    }
    

    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
  <div>
      <h2 className="hk-pg-title font-weight-600">Redbox Information</h2>
  </div>

</div>

<div className="row">
    <div className="col-md-3">
        <a href="../../FrontAsset/redboxmaterial/redboxntn.pdf" download>
            <h4>NTN</h4>
            <img src="../../FrontAsset/redboxmaterial/redboxntn.jpg" className='img-fluid' />
        </a>
    </div>
    <div className="col-md-3">
    <a href="../../FrontAsset/redboxmaterial/strCertification.jpg" download>
            <h4>STR Certification</h4>
            <img src="../../FrontAsset/redboxmaterial/strCertification.jpg" className='img-fluid' />
        </a>
    </div>
    <div className="col-md-3">
        <a href="../../FrontAsset/redboxmaterial/redboxbank.jpg" download>
            <h4>Bank Account</h4>
            <img src="../../FrontAsset/redboxmaterial/redboxbank.jpg" className='img-fluid' />
        </a>
    </div>
</div>

</div>
    </>
  )
}

export default RedboxMaterial