import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { FormResetPassword } from "../../components";
import { useVerifyCodeResetPasswordQuery } from "../../../redux/apis/user/password/user-password.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { ButtonFields } from "../../../shared/FormElement";

const ResetPasswordPage = () => {
  const code = useParams().code;
  console.log("code", code);

  const verifyCodeResetPassword = useVerifyCodeResetPasswordQuery();

  console.log(
    "verifyCodeResetPassword.isError",
    verifyCodeResetPassword.isError
  );

  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["Forget Password"]} />
      {/* BreadCrumbs */}

      {verifyCodeResetPassword.isError ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="p-3 border d-flex flex-column align-items-center justify-content-center">
            <FontAwesomeIcon
              icon={faExclamation}
              className="modal-action__header-icon modal-action__header-icon__circle modal-action__header-icon--warning"
            />

            <p style={{ fontSize: "1.5rem", marginTop: "1.2rem" }}>
              {verifyCodeResetPassword.error.data.message}
            </p>

            <ButtonFields type="button" to="/reset-password/confirm-email" subPrimary>
              Return Confirm Email
            </ButtonFields>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="forget-password__container">
            <h3 className="main-content--user__header">Update Your Password</h3>

            <div className="main-content--user__body">
              <FormResetPassword code={code} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
