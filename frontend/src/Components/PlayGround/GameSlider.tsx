import "./GameSlider.css";
import { useState } from "react";

export const GameSlider = () : JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		const index = currentIndex + 1 < 3 ? currentIndex + 1 : 0;
		setCurrentIndex(index);
		console.log(index);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-6 offset-3 slider-box">
					<div className="gallery-container border border-success">
						<img alt="pic" src={data[currentIndex % 3].name} className={`slider-img slider-image-${currentIndex % 3}`}/>
						<img alt="pic" src={data[(currentIndex + 1) % 3].name} className={`slider-img slider-image-${(currentIndex + 1) % 3}`}/>
						<img alt="pic" src={data[(currentIndex + 2) % 3].name} className={`slider-img slider-image-${(currentIndex + 2) % 3}`}/>
					</div>
				</div>
				<button onClick={() => setCurrentIndex(currentIndex === 0 ? 2 : currentIndex - 1)}>Previous</button>
				<button onClick={() => nextSlide()}>Next</button>
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
