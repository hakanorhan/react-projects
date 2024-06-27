export default function afterComponentViewed (setVisible: React.Dispatch<React.SetStateAction<boolean>>, elemendId: string) {
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(entry.target);
      }
    });

    console.log("Wird immer ausgeführt!");

    const boxElement = document.getElementById(`${ elemendId }`);
    if (boxElement) observer.observe(boxElement);

    return () => {
      if (boxElement) observer.unobserve(boxElement);
    };
  }