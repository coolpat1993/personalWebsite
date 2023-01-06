export default function MeteorCard({ keys, meteorName, year, latitude, longitude }) {
	return (
		<article className="meteor-card">
			<h2 className="meteor-name">{meteorName}</h2>
			<p className="meteor-year">year: {year}</p>
			<p className="meteor-geolocation">geolocation: {latitude}, {longitude}</p>
			<p className="meteor-id">id:{keys}</p>
		</article>
	)
}