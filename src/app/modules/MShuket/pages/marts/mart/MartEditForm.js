import { DatePicker, Form, FormattedMessage, Formik, Radio, RadioGroup, businessTypeList, caseHeadOrFranch, format, getCityOptions, getDistrictOptions, getMartCommonWhere, getPartnerOptions, getPosOptions, getTypeMart, uploadMartLogo, useDispatch, useEffect, useSelector } from './index'
import "rsuite/dist/rsuite.css";
import * as Yup from 'yup'

const ProductEditSchema = Yup.object().shape({
  name: Yup.string().required("AUTH.VALIDATION.REQUIRED_FIELD"),
  mart_type: Yup.string().required("AUTH.VALIDATION.REQUIRED_FIELD"),
  mart_common: Yup.string().required("AUTH.VALIDATION.REQUIRED_FIELD"),
  mart_business_type: Yup.string().required("AUTH.VALIDATION.REQUIRED_FIELD"),
  hq_code: Yup.string().required("AUTH.VALIDATION.REQUIRED_FIELD"),
});

export function MartEditForm({
  isLoading,
  mart,
  btnRef,
  saveProduct,
  listHQ,
}) {
  let filteredData = [];

  if (mart.moa_code) {
    filteredData = listHQ.filter((itemHQ) => {
      if (itemHQ.moa_code !== mart.moa_code) {
        return true;
      } else {
        return false;
      }
    });
  }

  const dispatch = useDispatch();
  const district = useSelector((state) => state.main.district);
  const typeMart = useSelector((state) => state.main.typeMart);
  const city = useSelector((state) => state.main.city);
  const pos = useSelector((state) => state.main.pos);
  const partner = useSelector((state) => state.main.partner);
  const dbConnect = useSelector((state) => state.main.dbConnect);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTypeMart());
      await dispatch(getCityOptions());
      await dispatch(getPosOptions());
      await dispatch(getPartnerOptions());
      await dispatch(getMartCommonWhere());
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDistrictOptions(mart.city.code));
    };
    fetchData()
      .then((res) => console.log())
      .catch(console.error);
  }, [dispatch, mart]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={mart}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Mart Name
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Search"
                    value={values.name}
                    onChange={(e) => {
                      setFieldValue("name", e.target.value);
                    }}
                  />
                  {errors.name ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.name}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Mart SEQ
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="pos_regcode"
                    placeholder="Seq"
                    value={values.pos_regcode}
                    onChange={(e) => {
                      setFieldValue("pos_regcode", e.target.value);
                    }}
                  />
                  {errors.pos_regcode ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.pos_regcode}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Mart Group
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="group_no"
                    placeholder="Group"
                    value={values.group_no}
                    onChange={(e) => {
                      setFieldValue("group_no", e.target.value);
                    }}
                  />
                  {errors.group_no ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.group_no}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12">
                  Mart Type
                </label>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="mart_type"
                    value={values.mart_type}
                    onChange={(e) => {
                      console.log("Mart Type ", e.target.value);
                      console.log("Values of submit ", values);
                      setFieldValue("mart_type", e.target.value);
                      if (e.target.value === "N") {
                        setFieldValue("mart_business_type", "SW");
                        setFieldValue("hq_code", "");
                        setFieldValue("type", "S");
                        setFieldValue("show_franchise", "N");
                      }
                      if (
                        e.target.value === "SK" ||
                        e.target.value === "GSK" ||
                        e.target.value === "YSK"
                      ) {
                        setFieldValue("mart_business_type", "FA");
                        setFieldValue("hq_code", "");
                        setFieldValue("type", "H");
                        setFieldValue("show_franchise", "N");
                      }
                      if (e.target.value === "SG") {
                        setFieldValue("mart_business_type", "SA");
                        setFieldValue("hq_code", "");
                        setFieldValue("type", "S");
                        setFieldValue("show_franchise", "N");
                      }
                    }}
                  >
                    <option value="">All</option>
                    {typeMart.map((appType, index) => (
                      <option key={index} value={appType.code}>
                        {appType.name.en}
                      </option>
                    ))}
                  </select>
                  {errors.mart_type ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.mart_type}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
              </div>
              {values && values.mart_type !== "N" && (
                <div className="form-group row">
                  <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                    Type Of Database
                  </label>
                  <div className="col-lg-2">
                    <select
                      className="form-control"
                      name="mart_common"
                      value={values.mart_common}
                      onChange={(e) => {
                        console.log("DB connect ", e.target.value);
                        console.log("Values of submit ", values);
                        setFieldValue("mart_common", e.target.value);
                      }}
                    >
                      {dbConnect.map((dbItem, index) => (
                        <option key={index} value={dbItem.moa_common_code}>
                          {dbItem.moa_common_name_en}
                        </option>
                      ))}
                    </select>
                    {errors.mart_common ? (
                      <small className="invalid-feedback d-block">
                        <b className="red">Error </b>{" "}
                        <FormattedMessage
                          id={errors.mart_common}
                          defaultMessage="Learn React"
                          description="Link on react page"
                        />
                      </small>
                    ) : (
                      <small className="form-text text-muted">
                        <b className="text-danger">*</b> is required
                      </small>
                    )}
                  </div>
                  <label className="col-form-label text-right col-lg-1 col-sm-12  ">
                    Type Of Business
                  </label>
                  <div className="col-lg-2  col-sm-12">
                    <select
                      className="form-control"
                      name="mart_business_type"
                      value={values.mart_business_type}
                      onChange={(e) => {
                        console.log("Type Of Business ", e.target.value);
                        console.log("Values of submit ", values);
                        setFieldValue("mart_business_type", e.target.value);
                      }}
                    >
                      {businessTypeList.map((businessType, index) => (
                        <option key={index} value={businessType.value}>
                          {businessType.text}
                        </option>
                      ))}
                    </select>
                    {errors.mart_business_type ? (
                      <small className="invalid-feedback d-block">
                        <b className="red">Error </b>{" "}
                        <FormattedMessage
                          id={errors.mart_business_type}
                          defaultMessage="Learn React"
                          description="Link on react page"
                        />
                      </small>
                    ) : (
                      <small className="form-text text-muted">
                        <b className="text-danger">*</b> is required
                      </small>
                    )}
                  </div>
                  {caseHeadOrFranch.includes(values.mart_type) && (
                    <>
                      <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                        Head/Franchise
                      </label>
                      <div className="col-lg-2  col-sm-12">
                        <RadioGroup
                          inline
                          name="type"
                          value={values.type}
                          onChange={(newValue, event) => {
                            setFieldValue("type", newValue);
                            if (newValue === "H") {
                              setFieldValue("show_franchise", "N");
                            }
                            if (newValue === "F") {
                              setFieldValue("show_franchise", "Y");
                            }
                          }}
                        >
                          <Radio value="H">Headquarters</Radio>
                          <Radio value="F">Franchise</Radio>
                        </RadioGroup>
                      </div>
                      {values.type === "F" && (
                        <>
                          <label className="col-form-label text-right col-lg-1 col-sm-12">
                            Select franchise
                          </label>
                          <div className="col-lg-2  col-sm-12">
                            <select
                              className="form-control"
                              name="hq_code"
                              value={values.hq_code}
                              onChange={(value) => {
                                setFieldValue("hq_code", value);
                              }}
                            >
                              {filteredData.map((hq, index) => (
                                <option key={index} value={hq.hq_code}>
                                  {hq.name}
                                </option>
                              ))}
                            </select>
                            {errors.hq_code ? (
                              <small className="invalid-feedback d-block">
                                <b className="red">Error </b>{" "}
                                <FormattedMessage
                                  id={errors.hq_code}
                                  defaultMessage="Learn React"
                                  description="Link on react page"
                                />
                              </small>
                            ) : (
                              <small className="form-text text-muted">
                                <b className="text-danger">*</b> is required
                              </small>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Phone number
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  {errors.phone ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.phone}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Biz license number
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="license"
                    placeholder="License"
                    value={values.license}
                    onChange={(e) => {
                      setFieldValue("license", e.target.value);
                    }}
                  />
                  {errors.license ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.license}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Business open hours
                </label>
                <div className="col-lg-2">
                  <DatePicker
                    format="HH:mm"
                    placeholder="Select Hour"
                    name="bizhour_open"
                    value={
                      new Date(
                        `2000-01-01 ${values.bizhour_open.substring(
                          0,
                          2
                        )}:${values.bizhour_open.substring(2, 4)}:00`
                      )
                    }
                    onOk={(date) => {
                      console.log(date);
                      setFieldValue("bizhour_open", format(date, "HHmm"));
                    }}
                  />
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Business open close
                </label>
                <div className="col-lg-2">
                  <DatePicker
                    format="HH:mm"
                    placeholder="Select Hour"
                    name="bizhour_close"
                    value={
                      new Date(
                        `2000-01-01 ${values.bizhour_close.substring(
                          0,
                          2
                        )}:${values.bizhour_close.substring(2, 4)}:00`
                      )
                    }
                    onOk={(date) => {
                      setFieldValue("bizhour_close", format(date, "HHmm"));
                    }}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  City
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="city"
                    value={
                      typeof values.city === "object"
                        ? values.city.code
                        : values.city
                    }
                    onChange={(e) => {
                      dispatch(getDistrictOptions(e.target.value));
                      setFieldValue("city", e.target.value);
                    }}
                  >
                    {city.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                  {errors.city ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.city}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  District
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="district"
                    value={
                      typeof values.district === "object"
                        ? values.district.code
                        : values.district
                    }
                    onChange={(e) => {
                      setFieldValue("district", e.target.value);
                    }}
                  >
                    {district.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                  {errors.district ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.district}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Address
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={(e) => {
                      setFieldValue("address", e.target.value);
                    }}
                  />
                  {errors.address ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.address}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Mart display status
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="mart_display_status"
                    value={values.mart_display_status}
                    onChange={(newValue, event) => {
                      setFieldValue("mart_display_status", newValue);
                    }}
                  >
                    <Radio value="Y">Usage</Radio>
                    <Radio value="N">Don't Usage</Radio>
                  </RadioGroup>
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12">
                  Custom App
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="is_custom_app"
                    value={values.is_custom_app}
                    onChange={(newValue, event) => {
                      setFieldValue("is_custom_app", newValue);
                    }}
                  >
                    <Radio value="Y">Custom App</Radio>
                    <Radio value="N">Not custom App</Radio>
                  </RadioGroup>
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Order receive time
                </label>
                <div className="col-lg-5  col-sm-12">
                  <RadioGroup
                    inline
                    name="receive_option"
                    value={values.receive_option}
                    onChange={(newValue, event) => {
                      setFieldValue("receive_option", newValue);
                    }}
                  >
                    <Radio value="N">No receive option</Radio>
                    <Radio value="Y">Use receove option</Radio>
                    <Radio value="C">Custom receive option</Radio>
                    <Radio value="D">Stop order receive option</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12">
                  Pos
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="pos"
                    value={
                      typeof values.pos === "object"
                        ? values.pos.code
                        : values.pos
                    }
                    onChange={(e) => {
                      dispatch(getDistrictOptions(e.target.value));
                      setFieldValue("pos", e.target.value);
                    }}
                  >
                    {pos.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.pos ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.city}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Pos connect
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="pos_connect"
                    value={values.pos_connect}
                    onChange={(newValue, event) => {
                      setFieldValue("pos_connect", newValue);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Pos code
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="pos_code"
                    placeholder="Pos code"
                    value={values.pos_code}
                    onChange={(e) => {
                      setFieldValue("pos_code", e.target.value);
                    }}
                  />
                  {errors.pos_code ? (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error </b>{" "}
                      <FormattedMessage
                        id={errors.pos_code}
                        defaultMessage="Learn React"
                        description="Link on react page"
                      />
                    </small>
                  ) : (
                    <small className="form-text text-muted">
                      <b className="text-danger">*</b> is required
                    </small>
                  )}
                </div>
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Pos sync order
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="can_edit_sync_order"
                    value={values.can_edit_sync_order}
                    onChange={(value, event) => {
                      setFieldValue("can_edit_sync_order", value);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12">
                  Extended Product
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="is_extend_brgn"
                    value={values.is_extend_brgn}
                    onChange={(value, event) => {
                      setFieldValue("is_extend_brgn", value);
                    }}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                  </RadioGroup>
                </div>
                <label className="col-form-label text-right col-lg-2 col-sm-12">
                  Initial inventory linkage
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="hidecheckbox"
                    value={values.hidecheckbox}
                    onChange={(value, event) => {
                      setFieldValue("hidecheckbox", value);
                    }}
                  >
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </RadioGroup>
                </div>
                {values.hidecheckbox === 1 ? (
                  <button type="button" className="btn btn-primary">
                    Initial stock
                  </button>
                ) : null}
              </div>
              <div className="form-group row">
                <label className="col-form-label text-right col-lg-1 col-sm-12 ">
                  Mart logo (current)
                </label>

                <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center">
                  <>
                    <img
                      src={values.logo_url}
                      alt=""
                      style={{ width: "150px" }}
                    />
                    <input
                      className="form-control form-control-sm m-5"
                      name="logo_url"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        dispatch(uploadMartLogo(e.target.files[0]))
                          .unwrap()
                          .then((res) => {
                            setFieldValue("logo_url", res.data.image_url);
                          });
                      }}
                    />
                  </>
                  
                </div>
                <label className="col-form-label text-right col-lg-2 col-sm-12 ">
                  Mart logo push notification(current)
                </label>
                <div className="col-lg-2 d-flex flex-column  justify-content-center align-items-center">
                  <>
                    <img
                      src={values.logo_push_url}
                      alt=""
                      style={{ width: "150px" }}
                    ></img>
                    <input
                      className="form-control  m-5"
                      name="logo_push_url"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        dispatch(uploadMartLogo(e.target.files[0]))
                          .unwrap()
                          .then((res) => {
                            setFieldValue("logo_push_url", res.data.image_url);
                          });
                      }}
                    />
                  </>
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
    </>
  );
}
