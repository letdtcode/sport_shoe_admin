import moment from "moment";
import React from "react";
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
import { useDispatch } from "react-redux";
import { orderDeleteAction } from "../../redux/actions/OrderAction";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Orders = (props) => {
  const { orders } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const orderDelete = useSelector((state) => state.orderDelete);
  const { success } = orderDelete;
  const toast = useToast();

  useEffect(() => {
    if (success) {
      toast({
        title: "Order deleted successful!",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast, success]);

  const deleteHandler = (id) => {
    dispatch(orderDeleteAction(id));
    onClose();
  };
  return (
    <>
      {orders.map((item) => (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          key={item._id}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Canceled Order
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure to delete this order, it's cannot be undo your
                action ?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => deleteHandler(item._id)}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ))}

      <Table className="table">
        <Thead>
          <Tr>
            <Th scope="col">No</Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Email</Th>
            <Th scope="col">Total price</Th>
            <Th scope="col">Status</Th>
            <Th scope="col">Created At</Th>
            <Th>Delivery</Th>
            <Th scope="col" className="text-end">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={order._id}>
              <Td>{index}</Td>
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
              <Td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Delivered</span>
                ) : (
                  <span className="badge btn-danger">Not delivery</span>
                )}
              </Td>
              <Td className="d-flex justify-content-end align-item-center">
                <Menu>
                  <MenuButton>
                    <i className="far fa-ellipsis-h"></i>
                  </MenuButton>
                  <MenuList>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <Link to={`/order/${order._id}`}>
                      <MenuItem>
                        <i className="fas fa-eye mx-1"></i>View orders
                      </MenuItem>
                    </Link>
                    <Box>
                      <MenuItem onClick={onOpen}>
                        <i className="fas fa-trash-alt mx-1"></i>
                        {""}Delete
                      </MenuItem>
                    </Box>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default Orders;
