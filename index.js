const progressBars = document.querySelectorAll('.progress-bar')

const iconsContainer = document.querySelector('#icons')
const firstAnimated = document.querySelector('#first-icon')
const secondAnimated = document.querySelector('#second-icon')
const thirdAnimated = document.querySelector('#third-icon')
const fourthAnimated = document.querySelector('#fourth-icon')

let animationThreshold = {
    root: null,
    rootMargin: '0px',
    threshold: [1]
}

const barsObserver = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        console.log("Intersection ratio:", entry.intersectionRatio)
        if (entry.isIntersecting) {
            if (entry.target.id === 'adobe-photoshop') {
            entry.target.classList.add('width-100')
            }   else if (entry.target.id === 'html' || entry.target.id === 'css') {
                entry.target.classList.add('width-80')
            } else if (entry.target.id === 'javascript' || entry.target.id === 'react') {
                entry.target.classList.add('width-60')
            }
        }
    })
}, animationThreshold)

const iconsObserver = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        console.log("Intersection ratio:", entry.intersectionRatio)
        if (entry.isIntersecting) {
                firstAnimated.classList.add('slide-in1')
                secondAnimated.classList.add('slide-in2')
                thirdAnimated.classList.add('slide-in3')
                fourthAnimated.classList.add('slide-in4')
        }
    })
}, animationThreshold)


window.onload = () => {
    fetchData()
    progressBars.forEach(progressBar => barsObserver.observe(progressBar))
    iconsObserver.observe(iconsContainer)
}

async function fetchData() {
    // Fetch Data //
    try {
        const req = await fetch('https://randomuser.me/api/?inc=picture,cell,name,location,email');
        console.log(req)    
        const {results} = await req.json()
        console.log(results)
        const [newPerson] = results
        const {name, location, email, cell: phone, picture: {large: profilePicture}} = newPerson
        console.log(location)
    // Fill Required Data //
        document.getElementById('profile-image').setAttribute('src', profilePicture)
        document.getElementById('name').innerText = name.first + ' ' + name.last
        document.getElementById('city').innerText = location.city + ', ' + location.state
        document.getElementById('country').innerText = location.country
        document.getElementById('email').innerText = email
        document.getElementById('phone').innerText = phone
        Array.from(document.querySelectorAll('.sm-link'))
        .forEach(url => url.innerText += (name.first+name.last).toLowerCase())
    } catch (error) {
        document.getElementById('profile-image').setAttribute('src', './profile.jpg')
        document.getElementById('profile-image').setAttribute('alt', "Profile Image")
        document.getElementById('name').innerText = 'Pepito Perez'
        console.log(`There is an error fetching data: ${error}`)
    }
}




