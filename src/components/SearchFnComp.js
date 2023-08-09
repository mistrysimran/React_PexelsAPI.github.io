import React, { useState } from "react";
import axios from 'axios';
import ImageFnComp from "./ImagesFnComp";

const SearchFnComp = () => {

    const [pics, setPics] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loader, setLoader] = useState(false);

    //to retrieve input field value, which will be the keyword for the api
    const inputHandle = (e) => {
        setKeyword(e.target.value);
    }

    const searchImages = async (e) => {

        e.preventDefault(); //to prevent browser default actions

        //this is basically used to show the user that the loading has begun(indirectly)
        //while it's true, it will fetch the data.
        setLoader(true);

        //axios.get(url,config) here config = header:authorization
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${keyword}&per_page=16&page=1`,
            {
                headers:
                {
                    Authorization: `bQpzOfjalOl2qK4D74XpIlHXTGbmaOZwc64yke7Cpq2lGYPpuOSY4ktP`
                }
            }
        );

        //loader is set to false as the fetching is done now.
        setLoader(false);
        setPics(res.data.photos); //data is an inbuilt axios var
    }

    return (
        <>
            <div className="container-fluid text-center mt-4 cont">
                <h1>PicAboO</h1>

                <form onSubmit={searchImages}>

                    <input type="text" className="w-50 border border-2 p-2"
                        onChange={inputHandle}
                        value={keyword}
                        placeholder="Browse Images.."
                    />
                    <button type="submit" className="border border-2 bg-white p-2"><i className="fa fa-search"></i></button>
                </form>

                <div className="row g-3 m-2">
                    {
                        loader ?    //if true, i.e. if still fetching data, show loading..
                            (
                                // <h1>Loading...</h1>
                                <div class="d-flex justify-content-center align-items-center">
                                    <h2>Loading...</h2>
                                    <div class="spinner-border" role="status" aria-hidden="true"></div>
                                </div>
                            ) : //else show pics
                            (
                                pics.map((img) => <ImageFnComp image={img} id={img.id} />)
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default SearchFnComp;