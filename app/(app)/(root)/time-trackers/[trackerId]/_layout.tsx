import {Slot} from "expo-router";
import {PageContainer} from "@/src/components/layouts/PageContainer";

const Layout = () => (
    <PageContainer>
        <Slot />
    </PageContainer>
)
export default Layout