import {
  Checkbox,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  categoryDeleteAction,
  categoryUpdateAction,
  categoryListAllAction,
} from "../../redux/actions/CategoryAction";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading } = useSelector((state) => state.categoryUpdate);

  const [categoryNameUpdate, setCategoryNameUpdate] = useState();
  const [descriptionUpdate, setDescriptionUpdate] = useState();
  const [categoryIdUpdate, setCategoryIdUpdate] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { categories } = categoryList;
  useEffect(() => {
    dispatch(categoryListAllAction());
  }, [dispatch, categoryCreate, loading]);

  const deleteHandler = (id) => {
    dispatch(categoryDeleteAction(id));
  };

  const clickPopUpUpdateForm = (category) => {
    setCategoryNameUpdate(category.categoryName);
    setDescriptionUpdate(category.description);
    setCategoryIdUpdate(category._id);
  };

  const submitUpdateHandler = (e) => {
    dispatch(
      categoryUpdateAction(
        categoryIdUpdate,
        categoryNameUpdate,
        descriptionUpdate
      )
    );
  };

  return (
    <>
      <TableContainer className="col-md-12 col-lg-8">
        <Table className="table">
          <Thead>
            <Tr>
              <Th>
                <Stack>
                  <Checkbox type="checkbox" value="" />
                </Stack>
              </Th>
              <Th>ID</Th>
              <Th>Category's name</Th>
              <Th scope="col">Description</Th>
              <Th className="text-end">Action</Th>
            </Tr>
          </Thead>
          {/* Table Data */}
          <Tbody>
            {categories?.map((category, index) => (
              <Tr key={index}>
                <Td>
                  <Stack>
                    <Checkbox type="checkbox" value={category._id} />
                  </Stack>
                </Td>
                <Td>{index + 1}</Td>
                <Td>
                  <b>{category.categoryName}</b>
                </Td>
                <Td>{category.description}</Td>
                <Td className="text-end">
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="btn btn-light"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          onOpen();
                          clickPopUpUpdateForm(category);
                        }}
                      >
                        Edit information
                      </button>

                      <button
                        className="dropdown-item text-danger"
                        onClick={() => deleteHandler(category._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật brand</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div className="mb-4">
                <label htmlFor="product_name" className="form-label">
                  Category name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control py-3"
                  id="product_name"
                  value={categoryNameUpdate}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Vui lòng nhập tên danh mục");
                  }}
                  onChange={(e) => setCategoryNameUpdate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Type here"
                  className="form-control"
                  rows="4"
                  value={descriptionUpdate}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Vui lòng nhập mô tả danh mục");
                  }}
                  onChange={(e) => setDescriptionUpdate(e.target.value)}
                ></textarea>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Đóng
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                submitUpdateHandler();
                onClose();
              }}
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoriesTable;
