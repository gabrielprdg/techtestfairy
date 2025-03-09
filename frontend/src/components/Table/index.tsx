import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("user-token"); // Pega o token
        const response = await api.get("task", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/updateTask/${id}`);  // Redireciona para a página de edição
  };

  return (
    <div className=" mx-auto p-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse bg-white">
          {/* Cabeçalho */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Título</th>
              <th className="py-3 px-4 text-left">Descrição</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>

          {/* Corpo */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Carregando...
                </td>
              </tr>
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4 truncate max-w-[150px]">
                    {task.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{formatDate(task.createdAt)}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => handleEdit(task.id)} className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">
                      Editar
                    </button>
                    <button className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
