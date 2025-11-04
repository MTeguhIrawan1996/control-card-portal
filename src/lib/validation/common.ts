import { z } from 'zod/v4';

export const FILE_SIZE = 5 * 1024 * 1024;
export const FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const zRequiredString = z
  .string()
  .min(1, { error: 'Kolom tidak boleh kosong' });

export const zRequiredNumber = z
  .number()
  .gte(1, { error: 'Kolom tidak boleh kosong' });

export const zPasswordValidation = z
  .string()
  .min(8, { error: 'Kata sandi minimal 8 karakter' })
  .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]*$/, {
    error: 'Format kata sandi salah',
  });

export const zImageRequired = z
  .custom<File>()
  .refine((file) => file, { error: 'Foto tidak boleh kosong' })
  .refine(
    (file) =>
      file &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
        file.type,
      ),
    {
      error: 'File harus Foto',
    },
  );

export const zImageValidation = z
  .file()
  .max(FILE_SIZE, { error: 'Upload failed. The file exceeds the maximum size' })
  .mime(FILE_TYPE, {
    error: 'Invalid file format. You must provide a image file',
  });
