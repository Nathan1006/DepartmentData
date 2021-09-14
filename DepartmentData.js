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
    Employees: i: 3: Employee last Name
    Employees: i: 4: Employee Sex (male or female)
    Employees: i: 5: Employee Date of Employment

    Salaries: i: 0: Employee ID
    Salaries: i: 1: Earnings
    Salaries: i: 2: Initial Date of Payment Period
    Salaries: i: 3: Ending Date of Payment Period
*/

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

function challenge1(array){
    for (let i = 0; i < array.length; i++){
        // Skips any past departments and skips to most recent department
        if (i != array.length - 1){
            if (array[i][0] == array[i + 1][0]){
                i++
            }
        }
        // logs names and departments based on department and employee ID
        for (let o = 0; o < deps.length; o++){
            if (array[i][1] == deps[o][0]){
                let depID = deps[o][1]
                for (let e = 0; e < emps.length; e++){
                    if (array[i][0] == emps[e][0]){
                        let empID = emps[e][2] + " " + emps[e][3]
                        console.log(empID + ', '  + depID)
                    }
                }
            }
        }
    }
}

function challenge2(array){
    for (let i = 0; i < array.length; i++){
        // Skips any past salaries and skips to current salary
        while (array[i][0] == array[i + 1][0]){
            if (i != array.length - 1){
                i++
            }
            if (i == array.length - 1){
                break
            }
        }
        // Logs Employee info (Name, current salary, Department name and number)
        for (let o = 0; o < emps.length; o++){
            if (array[i][0] == emps[o][0]){
                let empID = emps[o][2] + " " + emps[o][3]
                for (let e = 0; e < empDeps.length; e++){
                    if (e != empDeps.length - 1){
                        if (array[e][0] == array[e + 1][0]){
                            e++
                        }
                    }
                    if (empDeps[e][0] == array[i][0]){
                        for (let d = 0; d < deps.length; d++){
                            if (empDeps[e][1] == deps[d][0]){
                                let depIDs = deps[d][0] + " (" + deps[d][1] + ")"
                                if (array[i][1] > 60000){
                                    console.log(empID + ', ' + depIDs + ', ' + '$' + array[i][1])
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function challenge3(array){
    for (let i = 0; i < array.length; i++){
        // Skips any past departments and skips to most recent department
        if (i != array.length - 1){
            if (array[i][0] == array[i + 1][0]){
                i++
            }
        }
    // Logs any past employees and their department
        if (array[i][3] != '9999-01-01'){
            for (let o = 0; o < emps.length; o++){
                if (array[i][0] == emps[o][0]){
                    let empID = emps[o][2] + ' ' + emps[o][3]
                    console.log(empID + ', ' + array[i][3])
                }
            }
        }
    }
}

function challenge4(array){
    for (let i = 0; i < array.length; i++){
        if (i != array.length - 1){
            if (array[i][0] == array[i + 1][0]){
                i++
                for (let e = 0; e < emps.length; e++){
                    if (array[i][0] == emps[e][0]){
                        let empID = emps[e][2] + " " + emps[e][3]
                        console.log(empID)
                    }
                }
            }
        }
    }
}

function challenge5(array){
    for (let i = 0; i < array.length; i++){
        let empRaise = ''
        while (array[i][0] == array[i + 1][0]){
            if (i != array.length - 1){
                for (let o = 0; o < emps.length; o++){
                    if (array[i][0] == emps[o][0]){
                        empRaise = emps[o][2] + ' ' + emps[o][3]
                    }
                }
                i++
            }
            if (i == array.length - 1){
                break
            }
        }
        console.log(empRaise)
    }
}

challenge1(empDeps)
console.log('__________________________________________________________' + '\n')

challenge2(salaries)
console.log('__________________________________________________________' + '\n')

challenge3(empDeps)
console.log('__________________________________________________________' + '\n')

challenge4(empDeps)
console.log('__________________________________________________________' + '\n')

challenge5(salaries)
console.log('__________________________________________________________' + '\n')
