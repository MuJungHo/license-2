import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Paper } from "../../components/common";
import { useHistory } from "react-router-dom";

import {
  BorderColorSharp,
  Delete,
  AddBox,
} from '@material-ui/icons';
import ProductSection from "../../components/License/ProductSection";

const LicenseList = () => {
  const { t, openDialog, authedApi, openSnackbar, closeDialog, openWarningDialog } = useContext(GlobalContext);
  const { role } = useContext(AuthContext);
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

  const getProductList = useCallback(async () => {
    const { result, total } = await authedApi.getProductList({
      data: {
      },
      ...filter
    })
    let _products = result.map(p => ({ ...p, _id: p.productid }))
    setProducts(_products)
    setTotal(total)
  }, [authedApi])

  React.useEffect(() => {
    getProductList()
  }, [getProductList])


  // const getProductList = async () => {
  //   const { result, total } = await authedApi.getProductList({
  //     data: {
  //     },
  //     ...filter
  //   })
  //   let _products = result.map(p => ({ ...p, _id: p.productid }))
  //   setProducts(_products)
  //   setTotal(total)
  // }

  const openAddProductDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("product") }),
      section: <ProductSection onConfirm={handleAddProduct} />
    })
  }

  const handleAddProduct = async (product) => {
    await authedApi.postAddProduct({ data: { ...product } })
    getProductList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteProduct = async (product) => {
    await authedApi.deleteProduct({ productid: product.productid })
    getProductList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (product) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: product.name }),
      onConfirm: () => handleDeleteProduct(product)
    })
  }

  return (
    <Paper>
      <Table
        title={t("thing-list", { thing: t("product") })}
        rows={products}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
          { key: 'partnumber', label: t('partnumber') },
        ]}
        checkable={role === 1}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onSearchClick={getProductList}
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
        toolbarActions={role === 1 ? [
          { name: t('add'), onClick: openAddProductDialog, icon: <AddBox /> },
        ] : []}
        rowActions={role === 1 ? [
          { name: t('edit'), onClick: (e, row) => { history.push(`/product/${row._id}`) }, icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ] : []}
      // dense
      />
    </Paper>
  );
}


export default LicenseList;