import moment from "moment";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderCancelAction,
  orderListAllAction,
} from "../../redux/actions/OrderAction";

import { ORDER_CANCELLED_RESET } from "../../redux/constants/OrderConstants";

const Orders = ({ orders }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.orderCancelled);
  const toast = useToast();
  const [orderId, setOrderId] = useState(null);

  // console.log(orders);
  useEffect(() => {
    if (success) {
      toast({
        title: "Order cancelled successful!",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: ORDER_CANCELLED_RESET });
      dispatch(orderListAllAction());
    }
  }, [toast, success, dispatch]);

  const cancelOrderHandler = async (id) => {
    dispatch(orderCancelAction(id));
    onClose();
  };

  const statusOrderShow = (status) => {
    let textShow = "";
    let typeColor = "";
    switch (status) {
      case 0:
        textShow = "Awaiting confirm";
        typeColor = "btn-info";
        break;
      case 1:
        textShow = "Awaiting delivery";
        typeColor = "btn-warning";
        break;
      case 2:
        textShow = "Delivering";
        typeColor = "btn-secondary";
        break;
      case 3:
        textShow = "Received";
        typeColor = "btn-success";
        break;
      default:
        textShow = "Cancelled";
        typeColor = "btn-danger";
    }
    return <span className={`badge ${typeColor}`}>{textShow}</span>;
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Canceled Order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to cancel this order, it's cannot be undo your action
              ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => cancelOrderHandler(orderId)}
                ml={3}
              >
                Cancel Order
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* ))} */}
      <Table className="table">
        <Thead>
          <Tr>
            <Th scope="col">No</Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Email</Th>
            <Th scope="col">Total price</Th>
            <Th scope="col">Paid status</Th>
            <Th scope="col">Created At</Th>
            <Th>Status</Th>
            <Th scope="col" className="text-end">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders ? (
            orders.map((order, index) => (
              <Tr key={order._id}>
                <Td>{index + 1}</Td>
                <Td>
                  <b>{order.user?.name}</b>
                </Td>
                <Td>{order.user?.email}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert-success">
                      Paid {moment(order.paidAt).format("MMM Do YY")}
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert-danger">
                      Unpaid
                    </span>
                  )}
                </Td>

                <Td>{moment(order.createAt).format("MMM Do YY")}</Td>
                <Td>{statusOrderShow(order.status)}</Td>
                <Td className="d-flex justify-content-end align-item-center">
                  <Menu>
                    <MenuButton>
                      <i className="far fa-ellipsis-h"></i>
                    </MenuButton>
                    <MenuList>
                      {/* MenuItems are not rendered unless Menu is open */}
                      <Link to={`/order/${order._id}`}>
                        <MenuItem>
                          <i className="fas fa-eye mx-1"></i>View Detail Order
                        </MenuItem>
                      </Link>
                      <Box style={{ color: "#ef0b39" }}>
                        <MenuItem
                          onClick={() => {
                            onOpen();
                            setOrderId(order._id);
                          }}
                        >
                          <i
                            className="fas fa-solid fa-ban mx-1"
                            style={{ color: "#ef0b39" }}
                          ></i>
                          Cancel Order
                        </MenuItem>
                      </Box>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))
          ) : (
            <h3>No orders</h3>
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default Orders;
