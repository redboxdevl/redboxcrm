import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LIstReportingSkeleton = () => {
  return (
    <tr>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    <td><Skeleton width={100} height={15}/></td>
    {/* <td><Skeleton width={100} height={15}/></td> */}
    {/* <td><Skeleton width={100} height={15}/></td> */}
    {/* <td><Skeleton width={100} height={15}/></td> */}
  </tr>
  )
}

export default LIstReportingSkeleton