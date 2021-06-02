import React from 'react'

import './view-supervisors-style.css'

const NoSupervisors = ({ word }) => {
  return (
    <div className='no-items'>
      <h2>لا يوجد {word || 'مشرفين'} للعرض ...</h2>
    </div>
  )
}

export default NoSupervisors
