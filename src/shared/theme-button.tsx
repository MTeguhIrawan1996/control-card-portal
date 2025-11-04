'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      aria-label="theme-button"
      variant="secondary"
      size="icon"
      className="size-8 cursor-pointer"
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      {mounted ? theme === 'light' ? <Moon /> : <Sun /> : <Sun />}
    </Button>
  );
};

export default ThemeButton;
