async function createClient(client: Client[] | Client) {
  try {
    localStorage.setItem("data", JSON.stringify(client));
  } catch (error) {
    console.error(error);
  }
}

export { createClient };
