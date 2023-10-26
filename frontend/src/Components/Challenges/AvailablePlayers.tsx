import "./AvailablePlayers.css";

interface PlayerToPlayProps {
	url: string;
	name: string;
	level: number;
	id: number;
	opponent: number;
	setOpponent: (value: number) => void;
}
interface AvailablePlayersProps {
	opponent: number;
	setOpponent: (value: number) => void;
}

export const AvailablePlayers = ({ opponent, setOpponent } : AvailablePlayersProps) : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12 d-flex align-items-center justify-content-center flex-column">
				<h3>Available Players</h3>
				<div className="available-players-box m-auto">
					<PlayerToPlay id={1} opponent={opponent} setOpponent={setOpponent} url="" name="Andre" level={2}/>
					<PlayerToPlay id={2} opponent={opponent} setOpponent={setOpponent} url="" name="Tommi" level={1}/>
				</div>
			</div>
		</div>
	);
};

const PlayerToPlay = ({ url, name, level, opponent, setOpponent, id } : PlayerToPlayProps) : JSX.Element=> {
	const defaultProfileSource = "https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png";
	return (
		<button
			className={`player-to-play-item d-flex align-items-center justify-content-center ${id === opponent ? "player-to-play-active" : ""}`}
			onClick={() => setOpponent(id)}
		>
			<div className="player-to-play-photo h-100 d-flex align-items-center justify-content-center">
				<img alt={name + " picture"} src={url || defaultProfileSource} className="m-auto"/>
			</div>
			<div className="player-to-play-name h-100 d-flex align-items-center justify-content-center">
				{name || "Unknown Player"}
			</div>
			<div className="player-to-play-level h-100 d-flex align-items-center justify-content-center">
				{level || 0}
			</div>
		</button>
	);
};