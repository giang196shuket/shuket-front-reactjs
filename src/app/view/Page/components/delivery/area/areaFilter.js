import { Formik, isEqual, useAreaUIContext, useMemo } from './index'

const prepareFilter = (queryParams, values) => {
  const { status, keyType, keyValue, appType, useStock, isSyncOrder } = values;
  const newQueryParams = { ...queryParams };
  return newQueryParams;
};

export function AreaFilter({ listLoading }) {

  const UIContext = useAreaUIContext();
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
            
          </form>
        )}
      </Formik>
    </>
  );
}
