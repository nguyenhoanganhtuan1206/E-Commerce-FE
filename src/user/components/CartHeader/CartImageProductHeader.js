import classes from "./CartHeader.module.scss";
import { memo, useEffect, useState } from "react";

import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

const CartImageProductHeader = ({ productId = null }) => {
  const [handleFetchProfile] = useFetchFilesFirebase(productId);
  const [imagesProduct, setImagesProduct] = useState(new Map());

  useEffect(() => {
    if (productId) {
      handleFetchProfile(productId).then((res) => {
        const map = new Map();

        res.imagesProduct.forEach((item) => {
          map.set(item.fileName, item.url);
        });
        setImagesProduct(map);
      });
    }
  }, [handleFetchProfile, productId]);

  return (
    <img
      src={Array.from(imagesProduct.values())[0]}
      alt={Array.from(imagesProduct.values())[1]}
      className={classes.CartImageProductHeader}
    />
  );
};

export default memo(CartImageProductHeader);
