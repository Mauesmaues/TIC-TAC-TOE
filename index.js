const inputResult = document.getElementById('result')
const input = document.getElementById('input')
const root = document.querySelector(':root')
const main = document.querySelector('main')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
    charKeyBtn.addEventListener('click', function(){
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})
 document.getElementById('clear').addEventListener('click', function(){
    input.value = ''
    input.focus()
 })

 input.addEventListener("keydown", function (ev) {
    ev.preventDefault()
    if (allowedKeys.includes(ev.key)) {
      input.value += ev.key
      return
    }
    if (ev.key === "Backspace") {
      input.value = input.value.slice(0, -1)
    }
    if (ev.key === "Enter") {
      calcular()
    }
  })

document.getElementById('equal').addEventListener('click', calcular)

function calcular(){
    inputResult.value = 'ERROR'
    inputResult.classList.add('error')
    const result = eval(input.value)
    inputResult.value = result
    inputResult.classList.remove('error')
}

document.getElementById('themeSwitcher').addEventListener('click', function(){
  if(main.dataset.theme === "dark"){
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#0000FF")
    root.style.setProperty("--border-colo", "#aaa")
    main.dataset.theme = 'light'
  }else{
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    root.style.setProperty("--border-color", "#666")
    main.dataset.theme = "dark"
  }
})

document.getElementById('copyToClipboard').addEventListener('click', function(ev){
  const button = ev.currentTarget
  if(button.innerText === "Copy"){
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(inputResult.value)
  }else{
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})