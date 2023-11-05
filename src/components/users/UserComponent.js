import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { userListAction } from "../../redux/actions/UserAction";
import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(userListAction());
  }, [dispatch]);

  return (
    <>
      <Stack className="content-main">
        <Box className="content-header">
          <Heading as="h2" size="lg" className="content-title">
            Khách hàng
          </Heading>
        </Box>

        <div className="card mb-4">
          <header className="card-header">
            <div className="row gx-3">
              <div className="col-lg-4 col-md-6 me-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Show 20</option>
                  <option>Show 30</option>
                  <option>Show 40</option>
                  <option>Show all</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Status: all</option>
                  <option>Active only</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </header>

          {/* Card */}
          <div className="card-body">
            {loading && <Loading />}
            {error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Container
                className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4"
                maxW="container.xl"
              >
                {users?.map((user) => (
                  <>
                    <Stack className="col" key={user._id}>
                      <div className="card card-user shadow-sm">
                        <Center className="card-header">
                          <Image
                            className="img-md img-avatar"
                            size="xs"
                            src="images/user.png"
                            alt="User pic"
                          />
                        </Center>
                        <div className="card-body">
                          <h5 className="card-title mt-5">{user.name}</h5>
                          <div className="card-text text-muted">
                            {user.isAdmin === true ? (
                              <p className="m-0">Admin</p>
                            ) : (
                              <p className="m-0">Customer</p>
                            )}
                            <p>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Stack>
                  </>
                ))}
              </Container>
            )}
          </div>
        </div>
      </Stack>
    </>
  );
};

export default UserComponent;
