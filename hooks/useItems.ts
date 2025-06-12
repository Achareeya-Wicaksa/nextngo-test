import { useEffect, useState } from "react";
import { Item } from "../components/types";
import { fetchItems, addItem, editItem, deleteItem } from "../components/handler";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems(setItems, setError, setLoading);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const priceNumber = parseInt(price);
    if (!name || isNaN(priceNumber) || priceNumber <= 0) {
      setError("Please enter valid name and price");
      return;
    }
    await addItem(name, priceNumber, setError);
    await fetchItems(setItems, setError, setLoading);
    setName(""); setPrice("");
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price.toString());
    setModalEditOpen(true);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    const priceNumber = parseInt(price);
    if (!name || isNaN(priceNumber) || priceNumber <= 0) {
      setError("Please enter valid name and price");
      return;
    }
    await editItem(editingId!, name, priceNumber);
    await fetchItems(setItems, setError, setLoading);
    resetForm();
    setModalEditOpen(false);
  }

  function resetForm() {
    setEditingId(null);
    setName(""); setPrice("");
    setError("");
  }

  function cancelEdit() {
    resetForm();
    setModalEditOpen(false);
  }

  function confirmDelete(id: string) {
    setDeleteId(id);
    setModalDeleteOpen(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteItem(deleteId);
    await fetchItems(setItems, setError, setLoading);
    setDeleteId(null);
    setModalDeleteOpen(false);
  }

  function cancelDelete() {
    setDeleteId(null);
    setModalDeleteOpen(false);
  }

  return {
    items, loading, error, name, price,
    setName, setPrice, handleAdd,
    startEdit, modalEditOpen, handleEdit, cancelEdit,
    modalDeleteOpen, confirmDelete, handleDelete, cancelDelete,
  };
}
