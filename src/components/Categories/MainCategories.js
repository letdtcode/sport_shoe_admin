import React from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { Box, Heading, Stack } from "@chakra-ui/react";

const MainCategories = () => {
  return (
    <Stack className="content-main">
      <Box className="content-header">
        <Heading as="h2" size="md" className="content-title">
          Category
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
