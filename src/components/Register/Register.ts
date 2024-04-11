import axios from "axios";
import React, { useState } from "react";

async function signUp(credentials: CreateUser) {
  try {
    const response = await axios.post(
      "https://app.grupoerre.pt:1934/auth/login",
      {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
        securePasswordFlag: true,
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

export default signUp;
