import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (key: string) => {
    const [_value, _setValue] = useState<string|undefined>(undefined)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(result => {
                if (result) _setValue(result)
            })
            .catch(() => {
                _setValue(undefined)
            })
            .finally(() => setLoading(false))
    }, [])

    const setValue = (value: string|undefined) => {
        setLoading(true)
        if (!value) {
            AsyncStorage.removeItem(key)
                .then(() => {
                    console.log("removed async item")
                    _setValue(undefined)
                })
                .catch(() => {
                    console.log("item could not be removed")
                })
                .finally(() => setLoading(false))
        }
        else {
            AsyncStorage.setItem(key, value)
                .then(() => {
                    console.log("saved async item")
                    _setValue(value)
                })
                .catch(() => {
                    console.log("item could not be saved")
                })
                .finally(() => setLoading(false))
        }
    }

    return {value: _value, setValue, loading}
}