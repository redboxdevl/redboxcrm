import React from 'react'
import { useNavigate } from 'react-router-dom';
import AffiliateNav from '../../Includes/AffiliateNav'
import Navigation from '../../Includes/Navigation';

const MarketingDocuments = () => {

    const navigate = useNavigate();

return (
<>

<Navigation/>


<div class="hk-pg-wrapper pb-0">
<div class="container-fluid">
<div class="row">
<div class="col-xl-12 pa-0">
<div class="fmapp-wrap">

<div class="fm-box" style={{marginLeft:0}}>
<div class="fmapp-main fmapp-view-switch">
<header>
<div class="fm-options-wrap">
<a href="javascript:void(0)" id="fmapp_sidebar_move" class="fmapp-sidebar-move">
<span class="feather-icon"><i data-feather="menu"></i></span>
</a>
<a href="javascript:void(0)"><span class="feather-icon"><i data-feather="search"></i></span></a>
</div>
<span class="">Marketing Documents</span>
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
{/* <tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/city-108/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">City 108</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr> */}

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/ysi-mall-residency/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">YSI Mall Residency</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/albarsha-farmhouse/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Albarsha Farmhouse</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/redsim-hills/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Redsim Hills</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>


<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/green-land-farmhouse/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Green Land Farmhouse</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

{/* <tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/jauharat/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Jauharat</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr> */}

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/sq10/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">SQ 10</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/paragontower/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Paragon Tower</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/alitown/002")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Ali Town</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/ninthavenue/0010")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Ninth Avenue</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/signature27/0015")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Signature 27</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/lakhaniblessing/0013")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Lakhani Blessing</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/lakhanivista/0018")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Lakhani Vista</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/ocean99/0025")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Ocean 99</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr>


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

export default MarketingDocuments