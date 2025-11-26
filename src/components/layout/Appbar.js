import React, { useContext } from 'react'
import clsx from 'clsx';
// import { useLocation } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { makeStyles } from '@material-ui/core/styles';
import LanguageSharpIcon from '@material-ui/icons/LanguageSharp';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { ReactComponent as Logo } from '../../images/delta.svg';
import {
  Button,
} from "../common";

import { DarkMode, LightMode } from "../../images/icons";

const useStyles = makeStyles((theme) => {
  // console.log(theme)
  return ({
    appBar: {
      boxShadow: 'unset',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      color: theme.palette.appbar.color,
      backgroundColor: theme.palette.appbar.background,
      '& .MuiToolbar-root': {
        height: 80
      },
      '& svg': {
        color: theme.palette.appbar.svg,
      },
      borderBottom: '6px solid rgb(100, 215, 215)',
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        height: 6,
        width: '60%',
        left: 0,
        top: 80,
        backgroundColor: 'rgb(0, 135, 220)'
      },
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        height: 6,
        right: 0,
        top: 80,
        width: '20%',
        backgroundColor: 'rgb(185, 235, 95)'
      },

    },
    appBarShift: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    paper: {
      padding: 20,
      paddingRight: 0,
      flexGrow: 1,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 48,
      fontSize: 14,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    button: {
      color: theme.palette.action.color,
    }
  })
}
);

const Appbar = ({ open }) => {
  const classes = useStyles();
  const { logout, account } = useContext(AuthContext);
  const { locale, changeLocale, t, changeTheme, theme, authedApi } = useContext(GlobalContext);
  const [anchor, setAnchor] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const languageMenuOpen = !!anchor;

  const handleChangeLocale = (locale) => {
    changeLocale(locale)
    setAnchor(null)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleSetDialog = () => {
  //   handleClose()
  //   openDialog({
  //     title: t("user-profile"),
  //     section: <Profile />
  //   })
  // }

  const handleLogout = async () => {
    await authedApi.tokenLogout()
    logout()
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar style={{ display: 'flex' }}>
        <Logo style={{ cursor: 'pointer', height: 32, width: 106 }} />
        <div style={{ flex: 1 }} />
        <Button className={classes.button} size="small" onClick={e => setAnchor(e.currentTarget)}>
          <LanguageSharpIcon style={{ marginRight: 10 }} />
          {locale}
        </Button>

        <Button size="small" onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
          {
            theme === "dark"
              ? <LightMode />
              : <DarkMode />
          }
        </Button>
        <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)}>
          <Avatar>{account?.slice(0, 3)}</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {/* <MenuItem onClick={handleSetDialog}>{t("user-profile")}</MenuItem> */}
          <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
        </Menu>
        <Menu
          open={languageMenuOpen}
          anchorEl={anchor}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          getContentAnchorEl={null}
          onClose={() => setAnchor(null)}
        >
          <MenuItem selected={locale === 'en'} onClick={() => handleChangeLocale('en')}>English</MenuItem>
          <MenuItem selected={locale === 'zh-TW'} onClick={() => handleChangeLocale('zh-TW')}>繁體中文</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>)
}

export default Appbar