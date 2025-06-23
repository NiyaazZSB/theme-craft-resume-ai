
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { Theme } from './ResumeBuilder';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes: Array<{ name: Theme; color: string; label: string }> = [
  { name: 'blue', color: 'bg-blue-600', label: 'Blue' },
  { name: 'red', color: 'bg-red-600', label: 'Red' },
  { name: 'green', color: 'bg-green-600', label: 'Green' },
  { name: 'purple', color: 'bg-purple-600', label: 'Purple' },
  { name: 'orange', color: 'bg-orange-600', label: 'Orange' },
  { name: 'dark', color: 'bg-gray-800', label: 'Dark' },
];

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => onThemeChange(theme.name)}
                className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  currentTheme === theme.name ? 'bg-gray-100 ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${theme.color}`}></div>
                <span className="text-sm">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSelector;
