import React, { useCallback } from "react";
import CheckIcon from "./check";
import ClearIcon from "./clear";
import styles from "./files-list.module.css";
import { FileWithId } from "./file-picker";

export interface FilesListItemProps {
  name: string;
  id: string;
  onClear: (id: string) => void;
}
const FilesListItem = ({ name, id, onClear }: FilesListItemProps) => {
  const handleClear = useCallback(() => {
    onClear(id);
  }, []);

  return (
    <li className={styles.files_list_item}>
      <span className={styles.files_list_item_name}>{name}</span>
      <span
        className={styles.files_list_item_clear}
        role="button"
        aria-label="remove file"
        onClick={handleClear}
      >
        <ClearIcon />
      </span>
    </li>
  );
};

interface FilesListProps {
  files: FileWithId[];
  onClear: (id: string) => void;
}

const FilesList = ({ files, onClear }: FilesListProps) => {
  return (
    <ul className={styles.files_list}>
      {files.map(({ file, id }) => (
        <FilesListItem name={file.name} key={id} id={id} onClear={onClear} />
      ))}
    </ul>
  );
};

export { FilesList };
