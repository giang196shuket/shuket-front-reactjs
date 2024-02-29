import React from "react";
import { Form, FormCheck, Formik, Radio, RadioGroup } from "./index";
export const MartEditService = ({ isLoading, mart, btnRef, saveProduct }) => {
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
                <label className=" text-center col-lg-1 col-sm-12 ">
                  Smart receipt
                </label>
                <FormCheck
                  size="large"
                  key={values.receipt}
                  type="checkbox"
                  id={values.receipt}
                  checked={values.receipt  === 'Y'}
                  onChange={(e) => {
                    setFieldValue("receipt", e.target.checked ? 'Y' : 'N');
                  }}
                />
              </div>
              <div className="form-group row">
                <label className=" text-center col-lg-1 col-sm-12 ">
                  Local partner
                </label>
                <FormCheck
                  size="large"
                  key={values.local_partner}
                  type="checkbox"
                  id={values.local_partner}
                  checked={values.local_partner  === 'Y'}
                  onChange={(e) => {
                    setFieldValue("local_partner", e.target.checked ? 'Y' : 'N');
                  }}
                />
              </div>
              <div className="form-group row">
                <label className="text-center col-lg-1 col-sm-12 ">
                  Web pop
                </label>
                <FormCheck
                  size="large"
                  key={values.pop}
                  type="checkbox"
                  id={values.pop}
                  checked={values.pop === 'Y'}
                  onChange={(e) => {
                    setFieldValue("pop", e.target.checked ? 'Y' : 'N');
                  }}
                />
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
