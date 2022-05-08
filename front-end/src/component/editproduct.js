import React,{useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () =>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error , setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() =>{
        getPoductItem();
    },[0])

    const getPoductItem = async() => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
        console.log(result)
    }

    const editPoductItem = async() => {
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type' : 'application/json'
            },
        });

        result = await result.json();
        navigate('/');

    }

    return (
        <div className="product">
            <h1 >Edid Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name"></input>
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price"></input>
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Product Category"></input>
            {error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Product Company"></input>
            {error && !company && <span className="invalid-input">Enter valid company</span>}
            <button className="appbutton" onClick={editPoductItem} type="button">Edit product</button>
        </div>  
    );
}

export default EditProduct;