import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import Swal from 'sweetalert2'
import QuickNav from '../../Includes/QuickNav';
import { actionConfig } from '../../configuration';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const AddNewPricing = () => {

const navigate = useNavigate();

let { id } = useParams();

const [PageTitle,setPageTitle]=useState('');
const [PageBanner,setPageBanner]=useState('');
const [PricingId,setPricingId]=useState(id);
const [VideoLink,setVideoLink]=useState('');
const [HeaderEditorVal,setHeaderEditorVal]=useState('');
const [MiddleEditorVal,setMiddleEditorVal]=useState('');
const [FooterEditorVal,setFooterEditorVal]=useState('');

const [SinglePricingresult,setSinglePricingresult]= useState([]);


const changeHandler = (event) => {
  setPageBanner(event.target.files[0]);
};

// const [MiddleEditor,setMiddleEditor]=useState('');
// const [FooterEditor,setFooterEditor]=useState('');

const headerEditorRef = useRef(null);
const middleEditorRef = useRef(null);
const footerEditorRef = useRef(null);


const SinglePricingRecords = async (id) => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}pricinglist/${id}`);
  const dataxs = await response.json();
  setSinglePricingresult(await dataxs.data);

  console.log("dataxs",dataxs);
  
  setPageTitle(dataxs.data.pageTitle);
  setPageBanner(dataxs.data.pageBanner);
  setPricingId(id);
  setVideoLink(dataxs.data.videoLink);
  setHeaderEditorVal(dataxs.data.headerEditor);
  setMiddleEditorVal(dataxs.data.middleEditor);
  setFooterEditorVal(dataxs.data.footerEditor);

  }

  useEffect(() => {
    SinglePricingRecords(id);
    },[id == undefined || id == null || id == '' ? '' : id]);

const AddNewPricingFormData = (e) =>{
e.preventDefault();

let HeaderEditor="";
let MiddleEditor="";
let FooterEditor="";
if (headerEditorRef.current) {
  HeaderEditor = headerEditorRef.current.getContent();
}
if (middleEditorRef.current) {
  MiddleEditor = middleEditorRef.current.getContent();
}
if (footerEditorRef.current) {
  FooterEditor = footerEditorRef.current.getContent();
}

const formData = new FormData();
  
  formData.append('pageTitle', PageTitle);
  formData.append('pageBanner', PageBanner);
  formData.append('headerEditor', HeaderEditor);
  formData.append('videoLink', VideoLink);
  formData.append('middleEditor', MiddleEditor);
  formData.append('footerEditor', FooterEditor);

  const requestOptions = {
      method: 'POST',
      body: formData
  };


fetch(`${actionConfig.REACT_APP_URL}pricinglist`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/real-estate-pricing");
            
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}

const UpdateNewPricingFormData = (e) =>{
  e.preventDefault();
  
  let HeaderEditor="";
  let MiddleEditor="";
  let FooterEditor="";
  if (headerEditorRef.current) {
    HeaderEditor = headerEditorRef.current.getContent();
  }
  if (middleEditorRef.current) {
    MiddleEditor = middleEditorRef.current.getContent();
  }
  if (footerEditorRef.current) {
    FooterEditor = footerEditorRef.current.getContent();
  }
  
  const formData = new FormData();
    
    formData.append('pageTitle', PageTitle);
    formData.append('pageBanner', PageBanner);
    formData.append('headerEditor', HeaderEditor);
    formData.append('videoLink', VideoLink);
    formData.append('middleEditor', MiddleEditor);
    formData.append('footerEditor', FooterEditor);
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
        method: 'POST',
        body: formData
    };
  
  fetch(`${actionConfig.REACT_APP_URL}pricinglist/${PricingId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
        console.log("dataexe",dataexe);
          if(dataexe.code == '200'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/real-estate-pricing");
              
          }else{
            Swal.fire(
              'Error!',
              dataexe.message,
              'error'
            );
          }
  
  
      });
  
  }

 

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Real Estate Pricing</h2>

</div>
<div class="d-flex">
<NavLink to="/real-estate-pricing" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>



</div>

<OtherNavigation/>


<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<form onSubmit={id == null ? AddNewPricingFormData : UpdateNewPricingFormData}>
<div class="row">



<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Page Title</label>
<input type="text" className="form-control" name="pageTitle" onChange={e=>setPageTitle(e.target.value)} value={PageTitle} required/>
</div>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Page Banner</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" onChange={changeHandler} style={{padding:5}}/></div>
{
  id == '' || id == undefined || id == null ? '' : <img className="w-120p" src={PageBanner == '' ? '' : `${actionConfig.REACT_APP_MAIN}${PageBanner}`} alt="icon" />
}

</div>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">Header Editor</label>
<div className="tinymce-wrap">
<Editor
    apiKey='bfp6s3o3iajvrphy059z3czc4mbu8phjs2ct54s72h8inh4w'
    onInit={(evt, editor) => headerEditorRef.current = editor}
    initialValue={HeaderEditorVal}
    init={{
      height: 300,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','codesample'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' + 
        'removeformat | help' + ' | table tabledelete' + ' | code' + ' | media' + ' | visualblocks' + ' | codesample',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />
</div>
</div>

<div class="form-group col-md-12">
<div class="form-group">
<label for="inputAddress">Video Link</label>
<input type="text" className="form-control" name="pageBanner" onChange={e=>setVideoLink(e.target.value)} value={VideoLink}/>
</div>
</div>

<div class="form-group col-md-12">
<label for="inputPassword4">Middle Editor</label>
<div className="tinymce-wrap">
<Editor
    apiKey='bfp6s3o3iajvrphy059z3czc4mbu8phjs2ct54s72h8inh4w'
    onInit={(evt, editor) => middleEditorRef.current = editor}
    initialValue={MiddleEditorVal}
    init={{
      height: 300,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','codesample'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' + 
        'removeformat | help' + ' | table tabledelete' + ' | code' + ' | media' + ' | visualblocks' + ' | codesample',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />
</div>
</div>

<div class="form-group col-md-12">
<label for="inputPassword4">Footer Editor</label>
<div className="tinymce-wrap">
<Editor
    apiKey='bfp6s3o3iajvrphy059z3czc4mbu8phjs2ct54s72h8inh4w'
    onInit={(evt, editor) => footerEditorRef.current = editor}
    initialValue={FooterEditorVal}
    init={{
      automatic_uploads: true,
      image_title: true,
      file_picker_types: 'image',
      selector: 'textarea',
      height: 300,
      menubar: false,
      file_browser_callback_types: 'image',
      file_picker_callback: function (callback, value, meta) {
        if (meta.filetype == 'image') {
            var input = document.getElementById('my-file');
            input.click();
            input.onchange = function () {
                var file = input.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log('name',e.target.result);
                    callback(e.target.result, {
                        alt: file.name
                    });
                };
                reader.readAsDataURL(file);
            };
        }
    },
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','codesample','image paste','image code'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' + 
        'removeformat | help' + ' | table tabledelete' + ' | code' + ' | media' + ' | visualblocks' + ' | codesample' + ' | image',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    
    }}
  />
</div>
</div>

</div>

<button type="submit" class="btn btn-primary">Save</button>
</form>

</section>
</div>
</div>

</div>

</>
)
}

export default AddNewPricing