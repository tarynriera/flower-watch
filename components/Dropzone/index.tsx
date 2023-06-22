import React from "react";

export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFileDrop?: (file: File) => void;
}

export const DropZone = React.memo(
  (props: React.PropsWithChildren<DropZoneProps>) => {
    const {
      onDragStateChange,
      onFileDrop,
      onDrag,
      onDragIn,
      onDragOut,
      onDrop,
    } = props;

    // Create state to keep track when dropzone is active/non-active:
    const [isDragActive, setIsDragActive] = React.useState(false);
    // Prepare ref for dropzone element:
    const dropZoneRef = React.useRef<null | HTMLDivElement>(null);

    const handleDragIn = React.useCallback(
      (event: DragEvent) => {
        // Prevent default events:
        event.preventDefault();
        event.stopPropagation();
        // Invoke any optional method passed as "onDragIn()":
        onDragIn?.();

        // Check if there are files dragging over the dropzone:
        if (
          event.dataTransfer &&
          event.dataTransfer.items &&
          event.dataTransfer.items.length > 0
        ) {
          // If so, set active state to "true":
          setIsDragActive(true);
        }
      },
      [onDragIn]
    );

    // Create handler for dragleave event:
    const handleDragOut = React.useCallback(
      (event: DragEvent) => {
        // Prevent default events:
        event.preventDefault();
        event.stopPropagation();
        // Invoke any optional method passed as "onDragOut()":
        onDragOut?.();

        // Set active state to "false":
        setIsDragActive(false);
      },
      [onDragOut]
    );

    // Create handler for dragover event:
    const handleDrag = React.useCallback(
      (event: DragEvent) => {
        // Prevent default events:
        event.preventDefault();
        event.stopPropagation();
        // Invoke any optional method passed as "onDrag()":
        onDrag?.();

        // Set active state to "true" if it is not active:
        if (!isDragActive) {
          setIsDragActive(true);
        }
      },
      [isDragActive, onDrag]
    );

    // Create handler for drop event:
    const handleDrop = React.useCallback(
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        // Prevent default events:

        // Set active state to false:
        setIsDragActive(false);
        // Invoke any optional method passed as "onDrop()":
        onDrop?.();

        // If there are any files dropped:
        if (
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files.length > 0
        ) {
          const fileToUpload = event.dataTransfer.files.item(0);

          // Invoke any optional method passed as "onFilesDrop()", passing array of files as an argument:
          if (fileToUpload) {
            onFileDrop?.(fileToUpload);
          }

          // Clear transfer data to prepare dropzone for another use:
          event.dataTransfer.clearData();
        }
      },
      [onDrop, onFileDrop]
    );

    // Obser active state and emit changes:
    React.useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive]);

    // Attach listeners to dropzone on mount:
    React.useEffect(() => {
      const tempZoneRef = dropZoneRef?.current;
      if (tempZoneRef) {
        tempZoneRef.addEventListener("dragenter", handleDragIn);
        tempZoneRef.addEventListener("dragleave", handleDragOut);
        tempZoneRef.addEventListener("dragover", handleDrag);
        tempZoneRef.addEventListener("drop", handleDrop);
      }

      // Remove listeners from dropzone on unmount:
      return () => {
        tempZoneRef?.removeEventListener("dragenter", handleDragIn);
        tempZoneRef?.removeEventListener("dragleave", handleDragOut);
        tempZoneRef?.removeEventListener("dragover", handleDrag);
        tempZoneRef?.removeEventListener("drop", handleDrop);
      };
    }, []);

    // Render <div> with ref and children:
    return <div ref={dropZoneRef}>{props.children}</div>;
  }
);

DropZone.displayName = "DropZone";
