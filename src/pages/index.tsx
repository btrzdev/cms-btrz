import Image from "next/image";
import { Inter } from "next/font/google";
import LoginForm from "@/components/LoginForm";
import CreateUserForm from "@/components/CreateUserForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const loginSuccessFulToast = () => toast("Wow so easy!");

  return (
    <main className={` ${inter.className}`}>
      <div className="flex w-full h-screen">
        <div className="w-[50%] items-center justify-center h-full hidden lg:flex bg-gradient-to-b from-[#2A64DB] via-[#204EB6] to-[#193A8C]">
          <h1 className="font-semibold text-white text-[40px]">
            {" "}
            SOMETHING HERE
          </h1>
        </div>
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <LoginForm />
        </div>
        <ToastContainer />
      </div>
    </main>
  );
}
