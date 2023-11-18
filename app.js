const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

let groups = [
  { id: 1, name: 'Group A', students: [] },
  { id: 2, name: 'Group B', students: [] },
];

let students = [
  { id: 1, name: 'John Doe', groupId: 1, groupName: 'Group A' },
  { id: 2, name: 'Jane Doe', groupId: 2, groupName: 'Group B' },
];

app.get('/groups', (req, res) => {
  const groupsWithStudents = groups.map(group => ({
    ...group,
    students: students.filter(student => student.groupId === group.id)
  }));
  res.json(groupsWithStudents);
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/groups', (req, res) => {
  const newGroup = req.body;
  newGroup.students = [];
  groups.push(newGroup);
  res.json(newGroup);
});

app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.groupName = groups.find(group => group.id === newStudent.groupId)?.name;
  students.push(newStudent);

  // Добавляем студента в соответствующую группу
  const group = groups.find((group) => group.id === newStudent.groupId);
  if (group) {
    group.students.push(newStudent);
  }

  res.json(newStudent);
});

app.put('/groups/:id', (req, res) => {
  const groupId = parseInt(req.params.id);
  const updatedGroup = req.body;

  groups = groups.map((group) =>
    group.id === groupId ? { ...group, ...updatedGroup } : group
  );

  res.json(groups.find((group) => group.id === groupId));
});

app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudent = req.body;

  students = students.map((student) =>
    student.id === studentId ? { ...student, ...updatedStudent } : student
  );

  // Обновляем имя группы после изменения groupId
  const updatedStudentWithGroupName = students.find(student => student.id === studentId);
  if (updatedStudentWithGroupName) {
    updatedStudentWithGroupName.groupName = groups.find(group => group.id === updatedStudentWithGroupName.groupId)?.name;
  }

  res.json(updatedStudentWithGroupName);
});

app.delete('/groups/:id', (req, res) => {
  const groupId = parseInt(req.params.id);
  groups = groups.filter((group) => group.id !== groupId);
  res.sendStatus(204);
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter((student) => student.id !== studentId);

  // Удаляем студента из соответствующей группы
  groups.forEach((group) => {
    group.students = group.students.filter((student) => student.id !== studentId);
  });

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
