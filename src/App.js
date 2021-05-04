import MainContext from './MainContext';
import Sidebar from './components/Sidebar'
import Content from './components/Content';
import BrandsData from './brands.json';
import {useEffect, useState} from 'react';
import Copied from './components/Copied';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Collection from './components/Collection';

function App() {

	let brandsArray = []
	Object.keys(BrandsData).map(key => {
		brandsArray.push(BrandsData[key])
	})

	const [brands, setBrands] = useState(brandsArray)
	const [selectedBrands, setSelectedBrands] = useState([])
	const [copied, setCopied] = useState(false)
	const [search, setSearch] = useState('')

	useEffect(() => {
		const timeout = setTimeout(() => {
			setCopied(false)
		}, 500)
		return () => {
			clearTimeout(timeout)
		}
	}, [copied])

	useEffect(() => {
		setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)))
	}, [search])

	useEffect(() => {
		document.title = 'React BrandColors Demo | PROTOTURK'
	}, [])

	const data = {
		brands,
		selectedBrands,
		setSelectedBrands,
		setCopied,
		search,
		setSearch
	}

	return (
		<>
			<MainContext.Provider value={data}>
				{copied && <Copied color={copied}/>}
				<Sidebar />
				<Router>
					<Switch>
						<Route path="/" exact>
							<Content />
						</Route>
						<Route path="/collection/:slugs">
							<Collection />
						</Route>
					</Switch>
				</Router>
			</MainContext.Provider>
		</>
	);
}

export default App;
