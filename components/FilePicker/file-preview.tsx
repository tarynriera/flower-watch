import { useEffect, useState } from "react";

interface FilePreviewProps {
  file: File;
}

export const FilePreview = ({ file }: FilePreviewProps) => {
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(
    null
  );
  useEffect(() => {
    let fileReader: FileReader;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          const { result } = e.target;
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return (
    <>
      {fileDataURL && (
        <div>
          <img
            src={String(fileDataURL)}
            alt=""
            style={{ width: "100px", height: "auto" }}
          />
        </div>
      )}
    </>
  );
};
