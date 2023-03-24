import "./Home.scss";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLocationPin, faStar } from "@fortawesome/free-solid-svg-icons";

import { Header } from "../../Layouts";
import { DUMMY_PRODUCTS } from "../../../data/dummy_data";
import SearchNavbar from "../SearchNavbar/SearchNavbar";

const Home = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* Banner */}
      <section className="banner">
        <div className="banner__container">
          <div className="section-heading primary">
            <h2>Welcome to ClassiGrids</h2>
            <p>
              Buy And Sell Everything From Used Cars To Mobile Phones And
              Computers, Or Search For Property, Jobs And More.
            </p>
          </div>

          <SearchNavbar />
        </div>
      </section>
      {/* Banner */}

      {/* Latest Products */}
      <section className="latest-section">
        <div className="section-heading tertiary">
          <h2>Latest Products</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>

        <div className="container">
          <div className="latest__product-container">
            <div className="row">
              {DUMMY_PRODUCTS.map((product, index) => {
                return (
                  <div key={index} className="col-4">
                    <div className="latest__item">
                      <div className="latest__header">
                        <img
                          className="latest__photo"
                          src={product.imageUrl}
                          alt={product.name}
                        />

                        <div className="latest-author">
                          <div className="latest-author__detail">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                              alt="Avatar"
                              className="latest-author__img"
                            />

                            <span className="latest-author__name">
                              Smith Jeko
                            </span>
                          </div>

                          <span className="latest-author__tag">For Sale</span>
                        </div>
                      </div>

                      <div className="latest-body">
                        <p className="latest-product__category">
                          Mobile Phones
                        </p>

                        <Link to="/product" className="latest-product__name">
                          {product.name}
                        </Link>

                        <p className="latest-product__update">
                          Last Updated: <span>{product.updated}</span>
                        </p>

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

                        <div className="latest-product__info">
                          <div className="latest-product__group">
                            <FontAwesomeIcon
                              icon={faLocationPin}
                              className="latest-product__info-icon"
                            />

                            <span className="latest-product__info-text">
                              {product.location}
                            </span>
                          </div>

                          <div className="latest-product__group">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="latest-product__info-icon"
                            />

                            <span className="latest-product__info-text">
                              {product.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="latest-footer">
                        <div className="latest-product__group">
                          <p className="latest__price">
                            <span>Start From: </span>
                            <span>{product.price}</span>
                          </p>
                        </div>

                        <div className="latest-product__group">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="latest-product__circle-icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Latest Products */}
    </>
  );
};

export default Home;
