import { Item, API_URL, AUTH_TOKEN } from "./types";

export async function fetchItems(setItems: (items: Item[]) => void, setError: (err: string) => void, setLoading: (load: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    setItems(data);
  } catch {
    setError("Error fetching items");
  } finally {
    setLoading(false);
  }
}

export async function addItem(name: string, price: number, setError: (err: string) => void) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ name, price }),
  });
  if (!res.ok) throw new Error("Request failed");
}

export async function editItem(id: string, name: string, price: number) {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id, name, price }),
  });
  if (!res.ok) throw new Error("Edit failed");
}

export async function deleteItem(id: string) {
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Delete failed");
}
