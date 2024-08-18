import { Slot } from "expo-router";
import { PageContainer } from "@/src/components/layouts/page-container";
import { ScrollView } from "tamagui";

const Layout = () => (
  <ScrollView>
    <PageContainer>
      <Slot />
    </PageContainer>
  </ScrollView>
);
export default Layout;
