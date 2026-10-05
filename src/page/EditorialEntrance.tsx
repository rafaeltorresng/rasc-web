import { useEffect, useRef, type ReactNode } from 'react';

// Stable, accessible markup with one viewport entrance. Only the writing scene
// visually conceals its words while ready; other passages stay readable.
export default function EditorialEntrance({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || element.dataset.editorialEntrance === 'entered' || element.dataset.editorialEntrance === 'static') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || typeof IntersectionObserver === 'undefined') {
      element.dataset.editorialEntrance = 'static';
      return;
    }

    element.dataset.editorialEntrance = 'ready';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || preference.matches || element.dataset.editorialEntrance !== 'ready') return;
      element.dataset.editorialEntrance = 'entered';
      observer.disconnect();
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0.1 });
    observer.observe(element);
    const onPreference = () => {
      if (preference.matches) {
        element.dataset.editorialEntrance = 'static';
        observer.disconnect();
      }
    };
    preference.addEventListener('change', onPreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', onPreference);
    };
  }, []);

  return <div className={`editorial-entrance ${className}`.trim()} ref={ref}>{children}</div>;
}
