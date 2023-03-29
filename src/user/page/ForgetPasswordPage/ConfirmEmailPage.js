import { memo } from "react";
import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser } from "../../components";
import { FormConfirmEmail } from "../../components";

const ConfirmEmailPage = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["Forget Password"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <FormConfirmEmail />
      </MainComponentUser>
    </>
  );
};

export default memo(ConfirmEmailPage);
