import "./GameSlider.css";
import { useState } from "react";

export const GameSlider = () : JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		const index = currentIndex + 1 < data.length ? currentIndex + 1 : 0;
		setCurrentIndex(index);
	};
	const previousSlide = () => {
		const index = currentIndex - 1 < 0 ? data.length - 1 : currentIndex - 1;
		setCurrentIndex(index);
	};

	return (
		<div className="row h-100">
			<div className="col-12 d-flex justify-content-center align-items-center">
				<div className="row sliderbox">
					<div className="col-6 col-sm-2 order-1 order-md-0">
						<button className="slide-button" onClick={() => previousSlide()}>
							<img alt="Next slide" className="previous-slide-button" src="https://img.icons8.com/?size=50&id=26138&format=png" />
						</button>
					</div>
					<div className="col-12 col-sm-6 offset-sm-1 order-0 order-sm-1">
						<div className="gallery-container">
							<img alt="pic" src={data[1].name} className={`slider-img slider-image-${(currentIndex + 1) % 3}`}/>
							<img alt="pic" src={data[0].name} className={`slider-img slider-image-${currentIndex % 3}`}/>
							<img alt="pic" src={data[2].name} className={`slider-img slider-image-${(currentIndex + 2) % 3}`}/>
						</div>
					</div>
					<div className="col-6 col-sm-2 offset-md-1 order-2">
						<button className="slide-button" onClick={() => nextSlide()}>
							<img alt="next slide" src="https://img.icons8.com/?size=50&id=26138&format=png"/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const data = [
	{
		name: "https://www.imaginarycloud.com/blog/content/images/2019/02/Pong.jpg"
	},
	{
		name: "https://people.com/thmb/cK_RpydkLMmjxyqe3vOqksRVXuI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x207:721x209)/super-mario-bros-2026fec1a6fc4e1fbbe6f0bbb3adedab.jpg"
	},
	{
		name: "https://i.ytimg.com/vi/VrKv5LnoCE0/maxresdefault.jpg"
	}
];
