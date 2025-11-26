import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default withStyles(theme => ({
  root: {
    minWidth: 'unset',
    color: theme.palette.input.color,
    borderColor: theme.palette.input.color,
    "&.MuiButton-textSecondary:not(.Mui-disabled)": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main
    },
    "&.MuiButton-textPrimary:not(.Mui-disabled)": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main
    },
    "&.MuiButton-outlinedSecondary:not(.Mui-disabled)": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main
    },
    "&.MuiButton-outlinedPrimary:not(.Mui-disabled)": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main
    },
    "&.MuiButton-contained:not(.Mui-disabled)": {
      color: theme.palette.input.contrastText,
      backgroundColor: theme.palette.input.color,
    },
    "&.MuiButton-containedSecondary:not(.Mui-disabled)": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.input.contrastText
    },
    "&.MuiButton-containedPrimary:not(.Mui-disabled)": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.input.contrastText
    },
    "&.Mui-disabled": {
      color: theme.palette.disabled.color,
      borderColor: theme.palette.disabled.color
    },
    "&.MuiButton-contained.Mui-disabled": {
      color: theme.palette.disabled.contrastText,
      backgroundColor: theme.palette.disabled.color,
    },
    //
  },
}))((props) => <Button {...props} />)
