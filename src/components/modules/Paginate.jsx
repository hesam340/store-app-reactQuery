import { PaginationItem, Stack, Typography } from "@mui/material";
import { Pagination } from "@mui/material";

import { useEffect } from "react";
import createQueryObject from "utils/query";
import { e2p } from "utils/replaceNumber";

function Paginate({ page, setPage, setQuery, count }) {
  useEffect(() => {
    setQuery((query) => createQueryObject(query, { page }));
  }, [page]);

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={(e, number) => setPage(number)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            page={typeof item.page === "number" ? e2p(item.page) : item.page}
            sx={{
              fontFamily: "vazirmatn",
              fontSize: "1rem",
              "&.Mui-selected": {
                backgroundColor: item.selected ? "#4a92d6" : "#e6e6e6",
                border: item.selected
                  ? "2px solid #4a92d6"
                  : "2px solid #8D8D8D",
                color: item.selected ? "#fff" : "#8D8D8D",
              },
              "&.Mui-selected:hover": {
                backgroundColor: item.selected ? "#4a92d6" : "#e6e6e6",
                border: item.selected
                  ? "2px solid #4a92d6"
                  : "2px solid #8D8D8D",
                color: item.selected ? "#fff" : "#8D8D8D",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

export default Paginate;
