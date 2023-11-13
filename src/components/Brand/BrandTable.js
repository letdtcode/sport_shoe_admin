import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  brandDeleteAction,
  brandListAllAction,
  brandUpdateAction,
} from "../../redux/actions/BrandAction";
import "react-toastify/dist/ReactToastify.css";
import {
  Image,
  Checkbox,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const BrandTable = () => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const brandCreate = useSelector((state) => state.brandCreate);
  const { loading } = useSelector((state) => state.brandUpdate);

  const [brandNameUpdate, setBrandNameUpdate] = useState();
  const [originUpdate, setOriginUpdate] = useState();
  const [brandIdUpdate, setBrandIdUpdate] = useState();
  const [urlImage, setUrlImage] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { brands } = brandList;

  const [imageFile, setImageFile] = useState(null);

  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
    setUrlImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(brandListAllAction());
  }, [dispatch, brandCreate, loading]);

  const deleteHandler = (id) => {
    dispatch(brandDeleteAction(id));
  };

  const clickPopUpUpdateForm = (brand) => {
    setBrandNameUpdate(brand.brandName);
    setOriginUpdate(brand.origin);
    setBrandIdUpdate(brand._id);
    setUrlImage(brand.imageUrl);
  };

  const submitUpdateHandler = (e) => {
    if (imageFile !== null) {
      dispatch(
        brandUpdateAction(
          brandIdUpdate,
          brandNameUpdate,
          originUpdate,
          imageFile
        )
      );
    } else {
      dispatch(
        brandUpdateAction(
          brandIdUpdate,
          brandNameUpdate,
          originUpdate,
          urlImage
        )
      );
    }
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
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          onOpen();
                          clickPopUpUpdateForm(brand);
                        }}
                      >
                        Edit information
                      </button>

                      <button
                        className="dropdown-item text-danger"
                        onClick={() => deleteHandler(brand._id)}
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
                  Brand name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control py-3"
                  id="product_name"
                  value={brandNameUpdate}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Vui lòng nhập tên danh mục");
                  }}
                  onChange={(e) => setBrandNameUpdate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Origin</label>
                <textarea
                  placeholder="Type here"
                  className="form-control"
                  rows="4"
                  value={originUpdate}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Vui lòng nhập mô tả danh mục");
                  }}
                  onChange={(e) => setOriginUpdate(e.target.value)}
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
export default BrandTable;
