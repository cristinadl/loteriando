import React, { useState } from "react";
import Axios from "axios";

const FileDisplay = (props) => {
  const [image, setImage] = useState("");
  const getImage = () => {
    Axios.get("http://127.0.0.1:8080/get-image", {
      responseType: "arraybuffer",
    }).then((res) => {
      const base64 = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImage(base64);
    });
  };
  return (
    <>
      <h2>Your Shopping Cart</h2>
      <img src={"http://localhost:8080/get-image"} />
    </>
  );
};

export default FileDisplay;
