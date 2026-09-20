import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const VirginLeadsSkeleton = () => {
  return (
    <>
        <div className="col-lg-6 col-sm-6 col-6">
             <Skeleton width={455} height={310}/>
             <br />
        </div>
    </>
  )
}

export default VirginLeadsSkeleton