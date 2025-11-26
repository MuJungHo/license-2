import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

export default withStyles(theme => ({
  root: {
    color: theme.palette.paper.color,
    transition: 'unset',
    backgroundColor: theme.palette.paper.background,
    boxShadow: theme.palette.boxShadow[1],
    borderRadius: 10,
  }
}))((props) => <Paper {...props} />)
