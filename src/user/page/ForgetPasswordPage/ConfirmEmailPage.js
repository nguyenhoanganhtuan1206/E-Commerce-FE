import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
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

      <div className="mt-5">
        <FormConfirmEmail />
      </div>
    </>
  );
};

export default ConfirmEmailPage;
