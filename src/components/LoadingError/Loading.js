import React from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";
export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <VStack>
        <Spinner />
        <Text fontSize="18px">Đang tải...</Text>
      </VStack>
    </div>
  );
}
