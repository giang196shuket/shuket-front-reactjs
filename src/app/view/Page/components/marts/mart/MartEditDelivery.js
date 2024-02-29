import React from "react";
import {
  Form,
  Formik,
  useSelector,
  useDispatch,
  useEffect,
  RadioGroup,
  Radio,
  pickupTimeList,
  DatePicker,
  format,
} from "./index";

export const MartEditDelivery = ({ isLoading, mart, btnRef, saveProduct }) => {
  const dispatch = useDispatch();

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
                  Order delivery
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="set_delivery"
                    value={values.set_delivery}
                    onChange={(value, event) => {
                      setFieldValue("set_delivery", value);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Order pickup
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="store_set_hour"
                    value={values.store_set_hour}
                    onChange={(value, event) => {
                      setFieldValue("store_set_hour", value);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Pickup COD
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="store_pickup_cod"
                    value={values.store_pickup_cod}
                    onChange={(value, event) => {
                      setFieldValue("store_pickup_cod", value);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
              </div>
              {values.store_set_hour === "N" ? null : (
                <>
                  <div className="form-group row">
                    <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                      Pickup interval time
                    </label>
                    <select
                      className="form-control ml-3 col-lg-2 col-sm-12"
                      name="store_pick_time_interval"
                      value={values.store_pick_time_interval}
                      onChange={(e) => {
                        setFieldValue(
                          "store_pick_time_interval",
                          e.target.value
                        );
                      }}
                    >
                      {pickupTimeList.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                      Pickup hours start
                    </label>
                    <div className="col-lg-2">
                      <DatePicker
                        format="HH:mm"
                        placeholder="Select Hour"
                        name="store_set_hour_start"
                        value={
                          new Date(
                            `2000-01-01 ${values.store_set_hour_start}:00`
                          )
                        }
                        onOk={(date) => {
                          console.log(date);
                          setFieldValue(
                            "store_set_hour_start",
                            format(date, "HH:mm")
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                      Pickup hours end
                    </label>
                    <div className="col-lg-2">
                      <DatePicker
                        format="HH:mm"
                        placeholder="Select Hour"
                        name="store_set_hour_end"
                        value={
                          new Date(`2000-01-01 ${values.store_set_hour_end}:00`)
                        }
                        onOk={(date) => {
                          console.log(date);
                          setFieldValue(
                            "store_set_hour_end",
                            format(date, "HH:mm")
                          );
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

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
