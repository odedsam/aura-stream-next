'use client';

import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import {
  useSearchTerm,
  useSetSearchTerm,
  useIsSearchOpen,
  useToggleSearch,
} from '@/app/store/uiStore';

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
};

const SearchComponent: React.FC = () => {
  const router = useRouter();
  const searchTerm = useSearchTerm();
  const setSearchTerm = useSetSearchTerm();
  const isSearchOpen = useIsSearchOpen();
  const toggleSearch = useToggleSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen, toggleSearch]);

  useEffect(() => {
    const runSearch = async () => {
      const query = debouncedSearchTerm.trim();

      if (!query) {
        setResults([]);
        setSearchError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setSearchError(null);

      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Search failed');
        }

        setResults(data.results ?? []);
      } catch (error) {
        setResults([]);
        setSearchError(error instanceof Error ? error.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [debouncedSearchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/browse?query=${encodeURIComponent(searchTerm.trim())}`);
      toggleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setSearchError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClose = () => {
    toggleSearch();
    setSearchTerm('');
    setResults([]);
    setSearchError(null);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSearch}
        className="cursor-pointer p-2 text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Open search">
        <Search className="w-5 h-5" />
      </button>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 pt-20">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-def w-5 h-5" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies, TV shows, actors..."
                    className="w-full bg-gray-900/90 border border-gray-700 rounded-lg pl-12 pr-20 py-4 text-white placeholder-gray-def focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="p-1 text-gray-def hover:text-white transition-colors"
                        aria-label="Clear search">
                        <X className="w-4 h-4 cursor-pointer " />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleClose}
                      className="cursor-pointer p-2 text-gray-def hover:text-white transition-colors"
                      aria-label="Close search">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>

              {debouncedSearchTerm && (
                <div className="mt-4 bg-gray-900/90 border border-gray-700 rounded-lg p-4">
                  <div className="text-gray-def text-sm mb-2">
                    Showing results for: "<span className="text-white">{debouncedSearchTerm}</span>"
                  </div>

                  {loading && <p className="text-sm text-gray-def">Searching...</p>}
                  {searchError && <p className="text-sm text-red-400">{searchError}</p>}
                  {!loading && !searchError && results.length === 0 && (
                    <p className="text-sm text-gray-def">No results found.</p>
                  )}

                  {!loading && results.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {results.slice(0, 5).map((result) => {
                        const label = result.title || result.name || 'Untitled';
                        const href = `/browse/${result.media_type === 'movie' ? 'movies' : 'shows'}/${result.id}`;

                        return (
                          <Link
                            key={`${result.media_type}-${result.id}`}
                            href={href}
                            onClick={handleClose}
                            className="block rounded-lg border border-gray-800 px-4 py-3 transition hover:border-red-600 hover:bg-gray-800/80">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-white">{label}</p>
                                <p className="text-xs uppercase tracking-wide text-gray-def">
                                  {result.media_type}
                                </p>
                              </div>
                              <span className="text-sm text-red-400">Open</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
