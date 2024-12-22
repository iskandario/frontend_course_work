import React, { useState, useRef, useEffect } from "react";
import styles from "./CategoriesPanel.module.css";
import { mockCategories } from "../../mock/MockData.js";
import EditNoteIcon from "@mui/icons-material/EditNote";

function CategoriesPanel({ onSelectCategory }) {
  const [categories, setCategories] = useState(mockCategories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null); // Текущее редактирование
  const [editedCategoryName, setEditedCategoryName] = useState(""); // Редактируемое название
  const addCategoryRef = useRef(null); // Ссылка на форму добавления проекта
  const editCategoryRef = useRef(null); // Ссылка на редактируемую категорию

  useEffect(() => {
    // Закрытие добавления проекта или редактирования при клике вне элемента
    const handleClickOutside = (event) => {
      if (
        isAddingCategory &&
        addCategoryRef.current &&
        !addCategoryRef.current.contains(event.target)
      ) {
        setIsAddingCategory(false);
        setNewCategoryName("");
      }

      if (
        editingCategoryId !== null &&
        editCategoryRef.current &&
        !editCategoryRef.current.contains(event.target)
      ) {
        setEditingCategoryId(null);
        setEditedCategoryName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingCategory, editingCategoryId]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return; // Не добавляем пустое название
    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      sections: [],
    };
    setCategories((prev) => [...prev, newCategory]);
    setIsAddingCategory(false); // Скрываем форму
    setNewCategoryName(""); // Сбрасываем ввод
    onSelectCategory(newCategory); // Уведомляем родителя
    setActiveCategoryId(newCategory.id); // Делаем новую категорию активной
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category); // Сообщаем родительскому компоненту
    setActiveCategoryId(category.id); // Устанавливаем активную категорию
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSaveEdit = () => {
    if (!editedCategoryName.trim()) return; // Не сохраняем пустое название
    setCategories((prev) =>
      prev.map((category) =>
        category.id === editingCategoryId
          ? { ...category, name: editedCategoryName.trim() }
          : category
      )
    );
    setEditingCategoryId(null); // Завершаем редактирование
    setEditedCategoryName("");
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((category) => category.id !== categoryId));
    if (activeCategoryId === categoryId) setActiveCategoryId(null); // Сбрасываем активную категорию
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Мои проекты</div>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`${styles.category} ${
            activeCategoryId === category.id ? styles.activeCategory : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {editingCategoryId === category.id ? (
            <div
              ref={editCategoryRef} // Привязка ссылки к редактируемому элементу
              className={`${styles.category} ${styles.editCategoryExpanded}`}
            >
              <input
                type="text"
                placeholder="Редактировать категорию"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
                className={styles.editCategoryInput}
                autoFocus
              />
              <div className={styles.categoryActions}>
                <button onClick={handleSaveEdit} className={styles.saveButton}>
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingCategoryId(null)}
                  className={styles.cancelButton}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.categoryRow}>
              <span className={styles.categoryName}># {category.name}</span>
              <div className={styles.categoryActions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(category.id, category.name);
                  }}
                  className={styles.editCategoryButton}
                >
                  <EditNoteIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}
                  className={styles.deleteCategoryButton}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {!isAddingCategory ? (
        <button
          onClick={() => setIsAddingCategory(true)}
          className={styles.newCategoryButton}
        >
          + Добавить проект
        </button>
      ) : (
        <div ref={addCategoryRef} className={styles.addCategoryForm}>
          <input
            type="text"
            placeholder="Название проекта"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.addCategoryInput}
            autoFocus
          />
          <div className={styles.addCategoryActions}>
            <button onClick={handleAddCategory} className={styles.saveButton}>
              Сохранить
            </button>
            <button
              onClick={() => setIsAddingCategory(false)}
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPanel;