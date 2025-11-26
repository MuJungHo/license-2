import React, { useContext } from "react";

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  TextField, Button, Switch,
  DialogContent,
  DialogActions,
} from "../../components/common";
import { FormControlLabel } from '@material-ui/core';


export default ({
  onConfirm = () => { },
}) => {
  const { closeDialog, t } = useContext(GlobalContext);

  const [state, setState] = React.useState({ commercial: 1, number: "" })

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        <TextField
          type="number"
          required
          label={t("amount")}
          fullWidth
          style={{ marginBottom: 20 }}
          disabled={state.commercial === 0}
          value={state.commercial === 0 ? 16 : state.number}
          onChange={e => setState({ ...state, number: Number(e.target.value) })}
        />
        <TextField
          type="text"
          label={t("description")}
          fullWidth
          style={{ marginBottom: 20 }}
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.commercial === 1}
              onChange={e => setState({
                ...state,
                number: e.target.checked ? state.number: 16,
                commercial: e.target.checked ? 1 : 0
              })}
              color="primary"
            />
          }
          label={t("commercial")}
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
    </>
  )
}