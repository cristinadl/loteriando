import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const FileUpload = () => {
  const [image, setImage] = useState({});
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // image onchange hander
  const handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      fileValidate(e.target.files[i]);
      imagesArray.push(e.target.files[i]);
    }
    setImage(imagesArray);
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < image.length; i++) {
      data.append("files[]", image[i]);
    }

    axios
      .post("http://127.0.0.1:8080/upload", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setStatus(response.data.status);
          setMessage(response.data.message);
          setTimeout(() => {
            setImage({});
            setMessage("");
          }, 100000);

          document.querySelector("#imageForm").reset();
        }
        alert("Successfully Uploaded");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      });
  };

  // file validation
  const fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      setMessage("");
      setError("");

      return true;
    } else {
      setError("File type allowed only jpg, png, jpeg");
      return false;
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            id="imageForm"
          >
            <div className="card shadow">
              {status === "successs" ? (
                <div className="alert alert-success">{message}</div>
              ) : status === "failed" ? (
                <div className="alert alert-danger">{message}</div>
              ) : (
                ""
              )}
              <div className="card-header">
                {/* <h4 className="card-title fw-bold">
                  React-JS and Python Flask Multiple Image Upload with
                  validation
                </h4> */}
              </div>

              <div className="card-body">
                <div className="form-group py-2">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span className="text-danger">{error}</span>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FileUpload;
