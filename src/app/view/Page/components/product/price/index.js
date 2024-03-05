import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../module/partials/controls";
import { injectIntl } from "react-intl";
import { useProductPriceUIContext } from "./productPriceUIContext";
import ProductPriceTable from "./productPriceTable";
import { useEffect, useState } from "react";
import SwitchesCustom from "../common/Switches";

import { ProductPriceUIProvider } from "./productPriceUIContext";
import ProductPriceCart from "./productPriceCart";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  toAbsoluteUrl,
} from "../../../../../../module/helpers";
import { Pagination } from "../../../../../../module/partials/controls";
import { createContext, useContext, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./helper/UIHelper";

import {
  ViewDetail,
  getProductPriceList,
  productStockStatus,
  searchProductImages,
  setMaxMinProduct,
  updateStockItem,
} from "../../../redux/product/Thunk";
import { Button, Form, Modal } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { LinearProgress, TextField } from "@material-ui/core";
import { defaultSorted, sizePerPageList, orderList } from "../../../common/UIhelpers";
import { Formik } from "formik";
import { keyTypeList, statusList, statusImageList, statusStockList, keyTypeImageProductList, keyTypeImage} from './helper/UIHelper'
import { initailFilterImgProduct } from '../common/UIHelper'

import DatePicker from "rsuite/DatePicker";
import { format } from "date-fns";
import { getProductCategory } from '../../../redux/product/Thunk';
import { FormCheck } from "react-bootstrap";
import Radio from "rsuite/Radio";
import RadioGroup from "rsuite/RadioGroup";
import TagsInput from "react-tagsinput";
import { findMaxId } from "../../../common/funtion";
import { updateProduct } from "../../../redux/product/Thunk";
import { toast } from "react-toastify";

export {
  ActionsColumnFormatter,
  toast,
  findMaxId,
  updateProduct,
  keyTypeImage,
  initailFilterImgProduct,
  keyTypeImageProductList,
  TagsInput,
  Radio ,RadioGroup,
  statusStockList,
  FormCheck,
  getProductCategory,
  orderList,
  DatePicker,format,
  keyTypeList,
  statusImageList,
  Formik,
  statusList,
  SwitchesCustom,
  ViewDetail,
  getProductPriceList,
  productStockStatus,
  searchProductImages,
  setMaxMinProduct,
  updateStockItem,
  Button,
  Form,
  Modal,
  SVG,
  LinearProgress,
  TextField,
  defaultSorted,
  sizePerPageList,
  useMemo,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  injectIntl,
  useProductPriceUIContext,
  ProductPriceTable,
  useEffect,
  useState,
  ProductPriceUIProvider,
  ProductPriceCart,
  shallowEqual,
  useDispatch,
  useSelector,
  BootstrapTable,
  paginationFactory,
  PaginationProvider,
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  toAbsoluteUrl,
  Pagination,
  createContext,
  useContext,
  useCallback,
  isEqual,
  isFunction,
  initialFilter,
}
