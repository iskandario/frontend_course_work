import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import Column from "../Column/Column";

const Board = ({ category }) => {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (category) {
      const initialColumns = category.sections.map((section) => ({
        id: section.id,
        title: section.name,
        tasks: section.tasks.map((task) => ({
          id: task.id,
          text: task.text, // Текст задачи
          description: task.description, // Описание задачи
          priority: task.priority, // П
          completed: task.completed,
        })),
      }));
      setColumns(initialColumns);
    }
  }, [category]);

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    const newColumn = { id: Date.now(), title: newColumnName.trim(), tasks: [] };
    setColumns((prev) => [newColumn, ...prev]); // Добавляем колонку слева
    setNewColumnName("");
    setIsAdding(false);
  };

  const handleDragColumn = (dragIndex, hoverIndex) => {
    const newColumns = [...columns];
    const [removed] = newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, removed);
    setColumns(newColumns);
  };

  return (
    <div className={styles.boardContainer}>
      <h2>{category.name}</h2>
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            columns={columns}
            setColumns={setColumns}
            index={index}
            onDragColumn={handleDragColumn}
          />
        ))}

        {/* Кнопка Добавить Раздел */}
        <div className={styles.addColumn}>
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className={`${styles.column} ${styles.addColumnButton}`}
            >
              + Добавить раздел
            </button>
          ) : (
            <div className={`${styles.column} ${styles.addColumnForm}`}>
              <input
                type="text"
                placeholder="Название раздела"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className={styles.addColumnInput}
                autoFocus
              />
              <div className={styles.addColumnActions}>
                <button onClick={handleAddColumn} className={styles.saveButton}>
                  Сохранить
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className={styles.cancelButton}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;