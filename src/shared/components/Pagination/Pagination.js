import classes from "./Pagination.module.scss";

const Pagination = ({ capacityPage, totalData, onRedirect, currentPage }) => {
  /*
   * capacityPage is quantity want to show in a page
   * total is total quantity sent from BE
   */

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / capacityPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={classes.PaginationWrapper}>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`${classes.PaginationPageItem} ${classes.PageLink} ${
            currentPage === number
              ? `${classes.PaginationPageItem__active}`
              : null
          }`}
          onClick={() => {
            onRedirect(number);
          }}
        >
          {number}
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
