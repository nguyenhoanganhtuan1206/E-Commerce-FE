import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner__overlay">
      <div className="loading-spinner__inner">
        <div className="loading-spinner__icon">
            <span></span>
            <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
