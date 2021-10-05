import React, { useState, useEffect } from "react";
import "./sidebar.css";
import {Container,Row,Col,Table,ListGroup,Button} from 'react-bootstrap'
import axios from "axios";
import Sidebar from './Sidebar';

const Payment = () => {

  const initialState = {
    doctorSalary: '',
    chemistSalary: '',
    pharmasistSalary: '',
    doctorPercentage: '',
    chemistPercentage: '',
    pharmasistPercentage: '',
    doctorBasic: '2000',
    chemistBasic: '800',
    pharmasistBasic: '500'
  }
  
  const [salary, setSalary] = useState(initialState);
  
  const handleChangeDoc = e => {

    const {name, value} = e.target
    setSalary({...salary, [name]:value})

    const salar = "doctorSalary"
    const sal = parseInt(value) * 2000
    setSalary({...salary, [salar]: sal})

  }

  const handleChangeChem = e => {
    const {name, value} = e.target
    setSalary({...salary, [name]:value})

    const salar = "chemistSalary"
    const sal = parseInt(value) * 800
    setSalary({...salary, [salar]: sal})
  }

  const handleChangePharm = e => {
    const {name, value} = e.target
    setSalary({...salary, [name]:value})

    const salar = "pharmasistSalary"
    const sal = parseInt(value) * 500
    setSalary({...salary, [salar]: sal})
  }
  
  const saveSalary = async () => {
    try {
      await axios.post("http://localhost:6500/codebusters/api/admin/savePayments", salary)
        .then((res) => {                   
          alert("Salary Successfully Updated");                  
          window.location.reload(true);
      })                
      .catch((err) => {
          alert("Error occurred" + err);
      });
    } catch (err) {
      alert("Error occured!!! : " + err);
    }
  }

  return (
    <div >





      <h1 style={{marginLeft: '180px', marginTop: '50px', marginBottom: '30px'}}>Daily Payment For Service</h1>
    
      <h3 style={{marginLeft: '100px', marginTop: '50px', marginBottom: '30px', color:"brown"}}>Doctor Basic Salary : Rs. 2000.00</h3>
      <h3 style={{marginLeft: '100px', marginTop: '50px', marginBottom: '30px', color:"purple"}}>Lab Chemist Basic Salary : Rs. 800.00</h3>
      <h3 style={{marginLeft: '100px', marginTop: '50px', marginBottom: '30px', color:"gold"}}>Pharmasist Basic Salary : Rs. 500.00</h3>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td class="form-label" style={{ marginTop: "10px", font: "bold 20px/20px Times New Roman,serif"}}>Doctor Payment</td>
            <td>
              <label className="form-label" htmlFor="doctorPercentage" style={{font: " bold 20px/20px Times New Roman,serif"}}>%</label>
              <select  class="form-select" name="doctorPercentage" onChange={handleChangeDoc}>
                <option value="1">select</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </td>
            <td>
              <label class="form-label" htmlFor="doctorSalary" style={{font: " bold 20px/20px Times New Roman,serif"}}>Calculated Salary</label>
              <input class="form-control" type="text" name="doctorSalary" value={salary.doctorSalary} disabled={true} />
            </td>
          </tr>

          <tr>
            <td class="form-label" style={{ marginTop: "10px", font: "bold 20px/20px Times New Roman,serif"}}>Chemist Payment</td>
            <td>
              <label className="form-label" htmlFor="chemistPercentage" style={{font: " bold 20px/20px Times New Roman,serif"}}>%</label>
              <select  class="form-select" name="chemistPercentage" onChange={handleChangeChem}>
                <option value="1">select</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </td>
            <td>
              <label class="form-label" htmlFor="chemistSalary" style={{font: " bold 20px/20px Times New Roman,serif"}}>Calculated Salary</label>
              <input class="form-control" type="text" name="chemistSalary" value={salary.chemistSalary} disabled={true} />
            </td>
          </tr>

          <tr>
            <td class="form-label" style={{ marginTop: "10px", font: "bold 20px/20px Times New Roman,serif"}}>Pharmasist Payment</td>
            <td>
              <label className="form-label" htmlFor="pharmasistPercentage" style={{font: " bold 20px/20px Times New Roman,serif"}}>%</label>
              <select  class="form-select" name="pharmasistPercentage" onChange={handleChangePharm}>
                <option value="1">select</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </td>
            <td>
              <label class="form-label" htmlFor="pharmasistSalary" style={{font: " bold 20px/20px Times New Roman,serif"}}>Calculated Salary</label>
              <input class="form-control" type="text" name="pharmasistSalary" value={salary.pharmasistSalary} disabled={true} />
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              <Button variant="outline-primary" onClick={saveSalary}>Pay</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    







    </div>

    

  );
};

export default Payment;