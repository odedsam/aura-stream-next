# Development

## Development Orientation

- Repository: `aura-stream-next`
- Package manager metadata: `pnpm@10.10.0`
- Suggested install command from package manager metadata: `pnpm install`
- Commands below are limited to scripts or toolchain files that are actually present in the repo.
- This file is meant to help with local work, maintenance, and scanning the implementation surface
  area.

## Available Scripts

- `clean`: `rimraf node_modules .next pnpm-lock.yaml`
- `dev`: `next dev --turbopack`
- `generate`: `prisma generate`
- `build`: `pnpm run generate && next build`
- `start`: `next start`
- `lint`: `next lint`
- `format`: `prettier --write .`

## Development Workflow Notes

- Install path should be checked against package manager metadata before local development:
  `pnpm@10.10.0`.
- Build, dev, lint, format, and test tasks are listed exactly as declared in `package.json` when
  present.
- No dependency installation or build execution was performed for this documentation pass.
- Script `dev` is available and may be relevant for local workflow review.
- Script `build` is available and may be relevant for local workflow review.
- Script `start` is available and may be relevant for local workflow review.
- Script `lint` is available and may be relevant for local workflow review.
- Script `format` is available and may be relevant for local workflow review.

## Configuration Files

- `.prettierrc`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `pnpm-workspace.yaml`
- `postcss.config.mjs`
- `tsconfig.json`

## Environment Variable Reference

- `API_KEY`
- `FACEBOOK_CLIENT_ID`
- `FACEBOOK_CLIENT_SECRET`
- `FACEBOOK_REDIRECT_URI`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `IMDB_ACCESS_TOKEN`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NODE_ENV`
- `TMDB_ACCESS_TOKEN`
- `TMDB_API_KEY`

## Top-Level Directory Checklist

- `.vscode/`
- `docs/`
- `prisma/`
- `public/`
- `src/`

## Entry Points And Boot Files

- `src/app/page.tsx`
- `next.config.ts`

## Config And Schema Files

- `eslint.config.mjs`
- `next.config.ts`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `src/config/appConfig.ts`
- `src/config/categories.ts`
- `src/config/env.ts`
- `src/config/index.ts`
- `src/config/mock.ts`
- `src/config/navlinks.ts`
- `tsconfig.json`

## Service, Data, Or Backend Touchpoint Files

- `src/lib/api.ts`
- `src/lib/auth.ts`
- `src/lib/db/api.ts`
- `src/lib/db/queries/getDataTables.ts`
- `src/lib/db/queries/getDbStats.ts`
- `src/lib/index.ts`
- `src/lib/prisma.ts`
- `src/lib/search.ts`
- `src/lib/tmdb.ts`
- `src/lib/toast.ts`

## State, Middleware, Hook, Or Provider Files

- `src/hooks/useCollectionActions.ts`
- `src/hooks/useDebounce.ts`
- `src/hooks/useIsMobile.ts`
- `src/hooks/useLocalStorage.ts`
- `src/hooks/usePagination.ts`
- `src/hooks/useSlider.ts`
- `src/hooks/useVolumeControl.ts`
- `src/providers/PaginationProvider.tsx`

## Testing And Verification Files

- No testing files were categorized

## Runtime Dependencies

- `@hookform/resolvers`
- `@prisma/client`
- `@supabase/supabase-js`
- `@tanstack/react-query`
- `@tanstack/react-query-devtools`
- `axios`
- `bcryptjs`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `next`
- `react`
- `react-dom`
- `react-hook-form`
- `sonner`
- `tailwind-merge`
- `tw-animate-css`
- `zod`
- `zustand`

## Development Dependencies

- `@eslint/eslintrc`
- `@tailwindcss/postcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `autoprefixer`
- `eslint`
- `eslint-config-next`
- `eslint-plugin-react`
- `postcss`
- `prettier`
- `prisma`
- `rimraf`
- `tailwindcss`
- `ts-prune`
- `tsx`
- `typescript`

## Additional Development Inventory

- `.prettierrc`
- `eslint.config.mjs`
- `middelware.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `parse-tsprune.ts`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `postcss.config.mjs`
- `prisma/schema.prisma`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/AppLoaderWrapper.tsx`
- `src/app/api/auth/callback/route.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/me/route.ts`
- `src/app/api/auth/register/route.ts`
- `src/app/api/browse/movies/[id]/route.ts`
- `src/app/api/browse/route.ts`
- `src/app/api/browse/shows/[id]/route.ts`
- `src/app/api/db-stats/route.ts`
- `src/app/api/discover/route.ts`
- `src/app/api/popular/route.ts`
- `src/app/api/register/route.ts`
- `src/app/api/search/route.ts`
- `src/app/api/tables/route.ts`
- `src/app/browse/movies/[id]/page.tsx`
- `src/app/browse/page.tsx`
- `src/app/browse/shows/[id]/page.tsx`
- `src/app/dashboard/layout.tsx`
- `src/app/dashboard/liked/page.tsx`
- `src/app/dashboard/lists/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/saved/page.tsx`
- `src/app/discovery/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/layouts/AppFooter.tsx`
- `src/app/layouts/AppHeader.tsx`
- `src/app/layouts/CallToAction.tsx`
- `src/app/layouts/header/ActionPanel.tsx`
- `src/app/layouts/header/Logo.tsx`
- `src/app/layouts/header/MobileMenu.tsx`
- `src/app/layouts/header/Navbar.tsx`
- `src/app/layouts/header/Notification.tsx`
- `src/app/layouts/header/Search.tsx`
- `src/app/page.tsx`
- `src/app/store/notificationStore.ts`
- `src/app/store/searchStore.ts`
- `src/app/store/uiStore.ts`
- `src/app/store/useAuth.ts`
- `src/app/store/useCollectionStore.ts`
- `src/app/store/useDialogStore.ts`
- `src/app/subscriptions/page.tsx`
- `src/app/support/page.tsx`
- `src/app/watchlist/page.tsx`
- `src/components/auth/AuthGuard.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/components/cards/CastCard.tsx`
- `src/components/cards/ContentCard.tsx`
- `src/components/cards/DescriptionCard.tsx`
- `src/components/cards/DeviceCard.tsx`
- `src/components/cards/EpisodeCard.tsx`
- `src/components/cards/FaqCard.tsx`
- `src/components/cards/GenreCard.tsx`
- `src/components/cards/PersonaCard.tsx`
- `src/components/cards/PricingCard.tsx`
- `src/components/cards/ReleasedYearCard.tsx`
- `src/components/cards/ReviewCard.tsx`
- `src/components/common/CollectionManager.tsx`
- `src/components/common/HeroSliderClient.tsx`
- `src/components/common/HeroSliderServer.tsx`
- `src/components/common/QuickActions.tsx`
- `src/components/common/ResultsSummary.tsx`
- `src/components/common/SliderContainer.tsx`
- `src/components/common/StarRating.tsx`
- `src/components/controls/Controls.tsx`
- `src/components/controls/GlobalControlVolume.tsx`
- `src/components/controls/TrailerPlayer.tsx`
- `src/components/feedback/EmptyState.tsx`
- `src/components/feedback/Maintance.tsx`
- `src/components/forms/SupportForm.tsx`
- `src/components/images/ImageGrid.tsx`
- `src/components/images/PosterImage.tsx`
- `src/components/loaders/AltSuspense.tsx`
- `src/components/loaders/AppLoader.tsx`
- `src/components/loaders/Loader.tsx`
- `src/components/loaders/Loaders.tsx`
- `src/components/loaders/SuspenseLoader.tsx`
- `src/components/loaders/index.ts`
- `src/components/loaders/skeleton-loader.tsx`
- `src/components/navigation/Navigation.tsx`
- `src/components/sections/BrowseSection.tsx`
- `src/components/sections/CastSection.tsx`
- `src/components/sections/DeviceSection.tsx`
- `src/components/sections/FaqsSection.tsx`
- `src/components/sections/MovieReview.tsx`
- `src/components/sections/ReviewSection.tsx`
- `src/components/sections/WatchlistSection.tsx`
- `src/components/sections/hero/HomeHero.tsx`
- `src/components/sections/hero/MovieHero.tsx`
- `src/components/sections/hero/SupportHero.tsx`
- `src/components/sections/index.ts`
- `src/components/sections/pricing/DesktopPricingTable.tsx`
- `src/components/sections/pricing/MobilePricingTable.tsx`
- `src/components/sections/pricing/PricingSection.tsx`
- `src/components/sections/pricing/PricingTable.tsx`
- `src/components/sliders/SliderControl.tsx`
- `src/components/sliders/SliderIndicator.tsx`
- `src/components/sliders/carousels/GenreCarousel.tsx`
- `src/components/sliders/carousels/Partials.tsx`
- `src/components/sliders/carousels/index.ts`
- `src/components/ui/Arrow.tsx`
- `src/components/ui/AuraButton.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Blocks.tsx`
- `src/components/ui/Buttons.tsx`
- `src/components/ui/CountrySelector.tsx`
- `src/components/ui/Dialog.tsx`
- `src/components/ui/Divider.tsx`
- `src/components/ui/Dropdown.tsx`
- `src/components/ui/ExpandView.tsx`
- `src/components/ui/GenreGrid.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Labels.tsx`
- `src/components/ui/Logo.tsx`
- `src/components/ui/MovieResults.tsx`
- `src/components/ui/Semantic.tsx`
- `src/components/ui/Tags.tsx`
- `src/components/ui/ToggleGroup.tsx`
- `src/components/ui/toaster.tsx`
- `src/config/appConfig.ts`
- `src/config/categories.ts`
- `src/config/env.ts`
- `src/config/index.ts`
- `src/config/mock.ts`
- `src/config/navlinks.ts`
- `src/data/content.ts`
- `src/features/SingleMovieHero.tsx`
- `src/features/details/GenreCredits.tsx`
- `src/features/details/ShowDetails.tsx`
- `src/features/details/ShowDetailsClient.tsx`
- `src/features/details/partials/Seasons.tsx`
- `src/features/lists/ContentCard.tsx`
- `src/features/lists/FullList.tsx`
- `src/features/lists/liked-list/LikedList.tsx`
- `src/features/lists/liked-list/LikedListStats.tsx`
- `src/features/watchlist/partials.tsx`
- `src/hooks/useCollectionActions.ts`
- `src/hooks/useDebounce.ts`
- `src/hooks/useIsMobile.ts`
- `src/hooks/useLocalStorage.ts`
- `src/hooks/usePagination.ts`
- `src/hooks/useSlider.ts`
- `src/hooks/useVolumeControl.ts`
- `src/lib/api.ts`
- `src/lib/auth.ts`
- `src/lib/db/api.ts`
- `src/lib/db/queries/getDataTables.ts`
- `src/lib/db/queries/getDbStats.ts`
- `src/lib/index.ts`
- `src/lib/prisma.ts`
- `src/lib/search.ts`
- `src/lib/tmdb.ts`
- `src/lib/toast.ts`
- `src/providers/PaginationProvider.tsx`
- `src/types/components.ts`
- `src/types/genre.ts`
- `src/types/index.ts`
- `src/types/lists.ts`
- `src/types/mock.ts`
- `src/types/tmdb.ts`
- `src/utils/actions.ts`
- `src/utils/formatters.ts`
- `src/utils/index.ts`
- `src/utils/localStorage.ts`
- `src/utils/supabase.ts`
- `src/utils/twUtil.ts`
- `tsconfig.json`

## Known Unknowns

- Deployment platform configuration was not explicitly confirmed from a Render manifest
- No dedicated test files were categorized from the scanned repository tree
