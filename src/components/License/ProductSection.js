import React, { useContext } from "react";
// import { makeStyles } from '@material-ui/core/styles';

// import {
//   FormGroup,
//   RadioGroup
// } from '@material-ui/core';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField, Button,
  DialogContent,
  DialogActions,
} from "../common";

const UserSection = ({
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState({
    name: "",
    description: "",
    partnumber: ""
  });
  const { closeDialog, t } = useContext(GlobalContext);

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <TextField
          label={t("name")}
          type="text"
          fullWidth
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          label={t("description")}
          style={{ marginTop: 20 }}
          type="text"
          fullWidth
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        />
        <TextField
          label={t("partnumber")}
          style={{ marginTop: 20 }}
          type="text"
          fullWidth
          value={state.partnumber}
          onChange={e => setState({ ...state, partnumber: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>)
}

export default UserSection