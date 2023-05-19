import { useCallback } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

export const useStorageFile = () => {
  const [progress, setProgress] = useState(0);

  const [urls, setUrls] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleStorageFiles = useCallback((fileUpload, fileNamePath) => {
    const fileName = `imagesProduct/${fileNamePath}/${fileUpload.name}`;

    const storageRef = ref(storage, fileName);

    /* Save image to database firebase */
    const uploadImage = uploadBytesResumable(storageRef, fileUpload);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        toast.error(
          "Something went wrong when upload images! Please try again"
        );
        setIsError(true);
      },
      (success) => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          setUrls((prevUrl) => [...prevUrl, url]);
        });
      }
    );

    return fileName;
  }, []);

  const clearImages = () => {
    setUrls([]);
  };

  return { urls, isError, progress, handleStorageFiles, clearImages };
};
