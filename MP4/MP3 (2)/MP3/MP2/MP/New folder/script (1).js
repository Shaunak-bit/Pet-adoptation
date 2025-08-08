let loginform = document.querySelector('.header .login-form')

document.querySelector('#login-btn') .onclick = () =>{
    loginform.classList.toggle('active')
    navbar.classList.remove('active')
}

let navbar = document.querySelector('.header .navbar')

document.querySelector('#menu-btn') .onclick = () =>{
    navbar.classList.toggle('active')
    loginform.classList.remove('active')
    navbar.classList.remove('active')
}

window.onscroll = () =>{
    loginform.classList.remove('active')
    navbar.classList.remove('active')

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}