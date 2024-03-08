import {  useEffect, useLayoutEffect, useState } from "react";
import { useFetch } from "../state/useFetch";
import { useNavigate}from"react-router-dom"
import {gsap} from"gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Link}from"react-router-dom"

function Home() {
    const navigate=useNavigate()
    const {post,isError,isLoading}=useFetch('https://api.jikan.moe/v4/anime?limit=20')
    
    gsap.registerPlugin(ScrollTrigger)
    useLayoutEffect(()=>{
        const ctx=gsap.context(()=>{
            const card=gsap.utils.toArray('.card').forEach(el=>{
                gsap.to(el,{y:-100,scrollTrigger:{
                    trigger:el,
                    scrub:1,
                    start:'top top',
                }})
            })
         
        },'.cards-container')
        return()=> ctx.revert()
    },[])
    const handleSearch=(e)=>{
        const value=e.target.value;
        console.log(value,e)

        if(e.key==="Enter"){

            if(value!==''){
                navigate(`/search/${value}`)
            }
        }
       
    }
    return <>
    <div className="container-fluid p-3">
        <div className="vh-100 d-flex">
            <div className="w-50 d-flex flex-column text-center m-auto justify-content-center">
                <h1> Anime collection<br /> (My anime list)</h1>
                <input onKeyDown={handleSearch} type="search" className="form-control my-2 p-3 bg-body rounded"placeholder="Search anime" />
            </div>
        </div>

        {isLoading&&<div className="d-flex p-2"><div className="m-auto"><div className="loader"></div></div></div>}

        {/* All anime */}
        {post!==null&&<>
        <div className="d-flex justify-content-between">
            <h2><span className="bg-dark p-2 px-3 text-light">#</span> All Anime </h2>
            <i className="bi bi-arrow-right px-3 fs-3 bg-dark text-light"onClick={()=>{navigate('/category')}}></i>
        </div>
        <hr />
        <div className="mb-4 cards-container">
        {post.data.map(e=>{
            return <Link to={`/animeDetail/${e.mal_id}`}className="border card"key={e.mal_id}>
                <div className="w-100 "style={{height:'300px'}}>
                    <img src={e.images.webp.large_image_url} alt=""className=" object-fit-cover h-100 w-100" />
                </div>
                <div className="card-body">
                    <b>{e.title}</b>
                    <span className="py-2 d-block">{e.rating}</span>
                </div>
            </Link>
        })}
        </div>

        </>}

    </div>
    <div className=" d-flex bg-dark" style={{height:'50vh'}}>
            <div className="w-50 d-flex flex-column text-center text-light m-auto justify-content-center">
                <h1>Fix Anime Guild From <br /> My anime list</h1>
                <p className=" my-2">
                © 2024 Fix Anime Guild. All rights reserved. <br />
                Privacy Policy | Terms of Use | Contact Us

                </p>
            </div>
        </div>
    </>
    
    
}
export default Home
