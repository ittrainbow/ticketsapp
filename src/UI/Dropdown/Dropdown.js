import React from 'react'
import { isMobile } from 'react-device-detect'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import './Dropdown.scss'

export const Dropdown = ({
  size,
  label,
  inputId,
  onChange,
  width,
  value,
  list
}) => {
  console.log(width)
  return (
    <div className="dropdown">
      <FormControl sx={{ m: 1, width: width + (isMobile ? 0 : 32) }} size={size}>
        <InputLabel id={inputId}>{label}</InputLabel>
        <Select value={value} label={label} onChange={onChange}>
          {list.map((el, index) => {
            const { value, text } = el
            return (
              <MenuItem key={index} value={value}>
                {text}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}
