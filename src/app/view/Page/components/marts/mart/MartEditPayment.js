import React from "react";
import {
  Form,
  Formik,
  useSelector,
  useDispatch,
  useEffect,
  RadioGroup,
  Radio,
  FormCheck
} from "./index";

export const MartEditPayment = ({ isLoading, mart, btnRef, saveProduct }) => {

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
            <div className="row form-group">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  COD, CCOD
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="paymentCOD"
                    value={values.paymentCOD}
                    onChange={(newValue, event) => {
                      setFieldValue("paymentCOD", newValue);
                      if (newValue === "N") {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if(newItem.payment_code === 'COD' || newItem.payment_code === 'CCOD'){
                                return { ...newItem, checked: false };
                            }else{
                                return newItem
                            }
                          })
                        );
                      } else {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if(newItem.payment_code === 'COD' || newItem.payment_code === 'CCOD'){
                                return { ...newItem, checked: true };
                            }else{
                                return newItem
                            }
                          })
                        );
                      }
                    }}
                  >
                    <Radio value="Y">Use</Radio>
                    <Radio value="N">Not use</Radio>
                  </RadioGroup>
                </div>
                
              </div>
              <div className="ml-5 form-group d-flex" style={{gap:20}}>
                  {values?.op_payment.map((item) =>
                    item.payment_code === "COD" ||
                    item.payment_code === "CCOD" ? (
                        <FormCheck
                          size="large"
                          key={item.id}
                          type="checkbox"
                          id={item.payment_code}
                          label={item.payment_lang_en}
                          checked={item.checked}
                          onChange={(e) => {
                            const payments = values?.op_payment.map((newItem) => {
                              if (newItem.payment_code === item.payment_code) {
                                return { ...newItem, checked: e.target.checked };
                              } else {
                                return newItem;
                              }
                            });
                            setFieldValue("op_payment", payments);
                          }}
                        />
                      ) : null
                  )}
                </div>
              <div className="row form-group">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Online payment
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="paymentOnline"
                    value={values.paymentOnline}
                    onChange={(newValue, event) => {
                      setFieldValue("paymentOnline", newValue);
                      if (newValue === "N") {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if(newItem.payment_code === 'COD' || newItem.payment_code === 'CCOD'){
                                return newItem
                            }else{
                                return { ...newItem, checked: false };
                            }
                          })
                        );
                      } else {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if(newItem.payment_code === 'COD' || newItem.payment_code === 'CCOD'){
                                return newItem
                            }else{
                                return { ...newItem, checked: true };
                            }
                          })
                        );
                      }
                    }}
                  >
                    <Radio value="Y">Use</Radio>
                    <Radio value="N">Not use</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="ml-5 form-group d-flex" style={{gap:20}}>
                  {values?.op_payment.map((item) =>
                    item.payment_code === "COD" ||
                    item.payment_code === "CCOD" ? null : (
                      <FormCheck
                        size="large"
                        key={item.id}
                        type="checkbox"
                        id={item.payment_code}
                        label={item.payment_lang_en}
                        checked={item.checked}
                        onChange={(e) => {
                          const payments = values?.op_payment.map((newItem) => {
                            if (newItem.payment_code === item.payment_code) {
                              return { ...newItem, checked: e.target.checked };
                            } else {
                              return newItem;
                            }
                          });
                          setFieldValue("op_payment", payments);
                        }}
                      />
                    )
                  )}
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
