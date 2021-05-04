import ContentLoader from 'react-content-loader'

function Loader() {
	return (
		<ContentLoader
			speed={2}
			width={400}
			height={103}
			viewBox="0 0 400 103"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="8" y="7" rx="3" ry="3" width="88" height="10"/>
			<rect x="10" y="39" rx="0" ry="0" width="70" height="40"/>
			<rect x="84" y="39" rx="0" ry="0" width="70" height="40"/>
			<rect x="157" y="39" rx="0" ry="0" width="70" height="40"/>
		</ContentLoader>
	)
}

export default Loader