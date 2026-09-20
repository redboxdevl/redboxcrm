import React from 'react'
import { useNavigate } from 'react-router-dom';
import AffiliateNav from '../../Includes/AffiliateNav'

const AffiliateDocument = () => {

    const navigate = useNavigate();

return (
<>

<AffiliateNav />

<div class="hk-pg-wrapper pb-0">
<div class="container-fluid">
<div class="row">
<div class="col-xl-12 pa-0">
<div class="fmapp-wrap">
{/* <div class="fmapp-sidebar">
<div class="nicescroll-bar">
<div class="fmapp-nav-wrap">
<a id="close_fmapp_sidebar" href="javascript:void(0)" class="close-fmapp-sidebar">
<span class="feather-icon"><i data-feather="chevron-left"></i></span>
</a>
<ul class="nav flex-column mail-category">
<li class="nav-item active">
<a class="nav-link" href="javascript:void(0);">All Files</a>
</li>
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);">Recent Files</a>
</li>
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);">Folders</a>
</li>
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);">Audio</a>
</li>
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);">Video</a>
</li>
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);">Deletd Files</a>
</li>
</ul>
<div class="btn btn-primary btn-block btn-file mt-20 mb-20">
File Upload
<input type="file" class="upload"  />
</div>
<hr  />
<ul class="nav flex-column mail-settings">
<li class="nav-item">
<a class="nav-link" href="javascript:void(0);"><i class="zmdi zmdi-folder-outline"></i>New Folder</a>
</li>
</ul>
</div>
</div>
</div> */}
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
{/* <div class="fmapp-grid-view">
<div class="row">
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/>
<span class="file-name mt-10">Mintos_v1.0</span> 
</div>
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/2image.png" alt="fm-img"/>
<span class="file-name mt-10">Doodle_templatemonster.jpg</span> 
</div>
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/3videoicon.png" alt="fm-img"/>
<span class="file-name mt-10">Video.mp4</span> 
</div>
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/4image.png" alt="fm-img"/>
<span class="file-name mt-10">5_dark_support.jpg</span> 
</div>
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/5psdicon.png" alt="fm-img"/>
<span class="file-name mt-10">Chart2_recovered.psd</span> 
</div>
<div class="col-lg-1 col-md-2 col-sm-4 col-6 text-center mb-30">
<img class="file-preview" src="FrontAsset/dist/img/6image.png" alt="fm-img"/>
<span class="file-name mt-10">Hound-Thumb2-1.png</span> 
</div>
</div>
</div> */}
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
<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/city-108/001")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">City 108</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/albarsha-city/001")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Albarsha City</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
{/* <span class="files-more-link">
<a href="javascript:void(0)"><i class="zmdi zmdi-link"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-download"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-more"></i></a>
</span>   */}
</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/ysi-mall-residency/001")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">YSI Mall Residency</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
{/* <span class="files-more-link">
<a href="javascript:void(0)"><i class="zmdi zmdi-link"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-download"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-more"></i></a>
</span>   */}
</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/albarsha-farmhouse")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Albarsha Farmhouse</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
{/* <span class="files-more-link">
<a href="javascript:void(0)"><i class="zmdi zmdi-link"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-download"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-more"></i></a>
</span>   */}
</td>
</tr>

<tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/redsim-hills/001")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Redsim Hills</span></span></td>
<td></td>
<td></td>
<td></td>
<td>
{/* <span class="files-more-link">
<a href="javascript:void(0)"><i class="zmdi zmdi-link"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-download"></i></a>
<a href="javascript:void(0)"><i class="zmdi zmdi-more"></i></a>
</span>   */}
</td>
</tr>

{/* <tr style={{cursor:'pointer'}} onClick={()=>navigate("/document/asf-city")}>
<td><span class="d-flex align-items-center"><img class="file-preview mr-10" src="FrontAsset/dist/img/1foldericon.png" alt="fm-img"/><span class="file-name">Asf City</span></span></td>
<td></td>
<td></td>
<td></td>
<td>

</td>
</tr> */}

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

export default AffiliateDocument