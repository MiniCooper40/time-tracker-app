import {useField} from "formik";
import {useCallback, useEffect, useState} from "react";
import {useQueryGroupTrackers} from "@/src/features/group-tracker/api/use-search-group-trackers";
import {
    Adapt,
    Button,
    ButtonText,
    Card,
    Circle,
    Dialog,
    Input,
    Label,
    Sheet,
    Text,
    Unspaced,
    XStack,
    YStack
} from "tamagui";
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {TrackerPreview} from "@/src/components/tracker-preview/tracker-preview";
import {IconButton} from "@/src/components/input/IconButton";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {Header} from "../header/Header";
import {Selection} from "@/src/components/input/Selection";

interface FormikGroupSelectProps {
    name: string;
    userId: string;
    initialGroupTrackers?: GroupTracker[]
}

export const FormikGroupSelect = ({name, userId, initialGroupTrackers = []}: FormikGroupSelectProps) => {

    const [field, meta, helpers] = useField<string[]>(name)
    const [query, setQuery] = useState("")
    const [selectedTrackers, setSelectedTrackers] = useState<GroupTracker[]>(initialGroupTrackers)
    const groupTrackerQuery = useQueryGroupTrackers({query, userId}, {
        enabled: query.length >= 0
    })

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    useEffect(() => {
        if (initialGroupTrackers) {
            helpers.setValue(selectedTrackers.map(({trackerId}) => trackerId))
        }
    }, [selectedTrackers]);

    const isGroupSelected = (group: GroupTracker) => {
        return selectedTrackers.some(g => g.trackerId === group.trackerId)
    }

    const toggleSelected = (group: GroupTracker) => {
        if (isGroupSelected(group)) setSelectedTrackers(prev => prev.filter(t => t.trackerId !== group.trackerId))
        else setSelectedTrackers(prev => [...prev, group])
    }

    const [selectedForDeletion, setSelectedForDeletion] = useState([] as GroupTracker[])
    const isGroupSelectedForDeletion = useCallback((group: GroupTracker) => {
        console.log(`selected ids for deletion: ${selectedForDeletion.map(t => t.trackerId)}`)
        console.log(`checking if ${group.trackerId} is selected for deletion `)
        const isSelected = selectedForDeletion.some(g => g.trackerId === group.trackerId)
        console.log(`is selected? ${isSelected}`)
        return isSelected
    }, [selectedForDeletion])
    const toggleSelectedForDeletion = useCallback((group: GroupTracker) => {
        if (isGroupSelectedForDeletion(group)) setSelectedForDeletion(prev => prev.filter(t => t.trackerId !== group.trackerId))
        else setSelectedForDeletion(prev => [group, ...prev])
    }, [isGroupSelectedForDeletion])

    const deleteSelectedTrackers = () => {
        setSelectedTrackers(prev => prev.filter(group => !selectedForDeletion.some(g => g.trackerId === group.trackerId)))
        setSelectedForDeletion([])
    }


    return (
        <YStack>
            <XStack width="100%" justifyContent="space-between">
                <XStack alignItems="center" gap="$2">
                    <Label>Group trackers</Label>
                   <IconButton onPress={() => setIsSearchModalOpen(true)} icon={ <AntDesign name="plus" size={18} color="black" />} />
                </XStack>
                {selectedForDeletion.length > 0 && (
                    <XStack alignItems="center">
                        <Button color="error" onPress={deleteSelectedTrackers}><Text>Remove {selectedForDeletion.length} trackers</Text></Button>
                    </XStack>
                )}
            </XStack>
            <TrackerPreviewGrid trackers={selectedTrackers} onSelect={toggleSelectedForDeletion}
                                isSelected={isGroupSelectedForDeletion}
                                selectOnPress={selectedForDeletion.length > 0}/>
            <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
                <Adapt when="sm" platform="touch">
                    <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                        <Sheet.Frame padding="$4" gap="$4">
                            <Adapt.Contents/>
                        </Sheet.Frame>
                        <Sheet.Overlay
                            animation="lazy"
                            enterStyle={{opacity: 0}}
                            exitStyle={{opacity: 0}}
                        />
                    </Sheet>
                </Adapt>
                <Dialog.Portal>
                    <Dialog.Overlay key="overlay"/>
                    <Dialog.Content key="content" style={{width: "90%", height: "70%"}}>
                        <YStack gap="$2">
                            <Input value={query} onChangeText={setQuery} placeholder="Search group names"/>
                            <YStack gap="$1">
                                {groupTrackerQuery.data?.map(tracker => (
                                    <Selection key={tracker.trackerId} selected={isGroupSelected(tracker)}
                                               label={tracker.name} onToggleSelected={() => toggleSelected(tracker)}/>
                                ))}
                            </YStack>
                        </YStack>
                        <Dialog.Close asChild>
                            <ButtonText>Close</ButtonText>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </YStack>
    )
}