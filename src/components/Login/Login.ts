import axios from "axios";
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

    sessionStorage.setItem("token", JSON.stringify(response.data?.token));
    if (response.status === 200) {
      toast.success("Sucessful!");
      window.location.replace("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
}

export { signIn };
