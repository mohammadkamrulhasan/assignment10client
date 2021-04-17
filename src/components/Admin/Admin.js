import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Admin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL]=useState(null);

    const onSubmit = data =>{
        const productsData={
            name:data.name,
            imageURL:imageURL
        }
        const url=`http://localhost:5055/Admin`;
        console.log(productsData)
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(productsData)
        })
        .then(res=>console.log('server side response',res))
    }; 
    const handleImageUpload=products=>{
        console.log(products.target.files[0])
        const imageData=new FormData();
        imageData.set('key','2c149a0ec483611b64cf356b4b0e2a89');
        imageData.append('image', products.target.files[0])
        
        axios.post('https://api.imgbb.com/1/upload', 
            imageData)
          .then(function (response) {
            //   console.log(response.data.data.display_url);
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    return (
        <div> <h1>Add Your Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Product Name</label>
                <br/>
                <input name="name" defaultValue="Rice" type="text" {...register("name")}  />
                <br></br>
                <label htmlFor="">Add Photo</label>
                <br/>
                <input {...register("imageURL", )} type="file" onChange={handleImageUpload}/>
                <br></br>
                <input type="submit" />
            </form>
        </div>
    );
};

export default Admin;