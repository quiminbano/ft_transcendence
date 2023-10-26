import "./PickAGame.css";

interface GameToPickProps {
	url: string;
	selectGame: (value: number) => void;
	type: number;
	gameId: number;
}
interface PickGameProps {
	setGameType: (value: number) => void;
	gameId: number;
}

export const PickAGame = ({ setGameType, gameId } : PickGameProps) : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<h3>Pick a game</h3>
				<div className="d-flex align-items-center justify-content-center m-auto flex-wrap">
					{
						fakeGameData.map((data, i) =>
							<GameToPick gameId={gameId} url={data.url} key={i} selectGame={setGameType} type={i}/>)
					}
				</div>
			</div>
		</div>
	);
};

const GameToPick = ({ url, selectGame, type, gameId } : GameToPickProps) : JSX.Element => {
	return (
		<div onClick={() => {
			selectGame(type);
		}} >
			<div className={`pick-game pick-${type} challenge-game-img ${gameId === type ? "game-active" : ""}`}/>
		</div>
	);
};

const fakeGameData = [
	{
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSNW2OE5vCD1HXHLd5jdgx1vcUVD9n9P1GA&usqp=CAU",
		name: "Super Mario",
	},
	{
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYnG__WxtelViPqbxxsvzRkV6HjYRZhvpXQ&usqp=CAU",
		name: "Snake",
	},
	{
		url: "https://i.pinimg.com/1200x/a0/37/00/a037000daeae56905fd5c3685687b361.jpg",
		name: "tetris",
	}
];
