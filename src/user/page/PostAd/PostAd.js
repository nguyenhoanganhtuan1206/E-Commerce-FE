import { MainComponentUser } from "../../components";

import "../MainContent.scss";
import "./PostAd.scss";

import { Header } from "../../../shared/Layouts";
import { FormPostAd } from "../../components/PostAd";
import { Breadcrumbs, ModalError } from "../../../shared/components";
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
                <ModalError
                  error={`In order to list a product for sale on our system. You must first complete the registration process.`}
                  headerError="SORRY"
                  footer={
                    <div className="d-flex align-items-center justify-content-end">
                      <ButtonFields
                        primary
                        to="/registration-sell"
                        className="post-ad__link"
                      >
                        Go To Register Sell
                      </ButtonFields>
                    </div>
                  }
                />
              </>
            )}
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(PostAd);
