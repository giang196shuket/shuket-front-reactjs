import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./helper/UIHelper";
import { injectIntl } from "react-intl";
import { useEffect, useMemo } from "react";

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
} from "../../../../../../module/helpers";
import { Pagination } from "../../../../../../module/partials/controls";
import { useProductNoBarcodeUIContext } from "./productNoBarcodeUIContext";
import { getListImagesWithoutBarcode } from "../../../redux/images/Thunk";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter";
import { defaultSorted, sizePerPageList } from "../../../common/UIhelpers";

import { Formik } from "formik";

import {
  ImageCategories,
  ImageType,
  keyImagesList,
} from "./helper/UIHelper";
import { sortType, statusList } from "../../../common/UIhelpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../module/partials/controls";

import ProductNoBarcodeTable from "./productNoBarcodeTable";
import { ProductNoBarcodeGrouping } from "./productNoBarcodeGrouping";
import { ProductNoBarcodeFilter } from "./productNoBarcodeFilter";

import {
  addImagesCouponBanner,
  getCatesImages,
} from "../../../redux/images/Thunk";

export {
  Formik,
  ImageCategories,
  ImageType,
  keyImagesList,
  sortType,
  statusList,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ProductNoBarcodeTable,
  ProductNoBarcodeGrouping,
  ProductNoBarcodeFilter,
  addImagesCouponBanner,
  getCatesImages,
  createContext,
  useContext,
  useState,
  useCallback,
  isEqual,
  isFunction,
  initialFilter,
  injectIntl,
  useEffect,
  useMemo,
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
  Pagination,
  useProductNoBarcodeUIContext,
  getListImagesWithoutBarcode,
  ActionsColumnFormatter,
  defaultSorted,
  sizePerPageList,
};
