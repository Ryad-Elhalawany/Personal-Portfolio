var themeToggleBtn = document.getElementById('theme-toggle-button')
var settingToggle = document.getElementById('settings-toggle')
var settingSidabar = document.getElementById('settings-sidebar')
var settingCloseBtn = document.getElementById('close-settings')
var fontOptions = document.querySelectorAll('.font-option')
var navLinks = document.querySelectorAll('nav a')
var sections = document.querySelectorAll('section')
var scrollTopBtn = document.getElementById('scroll-to-top')
var resetSettingBtn = document.getElementById('reset-settings')
var portfolioFilter = document.querySelectorAll('.portfolio-filter')
var carouselContent = document.getElementById('testimonials-carousel')
var indicators = document.querySelectorAll('.carousel-indicator')
var prevCarousel = document.getElementById('prev-testimonial')
var nextCarousel = document.getElementById('next-testimonial')
var carouselCards = document.querySelectorAll('.testimonial-card')
var themeColor = document.querySelectorAll('.themeColor')
var carouselTransition = 0
var activeIndicator = 0


storages()
// ======================= EventListner ============================
// change dark , light
themeToggleBtn.addEventListener('click', function () {
    // 1. onclick change 'dark' class
    document.querySelector('html').classList.toggle('dark')

    // 2.localeStorage the theme
    if (document.querySelector('html').classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    }
    else {
        localStorage.setItem('theme', 'light')
    }
})

// open sidebar
settingToggle.addEventListener('click', function () {
    // 1. onclick open the sidebar
    settingSidabar.classList.remove('translate-x-full')

    // 2. move the gear icon to open
    settingToggle.style.right = '20rem'
})

// close sidebar
settingCloseBtn.addEventListener('click', function () {
    // 1.onclick close the sidebar
    settingSidabar.classList.add('translate-x-full')

    // 2.move the gear icon to close
    settingToggle.style.right = '0'
})

// close sidebar when click anywhere outside 
document.addEventListener('click', function (e) {
    if (!settingSidabar.contains(e.target) && !settingToggle.contains(e.target)) {
        settingSidabar.classList.add('translate-x-full')
        settingToggle.style.right = '0'
    }
})

// navbar ScrollSpy
window.addEventListener('scroll', function () {
    var currentSectionId = ''

    // loop on sections
    for (let i = 0; i < sections.length; i++) {
        var sectionTop = sections[i].offsetTop
        var sectionHeight = sections[i].clientHeight

        // storage the id
        if (scrollY >= sectionTop - sectionHeight / 3) {
            currentSectionId = sections[i].getAttribute('id')
        }
    }

    // loop on navbarLinks
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active')

        if (navLinks[i].getAttribute('href') === `#${currentSectionId}`) {
            navLinks[i].classList.add('active')
        }
    }
})

// visible scroll to top button
window.addEventListener('scroll', function () {
    if (scrollY >= sections[0].offsetHeight - 600) {
        scrollTopBtn.classList.replace('opacity-0', 'opacity-1')
        scrollTopBtn.classList.remove('invisible')
    }
    else {
        scrollTopBtn.classList.replace('opacity-1', 'opacity-0')
        scrollTopBtn.classList.add('invisible')
    }
})

// scroll to top when click on button
scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0 })
})

// reset theme button
resetSettingBtn.addEventListener('click', function () {
    var primary = themeColor[0].getAttribute('data-primary')
    var secondary = themeColor[0].getAttribute('data-secondary')

    // 1.remove all active fonts
    deleteActiveFont()

    // 1. remove all acitve themes
    for (let j = 0; j < themeColor.length; j++) {
        themeColor[j].classList.remove('ring-2')
    }

    // 2.make tajawal(default) active
    fontOptions[1].classList.add('active')
    fontOptions[1].classList.add('border-primary')
    fontOptions[1].classList.add('dark:bg-slate-800')
    fontOptions[1].classList.remove('border-slate-200')
    fontOptions[1].classList.remove('dark:border-slate-700')
    document.body.classList.add(`font-tajawal`)

    // 2. make the purple default theme
    themeColor[0].classList.add('ring-2')
    document.documentElement.style.setProperty('--color-primary', primary)
    document.documentElement.style.setProperty('--color-secondary', secondary)

    // 3.localeStorage the selectedFont
    localStorage.setItem('selectedFont', 1)

    // 3. localeStorage the selected theme
    localStorage.setItem(
        'selectedTheme',
        JSON.stringify({
            primary: primary,
            secondary: secondary,
            index: 0
        })
    )

    // 4.close the sidebar
    settingSidabar.classList.add('translate-x-full')
    settingToggle.style.right = '0'
})

// next carousel button
nextCarousel.addEventListener('click', function () {
    carouselTransition += 33.333
    activeIndicator += 1

    // if activeIndicator reached indicators.length .. reset to 0
    if (activeIndicator == indicators.length) {
        activeIndicator = 0
    }

    // if the carousel reached the last card .. go to the first card
    if (carouselTransition > (carouselCards.length - 3) * 33.333) {
        carouselTransition = 0
    }

    // loop for delete all active indicators
    deleteActiveIndicator()

    carouselContent.style.transform = `translateX(${carouselTransition}%)`
    indicators[activeIndicator].classList.add('active', 'bg-accent')
    indicators[activeIndicator].classList.remove('dark:bg-slate-600', 'bg-slate-400')
})

// prev carousel button
prevCarousel.addEventListener('click', function () {
    carouselTransition += -33.333
    activeIndicator -= 1

    // if activeIndicator reached 0 .. go to the indicators.length
    if (activeIndicator == -1) {
        activeIndicator = indicators.length - 1
    }

    // if the carousel reachest the first card .. go to the last card
    if (carouselTransition < 0) {
        carouselTransition = (carouselCards.length - 3) * 33.333
    }

    // loop for delete all active indicators
    deleteActiveIndicator()

    carouselContent.style.transform = `translateX(${carouselTransition}%)`
    indicators[activeIndicator].classList.add('active', 'bg-accent')
    indicators[activeIndicator].classList.remove('dark:bg-slate-600', 'bg-slate-400')
})


// loop for active font
for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].addEventListener('click', function () {
        // 1.loop delete All Active fonts
        deleteActiveFont()

        // 2.Activate the selected font
        fontOptions[i].classList.add('active')
        fontOptions[i].classList.add('border-primary')
        fontOptions[i].classList.add('dark:bg-slate-800')
        fontOptions[i].classList.remove('border-slate-200')
        fontOptions[i].classList.remove('dark:border-slate-700')
        document.body.classList.add(`font-${fontOptions[i].getAttribute('data-font')}`)
        localStorage.setItem('selectedFont', i)
    })
}

// loop for navs and tabs
for (let i = 0; i < portfolioFilter.length; i++) {
    portfolioFilter[i].addEventListener('click', function () {
        var cards = document.querySelectorAll('.portfolio-item')

        // loop for delete all active buttons
        for (let j = 0; j < portfolioFilter.length; j++) {
            portfolioFilter[j].classList.remove('active', 'bg-linear-to-r', 'hover:shadow-lg', 'hover:shadow-primary/50', 'text-white')
            portfolioFilter[j].classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-300', 'dark:border-slate-700', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-700')
        }

        // add the active to the selected button
        portfolioFilter[i].classList.add('active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'hover:shadow-lg', 'hover:shadow-primary/50', 'text-white')

        // add the data
        for (let c = 0; c < cards.length; c++) {
            var navsBtns = portfolioFilter[i].getAttribute('data-filter')
            var navsCards = cards[c].getAttribute('data-category')

            // add display none to all cards
            cards[c].style.transition = 'opacity 0.3s, transform 0.3s'
            cards[c].style.opacity = '0'
            cards[c].style.transform = 'scale(0.5)'
            setTimeout(() => {
                cards[c].classList.add('hidden')
            }, 300);

            if (navsBtns == navsCards) {
                setTimeout(() => {
                    setTimeout(() => {
                        cards[c].style.opacity = '1'
                        cards[c].style.transform = 'scale(1)'
                    }, 100);
                    cards[c].classList.remove('hidden')
                }, 300);
            }
            else if (navsBtns == 'all') {
                setTimeout(() => {
                    setTimeout(() => {
                        cards[c].style.opacity = '1'
                        cards[c].style.transform = 'scale(1)'
                    }, 100);
                    cards[c].classList.remove('hidden')
                }, 300);
            }
        }
    })
}

// loop for carousel
for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', function () {
        var transition = i * 33.333

        // loop for delete all active
        deleteActiveIndicator()

        // add active to clicked indicator
        indicators[i].classList.add('active', 'bg-accent')
        indicators[i].classList.remove('dark:bg-slate-600', 'bg-slate-400')

        // move the carousel cards
        carouselContent.style.transform = `translateX(${transition}%)`
    })
}

// loop for colorTheme
for (let i = 0; i < themeColor.length; i++) {
    themeColor[i].addEventListener('click', function () {
        var primary = themeColor[i].getAttribute('data-primary')
        var secondary = themeColor[i].getAttribute('data-secondary')

        for (let j = 0; j < themeColor.length; j++) {
            themeColor[j].classList.remove('ring-2')
        }
        themeColor[i].classList.add('ring-2')
        document.documentElement.style.setProperty('--color-primary', primary)
        document.documentElement.style.setProperty('--color-secondary', secondary)
        localStorage.setItem(
            'selectedTheme',
            JSON.stringify({
                primary: primary,
                secondary: secondary,
                index: i
            })
        )
    })
}
// ======================== functions =============================

// function for delete Active in fonts
function deleteActiveFont() {
    for (let j = 0; j < fontOptions.length; j++) {
        fontOptions[j].classList.remove('active')
        fontOptions[j].classList.remove('border-primary')
        fontOptions[j].classList.remove('dark:bg-slate-800')
        fontOptions[j].classList.add('border-slate-200')
        fontOptions[j].classList.add('dark:border-slate-700')
        document.body.classList.remove('font-tajawal')
        document.body.classList.remove('font-alexandria')
        document.body.classList.remove('font-cairo')
    }
}

// function for delete active in carousel
function deleteActiveIndicator() {
    for (let j = 0; j < indicators.length; j++) {
        indicators[j].classList.remove('active', 'bg-accent')
        indicators[j].classList.add('dark:bg-slate-600', 'bg-slate-400')
    }
}


function storages() {
    var currentFont = localStorage.getItem('selectedFont')
    var tajawalFont = document.getElementById('tajawal-font')

    // dark , light storage
    if (localStorage.getItem('theme') == 'light') {
        document.querySelector('html').classList.remove('dark')
    }

    // selected theme storage
    if (localStorage.getItem('selectedTheme')) {
        var theme = JSON.parse(localStorage.getItem('selectedTheme'))

        for (let i = 0; i < themeColor.length; i++) {
            themeColor[i].classList.remove('ring-2')
        }

        document.documentElement.style.setProperty('--color-primary', theme.primary)
        document.documentElement.style.setProperty('--color-secondary', theme.secondary)

        themeColor[theme.index].classList.add('ring-2')
    }

    if (currentFont == null) {
        document.body.classList.add('font-tajawal')
        tajawalFont.classList.add('active', 'border-primary', 'dark:bg-slate-800')
        tajawalFont.classList.remove('border-slate-200', 'dark:border-slate-700')
        return
    }
    fontOptions[currentFont].classList.add('active')
    fontOptions[currentFont].classList.add('border-primary')
    fontOptions[currentFont].classList.add('dark:bg-slate-800')
    fontOptions[currentFont].classList.remove('border-slate-200')
    fontOptions[currentFont].classList.remove('dark:border-slate-700')
    document.body.classList.add(`font-${fontOptions[currentFont].getAttribute('data-font')}`)
}


