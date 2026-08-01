import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => {
        onPageChange(selected + 1);
      }}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      pageRangeDisplayed={5}
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
