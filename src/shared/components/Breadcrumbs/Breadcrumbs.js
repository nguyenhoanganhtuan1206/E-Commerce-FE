import React from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Breadcrumbs.scss";

const Breadcrumbs = (props) => {
  const { title, nextPages = [] } = props;

  return (
    <div className="bread-crumbs">
      <div className="container">
        <div className="bread-crumbs__group">
          <h2 className="bread-crumbs__header">{title}</h2>

          <ul className="bread-crumbs__list">
            {nextPages.map((page, index) => (
              <React.Fragment key={index}>
                <li className="bread-crumbs__item">
                  <span>{page}</span>
                </li>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="bread-crumbs__icon"
                />
              </React.Fragment>
            ))}

            <li className="bread-crumbs__item">
              <span>{title}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
