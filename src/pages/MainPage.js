import { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import CalendarView from "../components/CalendarView";

// 메인 페이지
const MainPage = () => {
  const [tasks, setTasks] = useState([
    { text: "신규 회원 승인 확인", completed: false },
    { text: "공연 등록 요청 검토", completed: false },
    { text: "미응답 문의사항 처리", completed: false },
    { text: "예매 통계 확인", completed: false }
  ]);

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const saveEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editValue;
    setTasks(newTasks);
    setEditIndex(null);
    setEditValue("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <BasicLayout hideSidebar={true}>
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* 왼쪽: 할 일 목록 */}
        <div className="flex-1 space-y-4 text-left">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">Main Page</h1>
            <p className="text-base">Welcome Admin</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">📋 오늘의 할 일</h2>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="border px-2 py-1 rounded text-sm w-full"
              />
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              >
                추가
              </button>
            </div>

            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-white shadow p-2 rounded text-sm"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="w-4 h-4"
                  />
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border px-2 py-1 rounded w-full text-sm"
                      />
                      <button
                        onClick={() => saveEdit(index)}
                        className="text-green-600 text-sm font-semibold"
                      >
                        저장
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className={`flex-grow ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                      <button
                        onClick={() => startEdit(index)}
                        className="text-blue-600 font-semibold text-sm"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => removeTask(index)}
                        className="text-red-600 font-semibold text-sm"
                      >
                        ❌
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 오른쪽: 캘린더 */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">📅 일정 캘린더</h2>
          <CalendarView />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
