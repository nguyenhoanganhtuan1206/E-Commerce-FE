import { memo, useEffect, useState } from "react";

import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

const ProductImageDisplay = ({ productId = null, className }) => {
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
    <>
      {imagesProduct.values() && (
        <img
          src={Array.from(imagesProduct.values())[0]}
          alt={Array.from(imagesProduct.values())[1]}
          className={className}
        />
      )}
    </>
  );
};

export default memo(ProductImageDisplay);
