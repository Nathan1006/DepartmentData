/* Department Project Legend:

    Departents: i: 0: Department ID
    Departents: i: 1: Department Name

    EmployeeDepartments: i: 0: Employee ID
    EmployeeDepartments: i: 1: Employee Department
    EmployeeDepartments: i: 2: Initial Date in Department
    EmployeeDepartments: i: 3: Last Date in Department

    Employees: i: 0: Employee ID
    Employees: i: 1: Employee Date of Birth
    Employees: i: 2: Employee First Name
    Employees: i: 3: Employee last NAme
    Employees: i: 4: Employee Sex (male or female)
    Employees: i: 5: Employee Date of Employment

    Salaries: i: 0: Employee ID
    Salaries: i: 1: Earnings
    Salaries: i: 2: Initial Date of Payment Period
    Salaries: i: 3: Ending Date of Payment Period
*/
// Reads text (txt) files and turns them into arrays
let fs = require("fs");
/*
let depData = fs.readFileSync('Data/Departments.txt', 'utf8').replace(/\r|"/g, '').split("\n")
let empDepData = fs.readFileSync('Data/EmployeeDepartments.txt', 'utf8').replace(/\r|"/g, '').split("\n")
let emp = fs.readFileSync('Data/Employees.txt', 'utf8').replace(/\r|"/g, '').split("\n")
let salaries = fs.readFileSync('Data/Salaries.txt', 'utf8').replace(/\r|"/g, '').split("\n")
*/

function parseData(fileName){
    let data = fs.readFileSync(`Data/${fileName}.txt`, 'utf8').replace(/\r|"/g, '').split("\n")
    for (let i = 0; i < data.length; i++){
        data[i] = data[i].split(',')  
    }
    return data
}
var deps = parseData('Departments')
var empDeps = parseData('EmployeeDepartments')
var emps = parseData('Employees')
var salaries = parseData('Salaries')

function challenge1(file){
    for (let i = 0; i < file.length; i++){
        
    }
}
