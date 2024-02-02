import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx-js-style";
import { Button } from "react-bootstrap";

export const ExportCSVGroup = ({ csvData, fileName, UIProps }) => {
  console.log("UIProps", UIProps.ids);
  let entities = [];
  UIProps?.ids.forEach((ele) => {
    const object = csvData.find((obj) => obj.id === ele);
    if (object) {
      entities.push(object);
    }
  });

  const exportToCSV = (entities, fileName) => {
    let dataCsv = [];
    let maxColumn = 12;
    let mergeTemp = 2;
    entities.forEach((element) => {
      let totalQuantity = 0;
      let lastNo = 0;

      // lấy total quantity
      for (let i = 0; i < element.productList.length; i++) {
        totalQuantity += element?.productList[i]?.O_QTY;
        lastNo = element.productList.length;
      }
      dataCsv.push({
        id: element.id,
        orderCode: element.orderCode + "\n" + element.orderDate, // tạo khoảng cách để tự động xuống hàng nhờ wraptext,
        orderCustomer:
          element.orderCustomer + "\n" + element.orderCustomerPhone, // tạo khoảng cách để tự động xuống hàng nhờ wraptext
        orderAddress: element.orderAddress,
        productNo: lastNo,
        productName: "_",
        productCode: "_",
        productCate: "_",
        productQuantity: totalQuantity,
        orderPayPrice: element.orderPayPrice,
        orderPayment: element.orderPayMethod,
        status: element.statusColorBox,
        orderStatusText: element.orderStatusText,
      });

      for (let i = 0; i <= element.productList.length; i++) {
        if (i === 0) {
          dataCsv.push({
            id: "",
            orderCode: "",
            orderCustomer: "",
            orderAddress: "",
            productNo: "productNo",
            productName: "productName",
            productCode: "productCode",
            productCate: "productCate",
            productQuantity: "productQuantity",
            orderPayPrice: "",
            orderPayment: "",
            status: "",
            orderStatusText: "",
          });
        } else {
          dataCsv.push({
            id: "",
            orderCode: "",
            orderCustomer: "",
            orderAddress: "",
            productNo: element?.productList[i - 1]?.id,
            productName: element?.productList[i - 1]?.P_NAME,
            productCode: element?.productList[i - 1]?.P_BARCODE,
            productCate:
              element?.productList[i - 1]?.P_CAT +
              " > " +
              element?.productList[i - 1]?.P_CAT_MID +
              " > " +
              element?.productList[i - 1]?.P_CAT_SUB,
            productQuantity: element?.productList[i - 1]?.O_QTY,
            orderPayPrice: "",
            orderPayment: "",
            status: "",
            orderStatusText: "",
          });
        }
      }

      dataCsv.push({
        id: "",
        orderCode: "",
        orderCustomer: "",
        orderAddress: "",
        productNo: "",
        productName: "",
        productCode: "",
        productCate: "",
        productQuantity: "",
        orderPayPrice: "",
        orderPayment: "",
        status: "",
        orderStatusText: "",
      });
    });
    console.log("entities", entities);
    console.log("dataCsv", dataCsv);

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const title = [fileName];
    const headers = [
      "id",
      "orderCode",
      "orderCustomer",
      "orderAddress",
      "product",
      "",
      "",
      "",
      "",
      "orderPayPrice",
      "orderPayment",
      "status",
    ];

    const ws = XLSX.utils.aoa_to_sheet([
      // title,
      headers,
      ...dataCsv.map(Object.values),
    ]);

    let merges = [
      // { s: { r: 0, c: 0 }, e: { r: 0, c: maxColumn } },  //  merge column của title
      { s: { r: 0, c: 4 }, e: { r: 0, c: maxColumn - 4 } }, //  merge column của product
      { s: { r: 0, c: 11 }, e: { r: 0, c: maxColumn } }, // merge column của status
    ];
    for (let i = 0; i < dataCsv.length; i++) {
      if (dataCsv[i].id !== "") {
        //id
        merges.push({
          s: { r: i + 1, c: 0 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 0,
          },
        });
        // orderCode
        merges.push({
          s: { r: i + 1, c: 1 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 1,
          },
        });
        //customer
        merges.push({
          s: { r: i + 1, c: 2 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 2,
          },
        });
        //address
        merges.push({
          s: { r: i + 1, c: 3 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 3,
          },
        });
        //payment PRICE
        merges.push({
          s: { r: i + 1, c: 9 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 9,
          },
        });
        //payment
        merges.push({
          s: { r: i + 1, c: 10 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: 10,
          },
        });
        //status
        merges.push({
          s: { r: i + 1, c: maxColumn - 1 },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: maxColumn - 1,
          },
        });
        merges.push({
          s: { r: i + 1, c: maxColumn },
          e: {
            r:
              i +
              mergeTemp +
              entities.find((en) => en.id === dataCsv[i].id)?.productList
                ?.length,
            c: maxColumn,
          },
        });
      } else if (
        dataCsv[i].id === "" &&
        dataCsv[i].orderCode === "" &&
        dataCsv[i].orderCustomer === "" &&
        dataCsv[i].orderAddress === "" &&
        dataCsv[i].productNo === "" &&
        dataCsv[i].productName === "" &&
        dataCsv[i].productCode === "" &&
        dataCsv[i].productCate === "" &&
        dataCsv[i].productQuantity === "" &&
        dataCsv[i].orderPayPrice === "" &&
        dataCsv[i].orderPayment === "" &&
        dataCsv[i].status === "" &&
        dataCsv[i].orderStatusText === ""
      ) {
        // hàng rỗng khoảng cách
        merges.push({
          s: { r: i + 1, c: 0 },
          e: {
            r: i + 1,
            c: maxColumn,
          },
        });
      }
    }

    // sét chẵn lẽ
    let odd = false;
    let character = 0;
    for (const [key, value] of Object.entries(ws)) {
      if (
        typeof value === "object" &&
        value.v !== "id" &&
        value.v !== "orderCode" &&
        value.v !== "orderCustomer" &&
        value.v !== "orderAddress" &&
        value.v !== "product" &&
        value.v !== "orderPayPrice" &&
        value.v !== "orderPayment" &&
        value.v !== "status" &&
        value.v !== "orderStatusText"
      ) {
        const characterTemp = key.substring(1, 3);

        if (
          ws["A" + characterTemp]?.v === "" &&
          ws["B" + characterTemp]?.v === "" &&
          ws["C" + characterTemp]?.v === "" &&
          ws["D" + characterTemp]?.v === "" &&
          ws["E" + characterTemp]?.v === "" &&
          ws["F" + characterTemp]?.v === "" &&
          ws["G" + characterTemp]?.v === "" &&
          ws["H" + characterTemp]?.v === "" &&
          ws["I" + characterTemp]?.v === "" &&
          ws["J" + characterTemp]?.v === "" &&
          ws["K" + characterTemp]?.v === "" &&
          ws["L" + characterTemp]?.v === "" &&
          ws["M" + characterTemp]?.v === ""
        ) {
          if (odd === false && character === 0) {
            //khi gặp dấu cách lần đầu
            odd = true;
            character = characterTemp;
          }
          if (character !== characterTemp) {
            // khi gặp dấu cách 1 lần nữa
            odd = !odd;
            character = characterTemp;
          }
        } else {
          value.odd = odd;
        }
      }
    }

    for (const [key, value] of Object.entries(ws)) {
      if (typeof value === "object") {
        if (value.v !== "") {
          //header
          if (
            key === "A1" ||
            key === "B1" ||
            key === "C1" ||
            key === "D1" ||
            key === "E1" ||
            key === "J1" ||
            key === "K1" ||
            key === "L1" ||
            key === "M1"
          ) {
            value.s = {
              fill: { fgColor: { rgb: "FBF6F0" }, patternType: "solid" },
              font: {
                sz: 11,
                boldF: true,
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
              },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          }
          // tô màu lớp header con
          else if (
            value.v === "productNo" ||
            value.v === "productName" ||
            value.v === "productCode" ||
            value.v === "productCate" ||
            value.v === "productQuantity"
          ) {
            value.s = {
              fill: { fgColor: { rgb: "D8D8D8" }, patternType: "solid" },
              font: {
                sz: 11,
                boldF: true,
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
              },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          } else if (typeof value.v === "string" && value.v.includes("#")) {
            // màu status
            value.s = {
              fill: {
                fgColor: { rgb: value.v.replace("#", "") },
                patternType: "solid",
              },
              font: {
                sz: 11,
                boldF: true,
                color: { rgb: value.v.replace("#", "") },
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          } else {
            // tô màu chẳn
            if (value.odd === true) {
              value.s = {
                fill: { fgColor: { rgb: "FBF6F0" }, patternType: "solid" },
                font: {
                  sz: 11,
                  boldF: true,
                },
                alignment: {
                  horizontal: "center",
                  vertical: "center",
                  wrapText: true,
                },
                border: {
                  top: { style: "thin", color: { rgb: "000000" } },
                  bottom: { style: "thin", color: { rgb: "000000" } },
                  left: { style: "thin", color: { rgb: "000000" } },
                  right: { style: "thin", color: { rgb: "000000" } },
                },
                numFmt: "0"
              };
            } else if (value.odd === false) {
              // tô màu lẻ
              value.s = {
                fill: { fgColor: { rgb: "FFFFFF" }, patternType: "solid" },
                font: {
                  sz: 11,
                  boldF: true,
                },
                alignment: {
                  horizontal: "center",
                  vertical: "center",
                  wrapText: true,
                },
                border: {
                  top: { style: "thin", color: { rgb: "000000" } },
                  bottom: { style: "thin", color: { rgb: "000000" } },
                  left: { style: "thin", color: { rgb: "000000" } },
                  right: { style: "thin", color: { rgb: "000000" } },
                },
                numFmt: "0"

              };
            }
          }
        } else {
          // border các cell còn lại
          value.s = {
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }
    }

    let rowLength = 0;
    //lấy độ dài rows
    for (const [key, value] of Object.entries(ws)) {
      if (typeof value === "object") {
        rowLength = key.substring(1, 3);
      }
    }
    // generate chiều cao
    let rows = [];
    for (let i = 1; i < rowLength; i++) {
      if (
        ws["A" + i]?.v === "" &&
        ws["B" + i]?.v === "" &&
        ws["C" + i]?.v === "" &&
        ws["D" + i]?.v === "" &&
        ws["E" + i]?.v === "" &&
        ws["F" + i]?.v === "" &&
        ws["G" + i]?.v === "" &&
        ws["H" + i]?.v === "" &&
        ws["I" + i]?.v === "" &&
        ws["J" + i]?.v === "" &&
        ws["K" + i]?.v === "" &&
        ws["L" + i]?.v === "" &&
        ws["M" + i]?.v === ""
      ) {
        // row rỗng
        rows.push({ hpx: 10 });
      } else {
        rows.push({ hpx: 30 });
      }
    }
    //generate độ rộng
    let cols = [];
    for (let i = 0; i <= maxColumn; i++) {
      if (i === 0) {
        //id
        cols.push({ width: 5 });
      } else if (i === 2 || i === 4 || i === 9 || i === 10 || i === 12 || i === 4) {
        //ordercustomer, productno, productquantity , pay price, payment, status, productNo,
        cols.push({ width: 15 });
      }else if(i === 8){
        // productQuantity
        cols.push({ width: 18 });

      } else if(i === 7){
        // productCate
        cols.push({ width: 30 });

      } else if (i === maxColumn - 1) {
        //color box
        cols.push({ width: 2 });
      } else {
        cols.push({ width: 25 });
      }
    }

    ws["!merges"] = merges;
    ws["!cols"] = cols;
    ws["!rows"] = rows;

    console.log(ws);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const buffet = new Blob([excelBuffer], { type: fileType });
    console.log("fileName", fileName);
    FileSaver.saveAs(buffet, fileName + fileExtension);
  };

  return (
    <Button
      className="mr-5"
      variant="success"
      onClick={(e) => exportToCSV(entities, fileName)}
    >
      Export CSV GROUP
    </Button>
  );
};
