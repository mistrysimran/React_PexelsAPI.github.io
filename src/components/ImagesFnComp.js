

const ImageFnComp = (props)=>{

    const {image} = props;
    console.log(image);

    return(
        <>
            <div className="col-md-3">
                <img src={image.src.portrait} alt="Not Found" className="img-fluid" />
            </div>
        </>
    );
}

export default ImageFnComp;