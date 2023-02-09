import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import './Dropdown.scss'

export const Dropdown = ({ size, label, inputId, onChange, minWidth, value, list }) => {
  
  return (
    <FormControl sx={{ m: 1, minWidth: minWidth }} size={size}>
      <InputLabel id={inputId}>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        {list.map((el, index) => {
          const { value, text } = el
          return <MenuItem key={index} value={value}>{text}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}
