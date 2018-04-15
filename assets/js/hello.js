const $ = selector => document.querySelectorAll(selector)
const form = {}
const questions = $('.qblock')
const blocks = [...$('.block')]
let qcount = questions.length

$('.button').forEach( x => {
    x.addEventListener('click', nextClicked, false)
})

$('.option').forEach( x => {
    x.addEventListener('click', optionClicked, false)
})

function setActive(elem) {
    elem.classList.add('activeOpt')
}

function setInactive(elem) {
    elem.classList.remove('activeOpt')
}

function optionClicked({target}) {
    const name = target.parentElement.dataset.name
    const value = target.innerText.toLowerCase()
    const exit = target.dataset.exit
    
    if(exit === "1") {
        target.parentElement.dataset.exit = "1"
    } else {
        target.parentElement.dataset.exit = "0"
    }

    if(target.classList.contains('multiple')) { // multiple answers possible
        form[name] = form[name] || []
        if(form[name].indexOf(value) === -1) {
            // deselect element
            form[name].push(value)
            setActive(target)
        } else {
            // select element
            form[name].splice(form[name].indexOf(value), 1)
            setInactive(target)
        }
    } else {
        form[name] = value
        $(`div[data-name="${name}"]`)[0].querySelectorAll('.option').forEach( x => setInactive(x))
        setActive(target)
    }
    console.log("Form right now", form)
}

function nextClicked({target}) {
    const index = blocks.indexOf(target.parentElement)
    let dataset
    if(target.parentElement.classList.contains('qblock')) {
        dataset = target.parentElement.querySelector('.options').dataset
        const name = dataset.name
        if(!form[name]) {
            alert('Select a option')
            return
        }
    }
    
    if(qcount-- <= 0) {
        sendData()
        blocks[index].classList.remove('active')
        blocks[index + 1].classList.add('active')
    } else if(dataset && dataset.exit === "1") {
        debugger
        sendData()
        blocks.forEach(b => b.classList.remove('active'))
        blocks[blocks.length-1].classList.add('active')
    } else {
        blocks[index].classList.remove('active')
        blocks[index + 1].classList.add('active')
    }
}

async function sendData() {
    debugger
    console.log('Sending Data')
    const data = await fetch('/hello', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await data.json()

    if(!json.success) {
        alert('Some problem with your submission')
    }
}