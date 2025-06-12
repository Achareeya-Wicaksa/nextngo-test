package handler

import (
    "encoding/json"
    "net/http"
    "strings"
    "sync"

    "github.com/google/uuid"
)

type Item struct {
    ID    string `json:"id"`
    Name  string `json:"name"`
    Price int    `json:"price"`
}

var (
    items = map[string]Item{}
    mu    sync.Mutex
)

const authToken = "secrettoken123"

func Handler(w http.ResponseWriter, r *http.Request) {
    auth := strings.TrimSpace(r.Header.Get("Authorization"))
    if !strings.HasPrefix(auth, "Bearer ") {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
        return
    }

    token := strings.TrimSpace(strings.TrimPrefix(auth, "Bearer "))
    if token != authToken {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
        return
    }

    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        handleGet(w, r)
    case http.MethodPost:
        handlePost(w, r)
    case http.MethodPut:
        handlePut(w, r)
    case http.MethodDelete:
        handleDelete(w, r)
    default:
        w.WriteHeader(http.StatusMethodNotAllowed)
        json.NewEncoder(w).Encode(map[string]string{"error": "Method not allowed"})
    }
}

func handleGet(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()

    itemsSlice := make([]Item, 0, len(items))
    for _, item := range items {
        itemsSlice = append(itemsSlice, item)
    }
    json.NewEncoder(w).Encode(itemsSlice)
}

func handlePost(w http.ResponseWriter, r *http.Request) {
    var newItem struct {
        Name  string `json:"name"`
        Price int    `json:"price"`
    }
    if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "Invalid input"})
        return
    }

    id := uuid.New().String()
    item := Item{ID: id, Name: newItem.Name, Price: newItem.Price}

    mu.Lock()
    items[id] = item
    mu.Unlock()

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(item)
}

func handlePut(w http.ResponseWriter, r *http.Request) {
    var updateItem Item
    if err := json.NewDecoder(r.Body).Decode(&updateItem); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "Invalid input"})
        return
    }

    mu.Lock()
    defer mu.Unlock()

    if _, exists := items[updateItem.ID]; !exists {
        w.WriteHeader(http.StatusNotFound)
        json.NewEncoder(w).Encode(map[string]string{"error": "Item not found"})
        return
    }

    items[updateItem.ID] = updateItem
    json.NewEncoder(w).Encode(updateItem)
}

func handleDelete(w http.ResponseWriter, r *http.Request) {
    var deleteItem struct {
        ID string `json:"id"`
    }
    if err := json.NewDecoder(r.Body).Decode(&deleteItem); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "Invalid input"})
        return
    }

    mu.Lock()
    defer mu.Unlock()

    if _, exists := items[deleteItem.ID]; !exists {
        w.WriteHeader(http.StatusNotFound)
        json.NewEncoder(w).Encode(map[string]string{"error": "Item not found"})
        return
    }

    delete(items, deleteItem.ID)
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Item deleted"})
}
