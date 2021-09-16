// SetUp :
let fs = require("fs");

function parseData(fileName){
    let data = fs.readFileSync(`Data/${fileName}.txt`, 'utf8').replace(/\r|"/g, '').split("\n")
    for (let i = 0; i < data.length; i++){
        data[i] = data[i].split(',')  
    }
    return data
}
// New file arrays:
var deps = parseData('Departments')
var empDeps = parseData('EmployeeDepartments')
var emps = parseData('Employees')
var salaries = parseData('Salaries')

class Employee {
    constructor (id, name, gender, dateOfBirth, startYear){
        this.id = id
        this.name = name
        this.gender = gender 
        this.dateOfBirth = dateOfBirth 
        this.startYear = startYear
        this.lastYear = null
        this.department = 'NA'
        this.salary = 0
    }
}

class Department {
    constructor (id, name){
        this.id = id
        this.name = name 
        this.numberOfEmps = 0
        this.genders = {Males: 0, Females: 0}
        this.totalSal = 0
    }
}

let employeeList = []
let departmentList = []

function empObjects(){
    for (let i = 0; i < emps.length; i++){
        let emp = new Employee(emps[i][0], emps[i][2] + ' ' + emps[i][3], emps[i][4], emps[i][1], emps[i][5])
        employeeList.push(emp)
    }
    for (let e = 0; e < employeeList.length; e++){
        for (let o = 0; o < empDeps.length; o++){
            if (o != empDeps.length - 1){
                if (empDeps[o][0] == empDeps[o + 1][0]){
                    o++
                }
            }
            if (employeeList[e].id == empDeps[o][0]){
                for (let d = 0; d < deps.length; d++){
                    if (empDeps[o][1] == deps[d][0]){
                        employeeList[e].department = deps[d][1]
                    }
                }
                employeeList[e].lastYear = empDeps[o][3]
            }
        }
        for (let s = 0; s < salaries.length; s++){
            while (salaries[s][0] == salaries[s + 1][0]){
                if (s != salaries.length - 1){
                    s++
                }
                if (s == salaries.length - 1){
                    break
                }
            }
            if (salaries[s][0] == employeeList[e].id){
                employeeList[e].salary = parseInt(salaries[s][1])
            }
        }
    }

    console.log(employeeList)
}

function depObjects(){
    for (let i = 0; i < deps.length; i++){
        let dep = new Department(deps[i][0], deps[i][1])
        departmentList.push(dep)
    }
    for (let d = 0; d < departmentList.length; d++){
        let numEmps = 0
        let numMales = 0
        let numFemales = 0
        let sal = 0
        for (let e = 0; e < employeeList.length; e++){
            if (departmentList[d].name == employeeList[e].department){
                numEmps++
                switch (employeeList[e].gender){
                    case 'M':
                        numMales++
                        break
                    case 'F':
                        numFemales++
                        break
                }
                sal += employeeList[e].salary
            }
        }
        departmentList[d].numberOfEmps = numEmps
        departmentList[d].genders = {Males: numMales, Females: numFemales}
        departmentList[d].totalSal = sal
    }

    console.log(departmentList)
}

empObjects()
depObjects()