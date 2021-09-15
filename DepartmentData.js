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

function c1Set1(array){
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

function c2Set1(array){
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

function c3Set1(array){
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

function c4Set1(array){
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

function c5Set1(array){
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

function c1Set2(array){
    let numF = 0
    let numM = 0
    for (let i = 0; i < array.length; i++){
        switch(array[i][4]){
            case 'M':
                numM++
                break
            case 'F':
                numF++
                break
        }
    }
    console.log("There are " + numM + " males and " + numF + " females!")
}

function c2Set2(array){
    for (let i = 0; i < array.length; i++){
        let empsPerDep = 0
        for (let o = 0; o < empDeps.length; o++){
            if (o != empDeps.length - 1){
                if (empDeps[o][0] == empDeps[o + 1][0]){
                    o++
                }
            }
            if (empDeps[o][1] == array[i][0]){
                empsPerDep++
            }
        }
        console.log("There are " + empsPerDep + " employees in " + array[i][1])
    }
}

function c3Set2(array){
    for (let i = 0; i < array.length; i++){
        let numM = 0
        let numF = 0
        for (let o = 0; o < empDeps.length; o++){
            if (o != empDeps.length - 1){
                if (empDeps[o][0] == empDeps[o + 1][0]){
                    o++
                }
            }
            if (array[i][0] == empDeps[o][1]){
                for (let e = 0; e < emps.length; e++){
                    if (empDeps[o][0] == emps[e][0]){
                        switch(emps[e][4]){
                            case 'M':
                                numM++
                                break
                            case 'F':
                                numF++
                                break
                        }
                    }
                }
            }
        }
        console.log("There are " + numM + " male and " + numF + " female employees in " + array[i][1])
    }
}

function c4Set2(array){
    for (let i = 0; i < array.length; i++){
        let totalSal = 0
        for (let e = 0; e < empDeps.length; e++){
            if (empDeps[e][3] == "9999-01-01"){
                if (array[i][0] == empDeps[e][1]){
                    for (let o = 0; o < salaries.length; o++){
                        if (empDeps[e][0] == salaries[o][0]){
                            if (salaries[o][3] == "9999-01-01"){
                                let sal = parseInt(salaries[o][1])
                                totalSal += sal
                            }
                        }
                    }
                }
            }
        }
        console.log(array[i][1] + " " + totalSal)
    }
}

function c5Set2(array){
    for (let i = 0; i < array.length; i++){
        let totalSalM = 0
        let totalSalF = 0
        for (let e = 0; e < empDeps.length; e++){
            if (empDeps[e][3] == "9999-01-01"){
                if (array[i][0] == empDeps[e][1]){
                    for (let o = 0; o < salaries.length; o++){
                        if (empDeps[e][0] == salaries[o][0]){
                            if (salaries[o][3] == "9999-01-01"){
                                for (let g = 0; g < emps.length; g++){
                                    if (emps[g][0] == salaries[o][0]){
                                        if (emps[g][4] == 'M'){
                                            let salM = parseInt(salaries[o][1])
                                            totalSalM += salM
                                        }
                                        if (emps[g][4] == 'F'){
                                            let salF = parseInt(salaries[o][1])
                                            totalSalF += salF
                                        }
                                    } 
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log('In the department: ' + array[i][1] + ", the total male salary is  " + totalSalM + ' and the total female salary is ' + totalSalF)
    }
}
//c1Set1(empDeps)
//c2Set1(salaries)
//c3Set1(empDeps)
//c4Set1(empDeps)
//c5Set1(salaries)

//c1Set2(emps)
//c2Set2(deps)
//c3Set2(deps)
//c4Set2(deps)
//c5Set2(deps)