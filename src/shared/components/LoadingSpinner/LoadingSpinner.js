import "./LoadingSpinner.scss";

const LoadingSpinner = ({ option1, option2 }) => {
  return (
    <>
      {option1 && (
        <div className="loading-spinner__overlay">
          <div className="loading-spinner__inner">
            <div className="loading-spinner__icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {option2 && (
        <div className="loading-spinner__overlay">
          <div className="lds-dual-ring"></div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
