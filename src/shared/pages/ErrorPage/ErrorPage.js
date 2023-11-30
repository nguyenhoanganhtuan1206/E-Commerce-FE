import { ButtonFields } from "../../FormElement";
import { Modal } from "../../components";
import classes from "./ErrorPage.module.scss";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const ErrorPage = ({ messageError, errorIcon }) => {
  return (
    <Modal
      show
      footer={
        <ButtonFields to="/" primary>
          Home Page
        </ButtonFields>
      }
    >
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
      </div>
    </Modal>
  );
};

export default ErrorPage;
