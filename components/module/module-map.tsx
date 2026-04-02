'use client';

import type { TocEntry } from '@/lib/content-enhancement/types';

interface ModuleMapProps {
  entries: TocEntry[];
}

export default function ModuleMap({ entries }: ModuleMapProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="module-map mb-6">
      <h3 className="module-map__title">Module Map</h3>
      <ol className="module-map__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="module-map__link"
              onClick={(e) => handleClick(e, entry.id)}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
