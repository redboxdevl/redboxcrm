import React from 'react'
import Skeleton from 'react-loading-skeleton'

const InventoriesSkeleton = () => {
  return (
    <>
      <div className="card-skeleton">
        <Skeleton width={40} height={40}></Skeleton>
      </div>
    </>
  )
}

export default InventoriesSkeleton