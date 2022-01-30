function sum(a, b, c) {
	if (a && b && c) return a + b + c
	else {
		let arguments = []
		
		if (a) arguments.push(a)
		if (b) arguments.push(b)
		
		const repeater = (arg1, arg2) => {
			if (arg1) arguments.push(arg1)
			if (arguments.length === 3) return sum(arguments[0], arguments[1], arguments[2])				
			
			if (arg2) arguments.push(arg2)
			if (arguments.length === 3) return sum(arguments[0], arguments[1], arguments[2])		
			
			return repeater		
		}	
		
		return repeater
	}
}

console.log('Works when three arguments are passed (1, 2, 3)')
console.log(sum(1, 2, 3))

console.log()

console.log('Works when two arguments are initially passed, then one is passed later (3, 6), (9)')
const initialArgs = sum(3, 6)
console.log(initialArgs(9))

console.log()

console.log('Works when one argument is initially passed, then two are passed later (2), (5, 1)')
const initialArg = sum(2)
console.log(initialArg(5, 1))

