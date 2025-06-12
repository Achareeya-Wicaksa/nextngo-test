"use client";
import React from "react";

interface DeleteConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50
      transition-opacity duration-300"
      style={{ opacity: open ? 1 : 0 }}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <p className="mb-4 text-lg font-semibold">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
