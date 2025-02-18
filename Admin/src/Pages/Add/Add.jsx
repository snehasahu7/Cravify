import React from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
    const Url = "http://localhost:4000"
  const[image, setimage] = useState(false);
  const[data,setdata] = useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  const onchangehandler=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const onsubmithandler=async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image",image)
    const response = await axios.post(`${Url}/api/food/add`,formData);
    if(response.data.success){
        setdata({
            name:"",
            description:"",
            category:"Salad",
            price:""
    })
    setimage(false);
    toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onsubmithandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
                  <p>Product name</p>
                  <input onChange={onchangehandler} value={data.name} type="text" name="name" placeholder='type here' />
            </div>
            <div className="add-product-description flex-col">
                  <p>Product description</p>
                  <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onchangehandler} name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Cake">Cake</option>
                        <option value="Desserts">Desserts</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                     <p>Product price</p>
                     <input onChange={onchangehandler} value={data.price} type="number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className="add-btn">ADD</button>
        </form>
      
    </div>
  )
}

export default Add
