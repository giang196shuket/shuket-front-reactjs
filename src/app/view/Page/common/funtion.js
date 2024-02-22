import moment from "moment";
export const generateCSVName = (name) => {
  return `${name}_${moment().format("YYYY_MM_DD")}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

