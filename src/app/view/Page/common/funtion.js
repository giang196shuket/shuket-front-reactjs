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

//tìm id lớn nhất trong 1 mảng object
export function findMaxId(objectsArray, filed) {
  let maxId = -Infinity;
  for (let obj of objectsArray) {
      if (obj[filed] > maxId) {
          maxId = obj[filed];
      }
  }
  return maxId;
}
// ngủ
export function sleep(callback) {
  setTimeout(function() {
     callback();
  }, 5000); // 1000 milliseconds = 1 giây
}