import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  Paper,
} from "../components/common";

import {
  BorderColorSharp,
  Delete,
  AddBox,
} from '@material-ui/icons';

// import {
//   Select,
//   MenuItem
// } from '@material-ui/core';

import { getKey } from '../utils/apis';
import UserSection from "../components/User/UserSection";
const CryptoJS = require("crypto-js");

const getAESEncrypt = async (txt) => {
  const timestamp = Date.now();
  const { secretkey } = await getKey({ timestamp });
  const cipher = CryptoJS.AES.encrypt(
    txt,
    CryptoJS.enc.Utf8.parse(secretkey),
    {
      iv: CryptoJS.enc.Utf8.parse(""),
      mode: CryptoJS.mode.ECB
    }
  )
  return cipher.toString()
}

const User = () => {
  const { t, openDialog, closeDialog, authedApi, openSnackbar, openWarningDialog } = useContext(GlobalContext);
  const { role, accountid, selectedDepid } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "datetime",
    keyword: "",
    limit: 10,
    page: 1,
  });

  const [accountList, setAccountList] = React.useState([]);

  const getAccountList = useCallback(async () => {
    const { result, total } = await authedApi.getAccountList({
      data: {
        depid: [selectedDepid]
      },
      ...filter
    })
    let _accountList = result.map(p => {
      let _access_depids = p.departments.map(d => d.depid);
      let _access_productids = p.products.map(d => d.productid);
      let _department = p.departments.map(d => d.name).join(', ');

      return ({
        ...p, _id: p.accountid,
        access_depids: _access_depids,
        access_productids: _access_productids,
        departments: _access_depids,
        products: _access_productids,
        _department: _department
      })
    })
    setAccountList(_accountList)
    setTotal(total)
  }, [filter, selectedDepid])

  React.useEffect(() => {
    if (!selectedDepid) return
    getAccountList()
  }, [getAccountList, selectedDepid])

  const openEditUserDialog = (user) => {
    openDialog({
      title: t("edit-thing", { thing: t("account") }),
      section: <UserSection onConfirm={handleEditUserAccount} user={user} />
    })
  }

  const openAddUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("account") }),
      section: <UserSection onConfirm={handleAddUserAccount} />
    })
  }

  const handleEditUserAccount = async (user) => {
    // return console.log(user)
    let data = { ...user }

    if (data.password) data.password = await getAESEncrypt(data.password)
    else delete data.password;
    delete data._id;
    delete data.access_depids;
    delete data.access_productids;
    delete data._department;

    await authedApi.postEditAccount({ data })
    getAccountList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddUserAccount = async (user) => {

    const aesEncryptPassword = await getAESEncrypt(user.password);
    const departments = user.roleid === 3 ? [selectedDepid] : user.departments;

    await authedApi.postAddAccount({
      data: {
        ...user,
        departments,
        password: aesEncryptPassword,
        selected_depid: selectedDepid
      }
    })
    getAccountList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteAccount = async user => {
    await authedApi.deleteAccount({ accountid: user.accountid })
    getAccountList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (user) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: user.name }),
      onConfirm: () => handleDeleteAccount(user)
    })
  }

  return (
    <Paper>
      <Table
        title={t("thing-management", { thing: t("account") })}
        rows={accountList}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'email', label: t('email') },
          { key: '_department', label: t('department') },
          { key: 'rolename', label: t('rolename') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onSearchClick={getAccountList}
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
        toolbarActions={role === 1 || role === 2 ? [
          { name: t('add'), onClick: openAddUserDialog, icon: <AddBox /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('edit'), onClick: (e, row) => openEditUserDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ] : [
          {
            name: t('edit'),
            onClick: (e, row) => openEditUserDialog(row),
            icon: <BorderColorSharp />, 
            showMenuItem: (row) => row.accountid === accountid || (row.roleid === 2 || row.roleid === 3)
          },
        ]}
      // dense
      />
    </Paper>
  );
}


export default User;