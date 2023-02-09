import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import './Dropdown.scss'

export const Dropdown = ({
  size,
  label,
  inputId,
  labelId,
  selectId,
  selectLabel,
  onChange,
  minWidth,
  value,
  list
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: minWidth }} size={size}>
      <InputLabel id={inputId}>{label}</InputLabel>
      <Select labelId={labelId} id={selectId} value={value} label={selectLabel} onChange={onChange}>
        {list.map((el) => {
          const { value, text } = el
          return <MenuItem value={value}>{text}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}
