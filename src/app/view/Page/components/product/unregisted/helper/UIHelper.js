export const keyTypeList = [
  { text: "Product name", value: "name" },
  { text: "Product barcode", value: "barcode" },
  { text: "Product code", value: "code" },
];
export const keyTypeImageProductList = [
  { text: "Image product tag", value: "tags" },
  { text: "Image product name", value: "name" },
];
export const keyTypeImage = [
  { text: "Main image", value: "main" },
  { text: "Sub image", value: "sub" },
];
export const statusImageList = [
  {
    text: "Have image",
    value: "Y",
  },
  {
    text: "No image",
    value: "N",
  },
];
export const statusStockList = [
  {
    text: "Stock smallest",
    value: "ASC",
  },
  {
    text: "Stock biggest",
    value: "DESC",
  },
];
export const statusList = [
  {
    text: "Active",
    value: "A",
    code: "A",
  },
  {
    text: "Deactive",
    value: "C",
    code: "C",
  },
  {
    text: "Out of stock",
    value: "O",
    code: "O",
  },
];


export const initialFilter = {
  keywordType: "",
  keywordValue: "",
  status: "",
  dateStart: "",
  dateEnd: "",
  orderBy: "newest",
  page: 1,
  limit: 10,
  categoryCode: "",
  categorySubCode: "",
  optionSearchImage : 'ALL'
};
