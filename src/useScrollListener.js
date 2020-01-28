import { useEffect, useState, useCallback } from 'react';

export default function useScrollListener(
  threshold,
  { comparison = '>', elementId = null, initial = false } = {}
) {
  const [isOverThreshold, setIsOverThreshold] = useState(initial);

  const handleScroll = useCallback(() => {
    const scrollY = !elementId
      ? window.scrollY
      : document.getElementById(elementId).getBoundingClientRect().top;
    if (!isOverThreshold) {
      setIsOverThreshold(
        comparison === '<' ? scrollY < threshold : scrollY > threshold
      );
    } else if (isOverThreshold) {
      setIsOverThreshold(
        comparison === '<' ? scrollY < threshold : scrollY > threshold
      );
    }
  }, [comparison, elementId, isOverThreshold, threshold]);

  useEffect(() => {
    if (typeof threshold === 'number') {
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [handleScroll, threshold]);

  return isOverThreshold;
}
