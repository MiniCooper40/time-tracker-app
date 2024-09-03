import { FormPageLayout } from "@/src/components/layouts/form-page-layout";
import { Redirect, Slot, useRouter } from "expo-router";
import { useAuthentication } from "@/src/hooks/use-authentication";
import {useIsMutating} from "react-query";

const Layout = () => {
  const { session, loading } = useAuthentication();

  const creating = useIsMutating({ mutationKey: ["create-user"] })
  console.log(`there are ${creating} creation requests in progress`)

  if (session && !loading) return <Redirect href="/home/dashboard" />;

  return (
    <FormPageLayout>
      <Slot />
    </FormPageLayout>
  );
};

export default Layout;
