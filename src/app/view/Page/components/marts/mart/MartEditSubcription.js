import React from "react";
import { Form, Formik, Radio, RadioGroup } from "./index";
export const MartEditSupcription = ({ isLoading, mart, btnRef, saveProduct }) => {
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
                Subcription
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="s_type"
                    value={values.s_type}
                    onChange={(value, event) => {
                      setFieldValue("s_type", value);
                    }}
                  >
                    <Radio value="basic">Basic</Radio>
                    <Radio value="standard">Standard</Radio>
                    <Radio value="premium">Premium</Radio>

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
