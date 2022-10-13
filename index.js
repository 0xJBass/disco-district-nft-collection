// Generate Metadata for all images
const {
	writeFileSync,
	readdirSync,
	rmSync,
	existsSync,
	mkdirSync,
} = require('fs')

const BASE_URL =
	'https://gateway.pinata.cloud/ipfs/QmYDmEzA1Sb6zVvyRCRBiFHwjJKv5uXxvsaEUszTvNymoT'

function generateMetadata(url) {
	const name = url.split('/').pop().split('.')[0]
	const meta = {
		name,
		description: 'Welcome to the Dance Floor',
		image: `${BASE_URL}/${encodeURIComponent(name.trim())}.png`,
		attributes: [
			{
				trait_type: 'Item',
				value: `${name}`,
			},
		],
	}

	writeFileSync(`./json/${name}.json`, JSON.stringify(meta))
}

// Create dir if not exists
if (!existsSync('./json')) {
	mkdirSync('./json')
}

// Cleanup dir before each run
readdirSync('./json').forEach((f) => rmSync(`./json/${f}`))

const images = readdirSync('./images')
for (const image of images) {
	generateMetadata(image)
}
