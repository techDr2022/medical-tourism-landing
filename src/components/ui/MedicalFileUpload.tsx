"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material/styles";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE_MB,
  fileIdentity,
  mergeSelectedFiles,
} from "@/lib/fileUpload";

const GREEN_600 = "#1c7c7f";

interface MedicalFileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  buttonLabel?: string;
  py?: number;
}

export function MedicalFileUpload({
  files,
  onChange,
  disabled = false,
  buttonLabel = "Upload reports now (if you have them)",
  py = 2,
}: MedicalFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected?.length) return;

    onChange(mergeSelectedFiles(files, Array.from(selected)));
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", lineHeight: 1.5 }}>
        Optional — you can also send reports on WhatsApp later.
      </Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ py, borderColor: alpha(GREEN_600, 0.5), color: GREEN_600 }}
        disabled={disabled || files.length >= MAX_FILES}
      >
        {files.length > 0
          ? `Add more files (${files.length}/${MAX_FILES})`
          : buttonLabel}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={ACCEPTED_FILE_TYPES}
          multiple
          onChange={handleFileChange}
          disabled={disabled}
        />
      </Button>

      {files.length > 0 && (
        <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
          {files.map((file, index) => (
            <Box
              component="li"
              key={fileIdentity(file)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                py: 0.5,
                px: 1,
                borderRadius: 1,
                bgcolor: alpha(GREEN_600, 0.04),
              }}
            >
              <Typography
                variant="body2"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {file.name}
              </Typography>
              <IconButton
                size="small"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        Images or PDF. Up to {MAX_FILES} files, {MAX_FILE_SIZE_MB}MB each. Hold Ctrl/Cmd or tap multiple
        files to select several at once.
      </Typography>
    </Box>
  );
}
