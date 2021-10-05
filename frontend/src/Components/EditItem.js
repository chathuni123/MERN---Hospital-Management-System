import React,{Component} from "react"
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios"
import "./PFoarm.css"
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "react-bootstrap";
import { Image } from "cloudinary-react";



const initialstate = {
    _id: '',
    MediName: '',
    Amount: '',
    Cost: '',
    CompanyName:'',
    ManuDate:'',
    ExpireDate:''

}

export default class EditItem extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialstate;
        this.state = {
            Items: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`http://localhost:6500/item/get/${this.props.match.params.id}`)
            .then((response) => {


                this.setState({ Items: response.data, MediName: response.data.MediName });
                console.log(response.data);
                console.log(response.data.fitem.MediName);

                this.setState({ MediName: response.data.fitem.MediName })
                this.setState({ Amount: response.data.fitem.Amount })
                this.setState({ Cost: response.data.fitem.Cost })
                this.setState({ CompanyName: response.data.fitem.CompanyName })
                this.setState({ ManuDate: response.data.fitem.ManuDate })    
                this.setState({ ExpireDate: response.data.fitem.ExpireDate })    
            })
            .catch(function (error) {
                alert('error in get Items to edit');
                console.log(error);
            })

    }




    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;

        let Item = {
            MediName: this.state.MediName,
            Amount: this.state.Amount,
            Cost: this.state.Cost,
            CompanyName: this.state.CompanyName,
            ManuDate:this.state.ManuDate,
            ExpireDate:this.state.ExpireDate

        }
        console.log('Data', Item);

        axios.put(`http://localhost:6500/item/update/${id}`, Item)
            .then(response => {
                alert('Item updated successfully')
                window.location = "/pharmacist/stock";
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }


    render() {
        return (
            <div  className="item-edit-container">
            <Pharmacist_Navbar/>
            <div className="item-edit-container"> 
                <br/>
                <div className="item-edit-form">
                <div className="rowEditItem">
                 <div className="column1EditItem">
                 <h4 align="middle">Edit Item</h4>
                <form onSubmit={this.onSubmit} className="container">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label"> Medicine Name</label>
                        <input type="text"
                            className="form-control"
                            id="MediName"
                            name="MediName"
                            placeholder=""
                            required
                            value={this.state.MediName}
                            onChange={this.onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Amount</label>
                        <input type="Number"
                            className="form-control"
                            id="Amount"
                            name="Amount"
                            placeholder=""
                            required
                            value={this.state.Amount}
                            onChange={this.onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Cost</label>
                        <input type="Number"
                            className="form-control"
                            id="Cost"
                            name="Cost"
                            placeholder=""
                            required
                            value={this.state.Cost}
                            onChange={this.onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Company Name</label>
                        <input type="text"
                            className="form-control"
                            id="CompanyName"
                            name="CompanyName"
                            placeholder=""
                            required
                            value={this.state.CompanyName}
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label for="mDate">Manufactured Date</label>    
                    <DatePickerComponent className="form-control"
                                    id="ManuDate"
                                    name="ManuDate"
                                    placeholder=""
                                    value={this.state.ManuDate}
                                    onChange={this.onChange} 
                                    style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
                                    required/>
                    </div> <br/>   
                    <div>
                    <label for="eDate" >Expiry Date</label>    
                    <DatePickerComponent className="form-control"
                                    id="ExpireDate"
                                    name="ExpireDate"
                                    placeholder=""
                                    value={this.state.ExpireDate}
                                    onChange={this.onChange}
                                    style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
                                    required />
                    </div> <br/>   
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                </form>
                <br />
                </div>
                <div className="column2EditItem">
                    <div className="imagecolumncontainer">
                  <Image className="editItimg"
                  cloudName="/dzvbjfdsz" publicId=""
                  />
                  </div> 
                        
                    
                </div>
</div>

            </div>
            </div></div>
        )
    }

}




// //FUnction component

// function EditItem(e){
//     let[MediName,setMediName] = useState("");
//     let[Amount,setAmount] = useState("");
//     let[Cost,setCost] = useState("");
//     let[CompanyName,setCompanyName] = useState("");
//     const item_id = useParams();
    

//     useEffect(()=>{
//         function getItem(){
//            console.log(item_id.id);
           
//             axios.get(`http://localhost:6500/item/get/${item_id.id}`).then((res)=>{
               
//                 setMediName(res.data.fitem.MediName)
//                 setAmount(res.data.fitem.Amount)
//                 setCost(res.data.fitem.Cost)
//                 setCompanyName(res.data.fitem.CompanyName)
//                 //const newItem = {Medi_Name,Amount,Cost,Company_Name}
//                 //console.log(newItem)
               

//             }).catch((err)=>{
//                 alert(err.message)
//                 console.log(err)
//             })
//         }
    
//         getItem();
        
//     })
    
//         function UpdateItem(e){
//             e.preventDefault();
           
//             const updatedItem = {MediName,Amount,Cost,CompanyName}
//             console.log(updatedItem)
    
//             axios.put(`http://localhost:6500/item/update/${item_id.id}`,updatedItem).then(()=>{
//                 console.log(updatedItem)
//                 alert("Item Updated")
               
               
//             }).catch((err)=>{
//                 alert(err)
//             })
//         }
   

// return(
//     <div className="container">
//              <Pharmacist_Navbar/>
//              <h4>Edit Item</h4>
//             <form onSubmit={UpdateItem}>
//                 <div className="form-group">
//                 <label for="drugName">Medicine Name</label>
//                 <input type="text" class="form-control" id="drugName" required placeholder="Enter the drug name" value={MediName}
//                 onChange={(e)=>{
//                     setMediName(e.target.value);
//                 }}/>
//                 </div>
//                 <div className="form-group">
//                 <label for="Amount">Amount</label>
//                 <input type="number" className="form-control" id="Amount" required  placeholder="Enter Amount" defaultValue={Amount}
//                  onChange={(e)=>{
//                     setAmount(e.target.value);
//                 }}/>
//                 </div>
//                 <div className="form-group">
//                 <label for="cost">Cost</label>
//                 <input type="number" className="form-control" id="cost" required placeholder="Enter Cost" defaultValue={Cost}
//                  onChange={(e)=>{
//                     setCost(e.target.value);
//                 }}/>
//                 </div>
//                 <div className="form-group">
//                 <label for="Cname">Company Name</label>
//                 <input type="text" className="form-control" id="Cname" required placeholder="Enter Company Name" defaultValue={CompanyName}
//                  onChange={(e)=>{
//                     setCompanyName(e.target.value);
//                 }}/>
//                 </div>
  
//                 <button type="submit" className="btn btn-primary">Update</button>
//             </form>
//                     </div>
// )
// }
// export default EditItem;