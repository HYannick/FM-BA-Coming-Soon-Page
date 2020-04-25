const validateEmail = (email) => {
    let errorText = ''

    if (!email || email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errorText = 'Please provide a valid email'
    }

    return errorText
}

class Newsletter {
    constructor(el) {
        this.DOM = {el}
        this.DOM.error = this.DOM.el.querySelector('.hero-content__newsletter-form-error')
        this.DOM.emailInputField = this.DOM.el.querySelector('.hero-content__newsletter-input-field');
        this.DOM.emailInput = this.DOM.emailInputField.querySelector('input');
        this.initEvents()
    }

    initEvents() {
        this.DOM.el.addEventListener('submit', (e) => this.handleNewsLetterSubmit(e))
    }

    handleNewsLetterSubmit(e) {
        e.preventDefault()
        const {value} = this.DOM.emailInput;
        const hasErrors = validateEmail(value)

        if (hasErrors) {
            this.showInputError(hasErrors)
            return
        }
        
        this.hideInputError()
        setTimeout(() => alert(`submitted!, ${value}`), 1000);

    }

    showInputError(errorText) {
        this.DOM.emailInputField.classList.add('hero-content__newsletter-input-field--error');
        this.DOM.error.innerHTML = errorText
        gsap.to(this.DOM.error, 0.2, {
            opacity: 1,
            y: 0
        })
    }

    hideInputError() {
        this.DOM.emailInputField.classList.remove('hero-content__newsletter-input-field--error');
        gsap.to(this.DOM.error, 0.2, {
            opacity: 0,
            y: 10
        })
        this.DOM.error.innerHTML = ''
    }
}

class Layout {
    constructor(el) {
        this.DOM = {el}

        this.DOM.content = this.DOM.el.querySelector('.hero-content')
        this.DOM.image = this.DOM.el.querySelector('.hero-image img')

        this.DOM.newsletter = this.DOM.content.querySelector('.hero-content__newsletter')
        this.DOM.infos = this.DOM.content.querySelector('.hero-content__infos')

        this.DOM.title = this.DOM.infos.querySelector('h1')
        this.DOM.titleSpans = Array.from(this.DOM.title.querySelectorAll('.hero-content__title-text span'))
        this.DOM.text = this.DOM.infos.querySelector('p')

        this.initEvents()

    }

    initEvents() {
        const timeline = gsap.timeline()
        timeline
            .to(this.DOM.image, 2, {
                ease: Expo.easeOut,
                scale: 1,
                opacity: 1,
            })
            .to(this.DOM.titleSpans, 1.5, {
                ease: Expo.easeOut,
                stagger: 0.2,
                y: 0,
                opacity: 1,
            }, "-=1.7")
            .to(this.DOM.text, 1.5, {
                ease: Expo.easeOut,
                delay: 0.4,
                opacity: 1,
                y: 0,
            }, "-=1.5")
            .to(this.DOM.newsletter, 1.5, {
                ease: Expo.easeOut,
                opacity: 1,
                y: 0,
            }, "-=1.4")

        new Newsletter(this.DOM.newsletter)
    }
}

const body = document.body
imagesLoaded(document.querySelector('.hero-image img'), () => {
    body.classList.remove('loading')
    new Layout(document.querySelector('.hero'))
})