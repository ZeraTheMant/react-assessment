const COLORS = ["BLACK", "WHITE", "RED", "YELLOW", "BLUE", "GREEN"]
const UPPER_LIMIT = COLORS.length - 1
const LOWER_LIMIT = 0

function getNextIndex(currentIndex) {
	if (currentIndex + 1 > UPPER_LIMIT) return 0
	else return currentIndex + 1
}

function getPrevIndex(currentIndex) {
	if (currentIndex - 1 < LOWER_LIMIT) return UPPER_LIMIT
	else return currentIndex - 1
}


function createColorManager(default_color) {
	let current_color = default_color;
	
	const colorManager = () => {
		const get = () => COLORS[current_color]
		
		const next = () => {
			current_color = getNextIndex(current_color)
			return get()	
		}
		
		const prev = () => {
			current_color = getPrevIndex(current_color)
			return get()	
		}		
		
		const reset = () => COLORS[default_color]
		
		return { get, next, prev, reset }
	}
	
	return colorManager()
}


const colorManager1 = createColorManager(2)
console.log(colorManager1.get())
console.log(colorManager1.next())
console.log(colorManager1.prev())
console.log(colorManager1.prev())
console.log(colorManager1.prev())
console.log(colorManager1.reset())

console.log()

const colorManager2 = createColorManager(1)
console.log(colorManager2.get())
console.log(colorManager2.next())
console.log(colorManager2.next())
console.log(colorManager2.prev())
console.log(colorManager2.prev())
console.log(colorManager2.reset())
