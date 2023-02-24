import React, { useState } from "react";
import { View } from "@tarojs/components";
import { Pagination } from "@tencent/tea-component-mobile";

export default function PaginationExample() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div style={{ padding: "10px", backgroundColor: "#fff" }}>
      <Pagination
        total={200}
        pageSize={10}
        pageIndex={pageIndex}
        showTotal={false}
        onPagingChange={({ pageIndex }) => {
          setPageIndex(pageIndex);
        }}
      />
    </div>
  );
}
