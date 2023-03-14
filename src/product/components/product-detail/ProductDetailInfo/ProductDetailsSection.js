import { memo } from "react";

import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import { AvatarUser } from "../../../../shared/components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

/**
 * ? Component for Description and Author Information
 */
const ProductDetailsSection = (props) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 m-0">
          <div className="product-detail__card">
            <h4 className="product-info__text-heading">Description</h4>

            <p className="product-info__text-normal mt-2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. Model: Apple MacBook Pro 13.3-Inch MYDA2
              Apple M1 chip with 8-core CPU and 8-core GPU 8GB RAM 256GB SSD
              13.3-inch 2560x1600 LED-backlit Retina Display The generated Lorem
              Ipsum is therefore always free from repetition, injected humour,
              or non-characteristic words etc.
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="product-detail__card">
            <h4 className="product-info__text-heading">Author</h4>

            <p className="product-info__text-normal mt-2">
              <div className="product-info__author">
                <AvatarUser className="product-info__author-img" circle />

                <div className="product-info__author-detail">
                  <h4>Miliya Jessy</h4>

                  <p className="product-info__author-rating">
                    Rating 4/5
                    <FontAwesomeIcon
                      className="product-info__author-icon"
                      icon={faStar}
                    />
                  </p>
                  <Link>See All Ads</Link>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetailsSection);
