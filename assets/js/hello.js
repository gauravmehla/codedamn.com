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

function optionClicked({target}) {
    const name = target.parentElement.dataset.name
    const value = target.innerText.toLowerCase()
    if(target.classList.contains('multiple')) { // multiple answers possible
        form[name] = form[name] || []
        if(form[name].indexOf(value) === -1) {
            // deselect element
            form[name].append(value)
        } else {
            // select element
            form[name].splice(form[name].indexOf(value), 1)
        }
    } else {
        form[name] = value
    }
    console.log("Form right now", form)
}

function nextClicked({target}) {
    // const name = target.parentElement.querySelector('.options').dataset.name
    debugger
    const index = blocks.indexOf(target.parentElement)
    blocks[index].classList.remove('active')
    blocks[index + 1].classList.add('active')
}

async function sendData() {
    console.log('Sending Data')
    const data = await fetch('/hello', {
        method: 'POST',
        body: JSON.stringify(form)
    })

    if(!data.success) {
        alert('Some problem with your submission')
    } else {
        next(-1)
    }
}

function next(index) {
    //debugger
    const nextBlock = index == -1 ? questions[qcount-1] : questions[index]
    nextBlock.classList.add('active')
}