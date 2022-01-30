const bemObject = () => {
	let blockName
	let elementName
	let modifierName
		
	const block = (name) => {
		blockName = name
		return { element, modifier, build }
	}
	
	const element = (name) => {
		elementName = '__' + name
		return { modifier, build }		
	}
	
	const modifier = (name) => {
		modifierName = '--' + name
		return { build }
	}
	
	const build = () => {	
		if (!blockName) {
			clearMemory()
			return 'ERROR: No block name entered!'
		} else {
			elementName = (elementName) ? elementName : ''
			modifierName = (modifierName) ? modifierName : ''
			
			const combinedClass = blockName + elementName + modifierName	
			clearMemory()
			return combinedClass		
		}
	}
	
	const clearMemory = () => {
		blockName = ''
		elementName = ''
		modifierName = ''
	}
	
	return { block }
}

const bem = bemObject()

console.log(bem.block('list').build())
console.log(bem.block('list').element('item').build())
console.log(bem.block('list').modifier('active').build())
console.log(bem.block('list').element('item').modifier('active').build())
console.log(bem.block().build()) // should return error message
