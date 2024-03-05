import React from "react";

export const ProductPrice = ({ row }) => {
  return (
    <div>
      <p className="text-muted text-center">
        <s>{row.list_price} 원</s>
      </p>
      <p className="text-center">
        {row.sale_price} 원 <b style={{ color: "red" }}> {row.sale_percent}%</b>
      </p>

      <p className="text-center">{row.sale_src}</p>
      <p className="text-center">{row.sale_title}</p>

      {row.priceUpDown === "U" ? (
        <div style={{ color: "green", backgroundColor: "#DCF2F1", padding: 5 }}>
          <p className="text-center">{row.price_show} 원</p>
          <p className="text-center">
            <i className="fa fa-arrow-up mr-2 text-success" ></i>
            {row.priceNumber}{" "}
            {row.priceType === "PC"
              ? "%"
              : row.priceType === "AM"
              ? "원"
              : ""}
          </p>
        </div>
      ) : row.priceUpDown === "D" ? (
        <div style={{ color: "red", backgroundColor: "#DCF2F1", padding: 5 }}>
          <p className="text-center">{row.price_show} 원</p>
          <p className="text-center">
          <i className="fa fa-arrow-down mr-2 text-danger" ></i>
            {row.priceNumber}{" "}
            {row.priceType === "PC"
              ? "%"
              : row.priceType === "AM"
              ? "원"
              : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
};
