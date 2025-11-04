/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';

import { readFile } from '@/lib/helper/cropImage';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import AvatarCropDialog from '@/shared/avatar-crop-dialog';

interface IAvatarButton {
  avatarServerSrc?: string;
  handleChange: (croppedFile: File) => void;
}

export const AvatarButton = ({
  handleChange,
  avatarServerSrc,
}: IAvatarButton) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    avatarServerSrc || 'https://github.com/shadcn.png',
  );

  const handleFileChange = async (
    payload: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (payload.target.files && payload.target.files.length > 0) {
      const file = payload.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
      setIsCropDialogOpen(true);
    }
  };

  const handleCloseCropDialog = () => {
    setImageSrc(null);
    setIsCropDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCrop = (croppedImage: string, croppedFile: File) => {
    setAvatarSrc(croppedImage);
    handleChange(croppedFile);
    setIsCropDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar className="size-16 overflow-hidden rounded-full">
        <AvatarImage src={avatarSrc} alt="avatar" />
      </Avatar>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="outline"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Ganti Avatar
        </Button>
      </div>
      <AvatarCropDialog
        open={isCropDialogOpen}
        imageSrc={imageSrc}
        onClose={handleCloseCropDialog}
        onCrop={handleCrop}
      />
    </div>
  );
};
