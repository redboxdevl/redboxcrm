import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const SecurityPrint = () => {

const componentRef = useRef();

const handlePrint = useReactToPrint({
content:() => componentRef.current,
documentTitle:'testprint',
onAfterPrint:()=>console.log("Print Success")
});

return (
<>

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<table width="100%" border="0" className='myTable' style={{border:'0',borderCollapse:'inherit'}}>
<thead>
<tr>
<td colSpan={4} style={{padding:10,verticalAlign:'middle',textAlign:'left'}}><img src="../FrontAsset/images/logoRb.webp" alt="" width="220" className='imgBoxx imgBoxx2s' style={{verticalAlign:'middle'}}/></td>
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle'}}><p>Security Files</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Serial #</th>
        <th>Company</th>
        <th>Property Type</th>
        <th>DOc Type</th>
        <th>DOc Ref</th>
        <th>DOc Nature</th>
        <th>Entry Date</th>
        <th>Released Date</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
    <tr>
        <td>AB/2022/12/0021</td>
        <td>Redbox</td>
        <td>Apartment</td>
        <td>Possession Order</td>
        <td>Mrs.saba Faizan</td>
        <td>Copy</td>
        <td>2022-01-01</td>
        <td>2021-04-20</td>
    </tr>
</tbody>
</table>
</td>

</tr>

<tr>
<td colSpan={1} className="footerS">
<img src="../FrontAsset/images/footerlogo.png" alt="" width="60" style={{display:'block',marginLeft:'auto',marginRight:17}}/>
</td>
<td className="footerS" colSpan={11} style={{verticalAlign:'middle',paddingLeft:25,borderLeft:'1px solid #333'}}>
<p >Head Office B-275, Block, Gulshan-E-Iqbal, Karachi.<br />info@thecity108.com | thecity108.com | 021-34833244</p>
</td>
</tr>

</tbody>


</table>
</div>

</>
)
}

export default SecurityPrint