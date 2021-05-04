import {useContext, useEffect, useState} from 'react'
import MainContext from '../MainContext';
import {Link} from 'react-router-dom'
import {GrLink, GrDownload, GrClose} from 'react-icons/gr';

function Download() {

	const {selectedBrands, brands, setSelectedBrands} = useContext(MainContext)
	const [downloadUrl, setDownloadUrl] = useState()
	const [cssMethod, setCssMethod] = useState('css')

	useEffect(() => {
		if (selectedBrands.length > 0){

			let output = ''
			switch (cssMethod){

				case 'css':
					output += ':root {\n'
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `--${slug}-${key}: #${color};\n`
						})
					})
					output += '}'
					break;

				case 'scss':
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `\$${slug}-${key}: #${color};\n`
						})
					})
					break;

				case 'less':
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `@${slug}-${key}: #${color};\n`
						})
					})
					break;

			}

			const blob = new Blob([output])
			const url = URL.createObjectURL(blob)
			setDownloadUrl(url)
			return () => {
				URL.revokeObjectURL(url)
				setDownloadUrl('')
			}
		}
	}, [selectedBrands, cssMethod])

	return (
		<div className="download">
			<div className="actions">
				<select onChange={(e) => setCssMethod(e.target.value)}>
					<option value="css">CSS</option>
					<option value="scss">SCSS</option>
					<option value="less">LESS</option>
				</select>
				<a download={`brands.${cssMethod}`} href={downloadUrl}>
					<GrDownload />
				</a>
				<Link to={`/collection/${selectedBrands.join(',')}`}>
					<GrLink />
				</Link>
			</div>
			<div className="selected" onClick={() => setSelectedBrands([])}>
				<GrClose />
				{selectedBrands.length} brands collected
			</div>
		</div>
	)
}

export default Download