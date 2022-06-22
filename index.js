const scene = document.querySelector('.scene')
const countdownDisplay = document.getElementById('countdown-display')
const rocket = document.getElementById('rocket')
const stars = document.getElementById('stars')
const starsNumber = 500
let timeRemaining, countdown, x, y, counter, inc, amplitude, wiggle

function setup() {
	timeRemaining = 10
	x = 1
	y = 1
	counter = 60
	inc = 0.01
	amplitude = 50
	rocket.innerHTML = '🚀'
	countdownDisplay.innerHTML = 'Launch!'
	wiggle = setInterval(() => {
		x += inc
		y += inc
		const valueX = noise.simplex2(x, y) * amplitude
		const valueY = noise.simplex2(x + 5000, y + 5000) * amplitude
		rocket.style.transform = `translate(${valueX}%,${valueY}%)`
	}, 60)
}
setup()

for (let i = 0; i < starsNumber; i++) {
	const star = document.createElement('div')
	star.className = 'star'
	star.style.top = `${Math.random() * 100}%`
	star.style.left = `${Math.random() * 100}%`
	star.style.setProperty('--size', `${1 + Math.random() * 3}px`)
	stars.appendChild(star)
}

function setCountdown(e) {
	if (e.target.classList.contains('trigger')) {
		countdownDisplay.classList.remove('trigger')
		countdownDisplay.innerHTML = timeRemaining
		countdown = setInterval(() => {
			countdownDisplay.innerHTML = timeRemaining
			inc = inc * 1.5
			amplitude = amplitude / 1.2
			if (timeRemaining === 0) lauch()
			timeRemaining--
		}, 700)
	}
}
function lauch() {
	clearInterval(countdown)
	clearInterval(wiggle)
	const succeed = Math.random() > 0.5 ? true : false
	if (succeed) succes()
	else failure()
	setTimeout(() => {
		countdownDisplay.innerHTML = succeed ? '🎉 Success! 🎉' : '❗️ You failed! ❗️'
		scene.classList.add('transitioning')
	}, 1000)
	setTimeout(reset, 3000)
}
function succes() {
	rocket.style.transform = `translate(60vw,-60vw)`
	scene.classList.add('launch')
}
function failure() {
	rocket.innerHTML = '💥'
	rocket.style.transform = `scale(5)`
	scene.classList.add('failure')
}
function reset() {
	scene.classList.remove('launch')
	scene.classList.remove('failure')
	scene.classList.remove('transitioning')
	rocket.style.transform = `translate(0,0)`
	countdownDisplay.classList.add('trigger')
	setup()
}

countdownDisplay.addEventListener('click', (e) => setCountdown(e))
