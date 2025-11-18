// src/LogoutButton.js
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Button
      color="secondary"
      variant="outlined"
      sx={{ position: "absolute", top: 20, right: 20 }}
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
