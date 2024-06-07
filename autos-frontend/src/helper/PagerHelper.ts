import { useLayoutEffect } from "react";

export function scrollToTop() {
     useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [])
}