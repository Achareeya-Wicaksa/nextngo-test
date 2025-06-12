"use client";
import React from "react";

interface AddItemFormProps {
  name: string;
  price: string;
  onNameChange: (v: string) => void;
  onPriceChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddItemForm({
  name,
  price,
  onNameChange,
  onPriceChange,
  onSubmit,
}: AddItemFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex flex-col gap-3">
      <input
        type="text"
        placeholder="Items Name"
        className="p-2 border border-gray-300 rounded"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="p-2 border border-gray-300 rounded"
        value={price}
        onChange={(e) => onPriceChange(e.target.value)}
        required
        min={1}
      />
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded transition"
      >
        Add
      </button>
    </form>
  );
}
