import "./Challenges.css";
import { MenuBars } from "../MenuBars/MenuBars";
import { GeneralRules, Rule } from "./GeneralRules";
import { PickAGame } from "./PickAGame";
import { AvailablePlayers } from "./AvailablePlayers";
import { useState } from "react";

export const Challenges = () : JSX.Element => {
	const [gameType, setGameType] = useState(0);
	const [ruleType, setRuleType] = useState(0);
	return (
		<MenuBars>
			<div className="row">
				<div className="col-md-4 mt-5">
					<AvailablePlayers />
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-12 mt-5">
							<PickAGame setGameType={setGameType} gameId={gameType}/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 mt-5">
							<GeneralRules setRuleType={setRuleType} ruleId={ruleType}/>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-6 offset-3 border">
							<button className="btn btn-success w-100">Challenge</button>
						</div>
					</div>
				</div>
			</div>
		</MenuBars>
	);
};
