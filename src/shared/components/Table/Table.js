import { useCallback, useState } from "react";
import classes from "./Table.module.scss";
import usePaginate from "../../hooks/usePaginate";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";

const Table = ({ data = [], children }) => {


  return (
    <div className={`${classes.ProductListTable} table-responsive`}>
      <table className={`table`}>
        <thead className={classes.ProductListHeader}>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Categorization</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
