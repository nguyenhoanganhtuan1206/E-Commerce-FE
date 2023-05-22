import { toast } from "react-toastify";
import { useState } from "react";

import { db, storage } from "../../config/firebaseConfig";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useUploadFileFirebase = () => {
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleUploadFile = async (fileUpload, fileNamePath, ownerPath) => {
    const fileName = `imagesProduct/${ownerPath}/${fileNamePath}/${fileUpload.name}`;
    const storageRef = ref(storage, fileName);
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
        toast.error("Something went wrong when upload images");
        setIsError(true);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
          const imagesRef = doc(db, "imagesProduct", fileNamePath);
          const res = await getDoc(imagesRef);

          if (!res.exists()) {
            await setDoc(imagesRef, { imagesProduct: [] });
          }

          await updateDoc(imagesRef, {
            imagesProduct: arrayUnion({
              fileName: fileName,
              url: downloadURL,
            }),
          });
        });
      }
    );
  };

  return { handleUploadFile, isError, progress };
};