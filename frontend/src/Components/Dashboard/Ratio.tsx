import "./progressBar.css";

interface RatioCircleProps {
	colour: string;
	percentage: number;
}
interface CircleProgressBarProps {
	size : number;
	progress: number;
	trackWidth: number;
	trackColor: string;
	indicatorWidth: number;
	indicatorColor: string;
	indicatorCap: string;
	label?: string;
	labelColor: string;
	spinnerMode: boolean;
	spinnerSpeed: number;

}

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
					<div className="col-12 col-md-6">
						<p>Win Ration</p>
						<Pie colour="blue" percentage={winPercent}/>
					</div>
					<div className="col-12 col-md-6">
						<p>Average Score</p>
						<Pie colour="blue" percentage={5}/>
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

const Circle = ({ colour, percentage } : RatioCircleProps) : JSX.Element => {
	const r = 70;
	const circ = 2 * Math.PI * r;
	const strokePct = ((100 - percentage) * circ) / 100;
	return (
		<circle
			className="circleRatio"
			r={r}
			cx={100}
			cy={100}
			fill="transparent"
			stroke={strokePct !== circ ? colour : ""}
			strokeWidth="2rem"
			strokeDasharray={circ}
			strokeDashoffset={percentage ? strokePct : 100}
		></circle>
	);
};

const Text = ({ percentage } : RatioCircleProps) : JSX.Element => {
	return (
		<text
			x="50%"
			y="50%"
			dominantBaseline="central"
			textAnchor="middle"
			fontSize="1.5rem"
		>
			{percentage.toFixed(0) + "%"}
		</text>
	);
};

const Pie = ({ percentage, colour } : RatioCircleProps) : JSX.Element => {
	return (
		<svg width="200" height="200">
			<g transform="rotate(-90 100 100)">
				<Circle colour="lightgrey" percentage={0}/>
				<Circle colour={colour} percentage={percentage} />
			</g>
			<Text percentage={percentage} />
		</svg>
	);
};

const ProgressBar = (props: CircleProgressBarProps) : JSX.Element => {
	const {
	size = 150,
	progress = 0,
	trackWidth = 10,
	trackColor = "#ddd",
	indicatorWidth = 10,
	indicatorColor = "#07c",
	indicatorCap = "round",
	label = "Loading...",
	labelColor = "#333",
	spinnerMode = false,
	spinnerSpeed = 1
	} = props;
	const center = props.size / 2;
	const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
	const dashArray = 2 * Math.PI * radius;
	const dashOffset = dashArray * ((100 - progress) / 100);
	let hideLabel = (size < 100 || !label.length || spinnerMode) ? true : false;
	return (
		<>
			<div className="svg-wrapper" style={{ width: size, height: size }}>
				<svg className="svg-pi" style={{ width: size, height: size }}>
					<circle
						className="svg-pi-track"
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						stroke={trackColor}
						strokeWidth={trackWidth}
					/>
					<circle
						className={`svg-pi-indicator ${spinnerMode ? "svg-pi-indicator-spinner" : ""}`}
						style={{ animationDuration: spinnerSpeed * 1000 }}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						stroke={indicatorColor}
						strokeWidth={indicatorWidth}
						strokeDasharray={dashArray}
						strokeDashoffset={dashOffset}
						strokeLinecap="round"
					/>
				</svg>
				{
					!hideLabel && (
						<div className="svg-pi-label" style={{ color: labelColor }}>
							<span className="svg-pi-label-loading">
								{label}
							</span>
							{
								!spinnerMode && (
									<span className="svg-pi-label-progress">{`${
										progress > 100 ? 100 : progress
									}`}</span>
								)
							}
						</div>
					)
				}
			</div>
		</>
	);
};
