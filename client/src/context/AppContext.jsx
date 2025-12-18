/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const CART_STORAGE_KEY = "greencart_cart";

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState(() => {
        try {
            const raw = localStorage.getItem(CART_STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : {};
            return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
        } catch {
            return {};
        }
    });
    const [searchQuery, setSearchQuery] = useState("");

    //Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get("/api/seller/is-auth")
            if(data.success){
                setIsSeller(true);
            }
            else
            {
                setIsSeller(false);
            }
        }
        catch (error) {
            console.log(error);
            setIsSeller(false);
        }
    }


    //Fetch User Auth Status , User Data and Cart Items
    const fetchUser = async () => {
        try{
            const {data} = await axios.get("/api/user/is-auth")
            if(data.success){
                setUser(data.user);
                // Prefer server cart when logged in
                setCartItems(data.user?.cartItems ?? {});
            }
        }
        catch (error)
        {
            console.log(error);
            // Not logged in is normal on reload; don't wipe cart or spam a toast
            setUser(null);
        }
    }
        
    //Fetch All Products
    const fetchProducts = async ()=> {
        try {
            const {data} = await axios.get("/api/product/list")
            if(data.success){
                setProducts(data.products);
            }
            else
            {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    //Add Product to Cart
    const addToCart = (itemId)=> {
        if (!itemId) return;
        let cartData = structuredClone(cartItems || {});
        if (!cartData || typeof cartData !== "object") cartData = {};

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    }

    //Update Card Item Quantity
    const updateCartItem = (itemId, quantity) => {
        if (!itemId) return;
        let cartData = structuredClone(cartItems || {});
        if (!cartData || typeof cartData !== "object") cartData = {};
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }

    //Remove Product From Cart
    const removeFromCart = (itemId) => {
        if (!itemId) return;
        let cartData = structuredClone(cartItems || {});
        if (!cartData || typeof cartData !== "object") cartData = {};
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCartItems(cartData);
    }
    //Get Cart Item Count
    const getCartCount = ()=> {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //Get Cart Total Amount
    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            const itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items] > 0 && itemInfo)
            {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) /100;
    }
    useEffect(() => {
        fetchSeller();
        fetchProducts();
        fetchUser();
    }, [])

    // Persist cart locally so it survives refresh (guest + logged-in)
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch {
            // ignore storage errors
        }
    }, [cartItems])

    //upate database cart items
    useEffect(() => {
        const updateCart = async () => {
            try{
                await axios.post("/api/cart/update", {cartItems})
            }
            catch {
                // Don't toast on every keystroke/click; keep UI smooth
            }
        }
        if(user){
            updateCart();
        }
    },[cartItems, user])

    const value = {navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts
    }
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
    return useContext(AppContext)
}