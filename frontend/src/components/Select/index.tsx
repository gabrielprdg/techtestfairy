import { useState } from "react";

export default function Select() {
  const [status, setStatus] = useState("");

  return (
    <div className="w-60">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status da Tarefa
      </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
      >
        <option value="">Selecione um status</option>
        <option value="pending">Pendente</option>
        <option value="in_progress">Em andamento</option>
        <option value="completed">Concluído</option>
        <option value="canceled">Cancelado</option>
      </select>
    </div>
  );
}