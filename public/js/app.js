console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
                console.log(data.error)
            }
            else
            {
                messageOne.textContent = data.forecast.summary
                messageTwo.textContent = 'It is ' + data.forecast.temp + ' degrees with a ' + data.forecast.precipProb + '% chance of rain. There is a wind speed of ' + data.forecast.windSpeed
                console.log(data)
            }
        })
    })
})