
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


window.addEventListener('load', () => {
    console.log('registerValidator connected success');


    const emailVerify = async () => {
        try {
            const response = await fetch('/api/users/emails');
            const result = await response.json()
            console.log(result.emails)
        } catch (error) {
            console.log(error)
        }
    }

    emailVerify()

/* validaciones */

    $('name').addEventListener('blur', () => {
        if(!$('name').value.trim()){
            $('name').classList.add('is-invalid')
            $('error-name').innerHTML = "El nombre es obligatorio"
        }else{
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('error-name').innerHTML = null
        }
    })

    $('email').addEventListener('blur', () => {
        if(!regExEmail.test($('email').value)){
            $('email').classList.add('is-invalid')
            $('error-email').innerHTML = "Debes ingresar un email válido"
        }else{
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            $('error-email').innerHTML = null
        }
    })

    $('password').addEventListener('focus', () => {
        $('error-password').innerHTML = "La contraseña debe tener entre 6 y 12 caractres, un número y una mayúscula"

    })

    $('password').addEventListener('blur', () => {
        if(!regExPass.test($('password').value)){
            $('password').classList.add('is-invalid')
            $('error-password').innerHTML = "La contraseña debe cumplir con estándares"
        }else{
            $('password').classList.remove('is-invalid')
            $('password').classList.add('is-valid')
            $('error-password').innerHTML = null
        }
    })

    $('password2').addEventListener('blur', () => {
        if($('password').value.trim() !== $('password2').value.trim()){
            $('password2').classList.add('is-invalid')
            $('error-password2').innerHTML = "La validación de la contraseña no coincide"
        }else{
            $('password2').classList.remove('is-invalid')
            $('password2').classList.add('is-valid')
            $('error-password2').innerHTML = null
        }
    })

    $('acepta').addEventListener('click', () => {
        $('acepta').classList.toggle('is-valid')
        $('acepta').classList.remove('is-invalid')
        $('error-acepta').innerHTML = null
    })

/* envio del formulario */

$('form-register').addEventListener('submit', e => {
    e.preventDefault();

    let elemnetosForm = $('form-register').elements;
    let error = false;

    for (let i = 0; i < elemnetosForm.length - 1; i++) {
        
        if(!elemnetosForm[i].value){
            elemnetosForm[i].classList.add('is-invalid')
            $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
            error = true
        }
    }

    if(!$('acepta').checked){
        $('acepta').classList.add('is-invalid')
        $('error-acepta').innerHTML = "Debes aceptar los términos y condiciones";
        error = true
    }
    if(!error){
        $('form-register').submit()
    }
})

})