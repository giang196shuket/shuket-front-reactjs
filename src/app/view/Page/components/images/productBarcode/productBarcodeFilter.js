import {
  Formik,
  isEqual,
  keyImagesList,
  statusList,
  useProductBarcodeUIContext,
  useMemo,
  DatePicker,
  format,
  orderList,
} from "./index";

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams, ...values };
  return newQueryParams;
};

export function ProductBarcodeFilter({ listLoading }) {
  // Products UI Context
  const UIContext = useProductBarcodeUIContext();
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
        initialValues={{
          status: "",
          keywordType: "",
          keywordValue: "",
          dateStart: "",
          dateEnd: "",
          orderBy: ""
        }}
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
                  placeholder={"Filter by tag, code, name"}
                  onChange={(e) => {
                    setFieldValue("keywordType", e.target.value);
                    //handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.keywordType}
                >
                  <option value="">All</option>
                  {keyImagesList.map((typeList) => (
                    <option key={typeList.value} value={typeList.value}>
                      {typeList.text}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by tag
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
                    //handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Filter</b> value of Type
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
                  {statusList.map((statusList) => (
                    <option key={statusList.value} value={statusList.value}>
                      {statusList.text}
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
                    //handleSubmit();
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
              <div className="col-lg-6 form-group row">
                <div className="col-lg-4">
                  <DatePicker
                    format="yyyy-MM-dd"
                    placeholder="Select date"
                    name="dateStart"
                    // value={values.dateStart}
                    onChange={(date) => {
                      setFieldValue("dateStart", format(date, "yyyy-MM-dd"));
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Filter</b> value of Type
                  </small>
                </div>

                <div className="col-lg-4">
                  <DatePicker
                    format="yyyy-MM-dd"
                    placeholder="Select date"
                    name="dateEnd"
                    // value={values.dateEnd}
                    onChange={(date) => {
                      setFieldValue("dateEnd", format(date, "yyyy-MM-dd"));
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Filter</b> value of Type
                  </small>
                </div>
                <div className="col-lg-4  form-group row ">
                  <button
                    type="reset"
                    className="btn btn-success col-lg-5"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <p className="col-lg-1"></p>
                  <button
                    type="reset"
                    className="btn btn-secondary col-lg-5"
                    onClick={() => {
                      setFieldValue("keywordType", "");
                      setFieldValue("keywordValue", "");
                      setFieldValue("status", "");
                      handleSubmit();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
