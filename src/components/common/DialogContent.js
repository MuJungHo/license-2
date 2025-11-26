import React from "react";
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

export default withStyles(theme => ({
  root: {
    color: theme.palette.paper.color,
    backgroundColor: theme.palette.paper.background,
  }
}))((props) => <DialogContent {...props} />)
