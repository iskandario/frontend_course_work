import React, { useState } from "react";
import CategoriesPanel from "../CategoriesPanel/CategoriesPanel";
import Board from "../Board/Board";
import styles from "./HomePage.module.css";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category); // Устанавливаем выбранную категорию
  };

  return (
    <div className={styles.homePageContainer}>
      {/* Панель категорий */}
      <div className={styles.categoriesPanel}>
        <CategoriesPanel onSelectCategory={handleSelectCategory} />
      </div>

      {/* Доска задач */}
      <div className={styles.boardArea}>
        {selectedCategory ? (
          <Board category={selectedCategory} />
        ) : (
          <div className={styles.placeholder}>Выберите категорию, чтобы начать</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;