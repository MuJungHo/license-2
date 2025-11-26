import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Table, Paper,
  DialogContent,
  DialogActions,
  Button
} from "../../components/common";

// import {
//   ConfirmationNumber,
//   GetApp
// } from '@material-ui/icons';

import { CheckCircleOutline, BlockRounded } from '@material-ui/icons';
import Generator from "../../components/License/Generator";
import {
  TRANSACTION_STATUS
} from "../../utils/constant";
import { Download, Verified, Link, LinkOff, Filter } from "../../images/icons";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import moment from "moment";

// Status : 1 (require) Status : 2 (approve) Status : 3 (reject) Status : 4 (transfer) Status : 5 (commit)

const DialogSection = ({
  status = [],
  onConfirm = () => { }
}) => {
  const [state, setState] = React.useState(status);
  const { closeDialog, t } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        style={{
          width: 500
        }}>

        <FormControl fullWidth>
          <InputLabel>{t("status")}</InputLabel>
          <Select
            value={state}
            multiple
            onChange={e => setState(e.target.value)}
          >
            {
              Object.keys(TRANSACTION_STATUS)
                .map(status => <MenuItem
                  key={status}
                  value={Number(status)}>{t(`_${TRANSACTION_STATUS[status]}`)}
                </MenuItem>)
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>)
}

const LicenseList = () => {
  const md5 = require("md5");

  const { t, authedApi, openSnackbar, openDialog, closeDialog, openWarningDialog } = useContext(GlobalContext);
  const { role, token, selectedDepid } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "createtime",
    keyword: "",
    limit: 10,
    page: 1,
    data: {
      status: []
    }
  });

  const [transactions, setTransactions] = React.useState([]);

  const getLicenseTransactionList = useCallback(async () => {
    const { result, total } = await authedApi.getLicenseTransactionList({
      // data: {
      //   status: [1, 2, 3, 4]
      // },
      ...filter
    })
    let _transactions = result.map(p => ({
      ...p,
      _id: p.ltid,
      _status: t(`_${TRANSACTION_STATUS[p.status]}`),
      _commercial: p.commercial ? <Verified /> : null,
      createtime: moment(p.createtime).format("YYYY-MM-DD HH:mm:ss")
    }))
    setTransactions(_transactions)
    setTotal(total)
  }, [filter, selectedDepid])

  React.useEffect(() => {
    getLicenseTransactionList()
  }, [getLicenseTransactionList])

  const handleApproveLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseApprove({ data: {}, ltid })
    getLicenseTransactionList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("approve") })
    })
  }

  const handleRejectLicense = async (row) => {
    const ltid = row.ltid;
    await authedApi.postLicenseReject({ data: {}, ltid })
    getLicenseTransactionList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("reject") })
    })
  }

  const handleBindDialog = (row) => {
    // console.log(row)
    openDialog({
      title: `${t("bind")} ${row.product_name}`,
      section: <Generator isCommercial={row.commercial === 1} onConfirm={params => handleBindLicense(params, row.ltid)} productid={row.productid} />
    })
  }

  const handleBindLicense = async (params, ltid) => {
    await authedApi.postLicenseBind({ data: { ...params }, ltid })
    closeDialog()
    getLicenseTransactionList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("bind") })
    })
  }

  const handleDownloadLicense = async (ltid) => {

    const host = process.env.NODE_ENV === 'production' ? "" : `http://${process.env.REACT_APP_HOST}`
    const timestamp = Date.now()
    const sign = md5(timestamp + '#' + token)
    const url = `${host}/cgi-bin/db/license/download?timestamp=${timestamp}&sign=${sign}&ltid=${ltid}`

    window.open(url);
  }

  const handleUnBindLicense = async row => {
    const ltid = row.ltid;
    await authedApi.postLicenseUnBind({ ltid })
    getLicenseTransactionList()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("unbind") })
    })
  }

  const handleOpenUnbindLicense = row => {
    openWarningDialog({
      title: t("unbind-confirmation"),
      message: t("unbind-thing-confirm", { thing: row.product_name, number: row.number }),
      onConfirm: () => handleUnBindLicense(row)
    })
  }

  const handleOpenFilterDialog = () => {
    openDialog({
      title: t("filter"),
      section: <DialogSection
        status={filter.data.status}
        onConfirm={handleChangeFilter} />
    })
  }

  const handleChangeFilter = (status) => {
    setFilter({
      ...filter,
      data: {
        status: [...status]
      }
    })
    closeDialog()
  }

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("transaction") })}
        rows={transactions}
        columns={[
          { key: 'createtime', label: t('createtime') },
          { key: 'consumer_name', label: t('consumer') },
          { key: 'provider_name', label: t('provider') },
          { key: 'product_name', label: t('product') },
          { key: 'number', label: t('count') },
          { key: 'description', label: t('description') },
          { key: '_commercial', label: t('commercial') },
          { key: '_status', label: t('status') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        toolbarFilters={
          <Button color={filter.data.status.length > 0 ? "primary" : "default"} onClick={handleOpenFilterDialog} >
            <Filter />
          </Button>
        }
        onSearchClick={getLicenseTransactionList}
        onClearClick={() => setFilter({
          order: "desc",
          sort: "createtime",
          keyword: "",
          limit: 10,
          page: 1,
          data: {
            status: []
          }
        })}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 1, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        rowActions={[
          { name: t('approve'), onClick: (e, row) => handleApproveLicense(row), icon: <CheckCircleOutline />, showMenuItem: (row) => row.status === 1 && (role === 1 || role === 2) },
          { name: t('reject'), onClick: (e, row) => handleRejectLicense(row), icon: <BlockRounded />, showMenuItem: (row) => row.status === 1 && (role === 1 || role === 2) },
          { name: t('bind'), onClick: (e, row) => handleBindDialog(row), icon: <Link />, showMenuItem: (row) => row.status === 5 },
          { name: t('unbind'), onClick: (e, row) => handleOpenUnbindLicense(row), icon: <LinkOff />, showMenuItem: (row) => row.status === 6 },
          { name: t('download'), onClick: (e, row) => handleDownloadLicense(row.ltid), icon: <Download />, showMenuItem: (row) => row.status === 6 },
        ]}
      // dense
      />
    </Paper>
  );
}


export default LicenseList;