import React, {
  useContext,
  useCallback
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  Paper,
  Table,
  // DialogContent,
  // DialogActions,
  // Button,
  // TextField
} from "../../components/common";

import Commit from "../../components/License/Commit";
import Transfer from "../../components/License/Transfer";
import Require from "../../components/License/Require";

// import {
//   Select,
//   MenuItem
// } from '@material-ui/core';

import {
  Commit as CommitIcon,
  Exchange,
  Request,
  // MoneyOff
} from "../../images/icons";

const MyLicense = () => {
  const { role, accountid } = useContext(AuthContext);
  const { t, openDialog, closeDialog, authedApi, openSnackbar } = useContext(GlobalContext);
  const [rows, setRows] = React.useState([]);
  
  // console.log(role)
  const getMyAccount = useCallback(async () => {
    const { products } = await authedApi.getAccountInfo({ accountid })
    // console.log(products)
    let _products = products.map(p => ({ ...p, _id: p.productid }))
    setRows(_products)
  }, [accountid])

  React.useEffect(() => {
    getMyAccount()
  }, [getMyAccount])


  const handleSetCommitDialog = (row) => {
    openDialog({
      title: `${t("commit")} ${row.name}`,
      section: <Commit onConfirm={state => handleCommitLicense(state, row.productid)} />
    })
  }

  const handleCommitLicense = async (state, productid) => {
    await authedApi.postLicenseCommit({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("commit") })
    })
  }

  const handleSetTransferDialog = (row) => {
    openDialog({
      title: `${t("transfer")} ${row.name}`,
      section: <Transfer onConfirm={state => handleTransferLicense(state, row.productid)} />
    })
  }

  const handleTransferLicense = async (state, productid) => {
    await authedApi.postLicenseTransfer({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("transfer") })
    })
  }

  const handleSetRequireDialog = (row) => {
    openDialog({
      title: `${t("require")} ${row.name}`,
      section: <Require onConfirm={state => handleRequireLicense(state, row.productid)} />
    })
  }

  const handleRequireLicense = async (state, productid) => {
    await authedApi.postLicenseApply({ data: { ...state, productid }, })
    closeDialog()
    getMyAccount()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("require") })
    })
  }

  return (
    <Paper>
      <Table
        title={t("ownProducts")}
        rows={rows}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'total_sales', label: t('total-sales') },
          { key: 'total_trial', label: t('total-trial') },
          { key: 'number', label: t('thing-amount', { thing: t("license") }) },
        ]}
        checkable={false}
        filterable={false}
        // order="asc"
        // orderBy="name"
        // onPageChange={(event, page) => console.log(page)}
        // onRowsPerPageChange={(event) => console.log(parseInt(event.target.value, 10))}
        // onSortChange={(isAsc, property) => console.log(isAsc, property)}
        // onKeywordSearch={(event) => console.log(event.target.value)}
        toolbarActions={[
        ]}
        rowActions={[
          { name: t('commit'), onClick: (e, row) => handleSetCommitDialog(row), icon: <CommitIcon /> },
          { name: t('transfer'), onClick: (e, row) => handleSetTransferDialog(row), icon: <Exchange />, showMenuItem: (row) => role === 1 || role === 2 },
          { name: t('require'), onClick: (e, row) => handleSetRequireDialog(row), icon: <Request />, showMenuItem: () => (role === 2 || role === 3) },
        ]}
      // dense
      />

    </Paper>
  );
}


export default MyLicense;