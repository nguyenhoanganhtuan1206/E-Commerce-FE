import { ButtonFields } from "../../FormElement";
import classes from "./ErrorPage.module.scss";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const ErrorPage = ({ messageError, errorIcon }) => {
  return (
    <div className={`${classes.ErrorPage} container`}>
      <div className={`${classes.ErrorPageContainer}`}>
        {errorIcon ? (
          errorIcon
        ) : (
          <SearchOffIcon className={`${classes.ErrorPageIcon}`} />
        )}

        <p className={`${classes.ErrorPageText}`}>
          {messageError
            ? messageError
            : "Something went wrong! Please try again."}
        </p>

        <ButtonFields to="/" primary>
          Home Page
        </ButtonFields>
      </div>
    </div>
  );
};

export default ErrorPage;
