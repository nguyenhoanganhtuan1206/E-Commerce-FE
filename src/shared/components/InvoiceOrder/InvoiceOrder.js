import classes from "./InvoiceOrder.module.scss";

const InvoiceOrder = ({ contentHeader, contentBody, contentRightSide }) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-9">
          <div className={classes.InvoiceOrderHeader}>{contentHeader}</div>

          <div className={classes.InvoiceOrderBody}>{contentBody}</div>
        </div>
        <div className="col-3">{contentRightSide}</div>
      </div>
    </div>
  );
};

export default InvoiceOrder;
