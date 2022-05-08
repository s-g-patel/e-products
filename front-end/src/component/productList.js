import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        getProducts();
    },[]);

    const getProducts = async() =>{
        let result = await fetch('http://localhost:5000/getProducts');
        result = await result.json();
        setProducts(result);
        console.log("products",products);
    } 

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: 'Delete'
        });

        result = await result.json();
        if(result){
            getProducts();
            alert("Prodcut deleted suscfully..")
        }
    }

    const searchHandler = async(e) =>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/product/search/${key}`)
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }

    return(
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-box" onChange={searchHandler}  placeholder="Search Product"/>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Action</li>
            </ul>
            {
                products.map((item, index) =>
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>$ {item.price}</li>
                    <li>{item.category}</li>
                    <li>
                        <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/" + item._id}>Edit</Link>    
                    </li>
                </ul>
                )
            }
        </div>
    );
}

export default ProductList;