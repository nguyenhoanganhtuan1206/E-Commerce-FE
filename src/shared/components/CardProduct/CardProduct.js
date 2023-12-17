import "./CardProduct.scss";

import { Link } from "react-router-dom";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";
import { useEffect, useState } from "react";

const CardProduct = ({
  productId = null,
  productName = null,
  price = 0,
  categories = [],
  amountSoldOut = 0,
  sellerName = null,
}) => {
  const [handleFetchProfile] = useFetchFilesFirebase(productId);
  const [imagesProduct, setImagesProduct] = useState(new Map());

  useEffect(() => {
    if (productId) {
      handleFetchProfile(productId)
        .then((res) => {
          const map = new Map();
          res.imagesProduct.forEach((item) => {
            map.set(item.fileName, item.url);
          });
          setImagesProduct(map);
        })
        .catch(() => {});
    }
  }, [handleFetchProfile, productId]);

  return (
    <>
      {productId && (
        <div className="card-product mb-5">
          <Link to={`/${productId}/details`} className="card-product__header">
            <img
              src={Array.from(imagesProduct.values())[0]}
              alt="Img"
              className="card-product__image"
            />
          </Link>

          <div className="card-product__body">
            <p className="card-product__category">{sellerName}</p>

            <div className="card-product__info">
              <Link className="card-product__name">{productName}</Link>

              <p className="card-product__text">
                Categories:
                {categories.length > 0 &&
                  categories.map((categoryItem, index) => (
                    <span key={index} className="ml-2">
                      {categoryItem.categoryName}
                      {index + 1 !== categories.length && ", "}
                    </span>
                  ))}
              </p>

              <p className="card-product__text">Sold out: {amountSoldOut}</p>

              <div className="card-product__footer">
                <span className="card-product__price">{`$${price.toFixed(
                  2
                )}`}</span>

                <FontAwesomeIcon
                  className="card-product__heart"
                  icon={faHeart}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProduct;
