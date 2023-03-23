import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import "./Auth.scss";

const Auth = ({ heading, children }) => {
  return (
    <>
      <Header />
      <Breadcrumbs title="Login" nextPages={["Home"]} />

      <div className="auth">
        <div className="auth-form">
          <h3 className="auth-form__header">{heading}</h3>

          {children}
        </div>
      </div>
    </>
  );
};

export default Auth;
