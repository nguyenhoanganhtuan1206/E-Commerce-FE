import { CardProduct } from "../../../shared/components";

const FilterProductsList = ({ products = [] }) => {
  return (
    <>
      {products.length === 0 && (
        <div className="widget-filters__components">
          <p
            className="text-center"
            style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Unfortunately, the product you're searching for is not in our
            inventory.
          </p>
        </div>
      )}

      {products.length > 0 &&
        products.map((product) => {
          return (
            <div key={product.id} className="row">
              <div key={product.id} className="col-4">
                <CardProduct
                  productId={product.id}
                  productName={product.name}
                  categories={product.categories}
                  amountSoldOut={
                    product.amountSoldOut === null ? 0 : product.amountSoldOut
                  }
                  price={
                    product.price === 0
                      ? product.inventories[0].price
                      : product.price
                  }
                  sellerName={product.seller.sellerName}
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default FilterProductsList;
