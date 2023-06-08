import classes from "./CartHeader.module.scss";

import { ButtonFields } from "../../../shared/FormElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CartHeader = () => {
  return (
    <>
      <header className={classes.Header}>
        <p className={classes.HeaderText}>2 Items</p>

        <p className={classes.HeaderText}>View Cart</p>
      </header>

      <div className={classes.CartList}>
        <div className={classes.CartItem}>
          <img
            src="https://images.unsplash.com/photo-1683267894199-4d45c90b6c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt="ac"
            className={classes.CartImageProduct}
          />

          <div className={classes.CartInfo}>
            <Link className={classes.CartName}>
              Surface Laptop Surface LaptopSurface LaptopSurface LaptopSurface
              LaptopSurface Laptop
            </Link>
            <p className={classes.CartPrice}>1 x $7000</p>
          </div>

          <FontAwesomeIcon className={classes.CartIcon} icon={faClose} />
        </div>

        <div className={classes.CartItem}>
          <img
            src="https://images.unsplash.com/photo-1683267894199-4d45c90b6c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt="ac"
            className={classes.CartImageProduct}
          />

          <div className={classes.CartInfo}>
            <Link className={classes.CartName}>
              Surface Laptop Surface LaptopSurface LaptopSurface LaptopSurface
              LaptopSurface Laptop
            </Link>
            <p className={classes.CartPrice}>1 x $7000</p>
          </div>

          <FontAwesomeIcon className={classes.CartIcon} icon={faClose} />
        </div>

        <div className={classes.CartItem}>
          <img
            src="https://images.unsplash.com/photo-1683267894199-4d45c90b6c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt="ac"
            className={classes.CartImageProduct}
          />

          <div className={classes.CartInfo}>
            <Link className={classes.CartName}>
              Surface Laptop Surface LaptopSurface LaptopSurface LaptopSurface
              LaptopSurface Laptop
            </Link>
            <p className={classes.CartPrice}>1 x $7000</p>
          </div>

          <FontAwesomeIcon className={classes.CartIcon} icon={faClose} />
        </div>
      </div>

      <div className={classes.CartBottom}>
        <div className={classes.CartTotal}>
          <span>Total</span>

          <p>$15000</p>
        </div>
      </div>

      <ButtonFields primary>Checkout</ButtonFields>
    </>
  );
};

export default CartHeader;
