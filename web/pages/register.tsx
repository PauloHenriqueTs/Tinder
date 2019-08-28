import React from "react";

import RegisterView from "../components/view/RegisterView";

const Register = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <RegisterView />
      </div>
    </div>
  );
};

export default Register;
