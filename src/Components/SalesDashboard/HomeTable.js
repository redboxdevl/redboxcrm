import React from 'react'

const HomeTable = () => {
  return (
    <>

    <tr>
    <td className="p-0">
    <div className="media align-items-center">
    <div className="media-img-wrap d-flex mr-10">
        <div className="avatar avatar-xs">
            <img src="FrontAsset/dist/img/avatar12.jpg" alt="user" className="avatar-img rounded-circle" />
        </div>
    </div>
    <div className="media-body">
        <span className="d-block">Abdul Sami <br /><small>Marwa Hill View</small></span>
    </div>
    </div>
    </td>
    <td className="p-0 text-right"><small>High</small> <br /> <small>02 Aug 2022</small></td>
    </tr>

    </>
  )
}

export default HomeTable