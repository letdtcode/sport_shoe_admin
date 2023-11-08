import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { Box, Heading, Stack } from "@chakra-ui/react";

const MainCategories = () => {
  // const [isUpdate, setIsUpdate] = useState(false);

  // const handleChangeStatus = (isUpdate) => {
  //   console.log(isUpdate);
  //   // setIsUpdate(isUpdate);
  // };
  return (
    <Stack className="content-main">
      <Box className="content-header">
        <Heading as="h2" size="md" className="content-title">
          Brand
        </Heading>
      </Box>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}

            <CreateCategory />

            {/* Categories table */}
            <CategoriesTable />
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default MainCategories;
