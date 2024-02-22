import React from "react";

export const AP00000007 = ({ dt }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap:10, marginTop:20 }}>
      {dt.data_app.contentsData.map((dtc) => {
        return (
          <div style={{ backgroundColor: dtc.colorCate, width:"30%", height:"10em", display:'flex', alignItems:'center', justifyContent:'center' }}>
            <p >{dtc.cateName}</p>
          </div>
        );
      })}
      
    </div>
  );
};
