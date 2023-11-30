import { memo, useEffect, useState } from "react";

import "./MyCart.scss";
import "./CartProductItem.scss";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import {
  ButtonQuantity,
  CartListItem,
  LoadingSpinner,
  ModalWarning,
} from "../../../shared/components";
import {
  useDecreaseQuantityMutation,
  useIncreaseQuantityMutation,
  useDeleteCartByIdMutation,
} from "../../../redux/apis/cart/cart.api";
import { ButtonFields } from "../../../shared/FormElement";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

const CartProductItem = ({ cartItem }) => {
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [imagesProduct, setImagesProduct] = useState(new Map());
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [handleFetchProfile] = useFetchFilesFirebase(cartItem.product.id);
  const [doIncreaseQuantity, doIncreaseQuantityResults] =
    useIncreaseQuantityMutation();
  const [doDecreaseQuantity, doDecreaseQuantityResults] =
    useDecreaseQuantityMutation();
  const [doDeleteCart] = useDeleteCartByIdMutation();

  const maxQuantity = cartItem.product.inventory
    ? cartItem.product.inventory.quantity
    : cartItem.product.quantity;

  const handleIncreaseQuantity = () => {
    if (cartItem.quantity === maxQuantity) {
      return;
    }

    doIncreaseQuantity(cartItem.cartProductInventory.id)
      .unwrap()
      .then()
      .catch((error) => toast.error(error.data.message));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity === 1) {
      return;
    }

    doDecreaseQuantity(cartItem.cartProductInventory.id)
      .unwrap()
      .then()
      .catch((error) => toast.error(error.data.message));
  };

  const handleDeleteCart = () => {
    doDeleteCart(cartItem.cartProductInventory.id)
      .unwrap()
      .then(() => {
        toast.success("Deleted this product successfully!");
        setIsShowModalDelete(false);
      })
      .catch((error) => toast.error(error.data.message));
  };

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
        <CartListItem
          isLoadingImage={isLoadingImage}
          cartItem={cartItem}
          imagesProduct={imagesProduct}
        >
          <ButtonQuantity
            currentQuantity={cartItem.cartProductInventory.quantity}
            maxQuantity={maxQuantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            disabled={
              doIncreaseQuantityResults.isLoading ||
              doDecreaseQuantityResults.isLoading
            }
          />

          <p className="cart__product-item__text mycart-text--bold">{`$${cartItem.cartProductInventory.totalPrice.toFixed(
            2
          )}`}</p>
          <FontAwesomeIcon
            onClick={() => setIsShowModalDelete(true)}
            icon={faClose}
            className="cart__item-close"
          />

          {/* MODAL DELETE */}
          <ModalWarning
            show={isShowModalDelete}
            onCancel={() => setIsShowModalDelete(false)}
            headerWarning="Delete Your Cart"
            footer={
              <div className="d-flex align-items-center justify-content-between">
                <ButtonFields
                  type="button"
                  onClick={() => setIsShowModalDelete(false)}
                  borderOnly
                  className="seller-form__btn"
                >
                  Close
                </ButtonFields>
                <ButtonFields
                  onClick={handleDeleteCart}
                  type="button"
                  subPrimary
                  className="seller-form__btn"
                >
                  Confirm Delete
                </ButtonFields>
              </div>
            }
          >
            Are you sure you want to delete this product?
          </ModalWarning>
          {/* MODAL DELETE */}
        </CartListItem>
      )}
    </>
  );
};

export default memo(CartProductItem);
