import { useSafeAreaFrame } from 'react-native-safe-area-context';

export function useResponsive() {
  const { width } = useSafeAreaFrame();

  const isSmall = width < 576;
  const isMedium = width >= 576 && width < 768;
  const isLarge = width >= 768;

  return {
    isSmall,
    isMedium,
    isLarge,
    sll<S, M>(small: S, medium: M) {
      return isSmall ? small : medium;
    },
    ssl<M, L>(medium: M, large: L) {
      return isLarge ? large : medium;
    },
    sml<S, M, L>(small: S, medium: M, large: L) {
      if (isSmall) return small;
      if (isLarge) return large;
      return medium;
    },
  };
}
