import React from 'react';
import { useHistory } from 'react-router';
import Login from '../Login/Login';
import { Button } from 'react-bootstrap';

const Product = (product) => {
    const history = useHistory();
   const onNavigateLogin=()=>{
       history.push("/login");
   }

    return (
        <div className="col-md-4">
            <img style={{height:'300px'}} src={product.imageURL} alt=""/>
            <h3>{product.name}</h3>           
            <Button variant="primary" onClick={onNavigateLogin}>Buy Now</Button>{' '}
            
        </div>
    );
};

export default Product;