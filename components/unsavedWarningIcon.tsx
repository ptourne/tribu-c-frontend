import React from "react";
import { Typography, Tooltip } from "@mui/material";
import { IoIosWarning } from "react-icons/io";

const UnsavedWarningIcon = ({ isSaved }) => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-shrink-0 w-10">
      {isSaved || (
        <Tooltip
          title={<Typography fontSize={15}>Cambios sin guardar</Typography>}
          placement="top"
        >
          <div className="d-flex align-items-center justify-content-center text-warning">
            <IoIosWarning
              style={{ flex: "1", height: "100%", fontSize: "2rem" }}
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default UnsavedWarningIcon;
