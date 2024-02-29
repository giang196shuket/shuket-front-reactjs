import React from "react";
import { Form, Formik, Radio, RadioGroup } from "./index";
export const MartEditAccStatus = ({ isLoading, mart, btnRef, saveProduct }) => {
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
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                Account status
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="account_status"
                    value={values.account_status}
                    onChange={(value, event) => {
                      setFieldValue("account_status", value);
                    }}
                  >
                    <Radio value="A">Active</Radio>
                    <Radio value="C">Deactive</Radio>
                    <Radio value="D">Delete</Radio>

                  </RadioGroup>
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
