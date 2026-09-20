import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { PricingAction } from '../../redux/action/PricingAction';

const RealEstatePricing = () => {

    const resultPricing = useSelector(state => state.Pricingreducers.pricingdata);
    const dispatch = useDispatch();

  const [result,setResult]= useState([]);

  useEffect(() => {
    dispatch(PricingAction(1,12));
  },[]);

  console.log("resultPricing",resultPricing);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Real Estate Pricing</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-pricing" className="btn btn-primary btn-rounded btn-sm">Add New Pricing</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Banner</th>
        <th>Video</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {

resultPricing == null || resultPricing.code == 'ERR_BAD_RESPONSE' || resultPricing.code == 'ERR_NETWORK' ? (
  <>Loading.....</>
):(

    resultPricing.data && resultPricing.data.map((curElem , index) => {

    return (
        <tr>
        <td>{curElem.id}</td>
        <td>{curElem.pageTitle}</td>
        <td><img className="w-120p" src={curElem.pageBanner == '' ? '' : `${actionConfig.REACT_APP_MAIN}${curElem.pageBanner}`} alt="icon" /></td>
        <td>{curElem.videoLink}</td>
        <td><NavLink to={`/add-new-pricing/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
            <button class="btn btn-danger btn-rounded btn-sm">Delete</button>
        </td>
        </tr>
    )

})
)

}
    
  </tbody>
</table>
</div>
</div>
</div>

</div>
</>
)
}

export default RealEstatePricing