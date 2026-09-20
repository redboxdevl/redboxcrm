import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import AffiliateNav from '../../../Includes/AffiliateNav';
import { FaHandPaper , FaShareAlt , FaHome } from "react-icons/fa";
import Swal from 'sweetalert2'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import ListInventories from '../../SalesDashboard/Inventories/ListInventories';

const ListInventoriesaffiliates = () => {

const navigate = useNavigate();
let { id } = useParams();

const AuthDatax = JSON.parse(localStorage.getItem('affiliateauthdata'));
console.log(AuthDatax);

return (
<>
<AffiliateNav />
<ListInventories affilaiteLog={AuthDatax} affilaiteproid={id}/>
</>
)
}

export default ListInventoriesaffiliates