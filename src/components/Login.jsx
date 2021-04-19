import React, {useState} from 'react'
import {auth} from '../firebaseconfig'  
import {useHistory} from 'react-router-dom'

const Login = () => {

    const historial = useHistory()
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [msgError, setMsgError] = useState(null)

    const RegistrarUsuario = (e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,pass)
        .then((r) => {
            historial.push('/')
        
            
        })
        .catch(e =>{
           // auth/invalid-email
           // auth/weak-password
           if(e.code == 'auth/invalid-email'){
            setMsgError('Email incorrecto')
             }
           if(e.code == 'auth/weak-password') {
            setMsgError('El correo debe tener minimo 6 caracteres')
              
           } 
        })
        
    }

    const LoginUsuario = () =>{
        auth.signInWithEmailAndPassword(email,pass)
        .then((r) => {
            historial.push('/')
        })
        .catch((err)=>{
            if(err.code == 'auth/wrong-password')
            setMsgError('Contraseña incorrecta')
          
        })
    }


    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
        <form onSubmit={RegistrarUsuario} className="form-group">
      
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
           type="email" 
           className="form-control"
           placeholder="Ingrese su email"/>
          
       
          <input 
           onChange={(e)=>{setPass(e.target.value)}}
          type="password"
           className="form-control mt-4"
            placeholder="Ingrese su password"/>

         <input 
          className="btn btn-dark btn-block mt-4"
          value="Registrar Usuario"
           type="submit"/>  
       
        
      
      </form> 
        <button 
        onClick={LoginUsuario}
        className="btn btn-success btn-block">

        Iniciar sesion</button>


      {
          msgError != null ?
          (
              <div>
                  {msgError}
              </div>
          )
          :
          (
              <span></span>
          )
      }
      </div>
      <div className="col"></div>
      </div>
          
           
    
    );
};

export default Login;