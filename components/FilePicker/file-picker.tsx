import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";

export interface FilePickerProps {
  accept: string[];
}

export type FileWithId = {
  id: string;
  file: File;
};

const FilePicker = ({ accept }: FilePickerProps) => {
  const [files, setFiles] = useState<FileWithId[]>([]);

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

  // execute the upload operation
  /*
  const handleUpload = useCallback(async () => {
    try {
      const data = new FormData();

      files.forEach((file) => {
        data.append("file", file.file);
      });

      const res = await axios.request({
        url: uploadURL,
        method: "POST",
        data,
        onUploadProgress: (progressEvent) => {
          setUploadStarted(true);
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUploadStarted(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [files.length]);
  */

  console.log(`File Picker Component ${files}`);
  return (
    <div className={styles.wrapper}>
      {/* canvas */}
      <div className={styles.canvas_wrapper}>
        <DropZone onChange={handleOnChange} accept={accept} files={files} />
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
