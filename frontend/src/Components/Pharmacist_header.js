import React from "react";
import "./PFoarm.css"

//navigation bar
function Pharmacist_Navbar(){
  return(
   <div className="PnavBar"> 
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <div className="Nav-Stock"><a className="nav-item nav-link"  href="/pharmacist/stock">STOCK</a></div>
      <div className="Nav-Order"><a className="nav-item nav-link" href="/pharmacist/orders">RECIEVED ORDERS</a></div>
      
    </div>
  </div>
</nav> </div>
  )
}

export default Pharmacist_Navbar;