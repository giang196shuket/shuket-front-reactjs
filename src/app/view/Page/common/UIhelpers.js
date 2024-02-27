export const initialFilter = {
  keywordType: "",
  keywordValue: "",
  status: "",
  orderBy: "", 
  page: 1,
  limit: 10,
};
export const orderList = [
  {
    text: "Newest",
    value: "newest",
  },
  {
    text: "Oldest",
    value: "oldest",
  },
]

export const statusList = [
  {
    text: "Active",
    value: "used",
    code:'A'
  },
  {
    text: "Deactive",
    value: "unused",
    code:'C'
  },
];
export const StatusCssClasses = {
  A: "info",
  C: "warning",
  D: "danger",
};
export const StatusTitles = {
  A: "Active",
  C: "Inactive",
  D: "Deleted",
};

export const defaultSorted = [{ dataField: "seq", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "15", value: 15 },
  { text: "20", value: 20 },
  { text: "30", value: 30 },
  { text: "50", value: 50 },
  { text: "100", value: 100 },
];

