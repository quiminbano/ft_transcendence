interface RuleProps {
	url: string;
	name: string;
	typeId: number;
	setRule: (value: number) => void;
	ruleId: number;
}
interface GeneralRulesProps {
	setRuleType: (value: number) => void;
	ruleId: number
}

export const GeneralRules = ({ setRuleType, ruleId } : GeneralRulesProps) : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12 mt-2">
				<h3>General Rules</h3>
				<div className="d-flex flex-row align-items-center justify-content-center flex-wrap m-auto">
					{
						fakeData.map((data, i) =>
							<Rule ruleId={ruleId} name={data.name}
								url={data.url} key={i} typeId={i} setRule={setRuleType}/>)
					}
				</div>
			</div>
		</div>
	);
};

export const Rule = ({ name, url, typeId, setRule, ruleId } : RuleProps) : JSX.Element => {
	return (
		<div className={`challenge-rule ${ruleId === typeId ? "rule-active" : ""}`} onClick={() =>setRule(typeId)}>
			<img alt="rule" className="rule-img" src={url}/>
			<p>{name}</p>
		</div>
	);
};

const fakeData = [
	{
		url: "https://img.icons8.com/?size=60&id=WEJ7pr5aHxBo&format=png",
		name: "Time Cap"
	},
	{
		url: "https://img.icons8.com/?size=64&id=74673&format=png",
		name: "Score limit"
	},
	{
		url: "https://img.icons8.com/?size=80&id=HlWdyoFVwB2Z&format=png",
		name: "Marathon"
	},
];