

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
export const deliveryTimeList = [
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
  keywordType: "",
  keywordValue: "",
  status: "",
  appType: "",
  useStock: false,
  isSyncOrder: false,
  orderBy: "",
  sortField: "registerDate",
  page: 1,
  limit: 10,
};
