import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  FormCheck,
  Formik,
  Radio,
  RadioGroup,
  format,
  useDispatch,
  useSelector,
  getPartnerSalesTeamOptions
} from "./index";
export const MartEditBilling = ({ isLoading, mart, btnRef, saveProduct }) => {
  const partners = useSelector((state) => state.main.partner);
  const dispatch = useDispatch();
  const [sales, setSales] = useState([])

  const handleFetchSales =  (code) =>{
     dispatch(getPartnerSalesTeamOptions(code))
    .then((res)=>{
      setSales(res.payload.data.list)
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      await handleFetchSales(mart.partner.code)
    };
    fetchData().catch(console.error);
  }, [dispatch, mart.partner.code]);

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
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Payment method
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="s_payment"
                    value={values.s_payment}
                    onChange={(value, event) => {
                      setFieldValue("s_payment", value);
                    }}
                  >
                    <Radio value="CMS">CMS</Radio>
                    <Radio value="CC">CREDIT CARD</Radio>
                    <Radio value="CA">CASH</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Discount(KRW)
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="s_discount"
                    placeholder="Search"
                    value={values.s_discount}
                    onChange={(e) => {
                      setFieldValue("s_discount", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Discount period (days)
                </label>
                <select
                  className="form-control ml-3 col-lg-1 col-sm-12"
                  name="s_discount_period"
                  value={values.s_discount_period}
                  onChange={(e) => {
                    setFieldValue("s_discount_period", e.target.value);
                  }}
                >
                  <option key={1} value={1}>
                    1
                  </option>
                  <option key={2} value={2}>
                    2
                  </option>
                </select>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Service start date
                </label>
                <div className="col-lg-2">
                  <DatePicker
                    placeholder="Select date"
                    name="s_date_service"
                    value={new Date(values.s_date_service)}
                    onOk={(date) => {
                      console.log(date);
                      setFieldValue(
                        "s_date_service",
                        format(date, "yyyy-MM-dd")
                      );
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Billing start date
                </label>
                <div className="col-lg-2">
                  <DatePicker
                    placeholder="Select date"
                    name="s_date_billing"
                    value={new Date(values.s_date_billing)}
                    onOk={(date) => {
                      console.log(date);
                      setFieldValue(
                        "s_date_billing",
                        format(date, "yyyy-MM-dd")
                      );
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Partner company
                </label>
                <select
                  className="form-control ml-3 col-lg-1 col-sm-12"
                  name="partner"
                  value={values.partner.code}
                  onChange={(e) => {
                    setFieldValue("partner", e.target.value);
                    handleFetchSales(e.target.value)
                  }}
                >
                  {partners.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                  Sale team
                </label>
                <select
                  className="form-control ml-3 col-lg-1 col-sm-12"
                  name="sale_team"
                  value={values.sale_team.code}
                  onChange={(e) => {
                    setFieldValue("sale_team", e.target.value);
                  }}
                >
                  {sales.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
