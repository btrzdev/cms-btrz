import CreateUserForm from "@/components/CreateUserForm";

export default function RegisterPage() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <div className="flex w-full h-screen">
        <div className="w-[50%] items-center justify-center h-full hidden lg:flex bg-gradient-to-b from-[#2A64DB] via-[#204EB6] to-[#193A8C]">
          <h1 className="font-semibold text-white text-[40px]">
            {" "}
            SOMETHING HERE
          </h1>
        </div>
        <div className="w-full lg:w-[50%]  flex justify-center items-center">
          <CreateUserForm />
        </div>
      </div>
    </main>
  );
}
