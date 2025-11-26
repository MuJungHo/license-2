import User from '../Views/User';
import ProductList from '../Views/License/ProductList';
import TransactionList from '../Views/License/TransactionList';
import Product from '../Views/License/Product';
import MyProduct from '../Views/License/MyProduct';
import SEM from '../Views/License/SEM';
import Log from '../Views/Log';
import Department from '../Views/Department';


import {
  ManageAccount,
  License as LicenseIcon,
  Group
} from "../images/icons";
import AssignmentIcon from '@material-ui/icons/Assignment';

const routes = [
  {
    path: "",
    name: "_license",
    icon: LicenseIcon,
    sider: true,
    children: [
      { name: "_transaction-list", path: "/transaction-list", roles: [1, 2, 3] },
      { name: "_product-list", path: "/product-list", roles: [1] },
      { name: "_product-me", path: "/product-me", roles: [1, 2, 3] },
      { name: "_sem", path: "/sem", roles: [1, 2, 3] },
    ],
    roles: [1, 2, 3]
  },
  {
    path: "/department",
    name: "_department",
    component: Department,
    icon: Group,
    sider: true,
    roles: [1]
  },
  {
    path: "/account",
    name: "_account",
    component: User,
    icon: ManageAccount,
    sider: true,
    roles: [1, 2, 3]
  },
  {
    path: "/log",
    name: "_log",
    component: Log,
    icon: AssignmentIcon,
    sider: true,
    roles: [1]
  },
  {
    path: '/product-list',
    component: ProductList,
    roles: [1, 2, 3]
  },
  {
    path: '/transaction-list',
    component: TransactionList,
    roles: [1, 2]
  },
  {
    path: '/product/:productid',
    component: Product,
    roles: [1, 2]
  },
  {
    path: '/product-me',
    component: MyProduct,
    roles: [1, 2, 3]
  },
  {
    path: '/sem',
    component: SEM,
    roles: [1, 2, 3]
  }
]

export default routes