import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { createCategoryAction } from "../../redux/actions/CategoryAction";
import { CATEGORY_CREATE_RESET } from "../../redux/constants/CategoryConstant";
import Message from "../LoadingError/Error";
const BtnPrimary = styled.button`
  padding: 10px 40px;
  background-color: #333;
  outline: 1px solid #333;
  color: white;
  &:hover {
    background-color: none;
  }
`;

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      setName("");
      setDescription("");
      setImage("");
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
  }, [dispatch, category]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(name, description, image));
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Tên danh mục
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
            <label className="form-label">Hình ảnh</label>
            <input
              className="form-control"
              type="text"
              placeholder="Inter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {/* <input
              className="form-control mt-3"
              type="file"
              value={image}
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            /> */}
          </div>
          <div className="mb-4">
            <label className="form-label">Mô tả</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <BtnPrimary className="py-3" type="submit">
              Tạo danh mục
            </BtnPrimary>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
