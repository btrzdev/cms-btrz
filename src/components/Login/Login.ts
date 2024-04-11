import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

async function signIn(credentials: Credentials) {
  try {
    const response = await axios.post(
      "https://app.grupoerre.pt:1934/auth/login",
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      toast.success("Sucessful!");
    }
  } catch (error) {
    console.error(error);
  }
}

export default signIn;
