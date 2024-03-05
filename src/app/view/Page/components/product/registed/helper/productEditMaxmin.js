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
import { settingAllMaxMinProduct } from "../../../../redux/product/Thunk";
import {useHistory} from 'react-router-dom'


export const ProductEditMaxmin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product.productMinMax }),
    shallowEqual
  );


  const handleUpdate = (values) => {
    const result = window.confirm("Do you want this setting to apply to all products?");
    if (result) {
      dispatch(settingAllMaxMinProduct(values))
      .then((res) => {
        props.close();
        history.go(0)
      })
    } else {
     return
    }
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
                    Use Max quantity
                  </label>
                  <div className="col-lg-2  col-sm-12">
                    <RadioGroup
                      inline
                      name="is_using_maxqty"
                      value={values.is_using_maxqty}
                      onChange={(value, event) => {
                        setFieldValue("is_using_maxqty", value);
                      }}
                    >
                      <Radio value="Y">Yes</Radio>
                      <Radio value="N">No</Radio>
                    </RadioGroup>
                  </div>
                  {values.is_using_maxqty === "Y" && (
                    <div className="col-lg-2  col-sm-12">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="enter max quantity value"
                        defaultValue={values.default_maxqty}
                        onChange={(e) => {
                          setFieldValue("default_maxqty", e.target.value);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="form-group row">
                  <label className="col-form-label text-right col-lg-2 col-sm-12 ">
                    Use Min quantity
                  </label>
                  <div className="col-lg-2  col-sm-12">
                    <RadioGroup
                      inline
                      name="is_using_minqty"
                      value={values.is_using_minqty}
                      onChange={(value, event) => {
                        setFieldValue("is_using_minqty", value);
                      }}
                    >
                      <Radio value="Y">Yes</Radio>
                      <Radio value="N">No</Radio>
                    </RadioGroup>
                  </div>
                  {values.is_using_minqty === "Y" && (
                    <div className="col-lg-2  col-sm-12">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="enter min quantity value"
                        defaultValue={values.default_minqty}
                        onChange={(e) => {
                          setFieldValue("default_minqty", e.target.value);
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
