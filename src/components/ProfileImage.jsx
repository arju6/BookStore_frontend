import { useState } from "react";
import axiosInstance from "../api/axiosinstance";

const defaultProfileImage = "/user-placeholder.svg";

function ProfileImage({ picture, alt, ...imageProps }) {
  const [failedPicture, setFailedPicture] = useState("");
  const imageUrl = picture
    ? /^https?:\/\//i.test(picture)
      ? picture
      : `${axiosInstance.defaults.baseURL.replace(/\/+$/, "")}/uploads/${encodeURIComponent(picture.replace(/^\/+/, ""))}`
    : defaultProfileImage;

  return (
    <img
      {...imageProps}
      src={failedPicture === picture ? defaultProfileImage : imageUrl}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailedPicture(picture || "")}
    />
  );
}

export default ProfileImage;
