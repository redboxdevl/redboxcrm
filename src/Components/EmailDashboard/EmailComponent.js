import React, { useRef, useState } from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import FeatherIcon from 'feather-icons-react';
import { Editor } from '@tinymce/tinymce-react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};
const createOption = (label) => ({
  label,
  value: label,
});

const EmailComponent = () => {

    const [Cond,setCond]=useState(true);

    const [show, setShow] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState([]);

    const [BccInputValue, setBccInputValue] = useState('');
    const [BccValue, setBccValue] = useState([]);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

	$(document).on("click","#emailapp_sidebar_move",function (e) {
        $(".emailapp-sidebar").css("left","0px");
	});

    $(document).on("click","#close_emailapp_sidebar",function (e) {
        $(".emailapp-sidebar").css("left","-400px");
	});


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };


    const handleKeyDown = (event) => {
      if (!inputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          setValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue('');
          event.preventDefault();
      }
    };

    const handleBccKeyDown = (event) => {
      if (!BccInputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          setBccValue((prev) => [...prev, createOption(BccInputValue)]);
          setBccInputValue('');
          event.preventDefault();
      }
    };

  return (
    <>

    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-1">
    <OtherNavigation/>

    <div className="row">
<div className="col-xl-12 pa-0">
<div className="emailapp-wrap" style={{height:'500px'}}>
<div className="emailapp-sidebar">
<div className="nicescroll-bar">
<div className="emailapp-nav-wrap">
<a id="close_emailapp_sidebar" href="javascript:void(0)" className="close-emailapp-sidebar">
<FeatherIcon icon="chevron-left" />
</a>
<ul className="nav flex-column mail-category">
<li className="nav-item active">
<a className="nav-link" href="javascript:void(0);">Inbox<span className="badge badge-primary">0</span></a>
</li>
<li className="nav-item">
<a className="nav-link" href="javascript:void(0);">Sent mail</a>
</li>
<li className="nav-item">
<a className="nav-link" href="javascript:void(0);">Important</a>
</li>
<li className="nav-item">
<a className="nav-link" href="javascript:void(0);">Draft</a>
</li>

</ul>

<hr/>

</div>
</div>
</div>
<div className="email-box">
<div className="emailapp-left">
<header>
<a href="javascript:void(0)" id="emailapp_sidebar_move" className="emailapp-sidebar-move">
<FeatherIcon icon="menu" />
</a>
<span className="">Inbox</span>
<a href="#" className="email-compose" onClick={handleShow}>
<FeatherIcon icon="edit" />
</a>
</header>
<form role="search" className="email-search">
<div className="input-group">
<div className="input-group-prepend">

<FeatherIcon icon="search" />
</div>
<input type="text" className="form-control" placeholder="Search"/>
</div>
</form>
<div className="EmailWrap" style={{height:'520px',overflowX:'auto'}}>
<div className="emailapp-emails-list">
<div className="nicescroll-bar">
<a href="#" className="media">
<div className="media-img-wrap">
<div className="avatar">
<img src="FrontAsset/dist/img/avatar1.jpg" alt="user" className="avatar-img rounded-circle"/>
</div>
</div>
<div className="media-body">
<div>
<div className="email-head">Clay Masse (8)</div>
<div className="email-subject">Creation timelines for the standard lorem ipsum</div>
<div className="email-text">
    <p>So how did the classical Latin become so incoherent? According to McClintock.</p>
</div>
</div>
<div>
<div className="last-email-details"><span className="badge badge-danger badge-indicator"></span> 2:30 PM</div>

<FeatherIcon icon="star" />
</div>
</div>
</a>




</div>
</div>
</div>
</div>
<div className="emailapp-right">
<header>
<a id="back_email_list" href="javascript:void(0)" className="back-email-list">
<FeatherIcon icon="chevron-left" />
</a>
<div className="email-options-wrap">
<a href="#" className=""><FeatherIcon icon="printer" /></a>
<a href="#" className=""><FeatherIcon icon="trash" /></a>
<a href="#" className="text-smoke"><FeatherIcon icon="more-vertical" /></a>
</div>
</header>
<div className="email-body" style={{height:'520px',overflowX:'auto'}}>
<div className="nicescroll-bar">
<div>
<div className="email-subject-head">
<h4>Application for the post of Managing Director</h4>
<div className="d-flex align-items-center">
<span className="badge badge-secondary">inbox</span>
<a href="javascript:void(0)" className="email-star starred"><FeatherIcon icon="star" /></a>
</div>
</div>
<hr className="mt-10 mb-20"/>
<div className="email-head">
<div className="media">
<div className="media-img-wrap">
    <div className="avatar">
        <img src="FrontAsset/dist/img/avatar1.jpg" alt="user" className="avatar-img rounded-circle"/>
    </div>
</div>
<div className="media-body" >
    <span className="text-capitalize sender-name d-inline-block">Evie ono</span>
    <span className="sender-email d-inline-block">(evieono@Mintos.com)</span>
    <span className="d-block">
			to
			<span>me</span>
    </span>
</div>
</div>
<div className="head-other-wrap">
<div className="d-inline-block mr-5">
    <span className="d-inline-block">10:06 AM</span>
    <span className="d-inline-block">(2 hours ago)</span>
</div>
<div className="d-inline-block dropdown">
    <a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="zmdi zmdi-more-vert"></i></a>
    <div className="dropdown-menu bullet dropdown-menu-right" role="menu">
        <a className="dropdown-item" href="javascript:void(0)" role="menuitem"><i className="icon wb-reply" aria-hidden="true"></i>Reply</a>
        <a className="dropdown-item" href="javascript:void(0)" role="menuitem"><i className="icon wb-share" aria-hidden="true"></i>Forward</a>
        <a className="dropdown-item" href="javascript:void(0)" role="menuitem"><i className="icon wb-trash" aria-hidden="true"></i>Delete</a>
    </div>
</div>
</div>
</div>
<div className="email-text-wrap mt-30">
<span className="d-block email-title text-capitalize mb-30">dear sir,</span>
<p className="mb-30">Faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus.
</p>
<p>Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac</p>
<p className="mt-30">Thank you for your time.</p>
<div className="email-end-detail mt-35">
<span className="text-capitalize d-block">evie one</span>
<span className="d-block">+12 234 443</span>
<span className="d-block">evieone@Mintos.com</span>
</div>
</div>
<hr className="hr-light"/>
<div className="email-attachment-wrap">
<div className="email-attachment-block">
<a href="javascript:void(0)">
	<div className="card card-sm w-200p">
		<div className="card-body d-flex align-items-center">
			<img src="FrontAsset/dist/img/jpgicon.png" className="d-inline-block mr-10" alt="attachicon" />
			<span className="d-inline-block mnw-0">
				<span className="d-block file-name text-truncate">concept_design.jpg</span>
				<small className="d-block file-size text-truncate">5.78 MB</small>
			</span>
		</div>
	</div>
</a>	
<a href="javascript:void(0)">
	<div className="card card-sm w-200p">
		<div className="card-body d-flex align-items-center">
			<img src="FrontAsset/dist/img/pdficon.png" className="d-inline-block mr-10" alt="attachicon" />
			<span className="d-inline-block mnw-0">
					<span className="d-block file-name text-truncate">Design-titleccv.pdf</span>
			<small className="d-block file-size text-truncate">2.1 MB</small>
			</span>
		</div>
	</div>
</a>
</div>
<div className="d-flex ml-auto">
<a href="javascript:void(0)"><i className="zmdi zmdi-download"></i></a>
<a href="javascript:void(0)"><i className="zmdi zmdi-more"></i></a>
</div>
</div>

<hr className="hr-light"/>
<div className="email-reply-block">
Click here to <a href="javascript:void(0)" className="text-capitalize">reply</a> or <a href="javascript:void(0)" className="text-capitalize">forwrd</a>
</div>
</div>
</div>
</div>
</div>
</div>



<Modal show={show} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
  <Modal.Header closeButton>
    <Modal.Title>New Email</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">To</span>
</div>
{/* <input type="text" className="form-control"/> */}
<CreatableSelect
      className="w-95 h-auto"
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Recipients"
      value={value}
    />
</div>


</div>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">Cc / Bcc</span>
</div>
{/* <input type="text" className="form-control"/> */}
<CreatableSelect
      className="w-90 h-auto"
      components={components}
      inputValue={BccInputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue2) => setBccValue(newValue2)}
      onInputChange={(newValue4) => setBccInputValue(newValue4)}
      onKeyDown={handleBccKeyDown}
      placeholder="Recipients"
      value={BccValue}
    />
</div>
</div>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">Subject</span>
</div>
<input type="text" className="form-control form-control-sm"/>
</div>
</div>
<div className="form-group">
<div className="tinymce-wrap">
<Editor
        apiKey='bfp6s3o3iajvrphy059z3czc4mbu8phjs2ct54s72h8inh4w'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
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
<div className="form-group">
<div className="fileinput fileinput-new input-group" data-provides="fileinput">
<div className="input-group-prepend">
	<span className="input-group-text">Upload</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
			<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="file" name="..."/>
</span>
<a href="#" className="btn btn-secondary fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>
<div className="form-group mb-0">
<button className="btn btn-primary" type="submit">Send</button>
</div>
</form>


  </Modal.Body>
</Modal>

{/* <div className="modal fade" id="exampleModalEmail" tabindex="-1" role="dialog" aria-labelledby="exampleModalEmail" aria-hidden="true">
<div className="modal-dialog modal-lg" role="document">
<div className="modal-content">
<div className="modal-header bg-grey-dark-5">
<h6 className="modal-title text-white" id="exampleModalPopoversLabel">New Email</h6>
<button type="button" className="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">×</span>
</button>
</div>
<div className="modal-body">
<form>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">To</span>
</div>
<input type="text" className="form-control"/>
</div>
</div>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">Cc / Bcc</span>
</div>
<input type="text" className="form-control"/>
</div>
</div>
<div className="form-group">
<div className="input-group input-group-sm">
<div className="input-group-prepend">
    <span className="input-group-text">Subject</span>
</div>
<input type="text" className="form-control form-control-sm"/>
</div>
</div>
<div className="form-group">
<div className="tinymce-wrap">
<Editor
        apiKey='bfp6s3o3iajvrphy059z3czc4mbu8phjs2ct54s72h8inh4w'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' + 
            'removeformat | help' + ' | table tabledelete' + ' | code',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
</div>
</div>
<div className="form-group">
<div className="fileinput fileinput-new input-group" data-provides="fileinput">
<div className="input-group-prepend">
	<span className="input-group-text">Upload</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
			<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="file" name="..."/>
</span>
<a href="#" className="btn btn-secondary fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>
<div className="form-group mb-0">
<button className="btn btn-primary" type="submit">Send</button>
</div>
</form>
</div>
</div>
</div>
</div> */}

</div>
</div>
</div>

    </div>
    

    </>
  )
}

export default EmailComponent