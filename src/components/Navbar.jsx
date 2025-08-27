import React, { useEffect } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom"; 

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Products', path: '/products' },
        { name: 'Contact', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount} = useAppContext()

    const navLinksMobile = [
        { name: 'Home', path: '/' },
        { name: 'All Products', path: '/products' },
        ...(user ?
          [{ name: 'My Orders', path: '/products' }] : []),
          { name: 'contact', path: '/' },
    ];

    const logout = async () => {
      setUser(null);
      navigate('/')
    }

    useEffect(() => {
        if(searchQuery.length > 0){
            navigate("/products")
        }

    },[searchQuery])


    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 bg-[#B0DB9C] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-sm py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-8">
                <div className="hidden lg:flex items-center text-sm gap-2 border border-black px-3 rounded-full">
                    <input onChange={(e) => {setSearchQuery(e.target.value)}} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="" />
                </div>
                <div onClick={()=> navigate('/cart')} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-black w-[18px] h-[18px] rounded-full hover:cursor-pointer">{getCartCount()}</button>
                </div>
                {!user ? (<button className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 hover:cursor-pointer hover:bg-gray-700"
                onClick={() => setShowUserLogin(true)}>
                    Login
                </button>) :
                (
                <div className='relative group'>
                  <img src={assets.profile_icon} className='w-10' alt="" />
                  <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 
                  w-30 rounded-md text-sm z-40'>
                    <li onClick={()=> navigate("myOrders")} className='p-1.5 pl-3 hover:bg-[#B0DB9C]/30 cursor-pointer'>My Orders</li>
                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-[#B0DB9C]/30 cursor-pointer'>Logout</li>
                  </ul>
                </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                
                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                <button className="absolute top-4 right-4" onClick={() => {setIsMenuOpen(false)
                    setShowUserLogin(true)
                }
                }>
                    <img src={assets.menu_icon} alt="menu icon" />
                </button>

                {navLinksMobile.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {!user ?
                    <button onClick={() => {setIsMenuOpen(false);
                      setShowUserLogin()
                    }} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>:
                    <button onClick={logout} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Logout
                    </button>}
            </div>
        </nav>
    )
}

export default Navbar