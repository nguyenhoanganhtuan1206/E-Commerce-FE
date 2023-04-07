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
            {authContext.roles.includes("ROLE_SELLER") && <FormPostAd />}

            <ModalError
              show={!authContext.roles.includes("ROLE_SELLER")}
              headerError="SORRY"
              footer={
                <div className="d-flex align-items-center justify-content-end">
                  <ButtonFields
                    primary
                    to="/registration-seller"
                    className="post-ad__link"
                  >
                    Go To Register Sell
                  </ButtonFields>
                </div>
              }
            >
              In order to list a product for sale on our system. You must first
              complete the registration process.
            </ModalError>
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(PostAd);
