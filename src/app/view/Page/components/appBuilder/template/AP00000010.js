import React from "react";

export const AP00000010 = ({ dt }) => {
  return dt?.data_app?.contentsData.length === 1 ? (
    <img
      className="d-block w-100"
      src={dt?.data_app?.contentsData[0].imageUrl}
      alt=""
    />
  ) : (
    <div
      style={{
        overflowX: "hidden",
        width: "100%",
        display: "flex",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {dt?.data_app?.contentsData.map((dtc) => {
        return (
          <div style={{margin:5}}>
            <img style={{ width: "70px" }} src={dtc.imageUrl} alt="" />
            <p style={{ textAlign: "center" }}>{dtc.cateName}</p>
          </div>
        );
      })}
    </div>
  );
};
