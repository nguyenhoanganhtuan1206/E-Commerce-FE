import { useState } from "react";

import "./AvatarUser.scss";

import noImage from "../../../assets/image/no-img.webp";

const AvatarUser = ({ placeSrc, src, className, alt, circle, ...props }) => {
  const classes = `image ${className}
    ${circle && "circle"} `;

  const [fullback, setFullback] = useState("");

  /* To resolver when error src and placeSrc we will get "src noImage" */
  const handleError = () => {
    setFullback(placeSrc ? placeSrc : noImage);
  };

  return (
    <img
      src={src || fullback}
      className={classes}
      alt={alt}
      onError={handleError}
    />
  );
};

export default AvatarUser;
