import { useEffect, useState } from "react";

interface FilePreviewProps {
  imageURL: string;
}

//reference
//https://blog.logrocket.com/using-filereader-api-preview-images-react/

export const FilePreview = ({ imageURL }: FilePreviewProps) => {
  return (
    <div>
      <img src={imageURL} alt="" style={{ width: "100px", height: "auto" }} />
    </div>
  );
};
