import React, { useContext, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {
  FormGroup,
  RadioGroup
} from '@material-ui/core';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  TextField, Checkbox, Radio, Button,
  DialogContent,
  DialogActions,
} from "../common";
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    position: 'relative'
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actions: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    '& svg': {
      color: theme.palette.layout.color,
    }
  },
  content: {
    width: 700,
    backgroundColor: theme.palette.dialog.background,
    color: theme.palette.dialog.color,
  },
  info: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: 45,
    '& > *:first-child': {
      flexBasis: '25%'
    },
    '& > *:not(:first-child)': {
      flexBasis: '74%'
    },
  },
}));
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const Parameter = ({ parameter, state, setState }) => {
  const classes = useStyles();
  // console.log(state)
  const handleChecked = (checked, name, key) => {
    if (checked) {
      setState({
        ...state,
        [name]: [...state[name], key]
      })
    } else {
      let arr = [...state[name]].filter(i => i !== key)
      setState({
        ...state,
        [name]: [...arr]
      })
    }
  }

  const handleUploadFile = async (e, key) => {
    let base64String = await toBase64(e.target.files[0]);
    const file = base64String.split(",")[1];
    setState({
      ...state,
      [key]: file
    })
    // e.target.value = null
  }

  return (<div className={classes.info}>
    <span>{parameter.name}:</span> {{
      "text": <TextField
        type="text"
        value={state[parameter.name] || ""}
        onChange={e => setState({
          ...state,
          [parameter.name]: e.target.value
        })}
      />,
      "number": <TextField
        type="number"
        value={state[parameter.name] || ""}
        InputProps={{
          inputProps: {
            min: parameter.option?.min,
            max: parameter.option?.max,
          }
        }}
        onChange={e => setState({
          ...state,
          [parameter.name]: Number(e.target.value)
        })}
      />,
      "date": <TextField
        type="date"
        value={state[parameter.name] || ""}
        onChange={e => setState({
          ...state,
          [parameter.name]: e.target.value
        })}
      />,
      "textarea": <TextField
        type="text"
        multiline
        minRows={5}
        maxRows={10}
        value={state[parameter.name] || ""}
        onChange={e => setState({
          ...state,
          [parameter.name]: e.target.value
        })}
      />,
      "const": <span>{parameter.text}</span>,
      "checkboxes": <FormGroup row>{parameter.options.map(option => <FormControlLabel
        key={option}
        control={
          <Checkbox
            checked={state[parameter.name]?.includes(option) || false}
            onChange={e => handleChecked(e.target.checked, parameter.name, option)}
            name={option}
            color="primary"
          />
        }
        label={option}
      />)}</FormGroup>,
      "radio": <RadioGroup value={state[parameter.name] || parameter.options[0]} onChange={e => setState({
        ...state,
        [parameter.name]: e.target.value
      })} row>
        {parameter.options.map(option => <FormControlLabel
          key={option}
          control={
            <Radio color="primary" />
          }
          value={option}
          label={option}
        />)}
      </RadioGroup>,
      "upload": <input type="file"
        onChange={e => handleUploadFile(e, parameter.name)}
      />
    }[parameter.type]}</div>)
}

export default ({
  onConfirm = () => { },
  productid,
  isCommercial = false
}) => {
  // const { t } = useContext(GlobalContext);
  const { closeDialog, authedApi, t } = useContext(GlobalContext);
  const [product, setProduct] = React.useState([])

  const getProduct = useCallback(async () => {
    const _product = await authedApi.getProduct({ productid })
    _product.parameters = [];
    if (_product.fields) {
      _product.parameters = JSON.parse(_product.fields);
    }
    setProduct(_product)
  }, [productid])

  React.useEffect(() => {
    getProduct()
  }, [getProduct])


  const [state, setState] = React.useState({})

  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>
        {product.parameters
          ?.filter(parameter => (parameter.trial === 1 && !isCommercial) || (parameter.commercial === 1 && isCommercial))
          ?.map(parameter => <Parameter
            key={parameter._id}
            state={state}
            setState={setState}
            parameter={parameter}
          />
          )}
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