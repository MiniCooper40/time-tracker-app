import { CreateTimeTrackerForm } from "@/src/features/time-tracker/component/form/create-time-tracker-form";
import { useUser } from "@/src/hooks/use-user";

const Page = () => {
  const user = useUser();

  if (user.isFetching || !user.data) return null;
  return <CreateTimeTrackerForm userId={user.data.userId} />;
};

export default Page;
