'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Kelola Keuangan Anda dengan Mudah
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Aplikasi manajemen keuangan pribadi dan grup yang intuitif,
                aman, dan lengkap dengan fitur autentikasi, pelaporan, dan
                kolaborasi.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="px-8">
                Mulai Sekarang
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
            Fitur Unggulan
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Icons.lock className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Keamanan Terjamin</CardTitle>
                <CardDescription>
                  Autentikasi lengkap dengan email/password atau Google, serta
                  reset password yang aman.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icons.users className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Manajemen Grup</CardTitle>
                <CardDescription>
                  Buat atau bergabung dengan grup keuangan, undang anggota, dan
                  kelola peran dengan mudah.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icons.barChart className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Pelaporan Lengkap</CardTitle>
                <CardDescription>
                  Dashboard intuitif dengan ringkasan keuangan, filter
                  berdasarkan periode, kategori, dan akun.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icons.wallet className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Kelola Akun</CardTitle>
                <CardDescription>
                  Kelola berbagai jenis akun keuangan seperti bank, dompet
                  digital, dan tunai dalam satu tempat.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icons.tag className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Kategori Transaksi</CardTitle>
                <CardDescription>
                  Organisir transaksi dengan kategori yang dapat disesuaikan
                  sesuai kebutuhan pribadi atau grup.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icons.calendar className="text-primary mb-4 h-8 w-8" />
                <CardTitle>Transaksi Harian</CardTitle>
                <CardDescription>
                  Catat pemasukan dan pengeluaran harian dengan mudah, lengkap
                  dengan deskripsi dan tanggal.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Siap Mengelola Keuangan Anda?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Bergabunglah dengan ribuan pengguna yang telah mengelola
                keuangan mereka dengan lebih baik.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button size="lg" className="w-full">
                Daftar Sekarang
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dengan mendaftar, Anda menyetujui{' '}
                <a
                  href="#"
                  className="hover:text-primary underline underline-offset-2"
                >
                  Syarat dan Ketentuan
                </a>{' '}
                kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Financial Tracker. Hak Cipta Dilindungi.
          </p>
          <nav className="mt-4 flex gap-4 md:mt-0">
            <a
              href="#"
              className="hover:text-primary text-sm underline underline-offset-4"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="#"
              className="hover:text-primary text-sm underline underline-offset-4"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="hover:text-primary text-sm underline underline-offset-4"
            >
              Kontak
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
