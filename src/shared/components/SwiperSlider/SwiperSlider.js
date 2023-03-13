import "./SwiperSlider.scss";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const SwiperSlider = ({ images = [] }) => {
  const [url, setUrl] = useState(images[0]);
  const [numberSwiper, setNumberSwiper] = useState(
    images.findIndex((image) => image === url)
  );

  const handleClickImages = (url) => {
    setNumberSwiper(images.findIndex((image) => image === url));
    setUrl(images[numberSwiper]);
  };

  useEffect(() => {
    setUrl(images[numberSwiper]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberSwiper]);

  const handleNextImg = () => {
    setNumberSwiper((prev) => prev + 1);
    if (numberSwiper === images.length - 1) {
      setNumberSwiper(0);
    }
    setUrl(images[numberSwiper]);
  };

  const handlePrevImg = () => {
    setNumberSwiper((prev) => prev - 1);
    if (numberSwiper === 0) {
      setNumberSwiper(images.length - 1);
    }
    setUrl(images[numberSwiper]);
  };

  return (
    <>
      <div className="swiper-slider">
        <div className="swiper-slider__main-image">
          {images.map((item, index) => (
            <img
              key={index}
              src={url || item}
              alt={index}
              className={`${
                numberSwiper === index
                  ? "swiper-slider__image swiper-slider__main-image--active"
                  : null
              }`}
            />
          ))}
        </div>

        <div className="swiper-slider__btn-redirect">
          <FontAwesomeIcon
            icon={faAngleRight}
            className="swiper-slider__btn-redirect__icon next-slider"
            onClick={handleNextImg}
          />

          <FontAwesomeIcon
            icon={faAngleLeft}
            className="swiper-slider__btn-redirect__icon prev-slider"
            onClick={handlePrevImg}
          />
        </div>
      </div>

      <div className="swiper-slider__sub-image">
        {images.map((item, index) => (
          <img
            onClick={() => handleClickImages(item)}
            key={index}
            src={item}
            alt={index}
            className={`swiper-slider__image ${
              item === url ? "swiper-slider__sub-image--active" : null
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default SwiperSlider;
