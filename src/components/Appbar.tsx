"use client";
import { SelectTheme } from "./ThemeToggler";


export default function Appbar() {

  return (
    
      <div className="flex items-center gap-2">
        <SelectTheme />
        
      </div>
    
  );
}
