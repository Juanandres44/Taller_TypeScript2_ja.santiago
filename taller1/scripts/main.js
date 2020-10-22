import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("btn-range");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var creditLow = document.getElementById("ran-from");
var creditHigh = document.getElementById("ran-to");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return rangeCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.code + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.age + "</td>\n                           <td>" + student.address + "</td>\n                           <td>" + student.telephone + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function rangeCredits() {
    var desde = creditLow.valueAsNumber; //Esto marca error pero funciona y ni idea de qué propiedad no marque error xd
    var hasta = creditHigh.valueAsNumber;
    if (!desde || !hasta) {
        clearCoursesInTable();
        renderCoursesInTable(dataCourses);
    }
    else {
        var nuevoArreglo = dataCourses.filter(function (course) {
            return course.credits > desde && course.credits < hasta;
        });
        console.log(nuevoArreglo);
        clearCoursesInTable();
        renderCoursesInTable(nuevoArreglo);
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
