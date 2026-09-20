import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams, Link } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from './LoadingSpinner';
import moment from 'moment';
import { InventoriesAction } from '../../redux/action/InventoriesAction';
import { AllBlockWisePlotAction } from '../../redux/action/AllBlockWisePlotAction';
import { AllPlotWiseSizeAction } from '../../redux/action/AllPlotWiseSizeAction';
import { AllListInventoriesAction } from '../../redux/action/AllListInventoriesAction';

const AddNewPaymentPlan = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');
const [resultCompanies,setResultCompanies]= useState([]);
const [ResultCustomers,setResultCustomers]= useState([]);
const [ResultCustomersDetails,setResultCustomersDetails]= useState([]);
const [ResultBookingDetails,setResultBookingDetails]= useState([]);


const resultProjects = useSelector(state => state.inventoriesreducer.inventoriesdata);
const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
const resultProjectWiseNo = useSelector(state => state.AllBlockWisePlotreducers.allblockwiseplotdata);
const resultProjectWiseBlock = useSelector(state => state.AllListingInventoriesreducers.alllistingdata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

const resultPlotwiseSize = useSelector(state => state.AllPlotWiseSizereducers.allplotwisesizedata);


const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setResultCompanies(await GetArray);
}

const ListCustomers = async (agentId) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}customersolddata?agentId=${agentId}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResultCustomers(await GetArray);
}

const [PaymentDate,setPaymentDate]=useState(CurrentDate);
const [ProjectId,setProjectId]=useState('');
const [CompanyId,setCompanyId]=useState('');
const [PropTypeId,setPropTypeId]=useState('');
const [PropertyNoId,setPropertyNoId]=useState('');
const [BlockId,setBlockId]=useState('');
const [CustomerId,setCustomerId]=useState('');
const [CustomerCnic,setCustomerCnic]=useState('');
const [CustomerAddress,setCustomerAddress]=useState('');
const [CustomerReference,setCustomerReference]=useState('');
const [SizeName,setSizeName]=useState('');
const [CategoryName,setCategoryName]=useState('');
const [ScheduleType,setScheduleType]=useState('');
const [SchedulePlanYear,setSchedulePlanYear]=useState('');
const [BookingAmount,setBookingAmount]=useState('');
const [BookingTotalAmount,setBookingTotalAmount]=useState('');
const [AllocationAmount,setAllocationAmount]=useState('');
const [AllocationTotalAmount,setAllocationTotalAmount]=useState('');
const [ConfirmationAmount,setConfirmationAmount]=useState('');
const [ConfirmationTotalAmount,setConfirmationTotalAmount]=useState('');
const [DemarcationAmount,setDemarcationAmount]=useState('');
const [DemarcationTotalAmount,setDemarcationTotalAmount]=useState('');
const [PossessionAmount,setPossessionAmount]=useState('');
const [PossessionTotalAmount,setPossessionTotalAmount]=useState('');

// Monthly all
const [MonthlyAmount,setMonthlyAmount]=useState('0');
const [MonthlyNoCount,setMonthlyNoCount]=useState('0');
const [MonthlyTotalAMountCount,setMonthlyTotalAMountCount]=useState('0');

// Quarterly all
const [QuarterlyAmount,setQuarterlyAmount]=useState('0');
const [QUarterlyNoCount,setQUarterlyNoCount]=useState('0');
const [QuarterlyTotalAMountCount,setQuarterlyTotalAMountCount]=useState('0');

// Half Yearly all
const [HalfyearlyAmount,setHalfyearlyAmount]=useState('0');
const [HalfYearNoCount,setHalfYearNoCount]=useState('0');
const [HalfYearlyTotalAMountCount,setHalfYearlyTotalAMountCount]=useState('0');

// Yearly all
const [yearlyAmount,setyearlyAmount]=useState('0');
const [YearlyNoCount,setYearlyNoCount]=useState('0');
const [YearlyTotalAMountCount,setYearlyTotalAMountCount]=useState('0');


// Yearly all
const [TotalSalesPrice,setTotalSalesPrice]=useState('');
const [DiscountSalesPrice,setDiscountSalesPrice]=useState('');



const [PaymentBookingStatus,setPaymentBookingStatus]=useState(false);
const [PeriodicalBookingStatus,setPeriodicalBookingStatus]=useState(false);
const [CheckDisabled,setCheckDisabled]=useState(false);
const [ModeCheck,setModeCheck]=useState('');


const ListCustomersDetails = async (customerId) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}customersoldetails?customerId=${customerId}`);
    const dataxs = await response.json();
    const GetArray = dataxs;
    setResultCustomersDetails(await GetArray);

    setCustomerCnic(GetArray.Inventorysold == '' || GetArray.Inventorysold == null ? '' : GetArray.Inventorysold.cnic);
    setCustomerAddress(GetArray.Inventorysold == '' || GetArray.Inventorysold == null ? '' : GetArray.Inventorysold.client_address);
}

useEffect(() => {
    ListCustomersDetails(CustomerId);
},[CustomerId]);

useEffect(() => {
ListCompanies();
dispatch(InventoriesAction());
},[]);

useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(AllListInventoriesAction(FiltersSecurity.length == 0 ? AuthData.id : 'all',ProjectId));
},[ProjectId == '' || ProjectId == null || ProjectId == undefined ? '' : ProjectId]);

useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(AllBlockWisePlotAction(BlockId,ProjectId));
    dispatch(AllPlotWiseSizeAction(BlockId,PropertyNoId,ProjectId));
},[ProjectId == '' || ProjectId == null || ProjectId == undefined || BlockId == '' || BlockId == null || BlockId == undefined ? '' : ProjectId,BlockId]);


  
const ListBookingList = async (BlockId,plotNo,proid,ScheduleType) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}plotwisesize?BlockId=${BlockId}&plotNo=${plotNo}&proid=${proid}`);
    const dataxs = await response.json();
    const GetArray = dataxs;
    setResultBookingDetails(await GetArray);
   
    setBookingAmount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.booking.replace(/,/g, ''));
    setAllocationAmount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.allocation.replace(/,/g, ''));
    setConfirmationAmount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.confirmation.replace(/,/g, ''));
    setDemarcationAmount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.demarcation.replace(/,/g, ''));
    setPossessionAmount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.possession.replace(/,/g, ''));

    setTotalSalesPrice(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.total_price.replace(/,/g, ''));

    if(ScheduleType == 'standard'){

        let monthlyAmountData = GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.monthlyinstallment.replace(/,/g, '');
        let halfyearlyAmountData = GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.halfyearinstallment.replace(/,/g, '');

        setSchedulePlanYear(4);

        //Monthly Standard Calculation
        let MonthNoOfPayment = parseFloat(4) * parseFloat(12);
        let MonthWisePay = parseFloat(monthlyAmountData) / MonthNoOfPayment;
        
        setMonthlyNoCount(MonthNoOfPayment);
        setMonthlyTotalAMountCount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.monthlyinstallment);
        setMonthlyAmount(MonthWisePay);

        
        //Half Yearly Standard Calculation
        let HalfYearNoOfPayment = parseFloat(4) * parseFloat(2);
        let HalYearWisePay = parseFloat(halfyearlyAmountData) / HalfYearNoOfPayment;

        setHalfYearNoCount(HalfYearNoOfPayment);
        setHalfYearlyTotalAMountCount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.halfyearinstallment);

        setHalfyearlyAmount(HalYearWisePay);

    }else if(ScheduleType == 'customized'){

        let monthlyAmountData = GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.monthlyinstallment.replace(/,/g, '');
        let halfyearlyAmountData = GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.halfyearinstallment.replace(/,/g, '');

        setSchedulePlanYear(SchedulePlanYear);

        //Monthly Customized Calculation
        let MonthNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(12);
        let MonthWisePay = parseFloat(monthlyAmountData) / MonthNoOfPayment;
        
        setMonthlyNoCount(MonthNoOfPayment);
        setMonthlyTotalAMountCount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.monthlyinstallment);
        setMonthlyAmount(Math.round(MonthWisePay));

        
        //Half Yearly Customized Calculation
        let HalfYearNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(2);
        let HalYearWisePay = parseFloat(halfyearlyAmountData) / HalfYearNoOfPayment;

        setHalfYearNoCount(HalfYearNoOfPayment);
        setHalfYearlyTotalAMountCount(GetArray.code == '203' || GetArray.code == 'ERR_BAD_REQUEST' ? '' : GetArray.data.jsonFormat.halfyearinstallment);
        setHalfyearlyAmount(Math.round(HalYearWisePay));

        //Quarterly Customized Calculation
        let QuarterlyNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(4);
        setQUarterlyNoCount(QuarterlyNoOfPayment);

        //Yearly Customized Calculation
        let YearlyNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(1);
        setYearlyNoCount(YearlyNoOfPayment);

    }

}

useEffect(() => {
    dispatch(AllPlotWiseSizeAction(BlockId,PropertyNoId,ProjectId));
    ListBookingList(BlockId,PropertyNoId,ProjectId,ScheduleType,SchedulePlanYear);
  },[PropertyNoId == '' || PropertyNoId == null ? '' : PropertyNoId,ScheduleType,SchedulePlanYear]);

useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    ListCustomers(FiltersSecurity.length == 0 ? AuthData.id : 'all');
},[]);

  useEffect(() => {
    
    if(ScheduleType == 'standard'){
        setPaymentBookingStatus(false);
        setCheckDisabled(false);
        // setMonthlyAmount();
    }else if(ScheduleType == 'customized'){
        setPaymentBookingStatus(true);
        setCheckDisabled(true);
        //Monthly Customized Calculation
        let MonthlyNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(12);
        let MonthlyWisePay = parseFloat(MonthlyAmount) * MonthlyNoOfPayment;
        setMonthlyNoCount(MonthlyNoOfPayment);
        setMonthlyTotalAMountCount(Math.round(MonthlyWisePay));
        //Quarterly Customized Calculation
        let QuarterlyNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(4);
        let QuarterlyWisePay = parseFloat(QuarterlyAmount) * QuarterlyNoOfPayment;
        setQUarterlyNoCount(QuarterlyNoOfPayment);
        setQuarterlyTotalAMountCount(Math.round(QuarterlyWisePay));
         //Half Yearly Customized Calculation
         let HalfYearNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(2);
         let HalYearWisePay = parseFloat(HalfyearlyAmount) * HalfYearNoOfPayment;
         setHalfYearNoCount(HalfYearNoOfPayment);
         setHalfYearlyTotalAMountCount(Math.round(HalYearWisePay));
         //Yearly Customized Calculation
         let YearlyNoOfPayment = parseFloat(SchedulePlanYear) * parseFloat(1);
         let YearlyWisePay = parseFloat(yearlyAmount) * YearlyNoOfPayment;
 
         setYearlyNoCount(YearlyNoOfPayment);
         setYearlyTotalAMountCount(Math.round(YearlyWisePay));
    }else{
        setPaymentBookingStatus(false);
        setCheckDisabled(false);
    }
},[ScheduleType,SizeName,ProjectId,QuarterlyAmount == '' ? '0' : QuarterlyAmount,HalfyearlyAmount == '' ? '0' : HalfyearlyAmount,yearlyAmount == '' ? '0' : yearlyAmount,MonthlyAmount == '' ? '0' : MonthlyAmount]);

  
  const key = 'clientName';

const arrayUniqueByKey = [...new Map(ResultCustomers.map(item =>
  [item[key], item])).values()];


  const ModeOfPayment = (event) => {
    var updatedList = [...ModeCheck];
    if (event.target.checked) {
    updatedList = [...ModeCheck, event.target.value];
    } else {
    updatedList.splice(ModeCheck.indexOf(event.target.value), 1);
    }
    setModeCheck(updatedList);
  }
  const monthlyCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'monthly');
  const quarterlyCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'quarterly');
  const halfyearlyCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'halfyearly');
  const yearlyCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'yearly');

  const TOtalMonthly = MonthlyTotalAMountCount == '' || MonthlyTotalAMountCount == 0 ? MonthlyTotalAMountCount : MonthlyTotalAMountCount;
  const TOtalHalfYearly = HalfYearlyTotalAMountCount == '' || HalfYearlyTotalAMountCount == 0 ? HalfYearlyTotalAMountCount : HalfYearlyTotalAMountCount;

  const TotalBalance = parseFloat(BookingAmount) + parseFloat(AllocationAmount) + parseFloat(ConfirmationAmount) + parseFloat(DemarcationAmount) + parseFloat(PossessionAmount) + parseFloat(TOtalMonthly) + parseFloat(QuarterlyTotalAMountCount) + parseFloat(TOtalHalfYearly) + parseFloat(YearlyTotalAMountCount);

  const FinalBalance = parseFloat(TotalSalesPrice) - TotalBalance;


  const GeneratePaymentPlan = (e) => {

    e.preventDefault();
  
    const FeildData = { bookingDate:PaymentDate,CompanyId:CompanyId,ProjectId:ProjectId,TypeId:PropTypeId,BlockName:BlockId,PropertyNo:PropertyNoId,Size:SizeName,Category:CategoryName,CustomerId:CustomerId,ScheduleType:ScheduleType,SchedulePlan:SchedulePlanYear,Booking:BookingAmount,Allocation:AllocationAmount,COnfirmation:ConfirmationAmount,Demarcation:DemarcationAmount,Possession:PossessionAmount,MonthlyAmount:MonthlyAmount,QuarterlyAmount:QuarterlyAmount,HalfYearAmount:HalfyearlyAmount,YearlyAmount:yearlyAmount,TotalSalesAmount:TotalSalesPrice,DiscountPrice:DiscountSalesPrice,NetSalesPrice:0,TotalScheduleAmount:0,BalanaceScheduleAmount:0,MonthlyNoOfPayment:MonthlyNoCount,QuarterlyNoOfPayment:QUarterlyNoCount,HalfYearNoOfPayment:HalfYearNoCount,YearlyNoofPayment:YearlyNoCount};
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FeildData)
    };
    
    fetch(`${actionConfig.REACT_APP_URL}paymentplan`, requestOptions)
        .then(response => response.json())
        .then(dataexe => {
            if(dataexe.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataexe.message,
                    'success'
                  );
                  navigate(`/payment-statement/${dataexe.data.id}`);
                    
            }else{

            }
            console.log("dataexe",dataexe);
        });

  }


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">

<OtherNavigation/>

<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-center">
<div>
<h2 className="hk-pg-title font-weight-600 text-center">Property Data</h2>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Booking Date *</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="date" className="form-control" name="paymentDate" onChange={e=>setPaymentDate(e.target.value)} value={PaymentDate} required />
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Company *</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="companyId" id="companyId" className="form-control" onChange={e=>setCompanyId(e.target.value)} value={CompanyId} required>
<option value="" selected>Select Company</option>
{

    resultCompanies.length == '0' || resultCompanies == null || resultCompanies.code == 'ERR_BAD_REQUEST' || resultCompanies.code == "ERR_NETWORK" ? '' : resultCompanies.map((curElem) => {
        return (
            curElem.id == '27' ? (
                <option value={curElem.id}>{curElem.company_name}</option>
                ):(
                <></>
                )
        )
    })

}
{/* <option value="1">Al Barsha Developers</option> */}
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Project Name *</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="projectId" id="projectId" className="form-control" onChange={e=>setProjectId(e.target.value)} value={ProjectId} required>
<option defaultValue selected>Select Projects</option>
{
resultProjects.length == '0' || resultProjects == null || resultProjects.code == 'ERR_BAD_REQUEST' || resultProjects.code == "ERR_NETWORK" ? '' : resultProjects.data.map((curElem,index) => {
    return (
        curElem.id == '1' || curElem.id == '2' ? (
            <option value={curElem.id}>{curElem.project_name}</option>
            ):(
            <></>
            )
    )
})

}
</select>
</div>
</div>
</div>



<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Property Type *</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="propertyTypeId" id="propertyTypeId" className="form-control" onChange={e=>setPropTypeId(e.target.value)} value={PropTypeId} required>
<option value="" selected>Select Property Type</option>
{

resultDashboard.length == '0' || resultDashboard == null || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.code == "ERR_NETWORK" ? '' : resultDashboard.apartmentType.map((curElem,index) => {
    return (
    <option value={curElem.id}>{curElem.natureName}</option>
    )
    
    })

}
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Block</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="blockId" id="blockId" className="form-control" onChange={e=>setBlockId(e.target.value)} value={BlockId}>
<option value="" selected>Select Block</option>
{
    resultProjectWiseBlock.length == 0 || resultProjectWiseBlock == '' || resultProjectWiseBlock == null || resultProjectWiseBlock.code  == 'ERR_NETWORK' || resultProjectWiseBlock.code == 'ERR_BAD_REQUEST' || resultProjectWiseBlock.code == 'ERR_BAD_RESPONSE' ? (
        <></>
    ):(
        resultProjectWiseBlock.blockData.map((curElem,index)=>{
        return (
            curElem.BlockName == '-' ? '' : <option value={curElem.BlockName}>{curElem.BlockName}</option>
            
        )
        })
        
    )
    }
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Property No *</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="propertyNoId" id="propertyNoId" className="form-control" onChange={e=>setPropertyNoId(e.target.value)} value={PropertyNoId} required>
<option value="" selected>Select Property No</option>
{
    resultProjectWiseBlock.length == 0 || resultProjectWiseBlock == '' || resultProjectWiseBlock == null || resultProjectWiseBlock.code  == 'ERR_NETWORK' || resultProjectWiseBlock.code == 'ERR_BAD_REQUEST' || resultProjectWiseBlock.code == 'ERR_BAD_RESPONSE' ? (
        <></>
    ):(
        resultProjectWiseBlock.PlotNoData.map((curElem,index)=>{
        return (
            <option value={curElem.propertyNo}>{curElem.propertyNo}</option>
            
        )
        })
        
    )
    }
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Size</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="sizeName" id="sizeName" className="form-control" onChange={e=>setSizeName(e.target.value)} value={SizeName}>
<option value="" selected>Select Size</option>
{

resultPlotwiseSize.code == '203' || resultPlotwiseSize.code == 'ERR_BAD_REQUEST' || resultPlotwiseSize.length == 0 || resultPlotwiseSize.code == 'ERR_NETWORK' || resultPlotwiseSize.code == 'ERR_BAD_RESPONSE'  ? (
   
    resultProjectWiseBlock.length == 0 || resultProjectWiseBlock == '' || resultProjectWiseBlock == null || resultProjectWiseBlock.code  == 'ERR_NETWORK' || resultProjectWiseBlock.code == 'ERR_BAD_REQUEST' || resultProjectWiseBlock.code == 'ERR_BAD_RESPONSE' ? (
        <></>
    ):(
        resultProjectWiseBlock.sizeData.map((curElem,index)=>{
        return (
            <option value={curElem.SizeName}>{curElem.SizeName}</option>
            
        )
        })
        
    )
):(
    <option value={resultPlotwiseSize.data.size}>{resultPlotwiseSize.data.size}</option>
)
    
    }
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Category</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="categoryName" id="" className="form-control" onChange={e=>setCategoryName(e.target.value)} value={CategoryName}>
<option value="" selected>Select Category</option>
{
    resultProjectWiseBlock.length == 0 || resultProjectWiseBlock == '' || resultProjectWiseBlock == null || resultProjectWiseBlock.code  == 'ERR_NETWORK' || resultProjectWiseBlock.code == 'ERR_BAD_REQUEST' || resultProjectWiseBlock.code == 'ERR_BAD_RESPONSE' ? (
        <></>
    ):(
        resultProjectWiseBlock.categoryData.map((curElem,index)=>{
        return (
            curElem.CategoryName == '-' ? '' : <option value={curElem.CategoryName}>{curElem.CategoryName}</option>
            
        )
        })
        
    )
    }
</select>
</div>
</div>
</div>

<hr />

<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-center">
<div>
<h2 className="hk-pg-title font-weight-600 text-center">Customer Data</h2>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Customer Name</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="customerId" id="customerId" className="form-control" onChange={e=>setCustomerId(e.target.value)} value={CustomerId}>
<option value="" selected>Select Customer</option>
{
    ResultCustomers == '' || ResultCustomers.length == 0 || ResultCustomers == null ? (
        <></>
    ):(
        arrayUniqueByKey.map((cusElem,index)=>{
            return (
                <option value={`${cusElem.id}-${cusElem.status}`}>{cusElem.clientName}</option>
            )
        })
    )
}
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>CNIC</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="text" className="form-control" placeholder='00000-0000000-0' onChange={e=>setCustomerCnic(e.target.value)} value={CustomerCnic} disabled />
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Address</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="text" className="form-control" placeholder='Address' onChange={e=>setCustomerAddress(e.target.value)} value={CustomerAddress} disabled />
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Reference</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="text" className="form-control" placeholder='Reference' onChange={e=>setCustomerReference(e.target.value)} value={CustomerReference} disabled />
</div>
</div>
</div>

<hr />

<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-center">
<div>
<h2 className="hk-pg-title font-weight-600 text-center">Payment Schedule Data</h2>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Schedule Type</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="scheduleType" id="" className="form-control" onChange={e=>setScheduleType(e.target.value)} value={ScheduleType}>
<option value="">Select Schedule Type</option>
<option value="standard">Standard</option>
<option value="customized">Customized</option>
</select>
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Schedule Plan Year</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<select name="scheduleYear" id="" className="form-control" onChange={e=>setSchedulePlanYear(e.target.value)} value={SchedulePlanYear}>
<option value="">Select Schedule Year</option>
<option value="1">1 Year</option>
<option value="2">2 Year</option>
<option value="3">3 Year</option>
<option value="4">4 Year</option>
<option value="5">5 Year</option>
</select>
</div>
</div>
</div>

<div className="row">
<div className="col-md-10 offset-md-1">
<div className="table-responsive">
<table className='table table-bordered table-striped'>
<thead className='bg-dark'>
<tr>
    <th className='text-white'>Title</th>
    <th className='text-white'>Amount</th>
    <th className='text-white'>No of Payment</th>
    <th className='text-white'>Total Amount</th>
</tr>
</thead>
<tbody>
<tr>
    <td><b>Booking</b></td>
    <td>
        <div className="form-group">
            {
                PaymentBookingStatus == false ? <input type="text" className="form-control" onChange={e=>setBookingAmount(e.target.value)} value={BookingAmount} disabled/> : <input type="text" className="form-control" onChange={e=>setBookingAmount(e.target.value)} value={BookingAmount}/>
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value="1" disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setBookingTotalAmount(e.target.value)} value={BookingAmount} disabled/>
        </div>
    </td>
</tr>
<tr>
    <td><b>Allocation</b></td>
    <td>
        <div className="form-group">
            {
                PaymentBookingStatus == false ? <input type="text" className="form-control" onChange={e=>setAllocationAmount(e.target.value)} value={AllocationAmount} disabled/> : <input type="text" className="form-control" onChange={e=>setAllocationAmount(e.target.value)} value={AllocationAmount}/>
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} disabled value="1" />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setAllocationTotalAmount(e.target.value)} value={AllocationAmount}disabled />
        </div>
    </td>
</tr>
<tr>
    <td><b>Confirmation</b></td>
    <td>
        <div className="form-group">
            {
                PaymentBookingStatus == false ? <input type="text" className="form-control" onChange={e=>setConfirmationAmount(e.target.value)} value={ConfirmationAmount} disabled /> : <input type="text" className="form-control" onChange={e=>setConfirmationAmount(e.target.value)} value={ConfirmationAmount} />
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value="1" disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setConfirmationTotalAmount(e.target.value)} value={ConfirmationAmount} disabled />
        </div>
    </td>
</tr>
<tr>
    <td><b>Demarcation</b></td>
    <td>
        <div className="form-group">
            {
                PaymentBookingStatus == false ? <input type="text" className="form-control" onChange={e=>setDemarcationAmount(e.target.value)} value={DemarcationAmount} disabled /> : <input type="text" className="form-control" onChange={e=>setDemarcationAmount(e.target.value)} value={DemarcationAmount} />
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value="1" disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setDemarcationTotalAmount(e.target.value)} value={DemarcationAmount} disabled />
        </div>
    </td>
</tr>
<tr>
    <td><b>Possession</b></td>
    <td>
        <div className="form-group">
            {
                PaymentBookingStatus == false ?  <input type="text" className="form-control" onChange={e=>setPossessionAmount(e.target.value)} value={PossessionAmount} disabled /> :  <input type="text" className="form-control" onChange={e=>setPossessionAmount(e.target.value)} value={PossessionAmount} />
            }
           
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value="1" disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setPossessionTotalAmount(e.target.value)} value={PossessionAmount} disabled />
        </div>
    </td>
</tr>
</tbody>
</table>
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-center">
<div>
<h2 className="hk-pg-title font-weight-600 text-center">Periodical Payment</h2>
</div>
</div>

<table className='table table-bordered table-striped'>
<thead className='bg-dark'>
<tr>
    <th className='text-white'>Title</th>
    <th className='text-white'>Amount</th>
    <th className='text-white'>No of Payment</th>
    <th className='text-white'>Total Amount</th>
</tr>
</thead>
<tbody>
<tr>
    <td>
        <div className="form-check">
            <label className="form-check-label">
            {
                CheckDisabled == false ? 'Monthly' : <><input type="checkbox" className="form-check-input" name="periodicalPayment" value="monthly" onChange={ModeOfPayment} /> Monthly</>
            }
            </label>
        </div>
    </td>
    <td>
        <div className="form-group">
            {
                monthlyCon == '' ?  <input type="text" className="form-control" onChange={e=>setMonthlyAmount(e.target.value)} value={MonthlyAmount} disabled/> :  <input type="text" className="form-control" onChange={e=>setMonthlyAmount(e.target.value)} value={MonthlyAmount} />
            }
           
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value={MonthlyNoCount} disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" value={MonthlyTotalAMountCount} disabled />
        </div>
    </td>
</tr>

<tr>
    <td>
        <div className="form-check">
            <label className="form-check-label">
                {
                    CheckDisabled == false ? "Quarterly" : <><input type="checkbox" className="form-check-input" name="periodicalPayment" value="quarterly" onChange={ModeOfPayment} />Quarterly</>
                }
            
            </label>
        </div>
    </td>
    <td>
        <div className="form-group">
            {
                quarterlyCon == '' ? <input type="text" className="form-control" onChange={e=>setQuarterlyAmount(e.target.value)} value={QuarterlyAmount} disabled /> : <input type="text" className="form-control" onChange={e=>setQuarterlyAmount(e.target.value)} value={QuarterlyAmount} />
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value={QUarterlyNoCount} disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" value={QuarterlyTotalAMountCount} disabled />
        </div>
    </td>
</tr>

<tr>
    <td>
        <div className="form-check">
            <label className="form-check-label">
                {
                    CheckDisabled == false ? "Half Yearly" : <><input type="checkbox" className="form-check-input" name="periodicalPayment" value="halfyearly" onChange={ModeOfPayment} />Half Yearly</>
                }
            
            </label>
        </div>
    </td>
    <td>
        <div className="form-group">
            {
                halfyearlyCon == '' ?  <input type="text" className="form-control" onChange={e=>setHalfyearlyAmount(e.target.value)} value={HalfyearlyAmount} disabled /> :  <input type="text" className="form-control" onChange={e=>setHalfyearlyAmount(e.target.value)} value={HalfyearlyAmount} />
            }
           
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" value={HalfYearNoCount} minLength={1} disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" value={HalfYearlyTotalAMountCount} disabled />
        </div>
    </td>
</tr>

<tr>
    <td>
        <div className="form-check">
            <label className="form-check-label">
                {
                    CheckDisabled == false ? "Yearly" : <><input type="checkbox" className="form-check-input" name="periodicalPayment" value="yearly" onChange={ModeOfPayment} />Yearly</>
                }
            
            </label>
        </div>
    </td>
    <td>
        <div className="form-group">
            {
                yearlyCon  == '' ? <input type="text" className="form-control" onChange={e=>setyearlyAmount(e.target.value)} value={yearlyAmount} disabled /> : <input type="text" className="form-control" onChange={e=>setyearlyAmount(e.target.value)} value={yearlyAmount} />
            }
            
        </div>
    </td>
    <td style={{width:130}}>
    <div className="form-group">
            <input type="number" className="form-control" minLength={1} value={YearlyNoCount} disabled />
        </div>
    </td>
    <td>
    <div className="form-group">
            <input type="text" className="form-control" value={YearlyTotalAMountCount} disabled />
        </div>
    </td>
</tr>

<tr>
    <td colSpan={3} align="right">
        Total Sale Price
    </td>
    <td>
        <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setTotalSalesPrice(e.target.value)} value={TotalSalesPrice} />
        </div>
    </td>
</tr>

<tr>
    <td colSpan={3} align="right">
        Discount Price
    </td>
    <td>
        <div className="form-group">
            <input type="text" className="form-control" onChange={e=>setDiscountSalesPrice(e.target.value)} value={DiscountSalesPrice} />
        </div>
    </td>
</tr>

<tr>
    <td colSpan={3} align="right">
        Net Sale Price
    </td>
    <td>{
           DiscountSalesPrice == '' ? '0' : parseFloat(TotalSalesPrice) - parseFloat(DiscountSalesPrice)
        }</td>
</tr>

<tr>
    <td colSpan={3} align="right">
        Total Schedule Amount
    </td>
    <td>
        
        {
         TotalSalesPrice == '' ? '0' : parseFloat(BookingAmount) + parseFloat(AllocationAmount) + parseFloat(ConfirmationAmount) + parseFloat(DemarcationAmount) + parseFloat(PossessionAmount) + parseFloat(TOtalMonthly) + parseFloat(QuarterlyTotalAMountCount) + parseFloat(TOtalHalfYearly) + parseFloat(YearlyTotalAMountCount)
        }</td>
</tr>

<tr>
    <td colSpan={3} align="right">
        Balanace Schedule Amount
    </td>
    <td>{TotalSalesPrice == '' ? '0' : FinalBalance }</td>
</tr>

<tr>
    <td colSpan={4} align="center">

    {/* <Link to="/payment-statement"><button className='btn btn-secondary'>Generate Plan Now</button></Link> */}

        {
            FinalBalance == 0 ? (
                <button className='btn btn-secondary' onClick={GeneratePaymentPlan}>Generate Plan Now</button>
            ):(
                <button className='btn btn-secondary' disabled>Generate Plan Now</button>
            )
        }
        
    </td>
</tr>

</tbody>
</table>

</div>
</div>
</div>


</div>
</>
)
}

export default AddNewPaymentPlan