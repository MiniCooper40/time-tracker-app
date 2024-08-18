import { useUser } from "@/src/hooks/use-user";
import { CreateGroupTrackerForm } from "@/src/features/group-tracker/components/form/create-group-tracker-form";

const Page = () => {
  const user = useUser();

  if (user.isFetching || !user.data) return null;
  return <CreateGroupTrackerForm userId={user.data.userId} />;
};

export default Page;
