import { MainComponentUser } from "../../components";

import "../MainContent.scss";
import "./PostAd.scss";

import { Header } from "../../../shared/Layouts";
import { FormPostAd } from "../../components/PostAd";
import { Breadcrumbs } from "../../../shared/components";
import { memo, useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { ButtonFields } from "../../../shared/FormElement";

const PostAd = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <Header />

      <Breadcrumbs title="Post An" nextPages={["Home"]} />
      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Post An Ad</h3>

          <div className="main-content--user__body">
            {authContext.roles.includes("ROLE_SELLER") && (
              <>
                <FormPostAd />
              </>
            )}

            {!authContext.roles.includes("ROLE_SELLER") && (
              <>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <h3 className="post-ad__title">
                    In order to a product for sale on our system, you first
                    complete the registration process.
                  </h3>

                  <ButtonFields
                    primary
                    to="/registration-sell"
                    className="post-ad__link"
                  >
                    Go To Register Sell
                  </ButtonFields>
                </div>
              </>
            )}
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(PostAd);
