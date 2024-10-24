import { Button, Stack } from "@mui/material";
import React from "react";
import useBoolean from "../hooks/use-boolean";
import BlogForm from "./add-blogs";

function Home() {
  const saveSegment = useBoolean();
  return (
    <Stack alignItems={"center"} justifyItems={"center"} height={"100%"}>
      <Button
        variant="contained"
        sx={{ width: "20%" }}
        onClick={() => {
          saveSegment.onTrue();
        }}
      >
        Save Segment
      </Button>

      {saveSegment.value && (
        <BlogForm open={saveSegment.value} onClose={saveSegment.onFalse} />
      )}
    </Stack>
  );
}

export default Home;
