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
import {useHistory} from 'react-router-dom'
import { settingAllStockProduct } from "../../../../redux/product/Thunk";


export const ProductEditStock = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()
 
  const { currentState } = useSelector(
    (state) => ({ currentState: state.product.productStock }),
    shallowEqual
  );



  const handleUpdate = (values) => {
      dispatch(settingAllStockProduct(values))
      .then((res) => {
        props.close();
        history.go(0)
      })
   
  };
  return (
    <Modal
      show={props.open}
      onHide={() => {
        props.close();
      }}
      size="xl"
      fullscreen={true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          EDIT MAX/MIN PRODUCT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={currentState}
          onSubmit={(values) => {
            handleUpdate(values);
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <label className="col-form-label text-right col-lg-2 col-sm-12 ">
                    Use stock
                  </label>
                  <div className="col-lg-2  col-sm-12">
                    <RadioGroup
                      inline
                      name="is_using_stock"
                      value={values.is_using_stock}
                      onChange={(value, event) => {
                        setFieldValue("is_using_stock", value);
                      }}
                    >
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </RadioGroup>
                  </div>
                  {values.is_using_stock === 1 && (
                    <div className="col-lg-2  col-sm-12">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="enter stock value"
                        defaultValue={values.default_stock}
                        onChange={(e) => {
                          setFieldValue("default_stock", e.target.value);
                        }}
                      />
                    </div>
                  )}
                </div>
          

                <Button
                  style={{ display: "block", margin: "auto" }}
                  onClick={handleSubmit}
                >
                  UPDATE
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
