import "./HeaderPostAd.scss";

const HeaderPostAd = ({ currentSteps = 1 }) => {
  return (
    <header className="post-ad__header">
      <div
        className={`post-ad__header--step ${
          currentSteps === 1 ? "active" : null
        }`}
      >
        <span className="post-ad__header-number">01</span>

        <div className="post-ad__header-sub-title">
          <h4>Step</h4>
          <p>Information Basic</p>
        </div>
      </div>

      <div
        className={`post-ad__header--step ${
          currentSteps === 2 ? "active" : null
        }`}
      >
        <span className="post-ad__header-number">02</span>

        <div className="post-ad__header-sub-title">
          <h4>Step</h4>
          <p>Information Details</p>
        </div>
      </div>

      <div
        className={`post-ad__header--step ${
          currentSteps === 3 ? "active" : null
        }`}
      >
        <span className="post-ad__header-number circle">03</span>

        <div className="post-ad__header-sub-title">
          <h4>Step</h4>
          <p>Another Information</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderPostAd;
