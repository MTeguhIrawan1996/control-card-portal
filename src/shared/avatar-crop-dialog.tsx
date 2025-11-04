/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { IconZoomIn, IconZoomOut } from '@tabler/icons-react';

import { getCroppedImg } from '@/lib/helper/cropImage';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface IAvatarCropDialogProps {
  imageSrc: string | null;
  onClose: () => void;
  open: boolean;
  onCrop: (croppedImage: string, croppedFile: File) => void;
}

const AvatarCropDialog: React.FC<IAvatarCropDialogProps> = ({
  imageSrc,
  onClose,
  onCrop,
  open,
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null,
  );

  const onCropComplete = React.useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCrop = async () => {
    if (imageSrc) {
      try {
        const res = await getCroppedImg(imageSrc as string, croppedAreaPixels);
        const croppedFile = new File([res?.croppedBlob as Blob], 'avatar', {
          type: res?.croppedBlob.type,
        });
        onCrop(res?.croppedUrl as string, croppedFile);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      } catch (e) {
        return e;
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Crop Avatar</DialogTitle>
        </DialogHeader>

        <div className="flex w-fit flex-col gap-4 md:flex-row">
          {/* Crop Area */}
          <div className="relative aspect-square h-80 overflow-hidden rounded-sm">
            {!!imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                objectFit="horizontal-cover"
                showGrid={false}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zoom</label>
            <div className="flex items-center gap-2">
              <IconZoomOut className="size-4" />
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
              />
              <IconZoomIn className="size-4" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCropDialog;
