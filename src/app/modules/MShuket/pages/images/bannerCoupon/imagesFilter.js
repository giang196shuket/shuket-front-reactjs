import { Formik, ImageCategories, ImageType, isEqual, keyImagesList, sortType, statusList, useImagesUIContext, useMemo, useSelector } from './index'

const prepareFilter = (queryParams, values) => {
  const { status, keyType, keyValue, appType, useStock, isSyncOrder } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? status : "";

  // Filter by condition
  filter.keyType = keyType !== "" ? keyType : '';
  filter.keyValue = keyValue !== "" ? keyValue : '';
  filter.appType = appType !== "" ? appType : '';
  if (useStock) {
    filter.useStock = 1;
  } else {
    filter.useStock = 0;
  }
  if (isSyncOrder) {
    filter.isSyncOrder = 1;
  } else {
    filter.isSyncOrder = 0;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ImagesFilter({ listLoading }) {
  const typeMart = useSelector((state) => state.main.typeMart);

  // Products UI Context
  const UIContext = useImagesUIContext();
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
          status: "", // values => All=""/Selling=0/Sold=1
          keyType: "", // values => All=""/New=0/Used=1
          keyValue: "",
          appType: "",
          useStock: false,
          isSyncOrder: false
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
              <div className="col-lg-2 offset-md-2">
                <select
                  className="form-control"
                  name="keyType"
                  placeholder={"Filter by Type"}
                  onChange={(e) => {
                    setFieldValue("keyType", e.target.value);
                    //handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.keyType}
                >
                  <option value="">All</option>
                  {keyImagesList.map((typeList) => (
                    <option key={typeList.value} value={typeList.value}>
                      {typeList.text}
                    </option>
                  ))}

                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by name
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="keyValue"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.keyValue}
                  onChange={(e) => {
                    setFieldValue("keyValue", e.target.value);
                    //handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Filter</b> value of Type
                </small>
              </div>
              
              <div className="col-lg-2">
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
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="appType"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("appType", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.appType}
                >
                  <option value="">All</option>
                  {ImageType.map((type) => (
                    <option key={type.value} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by type 
                </small>
              </div>
            </div>
            <div className="form-group row">
          
            <div className="col-lg-2  offset-md-2">
                <select
                  className="form-control"
                  placeholder="Filter by sort"
                  name="sort"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("sort", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.appType}
                >
                  <option value="">All</option>
                  {sortType.map((type) => (
                    <option key={type.value} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by sort 
                </small>
              </div>
              <div className="col-lg-2  ">
                <select
                  className="form-control"
                  placeholder="Filter by sort"
                  name="sort"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("sort", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.appType}
                >
                  <option value="">All</option>
                  {ImageCategories.map((type) => (
                    <option key={type.value} value={type.code}>
                      {type.cate_name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by category 
                </small>
              </div>
              <div className="col-lg-2 ">
                <button type="reset" className="btn btn-success mr-2" onClick={handleSubmit}>Submit</button>
                <button type="reset" className="btn btn-secondary" onClick={() => {
                  setFieldValue("isSyncOrder", false);
                  setFieldValue("useStock", false);
                  setFieldValue("status", "");
                  setFieldValue("keyType", "");
                  setFieldValue("keyValue", "");
                  setFieldValue("appType", "");
                  handleSubmit();
                }}>Cancel</button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
