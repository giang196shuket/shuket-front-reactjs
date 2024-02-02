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
    entities.forEach((element) => {
      for (let i = 0; i <= element.productList.length; i++) {
        if (i === 0) {
          dataCsv.push({
            id: element.id,
            orderCode: element.orderCode,
            productName: "productName",
            productPrice: "productPrice",
            productQuantity: "productQuantity",
          });
        } else {
          dataCsv.push({
            id: "",
            orderCode: "",
            productName: element.productList[i - 1]?.P_NAME,
            productPrice: element.productList[i - 1]?.P_LIST_PRICE,
            productQuantity: element.productList[i - 1]?.O_QTY,
          });
        }
      }
      dataCsv.push({
        id: "",
        orderCode: "",
        productName: "",
        productPrice: "",
        productQuantity: "",
      });
    });
    console.log("entities", entities);

    console.log("dataCsv", dataCsv);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const headers = ["id", "order Code", "product"];

    const ws = XLSX.utils.aoa_to_sheet([
      headers,
      ...dataCsv.map(Object.values),
    ]);

    let merges = [];

    for (let i = 0; i < dataCsv.length; i++) {
      if (i === 0) {
        console.log(
          "id",
          dataCsv[i].id,
          entities.find((en) => en.id === dataCsv[i].id).productList?.length
        );

        merges.push({ s: { r: 0, c: 2 }, e: { r: 0, c: 4 } }); // Merge "product" column
        merges.push({
          s: { r: i + 1, c: 0 },
          e: {
            r:
              i +
              1 +
              entities.find((en) => en.id === dataCsv[i].id).productList
                ?.length,
            c: 0,
          },
        });
        merges.push({
          s: { r: i + 1, c: 1 },
          e: {
            r:
              i +
              1 +
              entities.find((en) => en.id === dataCsv[i].id).productList
                ?.length,
            c: 1,
          },
        });
      } else {
        if (dataCsv[i].id !== "") {
          console.log(
            "id",
            dataCsv[i].id,
            entities.find((en) => en.id === dataCsv[i].id).productList?.length
          );

          merges.push({
            s: { r: i + 1, c: 0 },
            e: {
              r:
                i +
                1 +
                entities.find((en) => en.id === dataCsv[i].id).productList
                  ?.length,
              c: 0,
            },
          });
          merges.push({
            s: { r: i + 1, c: 1 },
            e: {
              r:
                i +
                1 +
                entities.find((en) => en.id === dataCsv[i].id).productList
                  ?.length,
              c: 1,
            },
          });
        } else if (
          dataCsv[i].id === "" &&
          dataCsv[i].orderCode === "" &&
          dataCsv[i].productPrice === "" &&
          dataCsv[i].productQuantity === ""
        ) {
          merges.push({
            s: { r: i + 1, c: 1 },
            e: {
              r: i + 1,
              c: 5,
            },
          });
        }
      }
    }


    let odd = 0
    for (const [key, value] of Object.entries(ws)) {
      if (typeof value === "object") {
     
          if(value.v !== "" && key !== "A1" && key !== "B1" && key !== "C1" &&  value.v !== "productName" &&
          value.v !== "productPrice" &&
          value.v !== "productQuantity"){
            if(odd === 0){
              console.log('odd')
              value.odd = 0
              odd = 1
            }else{
              console.log('even')
              value.odd = 1
              odd = 0
            }
          }
      }
    }
    console.log(ws);

    for (const [key, value] of Object.entries(ws)) {
      if (typeof value === "object") {
        if (value.v !== "" && (key !== "A1" || key !== "B1" || key !== "C1")) {
          if (
            value.v === "productName" ||
            value.v === "productPrice" ||
            value.v === "productQuantity"
          ) {
            value.s = {
              fill: { fgColor: { rgb: "F0F5FB" }, patternType: "solid" },
              font: {
                sz: 15,
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
          } else {
            if (value.odd === 0) {
              value.s = {
                fill: { fgColor: { rgb: "FBF6F0" }, patternType: "solid" },
                font: {
                  sz: 15,
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
            } else if(value.odd === 1) {
              value.s = {
                fill: { fgColor: { rgb: "F0FBF6" }, patternType: "solid" },
                font: {
                  sz: 15,
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
          }
        } else {
          value.s = {
            font: {
              sz: 15,
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
      }
    }

    ws["!merges"] = merges;
    ws["!cols"] = [
      { width: 10 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
    ];

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const buffet = new Blob([excelBuffer], { type: fileType });
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
