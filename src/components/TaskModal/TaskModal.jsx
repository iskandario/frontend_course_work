import React, { useState } from "react";
import styles from "./TaskModal.module.css";
import TourIcon from "@mui/icons-material/Tour";
import { Menu, MenuItem } from "@mui/material";

const PRIORITY_OPTIONS = [
  { value: 1, label: "Срочный", color: "#ff4d4f" },
  { value: 2, label: "Важный", color: "#ffa940" },
  { value: 3, label: "Обычный", color: "#52c41a" },
  { value: 4, label: "Низкий", color: "#1890ff" },
];

const TaskModal = ({ task, setIsModalOpen, setColumns, columnId, isNew }) => {
  const [title, setTitle] = useState(task.text || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || 4);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSave = () => {
    if (isNew) {
      const newTask = {
        id: Date.now(),
        text: title,
        description,
        priority,
        completed: false,
      };
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
    } else {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map((t) =>
                  t.id === task.id
                    ? { ...t, text: title, description, priority }
                    : t
                ),
              }
            : col
        )
      );
    }
    setIsModalOpen(false);
  };

  const handlePriorityClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePrioritySelect = (value) => {
    setPriority(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{isNew ? "Добавить задачу" : "Редактировать задачу"}</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название задачи"
          className={styles.modalInput}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание задачи"
          className={styles.modalTextarea}
        />
        <div className={styles.priorityContainer}>
          <label>Приоритет:</label>
          <button
            onClick={handlePriorityClick}
            className={styles.priorityButton}
          >
            <TourIcon
              style={{ color: PRIORITY_OPTIONS.find((p) => p.value === priority).color }}
            />
            {PRIORITY_OPTIONS.find((p) => p.value === priority).label}
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handlePrioritySelect(option.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <TourIcon style={{ color: option.color }} />
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleSave} className={styles.saveButton}>
            Сохранить
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;