
export default function MeteorCard({ keys, meteorName, year, latitude, longitude }) {
	return (<article className="meteor-card">
		<h2>{meteorName}</h2>
		<p>year: {year}</p>
		<p>geolocation: {latitude}, {longitude}</p>
		<p>id:{keys}</p>
	</article>)
}