import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div>
      <ul className="nav flex-column sidebar bg-dark">
        <h3 className="text-success mt-3 ml-2">Admin  Panel</h3>
        <i className="fa fa-user-circle text-white mt-3 ml-5 pl-4 icon-user" style={{ 'fontSize': '5em' }}></i>
        <li className="nav-item">
          <Link to="/profile/admin" style={{ color: 'white', textDecoration: 'inherit' }} > <i className="fa fa-table fa-lg"></i> Dashboad<hr className="bg-warning" /></Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/notices" style={{ color: 'white', textDecoration: 'inherit' }} ><i className="fa fa-bar-chart fa-lg"></i> Home Screen Management<hr className="bg-warning" /></Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/contactus" style={{ color: 'white', textDecoration: 'inherit' }} ><i className="fa fa-bar-chart fa-lg"></i> Contact Us Messages<hr className="bg-warning" /></Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/feedbacks" style={{ color: 'white', textDecoration: 'inherit' }} ><i className="fa fa-bar-chart fa-lg"></i> Feedback Messages<hr className="bg-warning" /></Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/paymentmanagement" style={{ color: 'white', textDecoration: 'inherit' }} ><i className="fa fa-wpforms fa-lg"></i> Payment Management<hr className="bg-warning" /></Link>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;