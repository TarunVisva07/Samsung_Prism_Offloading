function Initiate() {
    let array = [10, 30, 18, 26, 15, 24, 12, 14, 27, 20, 5]

    let sample1 = array
    let sample2 = array

    var start1 = window.performance.now()

    heapSort(sample1)

    var end1 = window.performance.now()


    console.log(sample1)
    console.log(`Sorting Time : ${end1 - start1} ms`)

    var start2 = window.performance.now()

    selectionSort(sample2)

    var end2 = window.performance.now()


    console.log(sample2)
    console.log(`Sorting Time : ${end2 - start2} ms`)

    dataSetUp()

    var start3 = window.performance.now()

    calculateAverage()

    simpleNumbersSetUp()

    var end3 = window.performance.now()

    console.log(`Execution Time : ${end3 - start3} ms`)

}

function heapSort(array) {
    let limit = parseInt(array.length/2 - 1)

    for(let i = limit; i >= 0; i--) {
        heapify(array, array.length, i)

    }

    for(let i = array.length - 1; i > 0; i--) {
        var temp = array[0]
        array[0] = array[i]
        array[i] = temp

        heapify(array, i, 0)

    }

}

function heapify(array, len, i) {
    var left_child = 2*i + 1
    var right_child = 2*i + 2
    var largest = i

    if(left_child < len && array[left_child] > array[largest]) {
        largest = left_child

    }
    if(right_child < len && array[right_child] > array[largest]) {
        largest = right_child

    }

    if(largest !== i) {
        var temp = array[largest]
        array[largest] = array[i]
        array[i] = temp

        heapify(array, len, largest)

    }

}


function selectionSort(array) {
    var len = array.length

    for(let i = 0; i < len - 1; i++){
        var smallest = i

        for(let j = i + 1; j < len; j++) {
            if(array[smallest] === array[j]) {
                smallest = j

            }

        }

        if(smallest !== i) {
            var temp = array[i]
            array[i] = array[smallest]
            array[smallest] = temp

        }

    }

}

function dataSetUp() {
    var database = openDatabase('Student','1.0','Student Marks',100 * 1024 * 1024) 

    database.transaction(function(tx) {
        //tx.executeSql('drop table if exists MARKS')
        tx.executeSql('create table if not exists MARKS (rollno int primary key, subject1 int, subject2 int, subject3 int)')

    })

    const marklist = []

    for(let i = 0; i < 300; i++) {
        marklist.push(randomin(35,100))

    }

    for(let i = 0; i < 100; i++) {

        database.transaction(function(tx) {
            tx.executeSql('insert into MARKS values (?, ?, ?, ?)',[i + 1, marklist[3*i], marklist[3*i + 1], marklist[3*i + 2]])

        })

    }

    console.log("Data entry done!")

}

function simpleNumbersSetUp() {
    var database = openDatabase('Student','1.0','Student Marks',100 * 1024 * 1024)

    database.transaction(function(tx) {
        tx.executeSql('create table if not exists NUMBERS (rowno int primary key, num int)')

    })

    const nums = []

    for(let i = 0; i < 1000; i++) {
        nums.push(randomin(1,100000000))
    }

    console.log(nums)

    for(let i = 0; i < 1000; i++) {

        database.transaction(function(tx) {
            tx.executeSql('insert into NUMBERS values (?, ?)',[i + 1, nums[i]])

        })

    }

    console.log("Number Entry Done!")

}

function randomin(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function calculateAverage() {
    var database = openDatabase('Student','1.0','Student Marks',100 * 1024 * 1024) 

    const marklist = []

    database.transaction(function(tx) {
        tx.executeSql('select * from MARKS', [], function(tx, result) {
            var len = result.rows.length

            for(let i = 0; i < len; i++) {   
                marklist.push((result.rows.item(i).subject1 + result.rows.item(i).subject2 + result.rows.item(i).subject3)/3)
            
            }  

        }, null)

    })

    console.log(marklist)

}

function triggerSorting() {
    var len = parseInt(document.getElementById("meter1").value)
    len = parseInt(Math.pow(10,len/100))

    console.log(len)

    const array = []

    for(let i = 0; i < len; i++) {
        array.push(randomin(-10000,10000))
    }

    const sample1 = array
    const sample2 = array

    var start1 = window.performance.now()

    heapSort(sample1)

    var end1 = window.performance.now()


    console.log(sample1)
    console.log(`Sorting Time : ${end1 - start1} ms`)

    document.getElementById("hst").innerHTML = end1 - start1 

    var start2 = window.performance.now()

    selectionSort(sample2)

    var end2 = window.performance.now()


    console.log(sample2)
    console.log(`Sorting Time : ${end2 - start2} ms`)

    document.getElementById("sst").innerHTML = end2 - start2 

    document.getElementById("noe").innerHTML = len

}

function triggerMM() {
    var len = parseInt(document.getElementById("meter2").value)
    len = parseInt(Math.pow(10,len/100))

    console.log(len)

    var database = openDatabase('Student','1.0','Student Marks',100 * 1024 * 1024)
    
    const nums = []

    database.transaction(function(tx) {
        tx.executeSql('select * from NUMBERS', [], function(tx, result) {
            for(let i = 0; i < len; i++) {
                nums.push(result.row.item(i).num) 
            
            }

        }, null)
   
    })

    console.log(nums)

}