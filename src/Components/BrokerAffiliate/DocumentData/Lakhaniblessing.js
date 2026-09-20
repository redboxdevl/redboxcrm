import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AffiliateNav from '../../../Includes/AffiliateNav'
import Navigation from '../../../Includes/Navigation';
import { actionConfig } from '../../../configuration';

const Lakhaniblessing = () => {

    const navigate = useNavigate();
    let { id } = useParams();
return (
<>
{
    id == '001' ? <AffiliateNav /> : <Navigation />
}


<div class="hk-pg-wrapper pb-0">
<div class="container-fluid">
<div class="row">
<div class="col-xl-12 pa-0">
<div class="fmapp-wrap" >

<div class="fm-box" style={{marginLeft:0}}>
<div class="fmapp-main fmapp-view-switch">
<header>
<div class="fm-options-wrap">
<a href="javascript:void(0)" id="fmapp_sidebar_move" class="fmapp-sidebar-move">
<span class="feather-icon"><i data-feather="menu"></i></span>
</a>
<a href="javascript:void(0)"><span class="feather-icon"><i data-feather="search"></i></span></a>
</div>
<span class="">Lakhani Blessing Documents</span>
<div class="fm-options-wrap">
<span class="btn-file text-primary"><input type="file" class="upload"  /><span class="feather-icon"><i data-feather="upload"></i></span></span>
<a href="javascript:void(0)" id="fm_view_switcher" class="fm-view-switcher">
<span class="feather-icon list-view"><i data-feather="list"></i></span>
<span class="feather-icon grid-view"><i data-feather="grid"></i></span>
</a>
</div>
</header>
<div class="fm-body">
<div class="nicescroll-bar">
<div class="fmapp-view-wrap">

<div class="fmapp-table-view">
<table id="fmapp_table_view" class="table table-hover w-100 ">
<thead>
<tr>
<th>Name</th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>



</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

</div>
</div>


</>
)
}

export default Lakhaniblessing