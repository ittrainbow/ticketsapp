import React from 'react'
import { isMobile } from 'react-device-detect'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const Dropdown = ({ size, label, inputId, onChange, width, value, list }) => {
  return (
    <FormControl sx={{ mt: isMobile ? 1.5 : 1, mb: 1, width: width + (isMobile ? 0 : 32) }} size={size}>
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
  )
}
