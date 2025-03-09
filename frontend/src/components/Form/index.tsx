import Select from "../Select";

const Form = () => {


  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Criar Tarefa</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titulo</label>
          <input
            type="text"
            id="title"
            name="name"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
