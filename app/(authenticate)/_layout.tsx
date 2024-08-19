import { FormPageLayout } from "@/src/components/layouts/form-page-layout";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <FormPageLayout>
      <Slot />
    </FormPageLayout>
  );
};

export default Layout
