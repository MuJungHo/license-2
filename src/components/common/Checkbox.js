import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';


export default withStyles(theme => ({
  root: {
    color: theme.palette.input.color,
    "&.Mui-disabled": {
      color: theme.palette.disabled.color,
      borderColor: theme.palette.disabled.color
    },
  }
}))((props) => <Checkbox {...props} />)
