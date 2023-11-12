import React, { useState } from "react";
import CreateBrand from "./CreateBrand";
import BrandTable from "./BrandTable";
import { Box, Heading, Stack } from "@chakra-ui/react";

const MainBrand = () => {
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
            <CreateBrand />
            <BrandTable />
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default MainBrand;
