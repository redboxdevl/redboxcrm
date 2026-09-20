import React from 'react'
import Skeleton from 'react-loading-skeleton'

const OutgoingSkeleton = () => {
  return (
    <>
      <div className="card-skeleton">
      <li>
        <a href="#">
        <Skeleton width={100} height={70}></Skeleton>
        <Skeleton width={100} height={20}></Skeleton>
        <Skeleton width={50} height={10}></Skeleton> / <Skeleton width={50} height={10}></Skeleton>
        </a>
        </li>
       
      </div>
    </>
  )
}

export default OutgoingSkeleton