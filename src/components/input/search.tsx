import { Input, YStack } from "tamagui";
import { Selection } from "@/src/components/input/selection";
import { UseQueryResult } from "react-query";
import { useMemo } from "react";

type SearchProps<T> = {
  query: UseQueryResult<T[]>;
  queryText: string;
  onChangeQueryText: (query: string) => void;
  isSelected: (value: T) => boolean;
  extractLabel: (value: T) => string;
  toggleSelected: (value: T) => void;
  extractKey: (value: T) => any;
  placeholder?: string;
};

export const Search = <T,>({
  query,
  queryText,
  onChangeQueryText,
  isSelected,
  extractKey,
  extractLabel,
  toggleSelected,
  placeholder = "Search...",
}: SearchProps<T>) => {
  const results = useMemo(
    () =>
      query.data?.map((value) => ({
        ...value,
        key: extractKey(value),
        selected: isSelected(value),
        label: extractLabel(value),
      })) ?? [],
    [query.data, extractLabel, extractKey, isSelected],
  );

  return (
    <YStack gap="$2">
      <Input
        value={queryText}
        onChangeText={onChangeQueryText}
        placeholder={placeholder}
      />
      <YStack gap="$1">
        {results.map((value) => (
          <Selection
            key={value.key}
            selected={value.selected}
            label={value.label}
            onToggleSelected={() => toggleSelected(value)}
          />
        ))}
      </YStack>
    </YStack>
  );
};
