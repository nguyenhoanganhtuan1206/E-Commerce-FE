import "./CardProduct.scss";

import { Link } from "react-router-dom";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardProduct = (props) => {
  return (
    <div className="card-product">
      <div className="card-product__header">
        

        <img
          src="https://plus.unsplash.com/premium_photo-1661765352605-6d3f5a80f286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="Imag"
          className="card-product__image"
        />
      </div>

      <div className="card-product__body">
        <p className="card-product__category">Mobile</p>

        <div className="card-product__info">
          <Link className="card-product__name">Apple Iphone X</Link>

          <div className="card-product__footer">
            <span className="card-product__price">$890.00</span>

            <FontAwesomeIcon className="card-product__heart" icon={faHeart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
