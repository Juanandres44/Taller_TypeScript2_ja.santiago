
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents} from './dataStudents.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("btn-range")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const creditLow: HTMLInputElement = <HTMLInputElement>document.getElementById("ran-from")!;
const creditHigh: HTMLInputElement = <HTMLInputElement>document.getElementById("ran-to")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => rangeCredits();

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudents); 

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void {
  console.log('Desplegando estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.code}</td>
                           <td>${student.cedula}</td>
                           <td>${student.age}</td>
                           <td>${student.address}</td>
                           <td>${student.telephone}</td>`;
    studentsTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}


function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function rangeCredits(){
  const desde:number = <number><unknown>creditLow.valueAsNumber;
  const hasta:number = <number><unknown>creditHigh.valueAsNumber;
  if ( !desde || !hasta){
    clearCoursesInTable()
    renderCoursesInTable(dataCourses);
  }
  else{ 
    const nuevoArreglo = dataCourses.filter(course =>{
      return course.credits > desde && course.credits < hasta;
    });     
    console.log(nuevoArreglo);
    clearCoursesInTable();
    renderCoursesInTable(nuevoArreglo);
  }

}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}