import { createContext , useEffect, useState} from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider=(props)=>{

    const [cartitem, setcartitem]=useState({});
    
    const addtocart=(itemId)=>{
        setcartitem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Only update the selected item
        }));
    }

    const removefromcart = (itemId)=>{
        setcartitem((prev) => {
            if (!prev[itemId]) return prev; // If item doesn't exist, return unchanged state
    
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 0) {
                updatedCart[itemId] -= 1; // Decrease count but don't remove other items
            }
            return updatedCart;
        });
    }

    useEffect(()=>{
        console.log(cartitem)
    },[cartitem])
    

    const contextValue= {
        food_list,
        cartitem,
        setcartitem,
        addtocart,
        removefromcart
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;