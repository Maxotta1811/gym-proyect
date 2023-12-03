/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content .calculate__img`, {origin: 'right'})

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
      calculateCm = document.getElementById('calculate-cm'),
      calculateKg = document.getElementById('calculate-kg'),
      calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) =>{
    e.preventDefault()

    //Chequear si los campos tienen un valor
    if(calculateCm.value === '' || calculateKg.value === '' ){
        //Añadir y remover color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')
        //Mostrar Mensaje
        calculateMessage.textContent = 'Completa el Peso y la Altura'//'Completa el Peso y la Altura'
        //Quitar Mensaje 3 segundos
        setTimeout(() =>{
            calculateMessage.textContent = ''
        }, 3000)
    }else{
        //BMI Formula
        const cm = calculateCm.value / 100,
              kg = calculateKg.value,
              bmi = Math.round(kg / (cm * cm)) 
        // Mostrar tu Estado Físico
        if(bmi < 18.5){
            //Añadir color y Mensage
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} ,estas por debajo de tu peso ideal`
        } else if(bmi < 25){
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} ,estas en tu peso ideal`
        } else{
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} ,estas por encima de tu peso ideal`
        }   

        // Limpiar input
        calculateCm.value = ''
        calculateKg.value = ''

        //Quitar Mensaje despues de 4 segundos
        setTimeout(() =>{
            calculateMessage.textContent = ''
        }, 4000)
    }
}      

calculateForm.addEventListener('submit',calculateBmi)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactUser = document.getElementById('contact-user')

const sendEmail = (e) =>{
    e.preventDefault()
    //Chequear si el campo tiene un valor
    if(contactUser.value === ''){
        // Añadir y quitar color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        // Mostrar Mensaje
        contactMessage.textContent = 'Debes ingresar tu email' //debes ingresar tu email 
        // Quitar Mensaje despues de 3 segundos

        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 3000)
    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_93nyoic','template_7vfwo1r','#contact-form','fa7Qx3sYDf8kEVrEq')
            .then(() =>{
                //Mostrar mensaje y añadir color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'Registro Exitoso!' //Registro Exitoso!

                //Quitar mensaje despues de 3 segundos
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) => {
                // Mail error
                alert('OOPS! Something has failed..', error)
            })
            // Limpiar imput
        contactUser.value = ''    
    }
}      

contactForm.addEventListener('submit', sendEmail)