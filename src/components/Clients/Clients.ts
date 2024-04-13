import axios from "axios";
import React, { useState } from "react";

async function createClient(client: Client[] | Client) {
  try {
    localStorage.setItem("data", JSON.stringify(client));
    console.log(client);
  } catch (error) {
    console.error(error);
  }
}
async function editClient(client: Client) {
  try {
    const response = await axios.post(
      "https://app.grupoerre.pt:1934/auth/login",
      {},
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
async function deleteClient(client: Client) {
  try {
    const response = await axios.post(
      "https://app.grupoerre.pt:1934/auth/login",
      {},
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
export { createClient };
