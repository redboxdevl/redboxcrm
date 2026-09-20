import React from 'react'
import { useParams } from 'react-router-dom'
import AddLeadForm from './AddLeadForm';

const AddLeads = () => {
  let { id } = useParams();
  return (
    <>
     <AddLeadForm dataId={id} />
    </>
  )
}

export default AddLeads