# 🛠️ CRUD App with Next.js (Frontend) & Golang (Backend)

A simple full-stack CRUD application built using **Next.js 15 (App Router)** as the frontend and **Go (Golang)** as the backend.  
This app is deployable in serverless environments (like Vercel) and includes temporary data storage (no database) with basic CRUD functionalities.

---

## 🔧 Requirements

Pastikan Anda sudah menginstal:

- ✅ [Node.js](https://nodejs.org/) (disarankan versi 18+)
- ✅ [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- ✅ [Go](https://golang.org/dl/) (disarankan versi 1.20+)

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/Achareeya-Wicaksa/nextngo-test.git
cd nextngo-test
```

## 📦 Frontend Setup (Next.js)
### 📁 Lokasi: ./
### 📄 Langkah-langkah:
```bash
npm install
npm run dev
```
Frontend akan berjalan di http://localhost:3000

## 🧩 Backend Setup (Golang)
### 📁 Lokasi: ./src/api
### 📄 Langkah-langkah:
```bash
cd backend
*pastikan sudah masuk ke folder backend
go run main.go
*pastikan sudah menginstall go 
```
Frontend akan berjalan di http://localhost:3000


## 📌 Available Endpoints
| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | `/api/items`      | Get all users     |
| POST   | `/api/items`      | Create new item   |
| PUT    | `/api/items`  | Update user by ID |
| DELETE | `/api/items`  | Delete user by ID |

** apabila mengirim lewat postman/swagger pastikan sudah menggunakan auth bearer "secrettoken123"

## 🧪 Link koleksi Postman:

Klik di sini untuk lihat koleksi API
[https://documenter.getpostman.com/view/45855326/2sB2x6kXUt](https://documenter.getpostman.com/view/45855326/2sB2x6kXUt)


## 📂 Struktur Proyek Singkat

```bash
nextngo-test/
├── backend/                
│   ├── api/
│   │     
│   └── main.go          
├── src/   
├────── app/            
│        ├── page.tsx
├── public/             
├── styles/             
│   └── globals.css
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md            # You're here

```

## 💡 Catatan Tambahan

- Backend tidak menggunakan database — data hanya disimpan sementara di memori.

- Frontend dan backend berjalan terpisah:

- Frontend: port 3000

- Backend: port 3001

- CORS di-backend hanya mengizinkan akses dari http://localhost:3000


## 🧪 Link koleksi Postman:

Klik di sini untuk lihat Frontend yang berhasil deploy Vercel
[https://nextdango-test-cbi.vercel.app/](https://nextdango-test-cbi.vercel.app/)

Klik di sini untuk lihat Backend serverless yang berhasil deploy Vercel
[https://nextdango-test-cbi.vercel.app/](https://crud-next-go-serverless-vercel.vercel.app/api/items)