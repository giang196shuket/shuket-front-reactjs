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
  useProductRegisterUIContext,
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

export function ProductRegisterFilter({ isLoading }) {
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

  const UIContext = useProductRegisterUIContext();
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
              <div className="col-lg-2">
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
                  placeholder="Filter by Image"
                  name="productNoImage"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("productNoImage", e.target.value);
                  }}
                  value={values.productNoImage}
                >
                  <option value="">All</option>
                  {statusImageList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Image
                </small>
              </div>

              <div className="col-lg-1">
                <select
                  className="form-control"
                  placeholder="Filter by Status"
                  name="status"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.status}
                >
                  <option value="">All</option>
                  {statusList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>

              <div className="col-lg-1">
                <select
                  className="form-control"
                  placeholder="Filter by Status"
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
            </div>
            <div className="form-group row">
             
                <div className="col-lg-2 ">
                  <RadioGroup
                    inline
                    name="optionCheckStock"
                    value={values.optionCheckStock}
                    onChange={(newValue, event) => {
                      setFieldValue("optionCheckStock", newValue);
                    }}
                  >
                     <Radio value="N">NONE</Radio>
                    <Radio value="U">UPPER</Radio>
                    <Radio value="D">UNDER</Radio>
                  </RadioGroup>
                  <small className="form-text text-muted">
                  <b>Filter</b> by stock value
                </small>
                </div>
                {values.optionCheckStock !== 'N' &&  <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="stockSearchValue"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.stockSearchValue}
                  onChange={(e) => {
                    setFieldValue("stockSearchValue", e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  <b>search</b> value stock
                </small>
              </div>}
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Image"
                  name="sortPrdStock"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("sortPrdStock", e.target.value);
                  }}
                  value={values.sortPrdStock}
                >
                  <option value="">All</option>
                  {statusStockList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by stock
                </small>
              </div>

              <div className="col-lg-2 ">
                <DatePicker
                  placeholder="Select date"
                  name="dateStart"
                  value={new Date(values.dateStart)}
                  onOk={(date) => {
                    console.log(date);
                    setFieldValue("dateStart", format(date, "yyyy-MM-dd"));
                  }}
                />
                <small className="form-text text-muted">
                  <b>Filter</b> by date start
                </small>
              </div>
              <div className="col-lg-2">
                <DatePicker
                  placeholder="Select date"
                  name="dateEnd"
                  value={new Date(values.dateEnd)}
                  onOk={(date) => {
                    console.log(date);
                    setFieldValue("dateEnd", format(date, "yyyy-MM-dd"));
                  }}
                />
                <small className="form-text text-muted">
                  <b>Filter</b> by date end
                </small>
              </div>
              <div className="col-lg-2 mt-3">
              <FormCheck
                size="large"
                type="checkbox"
                id={values.productOnlyBrgn}
                label={"Only product BRGN"}
                checked={values.productOnlyBrgn === "Y" ? true : false}
                onChange={(e) => {
                  setFieldValue("productOnlyBrgn", e.target.checked ? 'Y' : 'N');
                }}
              />
            </div>
            </div>
            <div>
          
            </div>
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
