// hooks/useTransformsForItems.js
import { useTransform, motionValue } from "framer-motion";

/**
 * Always returns a stable array of transforms to avoid hook-order violations.
 */
export function useTransformsForItems(length, scrollXProgress) {
  const safeProgress = scrollXProgress || motionValue(0);

  return Array.from({ length }).map((_, index) =>
    useTransform(safeProgress, [0, 1], [100 * index, -100 * index])
  );
}
