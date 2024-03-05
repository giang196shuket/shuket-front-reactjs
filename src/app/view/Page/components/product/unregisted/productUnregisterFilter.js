import { useEffect, useState } from "react";
import {
  getProductCategory,
  orderList,
  DatePicker,
  Formik,
  format,
  initialFilter,
  isEqual,
  keyTypeList,
  statusImageList,
  statusList,
  useDispatch,
  useMemo,
  useProductUnregisterUIContext,
  useSelector,
  FormCheck,
  statusStockList,
  RadioGroup,
  Radio,
} from "./index";

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams, ...values };
  return newQueryParams;
};

export function ProductUnregisterFilter({ isLoading }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategory(null))
      .then((res) => {
        setCategories(res.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleFetchSubCategory = (code) => {
    dispatch(getProductCategory({ cateParent: code }))
      .then((res) => {
        setSubCategories(res.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UIContext = useProductUnregisterUIContext();
  const UIProps = useMemo(() => {
    return {
      setQueryParams: UIContext.setQueryParams,
      queryParams: UIContext.queryParams,
    };
  }, [UIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(UIProps.queryParams, values);
    if (!isEqual(newQueryParams, UIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      UIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialFilter}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-1">
                <select
                  className="form-control"
                  name="keywordType"
                  placeholder={"Filter by Type"}
                  onChange={(e) => {
                    setFieldValue("keywordType", e.target.value);
                  }}
                  onBlur={handleBlur}
                  value={values.keywordType}
                >
                  <option value="">All</option>
                  {keyTypeList.map((typeList) => (
                    <option key={typeList.value} value={typeList.value}>
                      {typeList.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Type
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="keywordValue"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.keywordValue}
                  onChange={(e) => {
                    setFieldValue("keywordValue", e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  <b>search</b> value
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by category"
                  name="categoryCode"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("categoryCode", e.target.value);
                    handleFetchSubCategory(e.target.value);
                  }}
                  value={values.categoryCode}
                >
                  <option value="">All</option>
                  {categories.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by category
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by sub category"
                  name="categorySubCode"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("categorySubCode", e.target.value);
                  }}
                  value={values.categorySubCode}
                >
                  <option value="">All</option>
                  {subCategories.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by category
                </small>
              </div>

              <div className="col-lg-1">
                <select
                  className="form-control"
                  placeholder="Filter by order"
                  name="orderBy"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("orderBy", e.target.value);
                  }}
                  value={values.orderBy}
                >
                  <option value="">All</option>
                  {orderList.map((orderList) => (
                    <option key={orderList.value} value={orderList.value}>
                      {orderList.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Order
                </small>
              </div>

              <div className="col-lg-4 ">
                <RadioGroup
                  inline
                  name="optionSearchImage"
                  value={values.optionSearchImage}
                  onChange={(newValue, event) => {
                    setFieldValue("optionSearchImage", newValue);
                  }}
                >
                  <Radio value="ALL">All case image</Radio>
                  <Radio value="N">Product unregister no image</Radio>
                  <Radio value="Y">Product unregister have image</Radio>
                </RadioGroup>
                <small className="form-text text-muted">
                  <b> Option search image</b>
                </small>
              </div>
            </div>

            <div></div>
            <div className="d-flex justify-content-center my-10">
              <button
                type="submit"
                className="btn btn-success mr-2"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={() => {
                  setFieldValue("status", "");
                  setFieldValue("keywordType", "");
                  setFieldValue("keywordValue", "");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
