

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#error-message')
const messageTwo = document.querySelector('#weather-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Searching for the weather forecast ...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error: '+ data.error
                
            }   else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
                
            }
        })
    })


})