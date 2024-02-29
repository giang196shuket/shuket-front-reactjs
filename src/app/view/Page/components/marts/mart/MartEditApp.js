import React from "react";
import {
  getFcmOptions,
  Form,
  Formik,
  useSelector,
  useDispatch,
  useEffect,
} from "./index";

export const MartEditApp = ({ isLoading, mart, btnRef, saveProduct }) => {
  const fcmOptions = useSelector((state) => state.fcm.fcmOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getFcmOptions());
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      {" "}
      <Formik
        enableReinitialize={true}
        initialValues={mart}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Android FCM key
                </label>
                <div className="col-lg-2">
                  <select
                    disabled
                    className="form-control"
                    name="push_key_android"
                    value={values.push_key_android}
                    onChange={(e) => {
                      //   setFieldValue("push_key_android", e.target.value);
                    }}
                  >
                    {fcmOptions?.map((item, index) => (
                      <option key={index} value={item.fcm_code}>
                        {item.fcm_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  IOS FCM key
                </label>
                <div className="col-lg-2">
                  <select
                    disabled
                    className="form-control"
                    name="push_key_ios"
                    value={values.push_key_ios}
                    onChange={(e) => {
                      //   setFieldValue("push_key_android", e.target.value);
                    }}
                  >
                    {fcmOptions?.map((item, index) => (
                      <option key={index} value={item.fcm_code}>
                        {item.fcm_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
