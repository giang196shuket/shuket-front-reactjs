import React from "react";
import { Form, Formik } from "./index";
export const MartEditContact = ({ isLoading, mart, btnRef, saveProduct }) => {
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
                   Name
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="contact_name"
                    placeholder="Name"
                    value={values.contact_name}
                    onChange={(e) => {
                      setFieldValue("contact_name", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                   Phone
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="contact_phone"
                    placeholder="Phone"
                    value={values.contact_phone}
                    onChange={(e) => {
                      setFieldValue("contact_phone", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                   Email
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="contact_email"
                    placeholder="Email"
                    value={values.contact_email}
                    onChange={(e) => {
                      setFieldValue("contact_email", e.target.value);
                    }}
                  />
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
