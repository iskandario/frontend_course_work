export const mockCategories = [
  {
    id: 1,
    name: "Учеба",
    sections: [
      {
        id: 1,
        name: "Математика",
        tasks: [
          {
            id: 1,
            text: "Решить задачи на интегралы",
            description: "Решение задач из главы 8 учебника.",
            priority: 1,
            completed: false,
          },
          {
            id: 2,
            text: "Прочитать главу 5 из учебника",
            description: "Прочитать и законспектировать основные тезисы.",
            priority: 2,
            completed: false,
          },
          {
            id: 3,
            text: "Подготовиться к контрольной",
            description: "Повторить материал за последние 3 недели.",
            priority: 4,
            completed: false,
          },
        ],
      },
      {
        id: 2,
        name: "Физика",
        tasks: [
          {
            id: 4,
            text: "Изучить законы термодинамики",
            description: "Разобрать основные законы и примеры их применения.",
            priority: 2,
            completed: false,
          },
          {
            id: 5,
            text: "Провести эксперименты по механике",
            description: "Провести лабораторную работу по законам Ньютона.",
            priority: 1,
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Работа",
    sections: [
      {
        id: 1,
        name: "Проект A",
        tasks: [
          {
            id: 6,
            text: "Собрать команду",
            description: "Найти и распределить задачи между участниками.",
            priority: 4,
            completed: false,
          },
          {
            id: 7,
            text: "Написать ТЗ",
            description: "Сформировать техническое задание для первой фазы проекта.",
            priority: 2,
            completed: false,
          },
        ],
      },
      {
        id: 2,
        name: "Проект B",
        tasks: [
          {
            id: 8,
            text: "Разработать прототип",
            description: "Создать MVP для демонстрации клиенту.",
            priority: 2,
            completed: false,
          },
          {
            id: 9,
            text: "Обсудить с клиентом",
            description: "Согласовать план дальнейших работ с клиентом.",
            priority: 3,
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Личное",
    sections: [
      {
        id: 1,
        name: "Здоровье",
        tasks: [
          {
            id: 10,
            text: "Завести дневник питания",
            description: "Записывать все съеденное и следить за балансом.",
            priority: 4,
            completed: false,
          },
          {
            id: 11,
            text: "Записаться в спортзал",
            description: "Найти ближайший зал и выбрать удобное время.",
            priority: 2,
            completed: false,
          },
        ],
      },
      {
        id: 2,
        name: "Путешествия",
        tasks: [
          {
            id: 12,
            text: "Спланировать поездку в Париж",
            description: "Составить маршрут и определить бюджет поездки.",
            priority: 2,
            completed: false,
          },
          {
            id: 13,
            text: "Купить билеты",
            description: "Забронировать билеты туда и обратно.",
            priority: 2,
            completed: false,
          },
        ],
      },
    ],
  },
];