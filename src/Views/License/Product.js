import React, { useContext, useRef, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import {
  AddBox,
  Delete,
  ArrowBack,
  Save
} from '@material-ui/icons';

import {
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import {
  TextField, Paper, Button, IconButton, Text,
  DialogContent,
  DialogActions,
  Checkbox
} from "../../components/common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
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
  info: {
    display: 'flex',
    width: 'calc(50% - 24px)',
    alignItems: 'center',
    height: 45,
    margin: '6px 12px',
    '& > *:first-child': {
      minWidth: 150
    },
    '& > *:not(:first-child)': {
      flex: '1 1 auto'
    },
  },
  button: {
  },
  content: {
    width: 700,
    backgroundColor: theme.palette.dialog.background,
    color: theme.palette.dialog.color,
  },
}));

const Parameter = ({ parameter, onParameterChange, onParameterDelete }) => {
  const classes = useStyles();
  return (<React.Fragment>
    <div style={{ display: 'flex' }}>
      <div>
        <IconButton onClick={() => onParameterDelete(parameter)} style={{ margin: '6px 12px' }}>
          <Delete />
        </IconButton>
      </div>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className={classes.info}><span>Key:</span> <TextField
            onChange={e => onParameterChange(parameter, 'name', e.target.value)}
            value={parameter.name} /></div>
          <div className={classes.info}><span>Type:</span> <Select
            onChange={e => onParameterChange(parameter, 'type', e.target.value)}
            value={parameter.type} >
            {
              [
                { label: "text", value: "text" },
                { label: "number", value: "number" },
                // { label: "textarea", value: "textarea" },
                { label: "const", value: "const" },
                // { label: "dropdown", value: "dropdown" },
                // { label: "checkboxes", value: "checkboxes" },
                // { label: "checkbox", value: "checkbox" },
                // { label: "radio", value: "radio" },
                // { label: "date", value: "date" },
                { label: "upload", value: "upload" },
              ].map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
            }
          </Select>
          </div>

          <div className={classes.info}><span>Trial:</span> <div><Checkbox
            color="primary"
            onChange={e => onParameterChange(parameter, 'trial', e.target.checked ? 1 : 0)}
            checked={parameter.trial === 1} /></div></div>

          <div className={classes.info}><span>Commercial:</span> <div><Checkbox
            color="primary"
            onChange={e => onParameterChange(parameter, 'commercial', e.target.checked ? 1 : 0)}
            checked={parameter.commercial === 1} /></div></div>
        </div>
        {parameter.type === "number" && <div style={{ display: 'flex' }}>
          <div className={classes.info}>
            <span>Min:</span> <TextField
              type="number"
              onChange={e => onParameterChange(parameter, 'option', {
                ...parameter.option,
                min: e.target.value
              })}
              value={parameter.option?.min || ''}
            /></div>
          <div className={classes.info}>
            <span>Max:</span> <TextField
              type="number"
              onChange={e => onParameterChange(parameter, 'option', {
                ...parameter.option,
                max: e.target.value
              })}
              value={parameter.option?.max || ''}
            />
          </div>
        </div>}
        {parameter.type === "const" && <div className={classes.info}>
          <span>Const:</span> <TextField value={parameter.text || ""}
            type="text"
            onChange={e => onParameterChange(parameter, 'text', e.target.value)} />
        </div>}
        {parameter.type === "radio" && <div>
          <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
          {parameter.options.map(option =>
            <div className={classes.info} key={option} >
              <Delete /><TextField value={option} />
            </div>
          )}
        </div>}
        {parameter.type === "checkboxes" && <div>
          <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
          {parameter.options.map(option =>
            <div className={classes.info} key={option} >
              <Delete /><TextField value={option} />
            </div>
          )}
        </div>}
        {parameter.type === "dropdown" && <div>
          <div className={classes.info}><span style={{ flexBasis: '12.5%' }}>Options: </span><AddBox /></div>
          {parameter.options.map(option =>
            <div className={classes.info} key={option} >
              <Delete /><TextField value={option} />
            </div>
          )}
        </div>}
      </div>
    </div>
    <Divider /></React.Fragment>)
}

const DialogSection = ({
  onConfirm = () => { }
}) => {
  const [state, setState] = React.useState("")
  const { closeDialog, t } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>

        <FormControl
          fullWidth
          style={{ marginBottom: 20 }}>
          <InputLabel>{t("command-key")}</InputLabel>
          <Select
            value={state}
            onChange={e => setState(e.target.value)}
          >
            <MenuItem value="#license_count#">License Count</MenuItem>
            <MenuItem value="#commercial#">Commercial</MenuItem>
            <MenuItem value="#json_path#">Json Path</MenuItem>
            <MenuItem value="#output_path#">Output Path</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(state)}>
          Confirm
        </Button>
      </DialogActions>
    </>)
}


export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { t, authedApi, openSnackbar, openDialog, closeDialog } = useContext(GlobalContext);
  const { productid } = useParams();
  const inputRef = useRef();

  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    command: "",
    parameters: []
  })

  const getProduct = useCallback(async () => {
    const _product = await authedApi.getProduct({ productid });
    _product.parameters = [];
    if (_product.fields) {
      _product.parameters = JSON.parse(_product.fields);
    }
    setProduct(_product)
  }, [productid])
  // console.log(product)
  React.useEffect(() => {
    getProduct()
  }, [getProduct])


  const handleAddParamter = () => {
    const _id = Date.now();
    let _parameters = [...product.parameters, {
      _id, name: "",
      type: "text",
      options: [],
      text: "",
      option: {},
      commercial: 1,
      trial: 1
    }];
    let _product = { ...product, parameters: _parameters, fields: JSON.stringify(_parameters) }
    setProduct(_product)
  }

  const handleSaveProduct = async () => {
    await authedApi.editProduct({
      data: {
        ...product
      }
    })

    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("save") })
    })
  }

  const onParameterChange = (parameter, key, value) => {
    let _parameters = [...product.parameters].map(p => p._id === parameter._id ? { ...parameter, [key]: value } : p)
    let _product = { ...product, parameters: _parameters, fields: JSON.stringify(_parameters) }
    setProduct(_product)
  }

  const onParameterDelete = (parameter) => {
    let _parameters = [...product.parameters].filter(p => p._id !== parameter._id)
    let _product = { ...product, parameters: _parameters, fields: JSON.stringify(_parameters) }
    setProduct(_product)
  }

  const handleAddCommand = () => {
    inputRef.current.focus();
    showAddCommandKeyModal(inputRef.current.selectionStart)
  }
  const showAddCommandKeyModal = (index) => {
    openDialog({
      title: t("add-thing", { thing: t("command-key") }),
      section: <DialogSection onConfirm={state => handleAddCommandKey(state, index)} />
    })
  }

  const handleAddCommandKey = (state, index) => {
    let _value = product.command;
    let value = _value.substr(0, index) + state + _value.substr(index);
    setProduct({
      ...product,
      command: value
    })
    closeDialog()
  }

  return (
    <div className={classes.root}>
      <Button
        style={{ marginBottom: 20 }}
        onClick={() => history.push('/product-list')}>
        <ArrowBack />
      </Button>
      <Button
        onClick={handleSaveProduct}
        style={{ marginBottom: 20 }}>
        <Save />
      </Button>
      <Paper style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }}>
          <div className={classes.info}>
            <Text>{t("name")}</Text>
            <TextField value={product.name} onChange={e => setProduct({
              ...product,
              name: e.target.value
            })} />
          </div>
          <div className={classes.info}>
            <Text>{t("partnumber")}</Text>
            <TextField value={product.partnumber} onChange={e => setProduct({
              ...product,
              partnumber: e.target.value
            })} />
          </div>
          <div className={classes.info}>
            <Text>{t("description")}</Text>
            <TextField value={product.description} onChange={e => setProduct({
              ...product,
              description: e.target.value
            })} />
          </div>
          <div style={{ width: '100%' }} className={classes.info}>
            <Text>{t("command")}</Text>
            <Button onClick={handleAddCommand}>
              <AddBox />
            </Button>
            <TextField inputRef={inputRef} fullWidth value={product.command} onChange={e => setProduct({
              ...product,
              command: e.target.value
            })} />
          </div>
        </div>
      </Paper>
      <Paper>
        <IconButton onClick={handleAddParamter}><AddBox /></IconButton>
        {product.parameters.map(parameter => <Parameter
          key={parameter._id}
          parameter={parameter}
          onParameterDelete={onParameterDelete}
          onParameterChange={onParameterChange}
        />)}
      </Paper>
    </div>
  )
}