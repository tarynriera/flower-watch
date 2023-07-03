import { array, func } from "prop-types";
import React, { ChangeEvent } from "react";
import styles from "./drop-zone.module.css";
import { FileWithId } from "./file-picker";
import { FilePreview } from "./file-preview";

export interface BannerProps {
  onClick: () => void;
  // FileList: https://developer.mozilla.org/en-US/docs/Web/API/FileList
  onDrop: (files: FileList) => void;
  previewImageURL: string | null;
}

const Banner = ({ onClick, onDrop, previewImageURL }: BannerProps) => {
  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer) {
      onDrop(ev.dataTransfer.files);
    }
  };
  return (
    <div
      className={styles.banner}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {previewImageURL ? (
        <>
          <FilePreview imageURL={previewImageURL} />
        </>
      ) : (
        <>
          <span className={styles.banner_text}>Click to Add files</span>
          <span className={styles.banner_text}>Or</span>
          <span className={styles.banner_text}>Drag and Drop files here</span>
        </>
      )}
    </div>
  );
};

export interface DropZoneProps {
  onChange: (files: FileList) => void;
  accept: string[];
  previewImageURL: string | null;
}

const DropZone = ({
  onChange,
  accept = ["*"],
  previewImageURL,
}: DropZoneProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      onChange(ev.target.files);
    }
  };

  const handleDrop = (files: FileList) => {
    onChange(files);
  };

  return (
    <div className={styles.wrapper}>
      <Banner
        onClick={handleClick}
        onDrop={handleDrop}
        previewImageURL={previewImageURL}
      />
      <input
        type="file"
        aria-label="add files"
        className={styles.input}
        ref={inputRef}
        multiple={true}
        onChange={handleChange}
        accept={accept.join(",")}
      />
    </div>
  );
};

export { DropZone };
