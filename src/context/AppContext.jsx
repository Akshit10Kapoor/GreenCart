import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY || '$'; // Fixed env variable access
    const navigate = useNavigate()
    const [user, setUser] = useState(null); // Fixed naming consistency
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] += 1
        }
        else{
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("Added To Cart")
    }

    const updateCart = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        if(quantity > 0) {
            cartData[itemId] = quantity;
        } else {
            delete cartData[itemId]
        }
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    const removeProductCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] -= 1
            if(cartData[itemId] === 0){
                delete cartData[itemId]
            }
        }
        setCartItems(cartData)
        toast.success("Removed From Cart")
    }

    const getCartCount = ()=> {
        let count = 0;
        for(const item in cartItems){
            count+=cartItems[item]
        }
        return count;
    }

    const getCartAmt = ()=> {
        let amt = 0;
        for(const items in cartItems){
            let info = products.find((product)=>product._id === items)
            if(cartItems[items] >0){
                amt += info.offerPrice * cartItems[items]
            }
        }
        return Math.floor(amt * 100)/100;
    }
   
    useEffect(() => {
        fetchProducts()
    }, [])

    const value = {
        navigate, 
        user, 
        setUser, // Fixed naming
        isSeller, 
        setIsSeller, 
        showUserLogin, 
        setShowUserLogin, 
        products, 
        currency,
        addToCart, 
        updateCart, 
        removeProductCart, // Added missing function
        cartItems, 
        setCartItems,
        searchQuery,
         setSearchQuery,
         getCartAmt,
         getCartCount
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}