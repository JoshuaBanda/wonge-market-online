"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
    const router = useRouter;
    const [isSearching, setIsSearching] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const handleOnClick = async () => {
        router.push('/Searching');
    };

    return (
        <>
            <div 
                onClick={handleOnClick} 
                        style={{
                position: "relative",
                margin: "80px 60px 10px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{
                    display: "flex",
                    width: "300px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                            borderTopLeftRadius: "30px",
                            borderBottomLeftRadius: "30px",
                }}>
                    <input
                        type="text"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        placeholder="Search..."
                        style={{
                            border: "none",
                            paddingLeft: "20px",
                            width: "80%",
                            height: "40px",
                            borderTopLeftRadius: "30px",
                            borderBottomLeftRadius: "30px",
                            fontSize: "16px",
                            color: "#fff",
                            outline: "none",
                            boxSizing: "border-box",
                            transition: "all 0.3s ease",
                            backgroundColor:'rgba(255,255,255,0.5)',border:'1px solid rgba(0,0,0,0.1)'
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            borderTopRightRadius: "30px",
                            borderBottomRightRadius: "30px",
                            color: "sienna",
                            padding: "10px 15px",
                            cursor: "pointer",
                            fontSize: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "background-color 0.3s ease"
                        }}
                    >
                        <FaSearch size={20} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchBox;
