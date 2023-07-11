import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";
import ExifReader, { ExpandedTags } from "exifreader";
import heic2any from "heic2any";

//modified from
//https://retool.com/blog/building-a-file-picker-component-in-react/

export interface FilePickerProps {
  accept: string[];
  onUpload: (tags: ExpandedTags, previewImageURL: string) => void;
}

export type FileWithId = {
  id: string;
  file: File;
};

const FilePicker = ({ accept, onUpload }: FilePickerProps) => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  // handler called when files are selected via the Dropzone component
  const handleOnChange = useCallback((files: FileList) => {
    let filesArray = Array.from(files);

    let filesWithId = filesArray.map((file) => ({
      id: nanoid(),
      file,
    }));

    setFiles(filesWithId);
  }, []);

  // handle for removing files form the files list view
  const handleClearFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  //handler for setting the preview image URL that cleans up old URL
  const handleSetPreviewImageURL = (url: string) => {
    if (previewImageURL) {
      URL.revokeObjectURL(previewImageURL);
    }
    setPreviewImageURL(url);
  };

  //read the file and extract image URL
  useEffect(() => {
    if (files.length > 0) {
      //pull out first file
      const file: File = files[0].file;
      //read exif data
      const exifPromise = ExifReader.load(file, { expanded: true });

      let imagePromise;

      //check if heic format then convert
      if (file.type in ["image/heic", "image/heif"]) {
        imagePromise = heic2any({ blob: file, toType: "image/png" }).then(
          (conversionResult) => {
            if (conversionResult instanceof Blob) {
              return URL.createObjectURL(conversionResult);
            }
            return "";
          }
        );
      } else {
        imagePromise = new Promise<string>((resolve, reject) => {
          return resolve(URL.createObjectURL(file));
        });
      }

      Promise.all([exifPromise, imagePromise]).then(([imageTags, imageURL]) => {
        handleSetPreviewImageURL(imageURL);
        onUpload(imageTags, imageURL);
      });
    }
  }, [files.length]);

  return (
    <div className={styles.wrapper}>
      {/* canvas */}
      <div className={styles.canvas_wrapper}>
        <DropZone
          onChange={handleOnChange}
          accept={accept}
          previewImageURL={previewImageURL}
        />
      </div>

      {/* files listing */}
      {files.length ? (
        <div className={styles.files_list_wrapper}>
          <FilesList files={files} onClear={handleClearFile} />
        </div>
      ) : null}
    </div>
  );
};

export { FilePicker };
