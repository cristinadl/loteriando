import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const FileDisplay = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    getImages();
  }, []);

  function getImages() {
    axios
      .get("http://127.0.0.1:8080/images")
      .then((response) => {
        if (response.status === 200) {
          setTitle(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="card-title fw-bold"> Images List </h4>
            </div>
            <div className="card-body">
              <div className="row">
                {title.length > 0 ? (
                  title.map((image) => (
                    <div className="col-lg-3" key={image.id}>
                      <img
                        src={
                          "http://127.0.0.1:8080/static/uploads/" + image.title
                        }
                        className="img-fluid img-bordered"
                        width="200px"
                      />
                    </div>
                  ))
                ) : (
                  <h6 className="text-danger text-center">No Image Found </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileDisplay;
