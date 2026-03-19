'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  media_type: 'movie' | 'tv';
};

export default function BrowseSearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.trim() ?? '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runSearch = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Search failed');
        }

        setResults(data.results ?? []);
      } catch (searchError) {
        setResults([]);
        setError(searchError instanceof Error ? searchError.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [query]);

  if (!query) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Search Results</h2>
          <p className="text-sm text-gray-def">
            Results for <span className="text-white">{query}</span>
          </p>
        </div>
        <span className="text-sm text-red-400">{results.length} matches</span>
      </div>

      {loading && <p className="text-sm text-gray-def">Searching...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p className="text-sm text-gray-def">No movies or shows matched that search.</p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((result) => {
            const title = result.title || result.name || 'Untitled';
            const href = `/browse/${result.media_type === 'movie' ? 'movies' : 'shows'}/${result.id}`;

            return (
              <Link
                key={`${result.media_type}-${result.id}`}
                href={href}
                className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:border-red-600 hover:bg-gray-800">
                <div className="aspect-[2/3] relative bg-gray-800">
                  {result.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-def">
                      No poster
                    </div>
                  )}
                </div>
                <div className="space-y-1 p-3">
                  <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-def">
                    {result.media_type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
