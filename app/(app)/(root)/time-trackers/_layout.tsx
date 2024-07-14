import {PageContainer} from "@/src/components/layouts/PageContainer";
import {Slot} from "expo-router";
import {ScrollView} from "tamagui";

const Layout = () => {
    return <ScrollView>
        <PageContainer>
            <Slot />
        </PageContainer>
    </ScrollView>
}

export default Layout