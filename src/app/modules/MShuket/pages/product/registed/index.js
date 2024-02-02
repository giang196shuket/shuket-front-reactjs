import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../services/partials/controls";
import { injectIntl } from "react-intl";
import { useProductUIContext } from "./productUIContext";
import ProductTable from "./productTable";
import { useEffect, useState } from "react";

import { ProductUIProvider } from "./productUIContext";
import ProductCart from "./productCart";

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
} from "../../../../../../services/helpers";
import { Pagination } from "../../../../../../services/partials/controls";
import { createContext, useContext, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./helperTable/UIHelper";

import {
  ViewDetail,
  getProductRegisterList,
  productStockStatus,
  searchProductImages,
  setMaxMinProduct,
  updateStockItem,
} from "../../../redux/product/Thunk";
import { Button, Form, Modal } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { LinearProgress, TextField } from "@material-ui/core";
import { defaultSorted, sizePerPageList } from "../../../Helpers/UIhelpers";

export {
  ViewDetail,
  getProductRegisterList,
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
  useProductUIContext,
  ProductTable,
  useEffect,
  useState,
  ProductUIProvider,
  ProductCart,
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
};
