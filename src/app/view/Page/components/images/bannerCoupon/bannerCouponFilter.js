import { Formik, ImageCategories, ImageType, isEqual, keyImagesList, orderList, statusList, useBannerCouponUIContext, useMemo, useSelector } from './index'

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams,...values };
  return newQueryParams;
};

export function BannerCouponFilter({ isLoading }) {

  // Products UI Context
  const UIContext = useBannerCouponUIContext();
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
          orderBy: "",
          imageType:"",
          imageCategory:""
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
                  <b>Search</b> value
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
                  name="imageType"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("imageType", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.imageType}
                >
                  <option value="">All</option>
                  {ImageType.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.text}
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
                  name="orderBy"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("orderBy", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.orderBy}
                >
                  <option value="">All</option>
                  {orderList.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.text}
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
                  placeholder="Filter by imageCategory"
                  name="imageCategory"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("imageCategory", e.target.value);
                    //handleSubmit();
                  }}
                  value={values.imageCategory}
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
                   setFieldValue("keywordType", "");
                   setFieldValue("keywordValue", "");
                   setFieldValue("status", "");
                   setFieldValue("orderBy", "");
                   setFieldValue("imageType", "");
                   setFieldValue("imageCategory", "");
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
