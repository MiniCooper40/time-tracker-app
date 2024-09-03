import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

export const useAsyncStorage = (key: string) => {
  const [_value, _setValue] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const updateValue = () => {
    AsyncStorage.getItem(key)
      .then((result) => {
        if (result) _setValue(result);
      })
      .catch(() => {
        _setValue(undefined);
      })
      .finally(() => setLoading(false));
  };

  useEffect(updateValue, []);
  useFocusEffect(updateValue);

  const setValue = (value: string | undefined) => {
    setLoading(true);
    if (!value) {
      AsyncStorage.removeItem(key)
        .then(() => {
          _setValue(undefined);
        })
        .catch(() => {
          console.log("item could not be removed");
        })
        .finally(() => setLoading(false));
    } else {
      AsyncStorage.setItem(key, value)
        .then(() => {
          _setValue(value);
        })
        .catch(() => {
          console.log("item could not be saved");
        })
        .finally(() => setLoading(false));
    }
  };

  return { value: _value, setValue, loading };
};
