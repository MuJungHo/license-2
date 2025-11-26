import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


export default withStyles(theme => ({
  root: {
    '& p': {
      color: theme.palette.breadcrumbs.color
    },
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.breadcrumbs.color
    }
    // width: '30%',
    // boxShadow: theme.palette.boxShadow[1],
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // "& .MuiOutlinedInput-notchedOutline": {
    //   borderColor: 'rgba(190, 190, 190, 0.4)'
    // }
  }
}))((props) => <Breadcrumbs {...props} />)
