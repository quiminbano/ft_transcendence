interface BadgeProps {
	name: string;
	url: string;
}

export const Achievements = () : JSX.Element => {
	return (
		<div className="row">
			<h3>Achievements</h3>
			<div className="col-8 offset-2 d-flex align-items-center justify-content-center flex-wrap">
				{
					acv.map((item, i) => <Badge key={i} name={item.name} url={item.url} />)
				}
			</div>
		</div>
	);
};

const acv : BadgeProps[] = [
	{
		name: "",
		url: "https://img.icons8.com/?size=100&id=9601&format=png"
	},
	{
		name: "",
		url: "https://img.icons8.com/?size=128&id=lJGAVwJXCbRc&format=png"
	},
	{
		name: "",
		url: "https://img.icons8.com/?size=128&id=SSlndjI84Jq7&format=png"
	},
	{
		name: "",
		url: "https://img.icons8.com/?size=160&id=GzrNDm7g3fac&format=png"
	},
];

const Badge = ({ name, url } : BadgeProps) : JSX.Element => {
	return (
		<img
			alt={name}
			src={url}
			className="achievement-badge"
		/>
	);
};
