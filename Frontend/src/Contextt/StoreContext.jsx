import { createContext , useEffect, useState} from "react";
//import { food_list } from "../assets/assets";
import { use } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider=(props)=>{

    const [cartitem, setcartitem]=useState({});
    const url ='http://localhost:4000'
    const [token, settoken] = useState("")
    const [food_list, setfoodlist] = useState([]);

    const addtocart= async (itemId)=>{
        setcartitem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Only update the selected item
        }));
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removefromcart = async (itemId)=>{
        setcartitem((prev) => {
            if (!prev[itemId]) return prev; // If item doesn't exist, return unchanged state
    
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 0) {
                updatedCart[itemId] -= 1; // Decrease count but don't remove other items
            }
            return updatedCart;
        });
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const gettotalcartamount=()=>{
        let totalamount=0;
        for(const item in cartitem){
            if(cartitem[item]>0){
                let iteminfo = food_list.find((product)=>product._id===item);
                totalamount+= iteminfo.price * cartitem[item];
            }
        }
        return totalamount;
    }
    const fetchfoodlist = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setfoodlist(response.data.data);
    }

    const loadcartdata = async(token) =>{
         const response =  await axios.post(url+"/api/cart/get",{},{headers:{token}});
         setcartitem(response.data.cartData);
    }

      useEffect(()=>{
       
        async function loaddata(){
            await fetchfoodlist();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"))
                await loadcartdata(localStorage.getItem("token"));
            }
        }
        loaddata();
    },[])

    

    const contextValue= {
        food_list,
        setfoodlist,
        cartitem,
        setcartitem,
        addtocart,
        removefromcart,
        gettotalcartamount,
        url,
        token,
        settoken
    }
  

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;