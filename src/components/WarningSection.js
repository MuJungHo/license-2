import React, { useContext } from "react";

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  Button, 
  DialogContent,
  DialogActions,
} from "../components/common";



export default ({
  onConfirm = () => { },
  message = ""
}) => {
  const { closeDialog, t } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="secondary" variant="contained" onClick={onConfirm}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}