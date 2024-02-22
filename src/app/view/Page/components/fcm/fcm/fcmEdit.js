
import { Card, CardBody, CardHeader, CardHeaderToolbar, FormattedMessage, Formik, LayoutSplashScreen, shallowEqual, useEffect, useRef, useSelector, useState } from './index'

export function FcmEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const [title, setTitle] = useState("");


  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { isLoading } = useSelector(
    (state) => ({
      isLoading: state.fcm.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      // await dispatch(fetchMart(id));
    };
    fetchData().catch(console.error);
  }, []);

  const save = (values) => {
    console.log("save", values);
    // if (!id) {
    //   dispatch(actions.createProduct(values)).then(() => backToProductsList());
    // } else {
    //   dispatch(actions.updateProduct(values)).then(() => backToProductsList());
    // }
  };

  const btnRef = useRef();
  const saveClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToMartList = () => {
    history.push(`/m-shuket/MOA%20SERVICE/service/fcm-management`);
  };
  return (
    <Card>
      {isLoading && <LayoutSplashScreen />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToMartList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Formik
          enableReinitialize={true}
          // initialValues={mart}
          // validationSchema={ProductEditSchema}
          onSubmit={(values) => {
            save(values);
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <>
              <div className="row mb-5">
                <label className="col-form-label col-lg-1 col-sm-12 ">
                  FCM NAME
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="fcm_name"
                    placeholder="Search"
                    value={values?.fcm_name}
                    onChange={(e) => {
                      setFieldValue("fcm_name", e.target.value);
                    }}
                  />
                  {errors.fcm_name ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.fcm_name}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
              </div>
              <div className="row mb-5 ">
                <label className="col-form-label  col-lg-1 col-sm-12 ">
                  FCM KEY
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="fcm_key"
                    placeholder="Fcm key"
                    value={values?.fcm_key}
                    onChange={(e) => {
                      setFieldValue("fcm_key", e.target.value);
                    }}
                  />
                  {errors.fcm_key ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.fcm_key}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
              </div>

              <div className="row">
                <label className="col-form-label  col-lg-1 col-sm-12">
                  Upload file :
                </label>
                <input
                  className="form-control form-control-sm col-lg-2 col-sm-12"
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    setFieldValue("file", e.target.files[0]);
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary col-form-label mt-5"
              >
                Edit Fcm
              </button>
            </>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
