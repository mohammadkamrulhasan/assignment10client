import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';



const Home = () => {
    const [products, setProducts]=useState([]);

    useEffect(()=>{
        fetch('https://obscure-cliffs-83724.herokuapp.com/products')
        .then(res=>res.json())
        .then (data=>setProducts(data))
        // .then (data=>console.log(data))
    },[])
    return (
        <div className="row">
            {
                products.map(product=><Product product={product} ></Product>)
            }
        </div>
    );
};

export default Home;