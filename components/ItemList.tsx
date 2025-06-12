"use client";
import React from "react";
import { Item } from "./types";

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  if (items.length === 0)
    return <p className="text-red-500">No items found</p>;

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 rounded flex justify-between items-center border border-gray-200"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-600">Rp.{item.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="text-white px-4 py-2 rounded transition bg-blue-400 hover:bg-blue-600 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-white px-4 py-2 rounded bg-red-400 hover:bg-red-600 cursor-pointer transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
