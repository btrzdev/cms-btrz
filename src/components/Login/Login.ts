import axios from "axios";
import React, { useState } from "react";

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
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default signIn;
