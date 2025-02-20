import { useState } from "react";
import AdminDashboard from "./landing";
import TaskType from "../admin-agent-reports/task-type";

const AdminMain = () => {
  const [selected, setSelected] = useState<string | null>(null);

  if (selected === "projectHub") {
    return <AdminDashboard />;
  }

  return <TaskType onSelect={setSelected} />;
};

export default AdminMain;
