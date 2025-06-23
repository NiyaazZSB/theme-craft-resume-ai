
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUpload: (photoDataUrl: string) => void;
  currentPhoto?: string;
}

const PhotoUpload = ({ onPhotoUpload, currentPhoto }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onPhotoUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
      {currentPhoto && (
        <img
          src={currentPhoto}
          alt="Profile preview"
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <Button onClick={triggerFileInput} variant="outline" className="flex items-center gap-2">
          <Camera className="w-4 h-4" />
          {currentPhoto ? 'Change Photo' : 'Upload Photo'}
        </Button>
        <p className="text-sm text-gray-600 mt-1">
          Optional: Add a professional headshot
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
