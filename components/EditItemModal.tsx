"use client";
import React from "react";

interface EditItemModalProps {
  open: boolean;
  name: string;
  price: string;
  onNameChange: (v: string) => void;
  onPriceChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function EditItemModal({
  open,
  name,
  price,
  onNameChange,
  onPriceChange,
  onSubmit,
  onCancel,
}: EditItemModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50
      transition-opacity duration-300"
      style={{ opacity: open ? 1 : 0 }}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Harga"
            className="p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            required
            min={1}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 cursor-pointer  text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
