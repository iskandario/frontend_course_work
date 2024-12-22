import React, { useState } from "react";
import styles from "./TaskItem.module.css";
import TaskModal from "../TaskModal/TaskModal";
import TourIcon from "@mui/icons-material/Tour";
import EditNoteIcon from "@mui/icons-material/EditNote";

const PRIORITY_COLORS = {
  1: "#ff4d4f",
  2: "#ffa940",
  3: "#52c41a",
  4: "#1890ff",
};

const TaskItem = ({ column, columns, setColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragStart = (e, task) => {
    e.stopPropagation();
    e.dataTransfer.setData("type", "task");
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceColumnId", column.id);
  };

  const handleTaskCompletion = (taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
              ),
            }
          : col
      )
    );

    setTimeout(() => {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === column.id
            ? {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== taskId),
              }
            : col
        )
      );
    }, 1500);
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.taskList}>
      {column.tasks.map((task) => (
        <div
          key={task.id}
          className={`${styles.task} ${
            task.completed ? styles.taskCompleted : ""
          } ${task.completed ? styles.taskCompletedAnimation : ""}`}
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
        >
          <div className={styles.taskContainer}>
            <label className={styles.radioButtonContainer}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  handleTaskCompletion(task.id);
                }}
                className={styles.radioButton}
              />
              <span className={styles.checkmark}></span>
            </label>
            <TourIcon
              style={{
                color: PRIORITY_COLORS[task.priority],
                fontSize: "24px",
              }}
            />
            <span className={styles.taskTitle}>{task.text}</span>
            <button
              className={styles.editButton}
              onClick={(e) => {
                e.stopPropagation();
                openModal(task);
              }}
            >
              <EditNoteIcon />
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => openModal()} className={styles.addTaskButton}>
        + Добавить задачу
      </button>
      {isModalOpen && (
        <TaskModal
          task={selectedTask || { text: "", priority: 4 }}
          setIsModalOpen={setIsModalOpen}
          setColumns={setColumns}
          columnId={column.id}
          isNew={!selectedTask}
        />
      )}
    </div>
  );
};

export default TaskItem;