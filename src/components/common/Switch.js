import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


export default withStyles(theme => ({
  root: {
    '& .MuiSwitch-track': {
      background: theme.palette.input.background,
    },
  }
}))((props) => <Switch {...props} />)
