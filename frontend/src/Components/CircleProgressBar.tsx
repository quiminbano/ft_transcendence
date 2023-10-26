import "./CircleProgressBar.css";
import { useState, useEffect } from "react";

interface CircleProgressBarProps {
	size ?: number;
	progress?: number;
	trackWidth?: number;
	trackColor?: string;
	indicatorWidth?: number;
	indicatorColor?: string;
	label?: string;
	labelColor?: string;
	spinnerMode?: boolean;
	spinnerSpeed?: number;
}

export const ProgressBar = (props: CircleProgressBarProps) : JSX.Element => {
	const [progressState, setProgressState] = useState(0);
	const animationDuration = 1000;
	const {
		size = 150,
		progress = 0,
		trackWidth = 10,
		trackColor = "#ddd",
		indicatorWidth = 10,
		indicatorColor = "#07c",
		label = "",
		labelColor = "#333",
		spinnerMode = false,
		spinnerSpeed = 1
	} = props;
	const center = size / 2;
	const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
	const dashArray = 2 * Math.PI * radius;
	const dashOffset = dashArray * ((100 - progressState) / 100);
	const hideLabel = (size < 100 || spinnerMode) ? true : false;

	useEffect(() => {
		const progressTimeout = setTimeout(() => {
			if (progressState >= progress)
				return;
			setProgressState(progressState + 1);
		}, animationDuration / 100);

		return () => {
			clearTimeout(progressTimeout);
		};
	}, [progressState]);

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
						style={{ animationDuration: `${spinnerSpeed * 1000}` }}
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
									<span className="svg-pi-label-progress">
										{`${
											progress > 100 ? 100 : progress
										}%`}</span>
								)
							}
						</div>
					)
				}
			</div>
		</>
	);
};
