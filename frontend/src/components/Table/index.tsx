import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

type TableProps = {
  tasks: Task[]
  onDeleteTask: (taskId: string) => void
};

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

export default function TaskTable({ tasks, onDeleteTask }: TableProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controle do modal
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/updateTask/${id}`);
  };

  const handleDelete = async () => {
    if (!taskIdToDelete) return;

    try {
      const token = localStorage.getItem("user-token");
      await api.delete(`/task/${taskIdToDelete}/delete`, {
        headers: { authorization: `Bearer ${token}` },
      });

      onDeleteTask(taskIdToDelete);
      setShowModal(false);
      setTaskIdToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const openModal = (taskId: string) => {
    setTaskIdToDelete(taskId); // Armazena a ID da tarefa a ser excluída
    setShowModal(true); // Abre o modal
  };

  const closeModal = () => {
    setShowModal(false); // Fecha o modal
    setTaskIdToDelete(null); // Limpa a ID
  };


  return (
    <div className="mx-auto p-4">
      <div className="sm:justify-center overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse bg-white">
          {/* Cabeçalho */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Título</th>
              <th className="py-3 px-4 text-left">Descrição</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Sem resultados.
                </td>
              </tr>
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4 truncate max-w-[150px]">{task.description}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${task.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          task.status === "completed" ? "bg-green-100 text-green-700" :
                            task.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                              task.status === "canceled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>{formatDate(task.createdAt)}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => handleEdit(task.id)} className="cursor-pointer px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">
                      Editar
                    </button>
                    <button onClick={() => openModal(task.id)} className="cursor-pointer px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h2>
            <p className="mt-4 text-gray-600">Tem certeza que deseja excluir esta tarefa?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
