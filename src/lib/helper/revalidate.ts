'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function invalidateTag(tag: string) {
  revalidateTag(tag);
}
export async function invalidatePath(
  originalPath: string,
  type?: 'layout' | 'page',
) {
  revalidatePath(originalPath, type);
}
