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

import DepSection from "../components/Department/DepSection";

const Department = () => {
  const { t, openDialog, closeDialog, authedApi, openSnackbar, openWarningDialog } = useContext(GlobalContext);
  const { role, accountid } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "datetime",
    keyword: "",
    limit: 10,
    page: 1,
  });

  const [depList, setDepList] = React.useState([]);

  const getDepartmentList = useCallback(async () => {
    const { result, total } = await authedApi.getDepartmentList({
      data: {
      },
      ...filter
    })
    let _accountList = result.map(p => {
      return ({
        ...p, _id: p.depid,
        _count: p.account.length
      })
    })
    setDepList(_accountList)
    setTotal(total)
  }, [filter])

  React.useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])

  const openEditDepartmentDialog = (department) => {
    openDialog({
      title: t("edit-thing", { thing: t("department") }),
      section: <DepSection onConfirm={handleEditDepartment} department={department} />
    })
  }

  const openAddUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("department") }),
      section: <DepSection onConfirm={handleAddDepartment} />
    })
  }

  const handleEditDepartment = async (department) => {

    await authedApi.postEditDepartment({
      data: {
        ...department,
      }
    })
    getDepartmentList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddDepartment = async (department) => {

    await authedApi.postAddDepartment({
      data: {
        ...department
      }
    })
    getDepartmentList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteDepartment = async department => {
    await authedApi.deleteAccount({ accountid: department.accountid })
    getDepartmentList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (department) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: department.name }),
      onConfirm: () => handleDeleteDepartment(department)
    })
  }

  return (
    <Paper>
      <Table
        title={t("thing-management", { thing: t("department") })}
        rows={depList}
        columns={[
          { key: 'name', label: t('name') },
          { key: '_count', label: t('count') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onSearchClick={getDepartmentList}
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
          { name: t('edit'), onClick: (e, row) => openEditDepartmentDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ] : [
          { name: t('edit'), onClick: (e, row) => openEditDepartmentDialog(row), icon: <BorderColorSharp />, showMenuItem: (row) => row.accountid === accountid },
        ]}
      // dense
      />
    </Paper>
  );
}


export default Department;