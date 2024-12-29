import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Paths } from "../constants/paths";

const ConfirmEmail: React.FC = () => {
  const [status, setStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      axios
        .get(`/api/auth/confirm-email?token=${token}`)
        .then(() => {
          setStatus("Email confirmed successfully!");
          setTimeout(() => navigate(Paths.LOGIN), 3000); // Redirect to login after 3 seconds
        })
        .catch(() => {
          setStatus("Failed to confirm email. Invalid or expired token.");
        });
    } else {
      setStatus("No confirmation token provided.");
    }
  }, [location.search, navigate]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>{status}</p>
    </div>
  );
};

export default ConfirmEmail;
