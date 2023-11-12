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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  brandDeleteAction,
  brandGetItemEditAction,
  brandListAllAction,
} from "../../redux/actions/BrandAction";
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
  Text,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const BtnPrimary = styled.button`
  padding: 10px 40px;
  background-color: #333;
  outline: 1px solid #333;
  color: white;
  &:hover {
    background-color: none;
  }
`;

const BrandTable = () => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { categoryItemUpdate } = useSelector((state) => state.categoryUpdate);

  console.log(categoryItemUpdate);

  const { brands } = brandList;
  console.log(brands);

  useEffect(() => {
    dispatch(brandListAllAction());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(brandDeleteAction(id));
  };

  const updateHandler = (category) => {
    dispatch(brandGetItemEditAction(category));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
              <Th>Brand's name</Th>
              <Th scope="col">Origin</Th>
              <Th className="text-end">Action</Th>
            </Tr>
          </Thead>
          {/* Table Data */}
          <Tbody>
            {brands?.map((brand, index) => (
              <Tr key={index}>
                <Td>
                  <Stack>
                    <Checkbox type="checkbox" value={brand._id} />
                  </Stack>
                </Td>
                <Td>{index + 1}</Td>
                <Td>
                  <b>{brand.brandName}</b>
                </Td>
                <Td>{brand.origin}</Td>
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
                      <Link
                        className="dropdown-item"
                        onClick={() => {
                          onOpen();
                          updateHandler(brand);
                        }}
                      >
                        Edit information
                      </Link>

                      <Link
                        className="dropdown-item text-danger"
                        onClick={() => deleteHandler(brand._id)}
                      >
                        Delete
                      </Link>
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
                  Brand name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control py-3"
                  id="product_name"
                  value={categoryItemUpdate?.name}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Origin</label>
                <textarea
                  placeholder="Type here"
                  className="form-control"
                  rows="4"
                  value={categoryItemUpdate?.description}
                ></textarea>
              </div>
              <Box
                display="flex"
                justifyContent="center"
                borderWidth="1px"
                alignItems="center"
                borderRadius="lg"
                mb="20px"
              >
                <Image
                  boxSize="200px"
                  src={categoryItemUpdate?.image}
                  alt="Dan Abramov"
                />
              </Box>
              <div className="mb-4">
                <input type="file" accept="image/*" />
              </div>

              <div className="d-grid">
                <BtnPrimary className="py-3" type="submit">
                  Add category
                </BtnPrimary>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Đóng
            </Button>
            <Button variant="ghost">Cập nhật</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandTable;
