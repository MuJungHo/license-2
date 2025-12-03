import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Paper, Button } from "../../components/common";
import { useHistory } from "react-router-dom";

import {
  BorderColorSharp,
  Send,
  AddBox,
  Details,
  Assignment,
  Check,
  Close
} from '@material-ui/icons';
import { Download, Verified, Link, LinkOff, Filter } from "../../images/icons";
import SEMData from "../../components/License/SEMData";
import Dispatch from "../../components/License/Dispatch";
import moment from "moment";
const SEMList = () => {
  const { t, openDialog, authedApi, openSnackbar, closeDialog, openWarningDialog } = useContext(GlobalContext);
  const { role, accountid } = useContext(AuthContext);
  
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "datetime",
    keyword: "",
    limit: 10,
    page: 1,
  });
  const history = useHistory();
  const [products, setProducts] = React.useState([])

  const getList = async () => {
    const { result, total } = await authedApi.getSEMList({
      data: {
      },
      ...filter
    })
    let _products = result.map(p => {
      const _data = JSON.parse(p.data);
      const _products = _data.products || [];
      const _product = _products[0] || {};
      const _partNo = _product.partNo || '';
      const _amount = _product.qty || '';
      return ({
        ...p,
        _id: p.semid,
        _status: t(p.status === 0 ? 'pending' : 'dispatched'),
        _orderNumber: _data.orderNumber || '',
        _partnumber: _partNo,
        _amount: _amount,
        _commercial: _data.licenseMode === 0 && <Verified />,
        _data: <Button onClick={e => handleOpenDataDialog(e, p.data)}><Assignment /></Button>,
        _dispatch_time: p.dispatch_time && moment(p.dispatch_time).format("YYYY-MM-DD HH:mm:ss"),
        _accept_time: p.accept_time && moment(p.accept_time).format("YYYY-MM-DD HH:mm:ss"),
        _createtime: p.createtime && moment(p.createtime).format("YYYY-MM-DD HH:mm:ss")
      })
    })
    setProducts(_products)
    setTotal(total)
  }

  React.useEffect(() => {
    getList()
  }, [filter])


  const handleOpenAcceptDialog = (e, sem) => {
    e.stopPropagation();
    openWarningDialog({
      title: t("accept-confirmation"),
      message: t("accept-confirm-message"),
      onConfirm: () => handleAccept(sem)
    })
  }

  const handleAccept = async (sem) => {
    await authedApi.putAcceptSEM({ data: { semid: sem.semid } })
    getList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("accept") })
    })
  }

  const handleOpenRejectDialog = (e, sem) => {
    e.stopPropagation();
    openWarningDialog({
      title: t("reject-confirmation"),
      message: t("reject-confirm-message"),
      onConfirm: () => handleReject(sem)
    })
  }

  const handleReject = async (sem) => {
    await authedApi.putRejectSEM({ data: { semid: sem.semid } })
    getList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("reject") })
    })
  }

  const handleOpenDispatchDialog = (e, sem) => {
    e.stopPropagation();
    openDialog({
      title: t("dispatch"),
      section: <Dispatch onConfirm={(state) => handleDispatch(state, sem)} />,
    })
  }

  const handleDispatch = async (state, sem) => {
    await authedApi.putDispatchSEM({ data: { semid: sem.semid, to_accountid: state.to_accountid } })
    getList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("dispatch") })
    })
  }

  const handleOpenDataDialog = (e, data) => {
    e.stopPropagation();
    openDialog({
      title: t('detail'),
      section: <SEMData data={data} />
    })
  }

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("SEM") })}
        rows={products}
        columns={[
          { key: '_orderNumber', label: t('orderNumber') },
          { key: '_partnumber', label: t('partnumber') },
          { key: '_commercial', label: t('commercial') },
          { key: '_amount', label: t('amount') },
          { key: '_status', label: t('status') },
          { key: '_createtime', label: t('createtime') },
          { key: '_data', label: t('detail') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onSearchClick={getList}
        onClearClick={() => setFilter({
          order: "desc",
          sort: "datetime",
          keyword: "",
          limit: 10,
          page: 1,
        })}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 1, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[]}
        rowActions={[
          { name: t('dispatch'), showMenuItem: (row) => row.status === 0 && role < 3, onClick: (e, row) => handleOpenDispatchDialog(e, row), icon: <Send /> },
          { name: t('accept'), showMenuItem: (row) => row.status === 0 && row.dispatch_to === accountid, onClick: (e, row) => handleOpenAcceptDialog(e, row), icon: <Check /> },
          { name: t('reject'), showMenuItem: (row) => row.status === 0 && row.dispatch_to === accountid, onClick: (e, row) => handleOpenRejectDialog(e, row), icon: <Close /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default SEMList;