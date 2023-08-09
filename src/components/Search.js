import React from "react";
import axios from "axios";
import Images from "./Images";

class Search extends React.Component {

    state = {                           //is it built-in object? or can we specify custom name?
        keyword: "",
        photos: [],
        loader: false
    };

    inputHandle = (e) => {
        this.setState({ keyword: e.target.value });
    };

    searchImages = async (e) => {

        e.preventDefault();
        this.setState({ loader: true });        //it's for loading; to show that the loading has started.

        const res = await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=16&page=1`,
            {
                headers: {
                    Authorization: `bQpzOfjalOl2qK4D74XpIlHXTGbmaOZwc64yke7Cpq2lGYPpuOSY4ktP`
                }
            }
        );

        this.setState({ loader: false }); //this is false bcoz, now we have fetched the data and the loading should stop now.
        this.setState({ photos: res.data.photos });  //the data is an inbuilt axios variable.
        console.log(this.state.photos);
    }

    render() {
        return (
            <>
                <div className="d1 mb-3">
                    <h1 className="text-center mb-3">Imagica</h1>
                    {/* <form onSubmit={this.searchImages}>
                    <div className="form-group">
                        <input type="text" name="keyword"
                            className="form-control" value={this.state.keyword}
                            onChange={this.inputHandle}
                            placeholder="Search Images.."                        
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary btn-block"/>
                    </div>
                    </form> */}
                    <form onSubmit={this.searchImages}>
                        <div class="input-group mb-3 inp">
                            <input type="text" class=" border border-secondary  p-2"
                                value={this.state.keyword}
                                onChange={this.inputHandle}
                                placeholder="Browse Images.." />
                            <button class="btn btn-outline-secondary" type="submit"><i className="fa fa-search"></i></button>
                        </div>
                    </form>
                </div>

                <div className="container-fluid mb-3">
                    <div className="row g-3">
                        {
                            !this.state.loader ? (
                                this.state.photos.map((img) => <Images image={img} key={img.id} />)
                            ) : (
                                <h1>Loading...</h1>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Search;