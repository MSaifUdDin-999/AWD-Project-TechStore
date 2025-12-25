import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Standard Window Scroll
    window.scrollTo(0, 0);
    
    // 2. Document Element Scroll (Fixes Firefox/IE sometimes)
    document.documentElement.scrollTo(0, 0);
    
    // 3. Body Scroll (Fixes Safari/Chrome sometimes if body is 100% height)
    document.body.scrollTo(0, 0);

  }, [pathname]);

  return null;
}

export default ScrollToTop;