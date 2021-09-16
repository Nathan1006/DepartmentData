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

function empObjects(){
    let employee = []
    for (let i = 0; i < 35; i++){
        let info = {}
        info.id = parseInt(emps[i][0])
        info.name = emps[i][2] + ' ' + emps[i][3]
        switch (emps[i][4]){
            case 'M':
                info.gender = 'Male'
                break
            case 'F':
                info.gender = 'Female'
                break
        }
        info.dateOfBirth = emps[i][1]
        info.startYear = emps[i][5][0] + emps[i][5][1] + emps[i][5][2] + emps[i][5][3]
        // Need help
        for (let o = 0; o < salaries.length; o++){
            if (salaries[o][0] == salaries[o][0]){
                if (o == salaries.length - 1){
                    break
                }
                info.endYear = salaries[o][3][0] + salaries[o][3][1] + salaries[o][3][2] + salaries[o][3][3]
            }
        }

        employee.push(info)
    }
    console.log(employee)
}

function depObjects(){
    let department = []
    for (let i = 0; i < deps.length; i++){
        let info = {}
        let numEmps = 0
        let male = 0
        let female = 0
        let sal = 0
        info.id = deps[i][0]
        info.name = deps[i][1]
        for (let o = 0; o < empDeps.length; o++){
            if (o != empDeps.length - 1){
                if (empDeps[o][0] == empDeps[o + 1][0]){
                    o++
                }
            }
            if (empDeps[o][1] == deps[i][0]){
                numEmps++
            }
            for (let g = 0; g < emps.length; g++){
                if (emps[g][0] == empDeps[o][0]){
                    if (empDeps[o][1] == deps[i][0]){
                        switch (emps[g][4]){
                            case 'M':
                                male++
                                break
                            case 'F':
                                female++
                                break
                        }
                    }
                }
            }
        }
        info.numberOfEmployees = parseInt(numEmps)
        info.genders = {males: parseInt(male), females: parseInt(female)}
        info.totalSalary = parseInt(sal)

        department.push(info)
    }
    console.log(department)
}

empObjects()
depObjects()