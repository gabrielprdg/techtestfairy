import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Select from "../Select";

type User = {
  id: string
  name: string
}

type Task = {
  title: string
  description: string
  status: string
  userId: string
}

export default function Form() {
  const [users, setUsers] = useState<User[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [selectedUser, setSelectedUser] = useState("")
  const [status, setStatus] = useState("");
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/dashboard');
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("user-token");
        const response = await api.get("task/users/list", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    fetchUsers();

    if (taskId) {
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem("user-token");
          const response = await api.get(`task/from/${taskId}`, {
            headers: { authorization: `Bearer ${token}` },
          });
          setTask(response.data);
          setStatus(response.data.status);
          setSelectedUser(response.data.userId);
        } catch (error) {
          toast.error("Erro ao carregar a tarefa para edição.");
        }
      };

      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const updatedFields: Record<string, string> = {};

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const userId = formData.get("user") as string;

    if (taskId) {
      if (title !== task?.title) updatedFields.title = title;
      if (description !== task?.description) updatedFields.description = description;
      if (userId !== task?.userId) updatedFields.userId = userId;
      if (status !== task?.status) updatedFields.status = status;
    }

    try {
      const token = localStorage.getItem("user-token");

      if (taskId) {
        if (Object.keys(updatedFields).length > 0) {
          await api.patch(`task/${taskId}/update`, updatedFields, {
            headers: { authorization: `Bearer ${token}` },
          });
          toast.success("Tarefa atualizada com sucesso!");
        } else {
          toast.info("Nenhuma alteração foi feita.");
        }
      } else {
        await api.post("task", { title, description, userId }, {
          headers: { authorization: `Bearer ${token}` },
        });
        toast.success("Tarefa criada com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao processar a requisição.");
    }
  };


  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4"> {taskId ? "Editar Tarefa" : "Criar Tarefa"} </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titulo</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task?.title || ""}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="description"
            name="description"
            defaultValue={task?.description || ""}
            rows={4}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {taskId ? <Select taskStatus={status} onChange={handleStatusChange} /> : ''}

        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuário</label>
          <select
            id="user"
            name="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>

        </div>
      </form>
      <button
        onClick={navigateBack}
        className="mt-4 cursor-pointer w-full py-3 bg-red-500 text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Voltar
      </button>
    </div>
  );
};
