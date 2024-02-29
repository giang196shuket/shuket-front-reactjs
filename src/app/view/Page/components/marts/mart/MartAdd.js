import {
  addMart,
  checkUserAdminId,
  Divider,
  DatePicker,
  Form,
  FormattedMessage,
  Formik,
  Radio,
  RadioGroup,
  businessTypeList,
  caseHeadOrFranch,
  format,
  getCityOptions,
  getDistrictOptions,
  getDBConnect,
  getPartnerOptions,
  getPosOptions,
  getTypeMart,
  getGroupOptions,
  getLevelOptions,
  uploadMartLogo,
  useDispatch,
  useEffect,
  useSelector,
  useState,
  Card,
  CardHeader,
  CardHeaderToolbar,
  CardBody,
  initialAdd,
  getListGroupMart,
  getFcmOptions,
  FormCheck,
  pickupTimeList,
  getPartnerSalesTeamOptions,
  toast,
} from "./index";
import * as Yup from 'yup';

const AddSchema = Yup.object().shape({
  mart_name: Yup.string().required(' Can not empty this field'),
  city: Yup.string().required(' Can not empty this field'),
  district: Yup.string().required(' Can not empty this field'),
  address: Yup.string().required(' Can not empty this field'),
  license: Yup.string().required(' Can not empty this field'),
  phone: Yup.string().required(' Can not empty this field'),
  pos_regcode: Yup.string().required(' Can not empty this field'),
  group_no: Yup.string().required(' Can not empty this field'),
  pos: Yup.string().required(' Can not empty this field'),
  bizhour_open: Yup.string().notOneOf(["00:00"], 'Can not empty this field'),
  bizhour_close:  Yup.string().notOneOf(["00:00"], 'Can not empty this field'),
  store_set_hour_start:  Yup.string().notOneOf(["00:00"], 'Can not empty this field'),
  store_set_hour_end:  Yup.string().notOneOf(["00:00"], 'Can not empty this field'),
  u_id: Yup.string().required(' Can not empty this field'),
  u_password: Yup.string().required(' Can not empty this field'),
  u_password_confirm: Yup.string().oneOf([Yup.ref('u_password'), null], 'Passwords must match').required('Can not empty this field'),
});

export function MartAdd({
  history,
  match: {
    params: { id },
  },
}) {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let _title = "BASIC INFOMATION";
    setTitle(_title);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTypeMart());
      await dispatch(getCityOptions());
      await dispatch(getPosOptions());
      await dispatch(getPartnerOptions());
      await dispatch(getDBConnect());
      await dispatch(getListGroupMart());
      await dispatch(getFcmOptions());
      await dispatch(getGroupOptions());
      await dispatch(getLevelOptions());
    };
    fetchData().catch(console.error);
  }, [dispatch]);

  const district = useSelector((state) => state.main.district);
  const typeMart = useSelector((state) => state.main.typeMart);
  const city = useSelector((state) => state.main.city);
  const pos = useSelector((state) => state.main.pos);
  const partners = useSelector((state) => state.main.partner);
  const dbConnect = useSelector((state) => state.main.dbConnect);
  const groups = useSelector((state) => state.main.groupAccount);
  const level = useSelector((state) => state.main.levelAcccount);
  const filteredData = useSelector((state) => state.marts.martHQList);
  const fcmOptions = useSelector((state) => state.fcm.fcmOptions);
  const [sales, setSales] = useState([]);
  const [idInvalid, setIdInvalid] = useState(undefined);

  const handleFetchSales = (code) => {
    dispatch(getPartnerSalesTeamOptions(code)).then((res) => {
      setSales(res.payload.data.list);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await handleFetchSales(initialAdd.partner);
    };
    fetchData().catch(console.error);
  }, []);

  const checkId = (u_id) => {
    dispatch(checkUserAdminId({ u_id: u_id })).then((res) => {
      if (res.payload.data) {
        setIdInvalid(true);
      } else {
        setIdInvalid(false);
        toast.success(res.payload.message);
      }
    });
  };

  const backToMartList = () => {
    history.push(`/m-shuket/MOA%20SERVICE/service/sales-collection`);
  };
  const handleAdd = (values) => {
    if(idInvalid === undefined){
      toast.error('Please check ID');
      return
    }
    if(idInvalid === true){
      return
    }
    dispatch(addMart(values))
    .then((res) => {
      if (res.payload.code === 200) {
        // history.go(0)
        // toast.success(res.payload.message);
      } else {
        toast.error(res.payload.errors);
      }
    })
    .catch((err) => {
      toast.error(err);
    });
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToMartList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialAdd}
          validationSchema={AddSchema}
          onSubmit={(values) => {
            handleAdd(values);
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <Form className="form form-label-right">
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Mart Name
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="mart_name"
                    placeholder="Name"
                    value={values.mart_name}
                    onChange={(e) => {
                      setFieldValue("mart_name", e.target.value);
                    }}
                  />
                    {errors.mart_name &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.mart_name}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Mart SEQ 
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="pos_regcode"
                    placeholder="POS_REGCODE"
                    value={values.pos_regcode}
                    onChange={(e) => {
                      setFieldValue("pos_regcode", e.target.value);
                    }}
                  />
                       {errors.pos_regcode &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.pos_regcode}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Mart Group
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="group_no"
                    placeholder="GROUP_NO"
                    value={values.group_no}
                    onChange={(e) => {
                      setFieldValue("group_no", e.target.value);
                    }}
                  />
                   {errors.group_no &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.group_no}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12">
                  Mart Type
                </label>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="mart_type"
                    value={values.mart_type}
                    onChange={(e) => {
                      setFieldValue("mart_type", e.target.value);
                      if (e.target.value === "N") {
                        setFieldValue("mart_business_type", "SW");
                        setFieldValue("hq_code", "");
                        setFieldValue("headFranchiseType", "S");
                        setFieldValue("show_franchise", "N");
                      }
                      if (
                        e.target.value === "SK" ||
                        e.target.value === "GSK" ||
                        e.target.value === "YSK"
                      ) {
                        setFieldValue("mart_business_type", "FA");
                        setFieldValue("hq_code", "");
                        setFieldValue("headFranchiseType", "H");
                        setFieldValue("show_franchise", "N");
                      }
                      if (e.target.value === "SG") {
                        setFieldValue("mart_business_type", "SA");
                        setFieldValue("hq_code", "");
                        setFieldValue("headFranchiseType", "S");
                        setFieldValue("show_franchise", "N");
                      }
                    }}
                  >
                    <option value="">All</option>
                    {typeMart.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.name.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {values && values.mart_type !== "N" && (
                <div className="form-group row">
                  <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                    Type Of Database
                  </label>
                  <div className="col-lg-2">
                    <select
                      className="form-control"
                      name="mart_db"
                      value={values.mart_db}
                      onChange={(e) => {
                        setFieldValue("mart_db", e.target.value);
                      }}
                    >
                      <option value={""}>-- Choose --</option>
                      {dbConnect.map((item, index) => (
                        <option key={index} value={item.moa_common_code}>
                          {item.moa_common_name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="col-form-label text-center col-lg-1 col-sm-12  ">
                    Type Of Business
                  </label>
                  <div className="col-lg-2  col-sm-12">
                    <select
                      className="form-control"
                      name="mart_business_type"
                      value={values.mart_business_type}
                      onChange={(e) => {
                        setFieldValue("mart_business_type", e.target.value);
                      }}
                    >
                      {businessTypeList.map((businessType, index) => (
                        <option key={index} value={businessType.value}>
                          {businessType.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  {caseHeadOrFranch.includes(values.mart_type) && (
                    <>
                      <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                        Head/Franchise
                      </label>
                      <div className="col-lg-2  col-sm-12">
                        <RadioGroup
                          inline
                          name="headFranchiseType"
                          value={values.headFranchiseType}
                          onChange={(newValue, event) => {
                            setFieldValue("headFranchiseType", newValue);
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
                      {values.headFranchiseType === "F" && (
                        <>
                          <label className="col-form-label text-center col-lg-1 col-sm-12">
                            Select franchise
                          </label>
                          <div className="col-lg-2  col-sm-12">
                            <select
                              className="form-control"
                              name="hq_code"
                              value={values.hq_code}
                              onChange={(e) => {
                                setFieldValue("hq_code", e.target.value);
                              }}
                            >
                              <option value={""}>-- Choose --</option>
                              {filteredData.map((hq, index) =>
                                hq.m_app_type === values.mart_type ? (
                                  <option key={index} value={hq.hq_code}>
                                    {hq.mart_name}
                                  </option>
                                ) : null
                              )}
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                     {errors.phone &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.phone}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                     {errors.license &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.license}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                     {errors.bizhour_open &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.bizhour_open}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                     {errors.bizhour_close &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.bizhour_close}
                    </small>}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  City
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="city"
                    value={values.city}
                    onChange={(e) => {
                      dispatch(getDistrictOptions(e.target.value));
                      setFieldValue("city", e.target.value);
                    }}
                  >
                    <option value={""}>-- Choose --</option>
                    {city.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                  {errors.city &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.city}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  District
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="district"
                    value={values.district}
                    onChange={(e) => {
                      setFieldValue("district", e.target.value);
                    }}
                  >
                    <option value={""}>-- Choose --</option>
                    {district.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                  {errors.district &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.district}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                     {errors.address &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.address}
                    </small>}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12">
                  Pos
                </label>
                <div className="col-lg-2  col-sm-12">
                  <select
                    className="form-control"
                    name="pos"
                    value={values.pos}
                    onChange={(e) => {
                      setFieldValue("pos", e.target.value);
                    }}
                  >
                    <option value={""}>-- Choose --</option>

                    {pos.map((c, index) => (
                      <option key={index} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.pos &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.pos}
                    </small>}
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Mart logo (current)
                </label>
                <div className="col-lg-2  col-sm-12 d-flex flex-column justify-content-center align-items-start">
                  <>
                    <img
                      src={values.logo_url}
                      alt=""
                      style={{ width: "150px" }}
                    />
                    <input
                      className="form-control form-control-sm mt-5"
                      name="logo_url"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        dispatch(uploadMartLogo(e.target.files[0]))
                          .unwrap()
                          .then((res) => {
                            setFieldValue("logo_url", res.data.image_url);
                            setFieldValue("logo_name", res.data.image_name);
                          });
                      }}
                    />
                  </>
                </div>
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Mart logo push notification(current)
                </label>
                <div className="col-lg-2  col-sm-12 d-flex flex-column  justify-content-center align-items-start">
                  <>
                    <img
                      src={values.logo_push_url}
                      alt=""
                      style={{ width: "50px" }}
                    ></img>
                    <input
                      className="form-control  mt-5"
                      name="logo_push_url"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        dispatch(uploadMartLogo(e.target.files[0]))
                          .unwrap()
                          .then((res) => {
                            setFieldValue("logo_push_url", res.data.image_url);
                            setFieldValue(
                              "logo_push_name",
                              res.data.image_name
                            );
                          });
                      }}
                    />
                  </>
                </div>
              </div>
              <Divider text={"APP PUSH SETTING"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Android FCM key
                </label>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="push_key_android"
                    value={values.push_key_android}
                    onChange={(e) => {
                      //   setFieldValue("push_key_android", e.target.value);
                    }}
                  >
                    {fcmOptions?.map((item, index) => (
                      <option key={index} value={item.fcm_code}>
                        {item.fcm_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  IOS FCM key
                </label>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="push_key_ios"
                    value={values.push_key_ios}
                    onChange={(e) => {
                      //   setFieldValue("push_key_android", e.target.value);
                    }}
                  >
                    {fcmOptions?.map((item, index) => (
                      <option key={index} value={item.fcm_code}>
                        {item.fcm_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Divider text={"PAYMENT METHOD"} />
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
                            if (
                              newItem.payment_code === "COD" ||
                              newItem.payment_code === "CCOD"
                            ) {
                              return { ...newItem, checked: false };
                            } else {
                              return newItem;
                            }
                          })
                        );
                      } else {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if (
                              newItem.payment_code === "COD" ||
                              newItem.payment_code === "CCOD"
                            ) {
                              return { ...newItem, checked: true };
                            } else {
                              return newItem;
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
              <div className="ml-5 form-group d-flex" style={{ gap: 20 }}>
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
                            if (
                              newItem.payment_code === "COD" ||
                              newItem.payment_code === "CCOD"
                            ) {
                              return newItem;
                            } else {
                              return { ...newItem, checked: false };
                            }
                          })
                        );
                      } else {
                        setFieldValue(
                          "op_payment",
                          values?.op_payment.map((newItem) => {
                            if (
                              newItem.payment_code === "COD" ||
                              newItem.payment_code === "CCOD"
                            ) {
                              return newItem;
                            } else {
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
              <div className="ml-5 form-group d-flex" style={{ gap: 20 }}>
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

              <Divider text={"DELIVERY SETTING"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                    <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                    <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                         {errors.store_set_hour_start &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.store_set_hour_start}
                    </small>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                         {errors.store_set_hour_end &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.store_set_hour_end}
                    </small>}
                    </div>
                  </div>
                </>
              )}

              <Divider text={"CONTACT INFOMATION"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
              <Divider text={"ADMIN ACCOUNT INFOMARTION"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  ID
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="u_id"
                    placeholder="ID"
                    value={values.u_id}
                    onChange={(e) => {
                      setFieldValue("u_id", e.target.value);
                    }}
                  />
                  {idInvalid && (
                    <small className="invalid-feedback d-block">
                      <b className="red">Error: </b>
                      <FormattedMessage
                        id="u_id"
                        defaultMessage="ID already exists"
                        description=""
                      />
                    </small>
                  )}
                  {errors.u_id &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.u_id}
                    </small>}
                </div>

                <div className="col-lg-1">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => checkId(values.u_id)}
                  >
                    CHECK ID
                  </button>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Password
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="u_password"
                    placeholder="Password"
                    value={values.u_password}
                    onChange={(e) => {
                      setFieldValue("u_password", e.target.value);
                    }}
                  />
                     {errors.u_password &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.u_password}
                    </small>}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Password confirm
                </label>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="u_password_confirm"
                    placeholder="Password confirm"
                    value={values.u_password_confirm}
                    onChange={(e) => {
                      setFieldValue("u_password_confirm", e.target.value);
                    }}
                  />
                     {errors.u_password_confirm &&  <small className="invalid-feedback d-block">
                      <b className="text-danger red">*</b> {errors.u_password_confirm}
                    </small>}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Group account
                </label>
                <select
                  className="form-control ml-3 col-lg-2 col-sm-12"
                  name="add_group"
                  value={values.add_group}
                  onChange={(e) => {
                    setFieldValue("add_group", e.target.value);
                  }}
                >
                  <option value={""}>-- Choose --</option>
                  {groups.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Level account
                </label>
                <select
                  className="form-control ml-3 col-lg-2 col-sm-12"
                  name="add_level"
                  value={values.add_level}
                  onChange={(e) => {
                    setFieldValue("add_level", e.target.value);
                  }}
                >
                  <option value={""}>-- Choose --</option>
                  {level.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <Divider text={"BILLING INFOMATION"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                  <option value={""}>-- Choose --</option>
                  <option key={1} value={1}>
                    1
                  </option>
                  <option key={2} value={2}>
                    2
                  </option>
                </select>
              </div>
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Partner company
                </label>
                <select
                  className="form-control ml-3 col-lg-2 col-sm-12"
                  name="partner"
                  value={values.partner.code}
                  onChange={(e) => {
                    setFieldValue("partner", e.target.value);
                    handleFetchSales(e.target.value);
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
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Sale team
                </label>
                <select
                  className="form-control ml-3 col-lg-2 col-sm-12"
                  name="sale_team"
                  value={values.sale_team.code}
                  onChange={(e) => {
                    setFieldValue("sale_team", e.target.value);
                  }}
                >
                  <option value={""}>-- Choose --</option>
                  {sales.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <Divider text={"SUBCRIPTION"} />
              <div className="form-group row">
                <label className="col-form-label text-center col-lg-1 col-sm-12 ">
                  Subcription
                </label>
                <div className="col-lg-2  col-sm-12">
                  <RadioGroup
                    inline
                    name="s_type"
                    value={values.s_type}
                    onChange={(value, event) => {
                      setFieldValue("s_type", value);
                    }}
                  >
                    <Radio value="basic">Basic</Radio>
                    <Radio value="standard">Standard</Radio>
                    <Radio value="premium">Premium</Radio>
                  </RadioGroup>
                </div>
              </div>
              <Divider text={"OPTIONAL SERVICE"} />
              <div className="form-group row ml-10">
                <div className="d-flex col-lg-1" style={{ gap: 20 }}>
                  <label className=" text-center">Smart receipt</label>
                  <FormCheck
                    size="large"
                    key={values.receipt}
                    type="checkbox"
                    id={values.receipt}
                    checked={values.receipt === "Y"}
                    onChange={(e) => {
                      setFieldValue("receipt", e.target.checked ? "Y" : "N");
                    }}
                  />
                </div>
                <div className="d-flex col-lg-1" style={{ gap: 20 }}>
                  <label className=" text-center ">Local partner</label>
                  <FormCheck
                    size="large"
                    key={values.local_partner}
                    type="checkbox"
                    id={values.local_partner}
                    checked={values.local_partner === "Y"}
                    onChange={(e) => {
                      setFieldValue(
                        "local_partner",
                        e.target.checked ? "Y" : "N"
                      );
                    }}
                  />
                </div>
                <div className="d-flex col-lg-1" style={{ gap: 20 }}>
                  <label className="text-center">Web pop</label>
                  <FormCheck
                    size="large"
                    key={values.pop}
                    type="checkbox"
                    id={values.pop}
                    checked={values.pop === "Y"}
                    onChange={(e) => {
                      setFieldValue("pop", e.target.checked ? "Y" : "N");
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: "block", margin: "0 auto" }}
                onSubmit={() => handleSubmit()}
              >
                ADD NEW MART
              </button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
