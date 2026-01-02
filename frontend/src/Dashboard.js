import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [tasks, setTasks] = useState([
    "Complete Frontend Internship Assignment",
    "Revise React & JWT Authentication",
    "Prepare for Technical Interview",
  ]);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
      }`}
    >
      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-10 relative transition ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Top buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm"
          >
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Dashboard 
          </h1>
          <p className="mt-2 opacity-80">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Add Task */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className={`flex-1 rounded-xl px-4 py-3 focus:outline-none ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                : "border focus:ring-2 focus:ring-purple-500"
            }`}
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium"
          >
            Add Task
          </button>
        </div>

        {/* Tasks */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Tasks 🎯
          </h2>

          {tasks.length === 0 ? (
            <p className="text-center opacity-70">
              🎉 No tasks pending
            </p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 transition ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-gradient-to-r from-indigo-50 to-purple-50 border"
                  }`}
                >
                  <span className="font-medium">{task}</span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
