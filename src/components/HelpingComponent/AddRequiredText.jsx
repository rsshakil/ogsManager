import React from 'react'

export default function AddRequiredText({ requiredText = "※必須", labelFontColor='#E01329' }) {
  return (
    <span className={`font-normal text-sm !text-ogs-label-font`} style={{color:labelFontColor}}>{requiredText}</span>
  )
}
