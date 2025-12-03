import React, { useContext, useCallback } from "react";
// import { makeStyles } from '@material-ui/core/styles';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField, Button,
  DialogContent,
  DialogActions,
} from "../../components/common";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     padding: theme.spacing(3),
//     position: 'relative'
//   },
//   paper: {
//     width: '100%',
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   actions: {
//     position: 'absolute',
//     left: 20,
//     bottom: 20,
//     '& svg': {
//       color: theme.palette.layout.color,
//     }
//   },
//   content: {
//     width: 700,
//     backgroundColor: theme.palette.dialog.background,
//     color: theme.palette.dialog.color,
//   },
//   info: {
//     display: 'flex',
//     width: '100%',
//     alignItems: 'center',
//     height: 45,
//     '& > *:first-child': {
//       flexBasis: '25%'
//     },
//     '& > *:not(:first-child)': {
//       flexBasis: '74%'
//     },
//   },
// }));

export default ({
  onConfirm = () => { },
}) => {
  const { closeDialog, authedApi, t } = useContext(GlobalContext);
  const { accountid, role } = useContext(AuthContext);

  const [state, setState] = React.useState({ to_accountid: "" });
  const [accountList, setAccountList] = React.useState([]);

  const getAccountList = async () => {
    const avaliableRoles = [1, 2, 3].filter(r => r > role)
    const { result } = await authedApi.getAccountList({
      data: {
        roleid: avaliableRoles
      },
      limit: 50,
      page: 1
    })
    let _accountList = result
      .filter(a => a.accountid !== Number(accountid))
      .map(a => ({ ...a, _id: a.accountid }))
    setAccountList(_accountList)
  }

  React.useEffect(() => {
    getAccountList()
  }, [])

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <FormControl
          fullWidth
          required
          style={{ marginBottom: 20 }}>
          <InputLabel>{t("recipient")}</InputLabel>
          <Select
            value={state.to_accountid}
            onChange={e => setState({ ...state, to_accountid: Number(e.target.value) })}
          >
            {
              accountList.map(a => <MenuItem key={a.accountid} value={a.accountid}>{a.email}</MenuItem>)
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}