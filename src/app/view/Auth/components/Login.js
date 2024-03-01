import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector, shallowEqual,useDispatch, connect } from 'react-redux';
import { actionLoginAccount } from "../redux/authThunk";
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useRef } from "react";

const initialValues = {
  id: "duyhuu.dev",
  pw: "IT1234!@#$",
};

function Login(props,history) {
  const { intl } = props;
  console.log('props', props)
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      // This is the cleanup function
    };
  }, []);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    id: Yup.string()
      //.email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    pw: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = (values) => {
    setLoading(true);
  };

  const disableLoading = () => {
    // setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();

      setTimeout(() => {
        dispatch(actionLoginAccount(values))
          .then(unwrapResult)
          .then((response) => {
            if (response.code === 200) {
              disableLoading();
            } else {
              disableLoading();
              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
            }
          })
          .catch((error) => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      },2000);

    },
  });
  const handleOnChange = (event) => {
    console.log("Form1::onChange", event.target.value);
    console.log("Form1:: case load", loading);
  };
  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit} onChange={handleOnChange}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div style={{ width: "100%" }} className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
              <div style={{ width: "100%" }} className="alert-text ">
              Use account <strong>admin@demo.com</strong> and password{" "}
              <strong>demo</strong> to continue.
            </div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ID"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "id"
            )}`}
            name="id"
            {...formik.getFieldProps("id")}
          />
          {formik.touched.id && formik.errors.id ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.id}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "pw"
            )}`}
            name="pw"
            {...formik.getFieldProps("pw")}
          />
          {formik.touched.pw && formik.errors.pw ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.pw}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-success font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, actionLoginAccount)(Login));
