import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Breadcrumbs.scss";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const Breadcrumbs = (props) => {
  const { currentPage, nextPages = [] } = props;

  return (
    <div className="bread-crumbs">
      <div className="container">
        <div className="bread-crumbs__group">
          <h2 className="bread-crumbs__header">{currentPage}</h2>

          <ul className="bread-crumbs__list">
            {nextPages.map((page, index) => {
              return (
                <Fragment key={index}>
                  <Link to={page.link} className="bread-crumbs__item">
                    {page.title}
                  </Link>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="bread-crumbs__icon"
                  />
                </Fragment>
              );
            })}

            <li className="bread-crumbs__item">
              <span>{currentPage}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
