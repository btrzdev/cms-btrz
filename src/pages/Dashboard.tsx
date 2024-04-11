import CreateNewClient from "@/components/Clients/CreateNewClient";

export default function Dashboard() {
  let localStorageLoaded;
  if (typeof window !== "undefined") {
    localStorageLoaded = localStorage;
  } else {
    localStorageLoaded = null;
  }
  const localStorageData = localStorageLoaded?.getItem("data");

  console.log("Local storage", JSON.parse(localStorageData));

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <div className="flex w-full h-screen">
        <CreateNewClient />
      </div>
    </main>
  );
}
