import { useEffect, useState } from "react";

import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

import { CartListItem, LoadingSpinner } from "../../../shared/components";

const MyOrderProductItem = ({ cartItem = null }) => {
  console.log("cart", cartItem);
  const [imagesProduct, setImagesProduct] = useState(new Map());
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [handleFetchProfile] = useFetchFilesFirebase(cartItem.product.id);

  useEffect(() => {
    if (cartItem.product.id) {
      setIsLoadingImage(true);
      handleFetchProfile(cartItem.product.id)
        .then((res) => {
          const map = new Map();

          res.imagesProduct.forEach((item) => {
            map.set(item.fileName, item.url);
          });

          setImagesProduct(
            map && map.size > 0 ? Array.from(map.values())[0] : []
          );
        })
        .finally(() => setIsLoadingImage(false));
    }
  }, [cartItem.product.id, handleFetchProfile]);

  return (
    <>
      {isLoadingImage && <LoadingSpinner />}

      {!isLoadingImage && (
        <>
          <CartListItem cartItem={cartItem} imagesProduct={imagesProduct}>
            <p className="cart__product-item__text mycart-text--bold">
              {`$${cartItem.cartProductInventory.totalPrice.toFixed(2)}`}
            </p>
          </CartListItem>
        </>
      )}
    </>
  );
};

export default MyOrderProductItem;
