const Fighter = (name, strength, agility, vitality) => {
	const BASE_DAMAGE = 10
	let damage = BASE_DAMAGE + (strength * 5)
	damage = damage - (agility * 3)
	
	const BASE_DEFENSE = 10
	let defense = BASE_DEFENSE + (agility * 5)
	defense = defense + (strength * 3)
	defense = defense + (vitality * 1)
	
	const BASE_HP = 50
	let current_hp = BASE_HP + (vitality * 10)
	current_hp = current_hp + (strength * 5)
	current_hp = current_hp + (agility * 3)
	
	
	const getName = () => name
	const getHp = () => current_hp
	const takeDamage = (damage) => current_hp -= damage
	const dealDamage = (rival, damage) => rival.takeDamage(damage)	
	
	return { damage, getName, getHp, takeDamage, dealDamage }
}

const fight = (fighter_1, fighter_2) => {
	let current_player = fighter_1
	let opponent = fighter_2
	let round = 1
	
	while (fighter_1.getHp() > 0 && fighter_2.getHp() > 0) {
		current_player.dealDamage(opponent, current_player.damage)
		console.log(`Round ${round}`)
		console.log(`${current_player.getName()} attacks ${opponent.getName()} and deals ${current_player.damage} damage!`)
		console.log(`${opponent.getName()} has ${opponent.getHp()} HP left.`)
		console.log()
		
		current_player = (current_player == fighter_1) ? fighter_2 : fighter_1
		opponent = (opponent == fighter_2) ? fighter_1 : fighter_2
		round += 1
	}
	
	console.log()
	
	const winner = (fighter_1.getHp() > 0) ? fighter_1 : fighter_2
	console.log(`${winner.getName()} won the fight!`)
}


const f1 = Fighter('Tyson Fury', 13, 10, 17)
const f2 = Fighter('Anthony Joshua', 15, 8, 11)
fight(f1, f2)
