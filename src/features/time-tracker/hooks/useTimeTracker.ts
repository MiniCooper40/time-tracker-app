import {useAsyncStorage} from "@/src/hooks/use-async-storage"

export const useTimeTracker = (trackerId: string) => {

    const {value, setValue, loading} = useAsyncStorage(`start-time-${trackerId}`)

    return {
        startTime: (value && parseInt(value)) ? parseInt(value) : undefined,
        loading,
        setStartTime: setValue
    }
}