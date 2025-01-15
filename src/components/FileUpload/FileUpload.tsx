import { Box, IconButton, Tooltip } from "@mui/material";
import { UploadSharp } from "@mui/icons-material";
import React from "react";

import { COLORS } from "$/constants/colors.constants";

interface iFileUploadProps {
  fileUploadCallback: (fileData: string) => void;
  title?: string;
}

const FileUpload = ({ fileUploadCallback, title }: iFileUploadProps) => {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>): void => {
        fileUploadCallback(e.target?.result as string);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <Box>
      <Tooltip title={title}>
        <IconButton
          color="inherit"
          component="label"
          sx={{
            "&:hover": { backgroundColor: COLORS.whiteLight },
          }}
        >
          <UploadSharp />
          <input
            type="file"
            hidden
            accept=".txt,.json"
            onChange={handleFileUpload}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FileUpload;
