import { MainComponentUser } from "../../components";

import "../MainContent.scss";
import "./PostAd.scss";

import { Header } from "../../../shared/Layouts";
import { FormPostAd } from "../../components/PostAd";
import { Breadcrumbs } from "../../../shared/components";
import { memo } from "react";

const PostAd = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Post An" nextPages={["Home"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Post An Ad</h3>

          <div className="main-content--user__body">
            <FormPostAd />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(PostAd);
