import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDeleteAction } from "../../redux/actions/ProductAction";
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import Loading from "../LoadingError/Loading";

const Product = (props) => {
  const dispatch = useDispatch();
  const { product, successLoading } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const deleteHandler = (id) => {
    dispatch(productDeleteAction(id));
  };

  return (
    <>
      {
        (successLoading && <Loading />,
        (
          <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
            <div className="card card-product-grid shadow-sm">
              <Link to={`/product/${product._id}/edit`} className="img-wrap">
                <img src={product.image} alt="Product" />
              </Link>
              <div className="info-wrap">
                <Link
                  to={`/product/${product._id}/edit`}
                  className="title text-truncate"
                >
                  {product.name}
                </Link>
                <div className="price mb-2">${product.price}</div>
                <Text fontSize="12px" className="my-1 title">
                  Category: {product.category}
                </Text>
                <div className="row d-flex justify-content-evenly">
                  <Link
                    to={`/product/${product._id}/edit`}
                    className="btn btn-sm btn-outline-success p-2 col-md-5"
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button
                    onClick={onOpen}
                    className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-5"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <AlertDialogHeader>Delete product?</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        You want to delete? You won't be able to undo it!!
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => {
                            deleteHandler(product._id);
                            onClose();
                          }}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Product;
