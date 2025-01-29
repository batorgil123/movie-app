
import { useState, useEffect } from 'react';
import { Film, Moon, Sun } from "lucide-react";
import { Button } from '@/components/ui/button';
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
    >
      {isDarkMode ? <Moon/> : <Sun/>}
    </Button>
  );
};

export default DarkModeToggle;