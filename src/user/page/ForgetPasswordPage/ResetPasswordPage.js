import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser, FormResetPassword } from "../../components";

const ResetPasswordPage = () => {
  const token = useParams().token;

  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["Forget Password"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Update Your Password</h3>

          <div className="main-content--user__body">
            <FormResetPassword token={token} />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(ResetPasswordPage);
