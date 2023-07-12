import store from "@/stores/DataStore";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";

export default function Todo({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In_Progress" as Status);
  const [edit, setEdit] = useState(false);

  const options = [
    {
      text: "In_Progress",
      value: "In_Progress",
    },
    {
      text: "To_Do",
      value: "To_Do",
    },
    {
      text: "Completed",
      value: "Completed",
    },
  ];
  const updateTodo = () => {
    store.newTodo = title;
    store.newDescription = description;
    store.status = status;
    setEdit((m) => !m);
  };

  const deleteTodo = async (id: number) => {
    store.removeTodo(id);
    const res = await fetch(`http://localhost:3000/api/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };
  return (
    <div className="md:flex gap-x-5 my-3 p-2 border rounded justify-evenly xl:mx-40">
      <div>
        <label htmlFor="title" className="text-sm text-gray-500">
          Title
        </label>
        <input
          type="text"
          placeholder="title"
          defaultValue={todo.title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mx-1 px-2 py-2 rounded placeholder:text-gray-500 ${
            edit ? "bg-gray-300" : ""
          }`}
          disabled={!edit}
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm text-gray-500">
          Description
        </label>
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className={`mx-1 px-2 py-2 rounded placeholder:text-gray-500 ${
            edit ? "bg-gray-300" : ""
          }`}
          defaultValue={todo.description}
          disabled={!edit}
        />
      </div>

      <select
        name="status"
        id="select"
        className={`mx-1 px-2 py-2 rounded placeholder:text-gray-500 ${
          edit ? "bg-gray-300" : ""
        }`}
        onChange={(e) => setStatus(e.target.value as Status)}
        defaultValue={todo.status}
        disabled={!edit}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      <button onClick={() => deleteTodo(todo.id)}>
        <BsTrash size={20} className="cursor-pointer text-red-500" />
      </button>

      {edit ? (
        <button onClick={updateTodo}>
          <BiSave size={20} className="cursor-pointer text-green-500" />
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit((m) => !m);
          }}
        >
          <LuEdit size={20} className="cursor-pointer text-green-500" />
        </button>
      )}
    </div>
  );
}
