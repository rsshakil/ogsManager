import React from 'react'

export default function AddRequiredMark({defaultValue='※'}) {
  return (
    <span className='text-orange-300'>{ defaultValue }</span>
  )
}
