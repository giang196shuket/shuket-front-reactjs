import { orderList } from '../../../common/UIhelpers';
import { Formik, initialFilter, isEqual, keyTypeList, statusList, useMartsUIContext, useMemo, useSelector }  from './index'

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams, ...values };
  return newQueryParams;
};

export function MartsFilter({ isLoading }) {
  const typeMart = useSelector((state) => state.main.typeMart);

  const martsUIContext = useMartsUIContext();
  const martsUIProps = useMemo(() => {
    return {
      setQueryParams: martsUIContext.setQueryParams,
      queryParams: martsUIContext.queryParams,
    };
  }, [martsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(martsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, martsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      martsUIProps.setQueryParams(newQueryParams);
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
                    //handleSubmit();
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
                    //handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>search</b> value 
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
                  {typeMart && typeMart.map((appList) => (
                    <option key={appList.value} value={appList.code}>
                      {appList.name.en}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by type of App
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
                    <option key={statusList.code} value={statusList.code}>
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
              <div className="col-lg-1">
                <label className="checkbox  mt-2">
                  <input type="checkbox" onChange={(e) => {
                    setFieldValue("useStock", !values.useStock);
                  }} /> Use Stock
                  <span></span>
                </label>
              </div>
              <div className="col-lg-1">
                <label className="checkbox  mt-2">
                  <input type="checkbox" onChange={(e) => {
                    setFieldValue("isSyncOrder", !values.isSyncOrder);
                  }} /> Sync Order
                  <span></span>
                </label>              
              </div>
              <div className="col-lg-2 ">
                <button type="submit" className="btn btn-success mr-2" onClick={handleSubmit} disabled={isLoading}>Submit</button>
                <button type="reset" className="btn btn-secondary" onClick={() => {
                  setFieldValue("isSyncOrder", false);
                  setFieldValue("useStock", false);
                  setFieldValue("status", "");
                  setFieldValue("keywordType", "");
                  setFieldValue("keywordValue", "");
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
