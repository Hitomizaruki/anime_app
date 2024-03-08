import { useState } from "react";
import { useFetch } from "../state/useFetch";
import {Link}from"react-router-dom"
function Category() {
    const [page,setPage]=useState(1)
    const sort=[
        {
            type:'All anime',
            url:'https://api.jikan.moe/v4/anime',    
        },
        {
            type:'Top anime',
            url:'https://api.jikan.moe/v4/top/anime',    
        },
        {
            type:'onGoing anime',
            url:'https://api.jikan.moe/v4/seasons/now',    
        },
        {
            type:'schedules',
            url:'https://api.jikan.moe/v4/schedules',    
        }
    ]
    const [genera,setGenera]=useState(sort[0].url)

    const {post,isLoading,isError}=useFetch(`${genera}?page=${page}`)
   
    return<div className="p-3">
    {isLoading&&<div className="vh-100  d-flex"><div className="m-auto"><div className="loader"></div></div></div>}
    {isError&&<div className="vh-100  d-flex">
      <p className="m-auto">Something went wrong.</p>
    </div>}
    {post!==null&&<>
        <h2><span className="bg-dark  p-3 text-light ">#</span> Anime </h2>
        <hr />
        <div className="btn-group mb-3 ">
            {sort.map((e,index)=>{
                return <button
                key={index} 
                className={`btn border ${genera===e.url?'btn-dark text-light':'btn-body'} me-2 rounded-5`}
                onClick={()=>{
                    setGenera(e.url)
                    setPage(1)
                }}>
                    {e.type}
                </button>
            })} 
        </div>
        <div className=" cards-container">
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
        <div className="my-3 d-flex justify-content-center">

            {/* preview page */}
            <button 
            disabled={page===1?true:false} 
            className="btn text-light  btn-dark border  me-2 rounded-5"
            onClick={()=>{setPage(param=>param-=1)}}>
                <i className="bi bi-arrow-left"></i>
            </button>

            {/* next page */}
            <button
            disabled={page===post.pagination.last_visible_page?true:false}
            className="btn text-light  btn-dark border  me-2 rounded-5"
            onClick={()=>{setPage(param=>param+=1)}}>
                <i className="bi bi-arrow-right"></i>
            </button>
        </div>
        </>}
    </div>
}

export default Category;