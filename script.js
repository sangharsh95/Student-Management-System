const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

function renderStudents() {
  studentList.innerHTML = "";
  students.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "student-card";

    const img = document.createElement("img");
    img.src = student.photo || "https://via.placeholder.com/60";
    img.alt = "Student Photo";

    const details = document.createElement("div");
    details.className = "student-details";
    details.innerHTML = `
      <strong>Name:</strong> ${student.name}<br>
      <strong>Roll:</strong> ${student.roll}<br>
      <strong>Class:</strong> ${student.class}
    `;

    const actions = document.createElement("div");
    actions.className = "actions";
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      students.splice(index, 1);
      updateStorage();
    };

    actions.appendChild(delBtn);
    card.appendChild(img);
    card.appendChild(details);
    card.appendChild(actions);
    studentList.appendChild(card);
  });
}

function updateStorage() {
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const roll = form.roll.value.trim();
  const studentClass = form.class.value.trim();
  const photo = form.photo.value.trim();

  if (!name || !roll || !studentClass) {
    alert("Please fill in all required fields.");
    return;
  }

  students.push({ name, roll, class: studentClass, photo });
  form.reset();
  updateStorage();
});

renderStudents();
