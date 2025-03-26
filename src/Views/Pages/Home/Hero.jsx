import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Hero = () => {
    return (
        <section className="hero d-flex align-items-center text-center text-md-start">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12 text-center text-md-start mt-5 mt-md-0 mt-lg-0 pt-5 pt-md-0 pt-lg-0">
                        <h1 className="display-5 fw-bold">Discover the Best <span className="text-primary">Anime T-Shirts</span></h1>
                        <p className="lead text-muted">Shop the latest anime-inspired fashion with exclusive designs and premium quality.</p>
                        <a href="#shop" className="btn btn-primary btn-lg">Shop Now</a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 text-center mt-4 mt-md-0">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            modules={[Autoplay]}
                            className="swiper-container"
                        >
                            <SwiperSlide>
                                <img width={"600px"} height={"600px"} src="https://cdn-uploads.gameblog.fr/img/news/429603_64a27d068bae6.jpeg?ver=1" alt="Anime T-Shirt 1" className="img-fluid hero-image" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img width={"600px"} height={"600px"} src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/demon-slayer-every-major-characters-age-height-birthday.jpg" alt="Anime T-Shirt 2" className="img-fluid hero-image" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img width={"600px"} height={"600px"} src="https://i.pinimg.com/736x/84/ac/68/84ac68170c35263700c1faf8a7a123de.jpg" alt="Anime T-Shirt 3" className="img-fluid hero-image" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
