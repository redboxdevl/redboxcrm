import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardSkeleton = () => {
  return (
    <>
        <div className="col-lg-3 col-sm-6 col-6">

            <div className="card card-sm">

            <div className="card-body">
            <div className="align-items-center d-flex justify-content-between">
            <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-0"><Skeleton style={{width:'100%'}} height={15}/></span>
            <span className="badge badge-sm mb-0"><Skeleton width={50} height={15}/> </span>
            </div>
            <div className="d-flex align-items-center justify-content-between position-relative mt-1">
            <div>
            <span className="d-block d-flex">
            <span className="display-5 font-weight-400 text-dark"><span className="counter-anim"><Skeleton width={30} height={30} circle={true}/></span></span>
            <small className="ml-1 mt-3"><Skeleton width={50} height={10}/></small>
            </span>
            </div>
            <div className="position-absolute r-0">
            <Skeleton width={80} height={30}/>
            </div>
            </div>
            </div>

            </div>

            </div>
    </>
  )
}

export default DashboardSkeleton