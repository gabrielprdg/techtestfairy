import { useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";

export default function Dashboard() {
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleTaskDelete = (deletedTaskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId)); // Remover a tarefa deletada do estado
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("user-token");

        const response = await api.get(status ? `task/${status}` : "task", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log('tasksss', response)
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [status]);

  const handleCreateTask = () => {
    navigate('/createTask');
  };

  return (
    <div className="p-8 pr-12">
      <h1 className="m-12 text-4xl font-semibold text-gray-800">Dashboard</h1>

      <div className="flex justify-between items-center">
        <h2 className="m-12 text-2xl font-medium text-gray-600 mt-4">Tarefas</h2>
        <div className="flex">
          <Select taskStatus={status} onChange={setStatus} />
          <button
            onClick={handleCreateTask}
            className="cursor-pointer ml-12 mr-12 mt-6 px-4 py-2 bg-blue-500 text-white rounded-md h-10">
            +
          </button>
        </div>
      </div>

      <Table tasks={tasks} onDeleteTask={handleTaskDelete} />

    </div>
  );
}
