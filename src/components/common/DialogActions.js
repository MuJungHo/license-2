import React from "react";
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

export default withStyles(theme => ({
  root: {
    color: theme.palette.paper.color,
    backgroundColor: theme.palette.paper.background,
  }
}))((props) => <DialogActions {...props} />)
