<!-- English version -->

# Personal/Group Financial Management Application Summary

## Overview

This application is a fullstack solution for recording and managing personal or group finances, built with Next.js, Tailwind CSS, shadcn/ui, Supabase, and PostgreSQL. It provides complete authentication features and financial transaction management.

## Key Features

### 1. Authentication and Security

- **Register** with email and password
- **Login** with email/password or Google account
- **Forgot Password** with email reset
- **Reset Password** via email link
- **Session Management** with Supabase Auth

### 2. Group Management

- **Create/Delete** financial groups
- **Invite Members** to groups via email
- **Manage Roles** (admin, member)
- **Leave Groups**
- **Each user only sees data from groups they participate in**

### 3. Financial Management

- **Transaction Records** (Income/Expense)
- **Manage Accounts** (Bank, Digital Wallet, Cash, etc.)
- **Manage Categories** (Food, Transportation, Social, etc.)
- **Filtering and Reports** by period, category, account
- **Dashboard** with financial summary

## Application Flow

### 1. Authentication

- User registers/logs in
- Email verification (if required)
- Access main dashboard

### 2. Initial Setup

- Create/join groups
- Set up financial accounts (Bank, Wallet, etc.)
- Set up transaction categories (optional, can use defaults)

### 3. Daily Operations

- Add transactions (income/expense)
- Select account and category
- Add description (optional)
- View summary on dashboard

### 4. Management

- Invite group members
- Manage accounts and categories
- View financial reports
- Filter by period

## Data Per Group

Each user will see data based on the groups they participate in:

- Transactions only from selected groups
- Financial accounts associated with specific groups
- Categories available within the group
- Group-specific reports and statistics
- Group members with access to the same data

## Technical Implementation

### Database Structure (Supabase)

1. **profiles** - User information
2. **groups** - Financial group data
3. **group_members** - User-group relationships
4. **accounts** - Financial accounts (bank, wallet, etc.)
5. **categories** - Transaction categories
6. **transactions** - Transaction data

### Application Architecture

- **Frontend**: Next.js with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Next.js API Routes + Supabase
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Authentication

### Supabase Implementation Details

Located in the src/supabase directory

This application will help users manage personal or group finances with a modern and intuitive interface.

<!-- Indonesia versioan -->

# Ringkasan Aplikasi Manajemen Keuangan Pribadi/Grup

## Gambaran Umum

Aplikasi ini adalah solusi fullstack untuk mencatat dan mengelola keuangan pribadi atau grup, dibangun dengan Next.js, Tailwind CSS, shadcn/ui, Supabase, dan PostgreSQL. Aplikasi ini menyediakan fitur autentikasi lengkap dan manajemen transaksi keuangan.

## Fitur Utama

### 1. Autentikasi dan Keamanan

- **Register** dengan email dan password
- **Login** dengan email/password atau akun Google
- **Lupa Password** dengan email reset
- **Reset Password** melalui link yang dikirim via email
- **Manajemen Session** dengan Supabase Auth

### 2. Manajemen Grup

- **Buat/Menghapus Grup** keuangan
- **Invite Anggota** ke grup melalui email
- **Kelola Role** anggota (admin, anggota)
- **Keluar dari Grup**
- **Setiap pengguna hanya melihat data dari grup yang mereka ikuti**

### 3. Manajemen Keuangan

- **Catatan Transaksi** (Pemasukan/Pengeluaran)
- **Kelola Akun** (Bank, Dompet Digital, Tunai, dll)
- **Kelola Kategori** (Makanan, Transportasi, Sosial, dll)
- **Filter dan Laporan** berdasarkan periode, kategori, akun
- **Dashboard** dengan ringkasan keuangan

## Alur Aplikasi

### 1. Autentikasi

- Pengguna register/login
- Verifikasi email (jika diperlukan)
- Akses dashboard utama

### 2. Setup Awal

- Buat/bergabung dengan grup
- Setup akun keuangan (Bank, Dompet, dll)
- Setup kategori transaksi (opsional bisa menggunakan default)

### 3. Operasional Harian

- Tambah transaksi (pemasukan/pengeluaran)
- Pilih akun dan kategori
- Tambahkan deskripsi (opsional)
- Lihat ringkasan di dashboard

### 4. Manajemen

- Invite anggota grup
- Kelola akun dan kategori
- Lihat laporan keuangan
- Filter berdasarkan periode

## Data Per Grup

Setiap pengguna akan melihat data berdasarkan grup yang mereka ikuti:
-Transaksi hanya dari grup yang dipilih
-Akun keuangan yang terkait dengan grup tertentu
-Kategori yang dapat digunakan dalam grup
-Laporan dan statistik khusus per grup
-Anggota grup yang memiliki akses ke data yang sama

## Implementasi Teknis

### Struktur Database (Supabase)

1. **profiles** - Informasi pengguna
2. **groups** - Data grup keuangan
3. **group_members** - Relasi pengguna dan grup
4. **accounts** - Akun keuangan (bank, dompet, dll)
5. **categories** - Kategori transaksi
6. **transactions** - Data transaksi

### Arsitektur Aplikasi

- **Frontend**: Next.js dengan App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Next.js API Routes + Supabase
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Authentication

### Detail implamentasi supabase

Ada pada direktori src/supabase

Aplikasi ini akan membantu pengguna mengelola keuangan pribadi atau grup dengan antarmuka yang modern dan intuitif.
