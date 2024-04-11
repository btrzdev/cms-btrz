import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

async function signUp(credentials: CreateUser) {
  try {
    const response = await axios.post(
      "https://app.grupoerre.pt:1934/auth/create-user",
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
    if (response.status === 200) {
      toast.success("User created successfuly");
    }
  } catch (error) {
    if (error.message === "Request failed with status code 409") {
      toast.error("This email address it's already bein used");
    }
    if (error.response.data.message === "Weak password.") {
      toast.error("Your password is too weak");
    }
    console.error(error);
  }
}

export default signUp;
