import {PageContainer} from "@/src/components/layouts/PageContainer";
import {Slot} from "expo-router";

const Layout = () => {
    return <PageContainer>
        <Slot />
    </PageContainer>
}

export default Layout