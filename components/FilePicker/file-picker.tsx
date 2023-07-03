import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";
import ExifReader, { ExpandedTags } from "exifreader";

//modified from
//https://retool.com/blog/building-a-file-picker-component-in-react/

export interface FilePickerProps {
  accept: string[];
  onUpload: (tags: ExpandedTags) => void;
}

export type FileWithId = {
  id: string;
  file: File;
};

const FilePicker = ({ accept, onUpload }: FilePickerProps) => {
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

  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  //read the file and extract image URL
  useEffect(() => {
    let fileReader: FileReader;
    if (files.length > 0) {
      const file: File = files[0].file;

      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          const { result } = e.target;
          setPreviewImageURL(String(result));
        }
      };
      fileReader.readAsDataURL(file);

      ExifReader.load(file, { expanded: true }).then((tags) => {
        onUpload(tags);
      });
    }

    return () => {
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
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
