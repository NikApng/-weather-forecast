const apiKey = '871b0338ab8040bb8ab111629251409'




document.addEventListener('click', (el) => {
    if (el.target.closest('[data-serch]')) {
        const weatherIMG = document.querySelector('[data-weather-img]')
        const nameWeather = document.querySelector('[data-name-weather]')
        const weather = document.querySelector('[data-weather]')
        const input = document.querySelector('[data-input]')
        const main = document.querySelector('[data-main-loader]')

        const inputValue = input.value.trim()

        const titelCard = document.querySelector('[data-titel]')

        const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputValue}`

        const loader = document.createElement('div')
        loader.innerHTML = `
            <div class="loader--wait"></div>
            `


        main.appendChild(loader)

        fetch(query).then((response) => {
            return response.json()
        }).then((data) => {
            loader.remove()
            titelCard.textContent = data.location.name
            weather.textContent = `${Math.ceil(data.current.temp_c)} Cº`
            nameWeather.textContent = data.current.condition.text
            weatherIMG.src = data.current.condition.icon


        })


    }
})

const nextBtn = document.querySelector('[data-next-btn]')
const backBtn = document.querySelector('[data-back-btn]')


const slider = document.querySelector('[data-slider]')
const slides = document.querySelectorAll('.slide')

let currentSlide = 0

function SliderSwiper() {


    const slideWidth = slides[0].offsetWidth
    const newPosition = -currentSlide * slideWidth

    slider.style.transform = `translateX(${newPosition}px)`;
}

SliderSwiper()

nextBtn.addEventListener('click', () => {

    currentSlide++
    SliderSwiper()

    if (currentSlide > slides.length - 1) {
        currentSlide = [0]
        SliderSwiper()
    }

})
backBtn.addEventListener('click', () => {

    currentSlide--
    SliderSwiper()

    if (currentSlide < 0) {
        currentSlide = [0]
        SliderSwiper()
    }

})
//---------------------------

const cities = ["New-York", "Moscow", "Monaco"]

function loadWeather (city, index) {

    const sliderTitel = document.querySelector(`[data-titel-slider="${index}"]`)
    const sliderIMG = document.querySelector(`[data-slider-img="${index}"]`)
    const sliderWeather = document.querySelector(`[data-slider-weather="${index}"]`)
    const sliderWeathertitel = document.querySelector(`[data-silder-titel="${index}"]`)



    const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

        fetch(query).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            
            sliderTitel.textContent = data.location.name
            sliderWeather.textContent = `${Math.ceil(data.current.temp_c)} Cº`
            sliderWeathertitel.textContent = data.current.condition.text
            sliderIMG.src = data.current.condition.icon
            sliderIMG.alt = 'ошибка'
        })
}

    cities.forEach((city, i) => {
        
        
        loadWeather(city, i + 1)
    })