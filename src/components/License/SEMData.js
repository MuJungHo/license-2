import React, { useContext } from "react";

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  TextField, Button, Switch,
  DialogContent,
  DialogActions,
  Text,
  Table
} from "../../components/common";
// import { FormControlLabel } from '@material-ui/core';

const ObjectJsonData = ({ data }) => {
  const { t } = useContext(GlobalContext);

  if (Array.isArray(data)) {
    
    const _data = data.map((item, i) => ({ _id: i, ...item })).splice(0 ,1)
    return (<Table
      rows={_data}
      toolbar={false}
      columns={[
        { key: 'partNo', label: t('partnumber') },
        { key: 'productName', label: t('name') },
        { key: 'qty', label: t('count') },
        { key: 'licenseStartDate', label: t('start-date') },
        { key: 'licenseEndDate', label: t('end-date') },
      ]}
      checkable={false}
      filterable={false}
      dense
    />)
  }
  else return (JSON.stringify(data))
}


export default ({
  // onConfirm = () => { },
  data = ""
}) => {
  const { closeDialog, t } = useContext(GlobalContext);
  const jsonData = JSON.parse(data) || {};

  // const [state, setState] = React.useState(jsonData);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        {
          Object.keys(jsonData).map((key, i) => (<div style={{ marginBottom: 12 }} key={i}>
            <Text style={{ fontSize: 12, fontWeight: '700' }}>{t(key)}</Text>
            {
              typeof jsonData[key] === "object"
                ? <ObjectJsonData data={jsonData[key]} />
                : <Text>{jsonData[key]}</Text>
            }
          </div>))
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}