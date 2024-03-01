export const keyTypeList = [
  { text: "Product tag", value: "prd_tags" },
  { text: "Product name", value: "prd_name" },
  { text: "Product barcode", value: "prd_barcode" },
  { text: "Product code", value: "prd_code" },
  { text: "Provider", value: "provider" },
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
export const caseHeadOrFranch = ["GSK", "YSK"];
export const initailFilterImgProduct = {
  img_barcode: 1,
  img_cate: "",
  img_keyword: "tags",
  img_type: "all",
  img_value: "",
};
export const initialFilter = {
  keywordType: "",
  keywordValue: "",
  status: "",
  dateStart: "",
  dateEnd: "",
  orderBy: "",
  page: 1,
  limit: 10,
  category_code: "",
  category_sub_code: "",
  option_check_stock: "N",
  stock_search_value: "",
  product_no_image: "",
  product_only_brgn: "N",
  sort_prd_stock: "",
};
