import React from "react";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


export default withStyles(theme => ({
  root: {
      color: theme.palette.input.color,
      "&.Mui-disabled": {
        color: theme.palette.disabled.color,
        borderColor: theme.palette.disabled.color
      },
  }
}))((props) => <IconButton {...props} />)
