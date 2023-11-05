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
                  Discard
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => deleteHandler(item._id)}
                  ml={3}
                >
                  Canceled now
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ))}

      <Table className="table">
        <Thead>
          <Tr>
            <Th scope="col">STT</Th>
            <Th scope="col">Tên</Th>
            <Th scope="col">Email</Th>
            <Th scope="col">Tổng tiền</Th>
            <Th scope="col">Tình trạng</Th>
            <Th scope="col">Ngày tạo</Th>
            <Th>Vận chuyển</Th>
            <Th scope="col" className="text-end">
              Hành động
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
                    Đã thanh toán {moment(order.paidAt).format("MMM Do YY")}
                  </span>
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Chưa thanh toán
                  </span>
                )}
              </Td>

              <Td>{moment(order.createAt).format("MMM Do YY")}</Td>
              <Td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Đã giao hàng</span>
                ) : (
                  <span className="badge btn-danger">Chưa giao hàng</span>
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
                        <i className="fas fa-eye mx-1"></i>Xem đơn hàng
                      </MenuItem>
                    </Link>
                    <Box>
                      <MenuItem onClick={onOpen}>
                        <i className="fas fa-trash-alt mx-1"></i>
                        {""}Xoá
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
