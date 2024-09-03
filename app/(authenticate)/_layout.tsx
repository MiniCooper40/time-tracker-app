import { FormPageLayout } from "@/src/components/layouts/form-page-layout";
import { Redirect, Slot } from "expo-router";
import { useAuthentication } from "@/src/hooks/use-authentication";
import { LoadingPage } from "@/src/components/loading/LoadingPage";

const Layout = () => {
  const { session, loading } = useAuthentication();

  if (loading) return <LoadingPage />;
  if (session && !loading) return <Redirect href="/home/dashboard" />;

  return (
    <FormPageLayout>
      <Slot />
    </FormPageLayout>
  );
};

export default Layout;
