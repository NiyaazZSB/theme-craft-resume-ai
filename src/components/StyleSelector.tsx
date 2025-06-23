
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Layout } from 'lucide-react';
import { ResumeStyle } from './ResumeBuilder';

interface StyleSelectorProps {
  currentStyle: ResumeStyle;
  onStyleChange: (style: ResumeStyle) => void;
}

const styles: Array<{ name: ResumeStyle; label: string; description: string }> = [
  { name: 'modern', label: 'Modern', description: 'Clean and contemporary' },
  { name: 'classic', label: 'Classic', description: 'Traditional professional' },
  { name: 'creative', label: 'Creative', description: 'Bold and innovative' },
];

const StyleSelector = ({ currentStyle, onStyleChange }: StyleSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Layout className="w-4 h-4" />
          Style
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Choose Style</h3>
          <div className="space-y-2">
            {styles.map((style) => (
              <button
                key={style.name}
                onClick={() => onStyleChange(style.name)}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  currentStyle === style.name ? 'bg-gray-100 ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="font-medium">{style.label}</div>
                <div className="text-sm text-gray-600">{style.description}</div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StyleSelector;
