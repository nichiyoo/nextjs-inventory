# Sistem Manajemen Inventaris Next.js

[Read in English](https://github.com/nichiyoo/nextjs-inventory/blob/main/readme.md)

## Ikhtisar

Proyek ini adalah sistem manajemen inventaris sederhana yang dibangun dengan Next.js. Sistem ini memungkinkan operasi CRUD pada data produk, memperbarui stok berdasarkan penjualan dan pengadaan, meramalkan penjualan untuk bulan depan, menghitung Reorder Point (ROP) dan Economic Order Quantity (EOQ), serta memberi notifikasi kepada pengguna ketika stok jatuh di bawah ROP setelah penjualan.

Repositori: [https://github.com/nichiyoo/nextjs-inventory](https://github.com/nichiyoo/nextjs-inventory)

## Teknologi yang Digunakan

-   [Next.js](https://nextjs.org/) - Framework React untuk membangun aplikasi web
-   [Bun](https://bun.sh/) - Runtime JavaScript dan package manager
-   [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
-   [Drizzle ORM](https://orm.drizzle.team/) - ORM TypeScript untuk database SQL
-   [shadcn/ui](https://ui.shadcn.com/) - Komponen yang dapat digunakan kembali dibangun dengan Radix UI dan Tailwind CSS
-   [Zod](https://github.com/colinhacks/zod) - Validasi schema TypeScript-first
-   [Zustand](https://github.com/pmndrs/zustand) - Manajemen state
-   [Arima](https://github.com/zemlyansky/arima) - Peramalan time series

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

-   [Bun](https://bun.sh/) (versi terbaru)
-   [Git](https://git-scm.com/)

## Instalasi

1. Klon repositori:

    ```
    git clone https://github.com/nichiyoo/nextjs-inventory.git
    cd nextjs-inventory
    ```

2. Instal dependensi:
    ```
    bun install
    ```

## Pengaturan Environment

1. Salin file `.env.example` untuk membuat file `.env` baru:

    ```
    cp .env.example .env
    ```

2. Buka file `.env` dan pastikan berisi nilai-nilai berikut:

    ```
    DATABASE_FILE_NAME=file:database/database.db
    NEXT_PUBLIC_APP_NAME="Hokki Frozen Food"
    ```

    Anda dapat memodifikasi `NEXT_PUBLIC_APP_NAME` jika diperlukan.

## Pengaturan Database

1. Push skema database:

    ```
    bun run db:push
    ```

2. (Opsional) Seed database:
    ```
    bun run db:seed
    ```

## Menjalankan Aplikasi

### Mode Pengembangan

Untuk memulai server pengembangan:

```
bun run dev
```

Aplikasi akan tersedia di `http://localhost:3000`.

### Mode Produksi

Untuk membangun dan memulai aplikasi untuk produksi:

1. Bangun aplikasi:

    ```
    bun run build
    ```

2. Mulai server produksi:
    ```
    bun run start
    ```

## Script yang Tersedia

-   `bun run dev`: Memulai server pengembangan
-   `bun run build`: Membangun aplikasi untuk produksi
-   `bun run start`: Memulai server produksi
-   `bun run lint`: Menjalankan ESLint
-   `bun run db:push`: Push perubahan skema database
-   `bun run db:migrate`: Menjalankan migrasi database
-   `bun run db:generate`: Menghasilkan file migrasi
-   `bun run db:seed`: Seed database
-   `bun run db:studio`: Membuka Drizzle Studio untuk manajemen database

## Fitur

-   Operasi CRUD untuk data produk
-   Pembaruan stok berdasarkan penjualan dan pengadaan
-   Peramalan penjualan untuk bulan depan
-   Perhitungan ROP (Reorder Point) dan EOQ (Economic Order Quantity)
-   Notifikasi pengguna ketika stok jatuh di bawah ROP setelah penjualan
-   Sistem manajemen pengguna

## Berkontribusi

Kontribusi sangat diterima! Jangan ragu untuk mengajukan Pull Request.

1. Fork repositori
2. Buat branch fitur Anda (`git checkout -b feature/FiturLuarBiasa`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturLuarBiasa'`)
4. Push ke branch (`git push origin feature/FiturLuarBiasa`)
5. Buka Pull Request
