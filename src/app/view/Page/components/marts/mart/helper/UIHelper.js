export const keyTypeList = [
  { text: "Mart Name", value: "mart_name" },
  { text: "Mart Code", value: "mart_code" },
  { text: "Mart PosCode", value: "mart_p_regcode" },
  { text: "Mart HQ Code", value: "mart_hq_code" },
];

export const businessTypeList = [
  { text: "Franchise mart", value: "FA" },
  { text: "Franchise mart + url order only", value: "FW" },
  { text: "Franchise mart +  use of both service", value: "FB" },
  { text: "single mart", value: "SA" },
  { text: "single mart + url order only", value: "SW" },
  { text: "single mart + use of both service", value: "SB" },
];

export const pickupTimeList = [
  { text: "30 minues", value: "30" },
  { text: "60 minues", value: "60" },
  { text: "90 minues", value: "90" },
  { text: "120 minues", value: "120" },
];

export const date = {
  startTime: new Date("2023-02-01 00:00:00"),
  endTime: new Date("2023-03-01 23:59:59"),
};

export const caseHeadOrFranch = ["GSK", "YSK"];

export const initialFilter = {
  status: "",
  keywordType: "",
  keywordValue: "",
  appType: "",
  useStock: false,
  isSyncOrder: false,
  page: 1,
  limit: 10,
};
export const initialAdd = {
  u_id:"",
  u_password:"",
  u_password_confirm:"",
  add_level:"",
  add_group:"",
  hq_code: "",
  headFranchiseType: "F",
  mart_code: "",
  mart_type: "SG",
  show_franchise: "N",
  logo_name: "",
  logo_push_name: "",
  logo_url: "",
  logo_push_url: "",
  mart_display_status: "Y",
  mart_name: "",
  license: "",
  phone: "",
  address: "",
  partner: "SP00000001",
  sale_team: "",
  city: "",
  district: "",
  pos: "",
  pos_regcode: "",
  group_no: "",
  pos_code: "",
  pos_connect: "N",
  is_use_ymart: "N",
  pg_code: "123456",
  term_id: "nicepay00m",
  mpass:
    "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==",
  bizhour_open: "00:00",
  bizhour_close: "00:00",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  s_type: "basic",
  s_payment: "CMS",
  s_date_service: "1970-01-01",
  s_date_billing: "1970-01-01",
  s_discount: "",
  s_discount_period: "",
  receipt: "Y",
  local_partner: "N",
  mart_db: "",
  pop: "Y",
  status: "A",
  is_tdc: "Y",
  integrated_messging: "N",
  hideInitial: 1,
  op_payment: [
    {
      payment_code: "SKP",
      payment_lang_ko: "간편결제 (슈켓 PAY)",
      payment_lang_en: "Shuket-pay",
      checked: true,
    },
    {
      payment_code: "BANK",
      payment_lang_ko: "계좌 이체",
      payment_lang_en: "BANK",
      checked: true,
    },
    {
      payment_code: "CARD",
      payment_lang_ko: "카드결제",
      payment_lang_en: "Card Payment",
      checked: true,
    },
    {
      payment_code: "KKP",
      payment_lang_ko: "카카오페이",
      payment_lang_en: "Kakao-pay",
      checked: true,
    },
    {
      payment_code: "NP",
      payment_lang_ko: "네이버페이",
      payment_lang_en: "Naver-pay",
      checked: true,
    },
    {
      payment_code: "CCOD",
      payment_lang_ko: "현장카드결제",
      payment_lang_en: "On-site credit card payment",
      checked: true,
    },
    {
      payment_code: "COD",
      payment_lang_ko: "현장현금결제",
      payment_lang_en: "On-site cash payment",
      checked: true,
    },
    {
      payment_code: "VBANK",
      payment_lang_ko: "가상계좌(무통장입금)",
      payment_lang_en: "Virtual account",
      checked: true,
    },
  ],
  paymentOnline: "Y",
  paymentCOD: "Y",
  mart_business_type: "SA",
  push_key_android: "FCM0000001",
  push_key_ios: "FCM0000001",
  set_delivery: "Y",
  store_set_hour: "Y",
  store_pickup_cod: "N",
  store_set_hour_start: "00:00",
  store_set_hour_end: "00:00",
  store_pick_time_interval: 60,
  order_sync: "N",
  can_edit_sync_order: "Y",
  is_custom_app: "Y",
  is_extend_brgn: "N",
  account_status: "A",
  value_sync_image_by_group: "",
  receive_option: "D",
  receive_begin_hours: "",
  receive_end_hours: "",
 
};
