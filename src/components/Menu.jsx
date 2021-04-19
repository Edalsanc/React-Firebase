import React,{useEffect,useState} from 'react'
import {Link,useHistory } from 'react-router-dom'
import {auth} from '../firebaseconfig'




const Menu = () => {
  const historial = useHistory()
  const [usuario,setUsuario] = useState(null)
  useEffect(()=> {

    auth.onAuthStateChanged((user)=>{
      if(user.email){
        setUsuario(user.email)
        console.log("Esta es la cuenta activa "+user.email)
      }

    })
  },[])

  const CerrarSesion = ()=>{
    auth.signOut()
    setUsuario(null)
    historial.push('/')
    
  }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a claclassNamess="navbar-brand" href="#">Navbar </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
            <Link className='nav-link' to='/'>Inicio</Link>
            </li>
            <li className="nav-item">
            {
            !usuario ?
            (
              <Link className='nav-link' to='/login'>Login</Link>
            )
            :
            (
              <span></span>
            )
       } 
            
            </li>
            <li className="nav-item">
            {
            !usuario ?
            (
              <Link className='nav-link' to='/admin'>Admin</Link>
            )
            :
            (
              <span></span>
            )
       } 

           
            </li>
           
          </ul>
       </div>
       {
            usuario ?
            (
              <button 
              onClick={CerrarSesion}
              className="btn btn-danger">Cerrar sesion</button>
            )
            :
            (
              <span></span>
            )
       } 
       
      </nav> 
     
    );
};

export default Menu;
