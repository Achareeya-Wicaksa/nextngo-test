"use client";
import { useItems } from "../../hooks/useItems";
import AddItemForm from "../../components/AddItemForm";
import ItemList from "../../components/ItemList";
import EditItemModal from "../../components/EditItemModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

export default function Home() {
  const {
    items, loading, error,
    name, price, setName, setPrice,
    handleAdd, startEdit,
    modalEditOpen, handleEdit, cancelEdit,
    modalDeleteOpen, confirmDelete, handleDelete, cancelDelete,
  } = useItems();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-pastel-primary">CRUD Items</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AddItemForm
        name={name}
        price={price}
        onNameChange={setName}
        onPriceChange={setPrice}
        onSubmit={handleAdd}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ItemList items={items} onEdit={startEdit} onDelete={confirmDelete} />
      )}

      <EditItemModal
        open={modalEditOpen}
        name={name}
        price={price}
        onNameChange={setName}
        onPriceChange={setPrice}
        onSubmit={handleEdit}
        onCancel={cancelEdit}
      />

      <DeleteConfirmModal
        open={modalDeleteOpen}
        onCancel={cancelDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
}
