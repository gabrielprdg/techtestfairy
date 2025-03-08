export default function Dashboard() {
  return (
    <div className="p-8 pr-12">
      <h1 className="m-12 text-4xl font-semibold text-gray-800">Dashboard</h1>

      <div className="flex justify-between items-center">
        <h2 className="m-12 text-2xl font-medium text-gray-600 mt-4">Tarefas</h2>
        <button className="mr-12 px-4 py-2 bg-blue-500 text-white rounded-md">
          +
        </button>

      </div>

    </div>
  );
}
