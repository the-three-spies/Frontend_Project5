import './setImages.css'
// hrer we will show the Fitrat insan project by using image grid 
const SetImages =() =>{
    return (
        <div className='image_grid'>
            <img className='image_grid_col_2 image_grid_row_2' src='https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png' alt='smthg wrong'/>
            <img className='image_padding' src='https://images.pexels.com/photos/271168/pexels-photo-271168.jpeg?auto=compress&cs=tinysrgb&w=600' alt='smthg wrong'/>
            <img className='image_padding' src='https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png' alt='smthg wrong'/>
            <img className='image_padding' src='https://images.pexels.com/photos/271168/pexels-photo-271168.jpeg?auto=compress&cs=tinysrgb&w=600' alt='smthg wrong'/>
            <img className='image_padding' src='https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png' alt='smthg wrong'/>
        </div>
    )
}
export default SetImages;

//here its simple in html .. we've div container "image_grid"
//then we specify every single img ..> we need five imgs
    //now with css