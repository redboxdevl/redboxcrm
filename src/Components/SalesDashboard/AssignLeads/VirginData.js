import React , {useState, useEffect} from 'react';

const VirginData = (prop) => {

const [result,setVirginResult]= useState([]);

const GetVirginLeads = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}listvirginleads?agentid=${prop.agentid}&leadid=${prop.dataid}`);
const dataxs = await response.json();
const GetArray = dataxs.data;
const FinalArray = GetArray.data;
setVirginResult(await FinalArray);
}


useEffect(() => {
GetVirginLeads();
},[]);

//   var countVirgin = result.length;

return (

result.map((curElem) => {

// if(prop.dataid == curElem.leadid){
//     var MyuData = "Already Call";
// }else{
//     var MyuData = "Untouch Lead";
// }


return (

    
    
    <>
    
    { prop.dataid === curElem.leadid ? (
    <p>Already Call</p>
    ):(
        
        <>
        
        </>
    )
    }

  
            
        </>
)

})


)
}

export default VirginData