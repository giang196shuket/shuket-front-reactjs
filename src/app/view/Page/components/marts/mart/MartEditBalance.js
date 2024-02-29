import React from "react";
import { Form, Formik, Radio, RadioGroup } from "./index";
export const MartEditBalance = ({ isLoading, mart, btnRef, saveProduct }) => {
  return (
    <div>
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
                <p className="col-form-label ml-10 col-lg-12 col-sm-12 "><b>Total</b>  &emsp; &emsp; &emsp;  KRW</p>
              </div>
              <div className="form-group row">
                <p className=" col-lg-12 ml-10 col-sm-12 "><b>Current</b> &emsp; &emsp;  KRW</p>
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
