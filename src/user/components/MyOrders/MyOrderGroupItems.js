import MyOrderProductItem from "./MyOrderProductItem";

const MyOrderGroupItems = ({ sellerInfo = null, carts = [] }) => {
  return (
    <>
      {sellerInfo && (
        <div className="mycart__group">
          <div className="mycart__group-header">
            <p className="mycart-text--bold m-0">
              Product Owner:
              <span className="mycart-text--bold ml-3">
                {sellerInfo.sellerName}
              </span>
            </p>
          </div>

          <div className="mycart__group-items-list">
            {carts.map((cartItem, index) => {
              return <MyOrderProductItem key={index} cartItem={cartItem} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrderGroupItems;
