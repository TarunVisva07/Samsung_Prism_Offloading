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
    var database = openDatabase('Student','1.0','Student Marks',10 * 1024 * 1024) 

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

function randomin(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}