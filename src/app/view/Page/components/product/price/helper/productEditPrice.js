import React from "react";
import {
  useDispatch,
  Modal,
  Button,
  toast,
  Formik,
  Form,
  RadioGroup,
  Radio,
  useSelector,
  shallowEqual,
} from "../index";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import "../../../../../../../module/assets/sass/pages/product/productPrice.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setPriceForProduct } from "../../../../redux/product/Thunk";

export const ProductEditPrice = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product.productList }),
    shallowEqual
  );

  let proDetail =
    props.openId && currentState.find((pro) => pro?.code === props.openId);
    console.log('proDetail', proDetail);

  const initial = {
    name: proDetail?.name,
    code: proDetail?.code,
    category: proDetail?.category,
    barcode: proDetail?.barcode,
    images: proDetail?.images,
    tags: proDetail?.tags,
    unit: proDetail?.unit,
    list_price: proDetail?.list_price,
    sale_price: proDetail?.sale_price,
    sale_percent: proDetail?.sale_percent,
    useTarget: "N",
    useTime: "N",
    priceType: proDetail?.priceType,
    priceUpDown: proDetail?.priceUpDown,
    priceNumber: proDetail?.priceNumber,
    timeStart: proDetail?.timeStart ? proDetail.timeStart : "1970-01-01",
    timeEnd: proDetail?.timeEnd ? proDetail.timeEnd : "1970-01-01",
  };

  console.log(initial);

  const handleUpdate = (values) => {
    dispatch(setPriceForProduct(values)).then((res) => {
      props.close();
      // history.go(0);
    });
  };
  return (
    <Modal
      show={props.openId && initial}
      onHide={() => {
        props.close();
      }}
      size="xl"
      fullscreen={true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          EDIT PRICE FOR PRODUCT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initial}
          onSubmit={(values) => {
            handleUpdate(values);
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <>
              {values && (
                <Form className="form form-label-right">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      style={{ width: "30%" }}
                      src={values && values?.images?.[0]?.thumb}
                      alt=""
                    />
                    <div style={{ width: "50%" }}>
                      <p>Product code: {values.code}</p>
                      <p>Barcode: {values.barcode}</p>
                      <p>Category: {values.category}</p>
                      <p>Product name: {values.name}</p>
                      <p>
                        Price:{" "}
                          <s className="text-muted mr-5">{values.list_price} 원</s>
                          {values.sale_price} 원{" "}
                          <b style={{ color: "red" }} className="ml-5">
                            {" "}
                            {values.sale_percent}%
                          </b>
                      </p>
                      <p>Tag: {values.tags}</p>
                      <p>Unit: {values.unit}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group row">
                    <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                      Use target price
                    </label>
                    <div className="col-lg-4  col-sm-12">
                      <RadioGroup
                        inline
                        name="useTarget"
                        value={values.useTarget}
                        onChange={(value, event) => {
                          setFieldValue("useTarget", value);
                        }}
                      >
                        <Radio value={"Y"}>Use target</Radio>
                        <Radio value={"N"}>Not use target</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label text-center col-lg-2 col-sm-12 ">
                      Use time price
                    </label>
                    <div className="col-lg-2  col-sm-12">
                      <RadioGroup
                        inline
                        name="useTime"
                        value={values.useTime}
                        onChange={(value, event) => {
                          setFieldValue("useTime", value);
                        }}
                      >
                        <Radio value={"Y"}>Use</Radio>
                        <Radio value={"N"}>Not use</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label text-center col-lg-2 col-sm-12">
                      Option Price
                    </label>
                    <div className="col-lg-2">
                      <select
                        className="form-control"
                        name="priceType"
                        value={values.priceType}
                        onChange={(e) => {
                          setFieldValue("priceType", e.target.value);
                        }}
                      >
                        <option value="">All</option>
                        <option key={"AM"} value={"AM"}>
                          AMOUNT
                        </option>
                        <option key={"PC"} value={"PC"}>
                          PERCENT %
                        </option>
                      </select>
                    </div>
                    {values.useTarget === 'Y' &&  <div className="col-lg-2">
                      <select
                        className="form-control"
                        name="priceUpDown"
                        value={values.priceUpDown}
                        onChange={(e) => {
                          setFieldValue("priceUpDown", e.target.value);
                        }}
                      >
                        <option value="">All</option>
                        <option key={"U"} value={"U"}>
                          UP
                        </option>
                        <option key={"D"} value={"D"}>
                          DOWN
                        </option>
                      </select>
                    </div>}
                   
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label text-center col-lg-2 col-sm-12">
                      Price value
                    </label>
                    <div className="col-lg-4  col-sm-12">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="enter price number"
                        defaultValue={values.priceNumber}
                        onChange={(e) => {
                          setFieldValue("priceNumber", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {values.useTime ==='Y' &&   <div className="form-group row">
                    <label className="col-form-label text-center col-lg-2 col-sm-12">
                      Time of price
                    </label>
                    <div className="col-lg-2 ">
                      <DatePicker
                        className="form-control"
                        placeholder="Select date"
                        name="timeStart"
                        selected={new Date(values.timeStart)}
                        onChange={(date) => {
                          console.log(date);
                          setFieldValue(
                            "timeStart",
                            format(date, "yyyy-MM-dd")
                          );
                        }}
                      />
                    </div>
                    <div className="col-lg-2">
                      <DatePicker
                        className="form-control"
                        placeholder="Select date"
                        name="timeEnd"
                        selected={new Date(values.timeEnd)}
                        onChange={(date) => {
                          console.log(date);
                          setFieldValue("timeEnd", format(date, "yyyy-MM-dd"));
                        }}
                      />
                    </div>
                  </div>}
                

                  <Button
                    style={{ display: "block", margin: "auto" }}
                    onClick={handleSubmit}
                  >
                    UPDATE
                  </Button>
                </Form>
              )}
            </>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
