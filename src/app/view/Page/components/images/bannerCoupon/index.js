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
import { useBannerCouponUIContext } from "./bannerCouponUIContext";
import { getImageBannerCoupon } from "../../../redux/images/Thunk";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter";
import { defaultSorted, sizePerPageList } from "../../../common/UIhelpers";

import { Formik } from "formik";
import SwitchesCustom from "./helper/Switches"

import {
  ImageCategories,
  ImageType,
  keyImagesList,
} from "./helper/UIHelper";
import { orderList, statusList } from "../../../common/UIhelpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../module/partials/controls";

import BannerCouponTable from "./bannerCouponTable";
import { BannerCouponGrouping } from "./bannerCouponGrouping";
import { BannerCouponFilter } from "./bannerCouponFilter";

import {
  addImagesCouponBanner,
  getCatesImages,
} from "../../../redux/images/Thunk";

export {
  Formik,SwitchesCustom,
  ImageCategories,
  ImageType,
  keyImagesList,
  orderList,
  statusList,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  BannerCouponTable,
  BannerCouponGrouping,
  BannerCouponFilter,
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
  useBannerCouponUIContext,
  getImageBannerCoupon,
  ActionsColumnFormatter,
  defaultSorted,
  sizePerPageList,
};
