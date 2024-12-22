import React, { useState } from "react";
import styles from "./Column.module.css";
import TaskItem from "../TaskItem/TaskItem";
import TextareaAutosize from "react-textarea-autosize";

const Column = ({ column, columns, setColumns, index, onDragColumn }) => {
  const [editingColumnId, setEditingColumnId] = useState(null);

  const handleDeleteColumn = () => {
    setColumns((prev) => prev.filter((col) => col.id !== column.id));
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", "column");
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("type");

    if (type === "column") {
      const dragIndex = e.dataTransfer.getData("dragIndex");
      if (dragIndex === null) return;
      onDragColumn(Number(dragIndex), index);
    } else if (type === "task") {
      const taskId = e.dataTransfer.getData("taskId");
      const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

      if (!taskId || !sourceColumnId || sourceColumnId === String(column.id))
        return;

      setColumns((prev) => {
        const sourceColumn = prev.find((col) => col.id === Number(sourceColumnId));
        const task = sourceColumn?.tasks.find((t) => t.id === Number(taskId));
        if (!task) return prev;

        return prev.map((col) => {
          if (col.id === Number(sourceColumnId)) {
            return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
          }
          if (col.id === column.id) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        });
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.column}
      draggable
      onDragStart={(e) => {
        if (!e.target.closest(`.${styles.task}`)) {
          handleDragStart(e);
        }
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.columnHeader}>
        {editingColumnId === column.id ? (
          <TextareaAutosize
            className={styles.inputEditForm}
            defaultValue={column.title}
            onBlur={(e) => {
              setColumns((prev) =>
                prev.map((col) =>
                  col.id === column.id
                    ? { ...col, title: e.target.value.trim() }
                    : col
                )
              );
              setEditingColumnId(null);
            }}
            autoFocus
          />
        ) : (
          <h3
            className={styles.columnTitle}
            onClick={() => setEditingColumnId(column.id)}
          >
            {column.title}
          </h3>
        )}
        <button
          onClick={handleDeleteColumn}
          className={styles.deleteColumnButton}
        >
          ✖
        </button>
      </div>
      <TaskItem column={column} columns={columns} setColumns={setColumns} />
    </div>
  );
};

export default Column;