import classes from "./Table.module.scss";

const Table = ({ headers = [], tbody = null, bordered, children }) => {
  return (
    <div className={`${classes.ProductListTable} table-responsive`}>
      <table className={`table ${bordered && "table-bordered"}`}>
        <thead className={classes.ProductListHeader}>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>

        <tbody>{tbody}</tbody>
      </table>

      {children}
    </div>
  );
};

export default Table;
