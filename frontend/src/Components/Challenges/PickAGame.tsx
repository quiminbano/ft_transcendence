interface GameToPickProps {
	url: string;
}

export const PickAGame = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<h3>Pick a game</h3>
				{
					fakeGameData.map((data, i) => <GameToPick url={data.url} key={i} />)
				}
			</div>
		</div>
	);
};

const GameToPick = ({ url } : GameToPickProps) : JSX.Element => {
	return (
		<div>
			<img alt="game to pick" src={url}/>
		</div>
	);
};

const fakeGameData = [
	{
		url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSNW2OE5vCD1HXHLd5jdgx1vcUVD9n9P1GA&usqp=CAU"
	}
];
