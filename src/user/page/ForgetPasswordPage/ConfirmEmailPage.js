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
      <Breadcrumbs
        currentPage="Home"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      {/* BreadCrumbs */}

      <div className="mt-5">
        <FormConfirmEmail />
      </div>
    </>
  );
};

export default ConfirmEmailPage;
