import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { createBrandAction } from "../../redux/actions/BrandAction";
import { BRAND_CREATE_RESET } from "../../redux/constants/BrandConstant";
import Message from "../LoadingError/Error";
import { Image } from "@chakra-ui/react";

const BtnPrimary = styled.button`
  padding: 10px 40px;
  background-color: #333;
  outline: 1px solid #333;
  color: white;
  &:hover {
    background-color: none;
  }
`;

const CreateBrand = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const brandCreate = useSelector((state) => state.brandCreate);
  const { error, brand } = brandCreate;
  const [imageFile, setImageFile] = useState(null);
  const [urlImage, setUrlImage] = useState(null);

  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
    setUrlImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (brand) {
      setName("");
      setOrigin("");
      dispatch({ type: BRAND_CREATE_RESET });
    }
  }, [dispatch, brand]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBrandAction(name, origin, imageFile));
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Brand's name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="product_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Origin</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              style={{ height: "80px" }}
              rows="4"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label">Image</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={urlImage}
                boxSize="150px"
                fallbackSrc="https://via.placeholder.com/150"
                alt="Dan Abramov"
              />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            style={{ marginBottom: "15px" }}
          />
          <div className="d-grid">
            <BtnPrimary className="py-3" type="submit">
              Add category
            </BtnPrimary>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBrand;
