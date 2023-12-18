const CartListItem = ({ imagesProduct = null, cartItem = null, children }) => {
  return (
    <div className="cart__item">
      <div className="cart__item-group">
        <div className="cart__item-box">
          <img
            className="cart__item-box__img"
            src={imagesProduct}
            alt={cartItem.product.name}
          />
        </div>

        <div className="cart__item-info">
          <p className="mycart-text__name">{cartItem.product.name}</p>

          <p className="mycart-text--light mycart-text--small">
            Category:
            {cartItem.product.categories.map((category, index) => (
              <span key={index} className="mycart-text--bold ml-2">
                {category.categoryName}
                {index + 1 !== cartItem.product.categories.length && ", "}
              </span>
            ))}
          </p>

          {cartItem.product.inventory ? (
            <p className="mycart-text--light mycart-text--small">
              Categorization:
              <span className="mycart-text--bold ml-2">
                {cartItem.product.inventory.colorValue},{" "}
                {cartItem.product.inventory.sizeValue}
              </span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default CartListItem;
