import './ourValues.css'

const OurValues =()=>{
    return(
        <div className='ourValues_wrapper'>
            <h2>Our Values</h2>
            <div className='ourValues_line'></div>
            <div className='single_value'>
                <div className='circle_img_ourvalue'><img src='https://pledgeling-res.cloudinary.com/image/upload/c_lpad,h_144,w_144/v1/shared/about/values/authenticity.png'></img></div>
                <span></span>
                <h3>Trust</h3>
                <p>We believe that we can create and strengthen trust through transparency and in clear and demonstrable impact.</p>
            </div>
            <div className='single_value'>
                <div className='circle_img_ourvalue'><img src='https://pledgeling-res.cloudinary.com/image/upload/c_lpad,h_144,w_144/v1/shared/about/values/care.png'></img></div>
                <span></span>
                <h3>Care</h3>
                <p>We strive to be thoughtful, compassionate, and generous as a team and through our collective actions.</p>
            </div>
            <div className='single_value'>
                <div className='circle_img_ourvalue'><img src='https://pledgeling-res.cloudinary.com/image/upload/c_lpad,h_144,w_144/v1/shared/about/values/trust.png'></img></div>
                <span></span>
                <h3>Community</h3>
                <p>We think globally and act locally. We recognize the role we play in serving our local communities, while also working toward the betterment of our world.</p>
            </div>
        </div>
    )
}
export default OurValues
