import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EmailIcon from "@mui/icons-material/Email";

import { AvatarUser } from "../../../../shared/components";
import { ButtonFields } from "../../../../shared/FormElement";

const AuthorDetailSection = (props) => {
  return (
    <>
      {props.authorData && (
        <>
          <h4 className="product-info__text-heading">Author</h4>

          <div className="product-info__text-normal mt-2">
            <div className="product-info__author">
              <AvatarUser className="product-info__author-img" circle />

              <div className="product-info__author-detail">
                <h4>{props.authorData.sellerName}</h4>

                <p className="product-info__author-rating">
                  Rating {props.authorData.sellerRating}/5
                  <FontAwesomeIcon
                    className="product-info__author-icon"
                    icon={faStar}
                  />
                </p>
                <Link>See All Ads</Link>
              </div>
            </div>
          </div>

          <ButtonFields primary>
            <EmailIcon className="mr-3" style={{ fontSize: "1.8rem" }} />
            Chat With Seller
          </ButtonFields>
        </>
      )}
    </>
  );
};

export default AuthorDetailSection;
