import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CallingStatusSkeleton = () => {
  return (
    <>
        <div className="col-lg-6 col-sm-6 col-6">
             <Skeleton width={405} height={290}/>
            
        </div>
    </>
  )
}

export default CallingStatusSkeleton