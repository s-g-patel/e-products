import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error , setError] = useState(false);
    const navigate = useNavigate();

    const addProductItem = async() =>{
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch('http://localhost:5000/addProduct',{
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                'Content-Type' : 'application/json'
            },
        });

        result = await result.json();
        setError(false);
        navigate('/');
    }
    return (
        <div className="product">
            <h1 >Add new Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name"></input>
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price"></input>
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Product Category"></input>
            {error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Product Company"></input>
            {error && !company && <span className="invalid-input">Enter valid company</span>}
            <button className="appbutton" onClick={addProductItem} type="button">Add new product</button>
        </div>  
    );
}

export default AddProduct;