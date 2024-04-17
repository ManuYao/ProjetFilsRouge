import React from "react";
import { Skeleton, Divider } from "@mui/material";
export function LoadingSkeleton() {
  return (
    <div className="card_filter" style={{ width: "320px", margin: "0 10px" }}>
      <Skeleton variant="rectangular" width={320} height={384} />
      <div>
        <Skeleton
          width={200}
          height={20}
          sx={{ backgroundColor: "#53B365", color: "#D9D9D" }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton
            width={80}
            height={20}
            sx={{ backgroundColor: "#53B365", color: "#D9D9D" }}
          />
          <Skeleton
            width={80}
            height={20}
            sx={{ backgroundColor: "#53B365", color: "#D9D9D" }}
          />
        </div>
      </div>
    </div>
  );
}

export function errorLoadingSkeleton() {
  return (
    <div className="card_filter" style={{ width: "320px", margin: "0 10px" }}>
      <Skeleton
        variant="rectangular"
        width={320}
        height={384}
        sx={{
          color: "#D9D9D",
        }}
      />
      <div>
        <Skeleton
          width={200}
          height={20}
          sx={{ backgroundColor: "#E5484D", color: "#D9D9D" }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton
            width={80}
            height={20}
            sx={{ backgroundColor: "#E5484D", color: "#D9D9D" }}
          />
          <Divider orientation="vertical" flexItem />
          <Skeleton
            width={80}
            height={20}
            sx={{ backgroundColor: "#E5484D", color: "#D9D9D" }}
          />
        </div>
      </div>
    </div>
  );
}
