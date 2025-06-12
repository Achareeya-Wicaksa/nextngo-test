"use client";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
};

const AUTH_TOKEN = "secrettoken123";

const rawUrl = process.env.NEXT_PUBLIC_API_URL;
if (!rawUrl) {
  throw new Error(
    "API URL is not defined. Please set NEXT_PUBLIC_API_URL in your .env.local"
  );
}
const API_URL: string = rawUrl;

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || price <= 0) {
      setError("Please enter valid name and price");
      return;
    }

    try {
      let res;
      if (editingId) {

        res = await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify({ id: editingId, name, price }),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify({ name, price }),
        });
      }
      if (!res.ok) throw new Error("Request failed");
      await fetchItems();
      setName("");
      setPrice(0);
      setEditingId(null);
    } catch {
      setError("Failed to save item");
    }
  }

  async function handleDelete(id: string) {
    try {

      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItems();
    } catch {
      setError("Failed to delete item");
    }
  }

  function startEdit(item: Item) {
    setName(item.name);
    setPrice(item.price);
    setEditingId(item.id);
  }

  function cancelEdit() {
    setName("");
    setPrice(0);
    setEditingId(null);
    setError("");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-pastel-primary">
       CRUD Items
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          className="p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 border border-gray-300 rounded"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
          min={1}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-400 text-white px-4 py-2 rounded hover:bg-pastel-secondary transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-red-500">No items found</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Rp.{item.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
