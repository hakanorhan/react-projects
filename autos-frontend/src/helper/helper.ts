import { useMediaQuery, useTheme } from '@mui/material';
import { useLayoutEffect } from "react";

export function LimitMediaQuery() {
  
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
      if (isXs) return 2;
      if (isSm) return 2; // Assuming the same limit for sm as xs
      if (isMd) return 2;
      if (isLg) return 3;
      if (isXl) return 4;
      return 4;
}

export function scrollToTop() {
     useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [])
}

export const dateFormatter = (date: Date)=> {
    return date.toISOString().slice(0, 10);
}

export const CONSOLE_DEV = (message: any) => {
    if(import.meta.env.DEV) console.log(message);
}

export const seperateThousand = (numberData: number | undefined): string | undefined => {
    return numberData?.toLocaleString('de-DE'); 
};


