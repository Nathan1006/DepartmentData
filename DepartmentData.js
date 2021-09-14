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
    /* 
    for (let i = 0; i < array.length; i++){
        for (let o = 0; o < 10; o++){
            if (array[i][o] == undefined){
                break
            }
            console.log(array[i][o])
        }
        console.log('____________________________________________________________________')
    }
    */
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

challenge1(empDeps)


