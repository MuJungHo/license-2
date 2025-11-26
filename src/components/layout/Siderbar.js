import React, { useContext, useCallback } from 'react'
import clsx from 'clsx';
import { NavLink, useLocation } from "react-router-dom"
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import {
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';

import {
  ArrowBack,
  ArrowForward,
  ExpandLess,
  ExpandMore,
  FiberManualRecord
} from '@material-ui/icons';

import routes from '../../routers/routes';
import { version } from "../../../package.json";
import { Button } from "../common";

const drawerWidth = 240;


const SiderFormControl = withStyles(theme => ({
  root: {
    color: theme.palette.siderbar.color,
    '& .MuiFormLabel-root': {
      color: theme.palette.siderbar.color,
    },
    '& .MuiInputBase-root': {
      color: theme.palette.siderbar.color,
    },
    '& .MuiInput-underline:before': {
      borderColor: theme.palette.siderbar.color,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.siderbar.color,
    },
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "rgba(190, 190, 190, 0.4)",
    // },
    "&:hover .MuiInput-underline:before": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      transition: 'border-color ease-in-out 0.2s'
    },
  }
}))((props) => <FormControl {...props} />)

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    paddingTop: 90,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.siderbar.background,
  },
  drawerClose: {
    paddingTop: 90,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: theme.palette.siderbar.background,
  },
  node: {
    color: theme.palette.siderbar.color,
    // transition: 'background-color 0.2s ease',
    '&:hover': {
      color: theme.palette.siderbar.color,
      backgroundColor: theme.palette.siderbar.hover,
    },
    '& > div > span': {
      marginLeft: 10,
      fontSize: 16
    },
    '& > *:first-child': {
      // height: 32,
      // width: 32,
      // margin: 'auto'
    },
  },
  nodeActive: {
    color: theme.palette.siderbar.color,
    backgroundColor: theme.palette.siderbar.active
  },
  footer: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

}));

const CloseMutiLevel = ({ route }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { children } = route;
  // const { t } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);
  const location = useLocation();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ListItem className={clsx(classes.node, {
        [classes.nodeActive]: location.pathname === route.path,
      })} onClick={handleClick}>
        <route.icon style={{ margin: 'auto' }} />
      </ListItem>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children
          .filter(child => child.roles.includes(role))
          .map((child, key) => <NavLink key={key} to={child.path}>
            <MenuItem onClick={handleClose}>{child.name}</MenuItem>
          </NavLink>)}
      </Menu>
    </div>
  );

}

const OpenMultiLevel = ({ route }) => {
  const location = useLocation();
  const classes = useStyles();
  const { children } = route;
  const { t } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);
  const [open, setOpen] = React.useState(route.children.findIndex(child => child.path === location.pathname) > -1);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem className={classes.node} onClick={handleClick}>
        <route.icon style={{ margin: 'auto' }} />
        <ListItemText primary={t(route.name)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children
            .filter(child => child.roles.includes(role))
            .map((child, key) => (
              <NavLink key={key} to={child.path}>
                <MenuItem style={{ padding: '8px 16px 8px 48px' }} route={child.path}
                  className={clsx(classes.node, {
                    [classes.nodeActive]: location.pathname === child.path,
                  })} >
                  <FiberManualRecord style={{ width: 10, marginRight: 10 }} />{t(child.name)}</MenuItem></NavLink>
            ))}
        </List>
      </Collapse>
    </React.Fragment >
  );
};
const SingleLevel = ({ route, open }) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useContext(GlobalContext);
  return (
    <NavLink to={route.path}>
      <ListItem className={clsx(classes.node, {
        [classes.nodeActive]: location.pathname === route.path,
      })}>
        <route.icon style={{ margin: 'auto' }} />
        {open && <ListItemText primary={t(route.name)} />}
      </ListItem>
    </NavLink>
  );
};
const Siderbar = ({ open, setOpen }) => {
  const classes = useStyles();
  const { role, accountid, selectedDepid, setSelectedDepid } = useContext(AuthContext);
  const { authedApi, t } = useContext(GlobalContext);
  const [departments, setDepartments] = React.useState([]);

  const getMyAccount = useCallback(async () => {
    if (!accountid) return
    const { departments, selected_depid } = await authedApi.getAccountInfo({ accountid })
    let _departments = departments.map(d => ({ ...d, _id: Number(d.depid) }))
    setDepartments(_departments)
    setSelectedDepid(selected_depid)
  }, [accountid])

  React.useEffect(() => {
    getMyAccount()
  }, [getMyAccount])

  const handleChagneSelectedDepid = async (e) => {
    let depid = e.target.value;
    await authedApi.putUpdateAccountDepid({ data: { accountid, depid } });
    getMyAccount()
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >

      <SiderFormControl
        // fullWidth
        // required
        // variant="outlined"
        style={{ margin: '30px 20px 10px 20px' }}>
        <InputLabel>{t("department")}</InputLabel>
        <Select
          value={selectedDepid || ""}
          onChange={handleChagneSelectedDepid}
          displayEmpty
        >
          {
            departments.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)
          }
        </Select>
      </SiderFormControl>

      <List style={{ height: 'calc(100vh - 175px)', overflow: 'auto' }}>
        {
          routes
            .filter(route => route.roles.includes(role))
            .map(route => Array.isArray(route.children)
              ?
              open
                ? <OpenMultiLevel key={route.path} route={route} />
                : <CloseMutiLevel key={route.path} route={route} />
              : route.sider && <SingleLevel key={route.path} route={route} open={open} />)
        }
      </List>
      {/* <div style={{ flex: 1 }}></div> */}
      <div
        className={classes.footer}
        style={{
          position: 'fixed',
          width: open ? drawerWidth : 72,
          display: 'flex',
          justifyContent: 'space-between',
          padding: open ? '0 20px' : '',
          alignItems: 'center',
          bottom: 20,
        }}>
        {open && <span style={{ color: "#fff" }}>v{version}</span>}
        <Button
          size="small"
          onClick={() => setOpen(!open)}
          style={{ margin: open ? '' : 'auto' }}>
          {open ? <ArrowBack /> : <ArrowForward />}
        </Button>
      </div>
    </Drawer>)
}

export default Siderbar