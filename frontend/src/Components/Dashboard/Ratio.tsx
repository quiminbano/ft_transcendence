import { ProgressBar } from "../CircleProgressBar";

export const Ratio = () : JSX.Element => {
	const matches = 20;
	const wins = 10;
	const losses = 10;
	const winPercent = wins / matches * 100;
	return (
		<div className="row">
			<div className="col-12">
				<h3>Stats</h3>
				<div className="row mt-3">
					<div className="col-12 d-flex align-items-center justify-content-center flex-wrap">
						<div className="m-auto">
							<p>Win Ration</p>
							<ProgressBar progress={winPercent}/>
						</div>
						<div className="m-auto">
							<p>Average Score</p>
							<ProgressBar progress={5}/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-4">
						<p>{matches}</p>
						<h4>Matches</h4>
					</div>
					<div className="col-4">
						<p>{wins}</p>
						<h4>Wins</h4>
					</div>
					<div className="col-4">
						<p>{losses}</p>
						<h4>Losses</h4>
					</div>
				</div>
			</div>
		</div>
	);
};