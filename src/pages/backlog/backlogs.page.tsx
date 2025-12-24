import CreateBacklogDialog from "@/components/dialogs/create-backlog.dialog";
import Layout from "@/components/layouts/main/layout";

const Backlogs = () => {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">My Backlogs</h1>
        <CreateBacklogDialog />
      </div>
    </Layout>
  );
};

export default Backlogs;
