Группы (/groups):
1.	Получение всех групп:
o	Метод: GET
o	URL: http://localhost:4000/groups
2.	Добавление новой группы:
o	Метод: POST
o	URL: http://localhost:4000/groups
o	Тело запроса (JSON): { "id": 3, "name": "Group C" }
3.	Редактирование группы по ID:
o	Метод: PUT
o	URL: http://localhost:4000/groups/1 (замените 1 на нужный ID)
o	Тело запроса (JSON): { "name": "New Group Name" }
4.	Удаление группы по ID:
o	Метод: DELETE
o	URL: http://localhost:4000/groups/1 (замените 1 на нужный ID)
Студенты (/students):
1.	Получение всех студентов:
o	Метод: GET
o	URL: http://localhost:4000/students
2.	Добавление нового студента:
o	Метод: POST
o	URL: http://localhost:4000/students
o	Тело запроса (JSON): { "id": 3, "name": "New Student", "groupId": 1 }
3.	Редактирование студента по ID:
o	Метод: PUT
o	URL: http://localhost:4000/students/1 (замените 1 на нужный ID)
o	Тело запроса (JSON): { "name": "New Student Name" }
4.	Удаление студента по ID:
o	Метод: DELETE
o	URL: http://localhost:4000/students/1 (замените 1 на нужный ID)

