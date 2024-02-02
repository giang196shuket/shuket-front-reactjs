import React from "react";
import { formatPrice } from "../../../Helpers/funtion";

export const AP00000008 = ({ dt }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {dt?.data_app?.contentsData.map((dtc) => {
          return (
            <div style={{ margin: 5, width: "45%", height: "22em" }}>
              <img
                style={{ width: "100%", display: "block", margin: "auto" }}
                src={dtc.imageUrl.url}
                alt=""
              />
              <p>{dtc.productName}</p>

              {dtc.originalPrice > 0 ? (
                <p style={{ color: "red", textDecorationLine: "line-through" }}>
                  {formatPrice(dtc.retailPrice)} 원
                </p>
              ) : (
                <b>{formatPrice(dtc.retailPrice)} 원</b>
              )}
              {dtc.originalPrice > 0 ? <b>{formatPrice(dtc.originalPrice)}  원</b> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
