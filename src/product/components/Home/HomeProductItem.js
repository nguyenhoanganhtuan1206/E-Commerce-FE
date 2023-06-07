import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";
import { useEffect, useState } from "react";

const HomeProductItem = ({
  productId = null,
  productName = null,
  price = 0,
  amountSoldOut = 0,
  categories = [],
  brandName = null,
  sellerRating = 0,
  productStyles = [],
  location = null,
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
    <div className="latest__item">
      <div className="latest__header">
        <img
          className="latest__photo"
          src={Array.from(imagesProduct.values())[0]}
          alt={productName}
        />

        <div className="latest-author">
          <div className="latest-author__detail">
            <img
              src={Array.from(imagesProduct.values())[0]}
              alt="Avatar"
              className="latest-author__img"
            />

            <span className="latest-author__name">{sellerName}</span>
          </div>

          <span className="latest-author__tag">For Sale</span>
        </div>
      </div>

      <div className="latest-body">
        <Link to={`${productId}/details`} className="latest-product__name">
          {productName}
        </Link>

        <div className="latest__price">
          <p>{`$${price.toFixed(2)}`}</p>
        </div>

        <p className="d-flex latest-product__update">
          Categories:
          {categories.map((categoryName, index) => (
            <span key={index} className="ml-2">
              {categoryName}
              {index + 1 !== categories.length && ", "}
            </span>
          ))}
        </p>

        <p className="d-flex latest-product__update">
          Brand:
          <span className="ml-2">{brandName}</span>
        </p>

        <p className="latest-product__update">
          Product Styles:
          {productStyles.map((productStyleName, index) => (
            <span key={index} className="ml-2">
              {productStyleName}
              {index + 1 !== productStyles.length && ", "}
            </span>
          ))}
        </p>

        <div className="d-flex align-items-center justify-content-between">
          <div className="latest-product__rating">
            <FontAwesomeIcon
              icon={faStar}
              className="latest-product__rating-icon"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="latest-product__rating-icon"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="latest-product__rating-icon"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="latest-product__rating-icon"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="latest-product__rating-icon"
            />
          </div>

          <p style={{ fontSize: "1.4rem", margin: 0 }}>
            Sold out:
            <span className="ml-2">{amountSoldOut}</span>
          </p>
        </div>

        <div className="latest-product__info">
          <FontAwesomeIcon
            icon={faLocationPin}
            className="latest-product__info-icon"
          />

          <span className="latest-product__info-text">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeProductItem;
