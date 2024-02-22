import React from "react";

export const AP00000002BLOG = ({ dt }) => {
  return (
    dt && (
      <div style={{ margin: 5,height: "22em" }}>
        <img
          style={{ width: "100%", display: "block", margin: "auto" }}
          src={dt?.data_app?.contentsData[0]?.imageUrl?.url}
          alt=""
        />
        <p style={{textAlign:"center", marginTop:5}}>
          안녕하십니까, 마트퀸 고객 여러분. 2020년을 맞이하여 마트퀸에서는
          고객들에게 보다 나은
        </p>
      </div>
    )
  );
};
