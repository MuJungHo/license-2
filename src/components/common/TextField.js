import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {
  InputAdornment
} from '@material-ui/core'

import SearchIcon from "@material-ui/icons/Search";

export default withStyles(theme => ({
  root: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: 'rgba(190, 190, 190, 0.4)'
    },
    "& .MuiInput-underline:before": {
      borderColor: theme.palette.layout.color,
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      transition: 'border-color ease-in-out 0.3s'
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1
    },
    '&::placeholder': {
      fontSize: '1rem'
    },
    '& .MuiFormLabel-root': {
      fontSize: '1.2rem'
    },
    '& span': {
      color: theme.palette.error.main
    },
    '& .MuiInputBase-root': {
      // minHeight: 36,
      // height: 33,
      color: theme.palette.layout.color

    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 5
    },
    '& svg': {
    },
    '& .MuiInputLabel-formControl': {
      // top: -10,
      color: theme.palette.layout.color
    }
    // flex: '1 1 auto'
  }
}))((props) => <TextField
  size={props.size || "small"}
  // variant={props.variant || "outlined"}
  {...props}
  InputProps={{
    ...props.InputProps,
    startAdornment: props.InputProps?.startAdornment
      ? props.InputProps?.startAdornment
      : props.type === "search"
        ?
        (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ) : undefined
  }}
  inputProps={{
    style: {
      ...props.inputProps,
    }
  }} />)