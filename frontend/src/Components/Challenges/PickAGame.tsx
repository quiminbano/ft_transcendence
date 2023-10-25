import "./PickAGame.css";

interface GameToPickProps {
	url: string;
}

export const PickAGame = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<h3>Pick a game</h3>
				<div className="border d-flex align-items-center justify-content-center m-auto">
					{
						fakeGameData.map((data, i) => <GameToPick url={data.url} key={i} />)
					}
				</div>
			</div>
		</div>
	);
};

const GameToPick = ({ url } : GameToPickProps) : JSX.Element => {
	return (
		<div>
			<img className="challenge-game-img" alt="game to pick"/>
		</div>
	);
};

const fakeGameData = [
	{
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSNW2OE5vCD1HXHLd5jdgx1vcUVD9n9P1GA&usqp=CAU",
		name: "Super Mario"
	},
	{
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYnG__WxtelViPqbxxsvzRkV6HjYRZhvpXQ&usqp=CAU",
		name: "Snake"
	},
	{
		url: "https://i.pinimg.com/1200x/a0/37/00/a037000daeae56905fd5c3685687b361.jpg",
		name: "tetris"
	}
];
