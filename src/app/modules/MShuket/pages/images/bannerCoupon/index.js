import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./helperTable/UIHelper";
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
} from "../../../../../../services/helpers";
import { Pagination } from "../../../../../../services/partials/controls";
import { useImagesUIContext } from "./imagesUIContext";
import { getImageBannerCoupon } from "../../../redux/images/Thunk";
import { ActionsColumnFormatter } from "./helperTable/ActionsColumnFormatter";
import { defaultSorted, sizePerPageList } from "../../../Helpers/UIhelpers";

import { Formik } from "formik";

import {
  ImageCategories,
  ImageType,
  keyImagesList,
} from "./helperTable/UIHelper";
import { sortType, statusList } from "../../../Helpers/UIhelpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../services/partials/controls";

import ImagesTable from "./imagesTable";
import { ImagesGrouping } from "./imagesGrouping";
import { ImagesFilter } from "./imagesFilter";

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
  ImagesTable,
  ImagesGrouping,
  ImagesFilter,
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
  useImagesUIContext,
  getImageBannerCoupon,
  ActionsColumnFormatter,
  defaultSorted,
  sizePerPageList,
};
