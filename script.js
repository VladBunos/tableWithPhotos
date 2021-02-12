//Local Storage - локальное хранилище даннхы
// расположенное у пользователя на локальном ди ске
// и привызанное у определннмоу браузеру
// В нем можно хранить данные, которые будут доступны веб-приложению
// даже если пользоватлеть перейдет на другуб страницу
//обновит текущую  или вовсе покинут страницу и зайдет
// через некоторое время




// Для работе с localStorage достпуны несколько методов: 
// localStorage.setItem('Ключ', 'значение') // сохранение значения
// localStorage.getItem('Ключ') // получает значение
// localStorage.removeItem('Ключ',) // удаление значения
// localStorage.clear() // очищение всего хранилища



//LocalStorage принимает значения только в виде строк !
// localStorage.setItem('test', 1)
// console.log(localStorage.getItem('test'))
// console.log(localStorage)

//Удаление
// localStorage.clear()
// delete localStorage.test
// console.log(localStorage)


//LS принимает в себя только строки, поэтому используется приобразование 
// localStorage.user = JSON.stringify({name: 'Jhon'})
// console.log(localStorage.user)
// let user = JSON.parse(localStorage.user)
// console.log(user)
// console.log(user.name)













//Метод fetch() используется дял отправки данных на сервер и их получения, современный аналог XMLHttpRequest
//.json() - докодирует ответ в формате JSON
//.text() - читает ответ и возвщрает как обычный текст 
// результатом исполнения fetch всегда будет промис. 
// fetch(URL)
//  .then(function (response){
//      return response.json
//  })
//  .then (function (data){
//      console.log(data)
//  })
//  .catch(function (error){
//      return error
//  })


//https://reqres.in/ - домен
//https://reqres.in/api/users?page=2&per_page=6 - URL адрес
//Разделитель ? - указывает браузеру о начале блока параметров
//Передаем как простые переменные page=2 и per_page=6
//Амперсанд & используется для разделения переменных
//Все последующие переменные должны быть записаны через знак &


// fetch('https://reqres.in/api/users?&per_page=12')
//  .then(function (response){
//      console.log(response)
//      return response.json()
//  })
//  .then (function (data){
//      console.log(data)
//  })
//  .catch(function (error){
//      return error
// })





let userData = []
let pagesNumber = 0;
const buttonSpace = document.querySelector('.button-space')
const tableBody = document.querySelector('#table-body')



function pushUserData(data){
    for(let i = 0; i < data.data.length; i++){
        userData.push(data.data[i])
    }
}

function countPages(){
    pagesNumber = Math.ceil(userData.length / 6)
}

function createTable(start, end){
    tableBody.innerHTML = ``
    for(; start < end; start++){
        console.log(tableBody)
        tableBody.innerHTML += `<tr>
        <td>${userData[start].id}</td> <td>${userData[start].email}</td> <td>${userData[start].first_name}</td> <td>${userData[start].last_name}</td> <td> <img src="${userData[start].avatar} " alt="">   </td>
        </tr>`
    }
}

function createButtons(){
    for(let i = 1; i <= pagesNumber; i++){
        buttonSpace.insertAdjacentHTML("beforeend", `<button class = 'page-number'>${i}</button>`) 
    }
}



let promise = new Promise ((resolve, reject)=>{
    const result = fetch('https://reqres.in/api/users?&per_page=12')
    resolve(result)

})
.then(function (response){
    // console.log(response)
    return response.json();
})
.then (function (data){
    pushUserData(data)
    countPages()
    createButtons()
    createTable(0, 5)
})
.catch(function (error){
    console.log(error)
    return error
})

buttonSpace.addEventListener('click', event=>{
    event.preventDefault();
    let pageToOpen = +(event.target.closest('.page-number').textContent)
    let start = (pageToOpen*6-6)
    let end = (pageToOpen*6-1)
    createTable(start, end)
})

