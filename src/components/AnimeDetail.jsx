import { useParams } from "react-router-dom";
import { useFetch } from "../state/useFetch";
import {Link}from"react-router-dom"
function AnimeDetail() {
    const {animeID}=useParams()
    const url=`https://api.jikan.moe/v4/anime/${animeID}/full`;
    const {post,isLoading,isError}=useFetch(url)
    console.log(post)
    return <>
    {isLoading&&<div className="vh-100  d-flex"><div className="m-auto"><div className="loader"></div></div></div>}
    {isError&&<div className="vh-100  d-flex">
      <p className="m-auto">Something went wrong.</p>
    </div>}

      {post!==null
      &&<>
        <div className="container border">

          <div className="row p-2">
            <div className="col-md-2"style={{maxHeight:"200px"}}>
              <img src={post.data.images.webp.large_image_url} alt=""className=" object-fit-contain h-100 w-100" />
            </div>

            <div className="col-md-10 py-2 d-flex flex-column">
                <h1> {post.data.title}</h1>
                <div className="cards-container">

                  

                  <div className="p-2 d-flex flex-column">
                    <span><b>Rating : </b> {post.data.rating}</span>
                    <span><b>Rank : </b> {post.data.rank}</span>
                    <span><b>Favorites : </b>{post.data.favorites}</span>
                    <span><b>Source : </b> {post.data.source}</span>
                    <span><b>Status : </b>{post.data.status}</span>
                  </div>


                  

                  <div className="p-2 d-flex flex-column">
                    <span><b>Members : </b>{post.data.members}</span>
                    <span><b>Popularity : </b>{post.data.popularity}</span>
                    <span><b>Score : </b>{post.data.score}</span>
                    <span><b>Scored_by : </b>{post.data.scored_by}</span>
                    <span><b>Season : </b>{post.data.season}</span>
                  </div>

                  <div className="p-2 d-flex flex-column">
                    <span><b>Title_english : </b>{post.data.title_english}</span>
                    <span><b>Title_japanese : </b>{post.data.title_japanese}</span>
                    <span><b>Aired : </b>{post.data.aired.string}</span>
                    <Link to={post.data.url} className="btn btn-primary my-2 border">Watch on MyanimeList</Link>
                  </div>

                </div>
               
            </div>
          </div>

          <div className="row p-2">
           
            <div className="col-md-6">
                <h1>Synopsis</h1>
                <p>
                  {post.data.synopsis}
                </p>
            </div>

            <div className="col-md-6 p-2 bg-dark d-flex">
              {post.data.trailer.embed_url!==null
              ? <a 
              href={post.data.trailer.embed_url} 
              className="w-50  m-auto d-flex rounded border trailer-link" style={{background:`url(${post.data.trailer.images.medium_image_url})`}}>
                <div className="m-auto fs-1  border border-dark rounded-2 px-2 text-light ">
                  <i className="bi bi-play"></i>
                </div>
              </a>
              : <div className="m-auto text-light">Video is not found</div>
              }
             
            
            </div>

          </div>

           
        </div>
       </>}
    </>;
}

export default AnimeDetail;