import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  required: {
    color: theme.palette.secondary.main
  }
}));

export default withStyles(theme => ({
  root: {
    color: theme.palette.layout.color
  }
}))((props) => {
  const classes = useStyles();
  return <Typography {...props} >
    {props.required && <span className={classes.required}>*&nbsp;</span>}
    {props.children}
  </Typography>
})