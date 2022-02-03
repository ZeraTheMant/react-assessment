import './App.css';
import productsJSON from './products.json';
import Sidepanel from './components/Sidepanel/Sidepanel'
import ClickableHeading from './components/ClickableHeading/ClickableHeading'
import React, { useState, useEffect } from 'react'

function App() {
	const [products, setProducts] = useState(productsJSON)
	const [mostExpensiveItem, setMostExpensiveItem] = useState(null)
	const [cheapestItem, setCheapestItem] = useState(null)
	const [optionsOpen, setOptionsOpen] = useState(false)
	
	const toggleOptions = () => {
		setOptionsOpen(!optionsOpen)
	}
	
	const getPriceTotal = () => {
		const price_array = products.map(item => item.price)
		return price_array.reduce((current, next) => current + next)
	}
	
	const expensiveItemCheck = () => {
		if (products.length > 0) {
			const final_item = products.reduce((current, next) => (current.price < next.price) ? next : current)
			setMostExpensiveItem(final_item)
		} else setMostExpensiveItem(null)
	}
	
	const cheapestItemCheck = () => {
		if (products.length > 0) {		
			const final_item = products.reduce((current, next) => (current.price > next.price) ? next : current)	
			setCheapestItem(final_item)	
		} else setCheapestItem(null)
	}
	
	const sortByJSONData = (ascending) => {
		setProducts(products.slice().reverse())
	} 

	const sortByName = (ascending) => {
		if (ascending) setProducts(products.slice().sort((a, b) => a.name.localeCompare(b.name)))
		else setProducts(products.slice().sort((a, b) => b.name.localeCompare(a.name)))
	}
	
	const sortByCategory = (ascending) => {
		if (ascending) setProducts(products.slice().sort((a, b) => a.category.localeCompare(b.category)))
		else setProducts(products.slice().sort((a, b) => b.category.localeCompare(a.category)))
	}	
	
	const sortByManufacturer = (ascending) => {
		if (ascending) setProducts(products.slice().sort((a, b) => a.manufacturer.localeCompare(b.manufacturer)))
		else setProducts(products.slice().sort((a, b) => b.manufacturer.localeCompare(a.manufacturer)))
	}		
	
	const sortByPrice = (ascending) => {
		if (ascending) setProducts(products.slice().sort((a, b) => a.price - b.price))
		else setProducts(products.slice().sort((a, b) => b.price - a.price))
	}
	
	const sortByDate = (ascending) => {
		if (ascending) setProducts(products.slice().sort((a, b) => new Date(a.production_date) - new Date(b.production_date)))
		else setProducts(products.slice().sort((a, b) => new Date(b.production_date) - new Date(a.production_date)))
	}
	
	useEffect(() => {
		expensiveItemCheck()
		cheapestItemCheck()			
	}, [products])
	
  return (
    <div className="App">
			<div id="container" className={ optionsOpen ? 'grid' : 'block' } >
				<div id="main-screen">
					<h1>Products List</h1>
					<button type="button" id="options-btn" onClick={toggleOptions}>Options</button>
					
					<div className="grid" id="summary">
						<p>Total Quantity: {products.length > 0 ? products.length : "No data"}</p>
						<p>Total Price: {products.length > 0 ? getPriceTotal() : "No data"}</p>
						<p>Average Price: {products.length > 0 ? (getPriceTotal() / products.length).toFixed() : "No data"}</p>
						<p>Most Expensive Item: {mostExpensiveItem && mostExpensiveItem.name}, {mostExpensiveItem && mostExpensiveItem.price}</p>
						<p>Cheapest Item: {cheapestItem && cheapestItem.name}, {cheapestItem && cheapestItem.price}</p>						
					</div>

					<table id="products">
						<thead>
							<tr>
								<ClickableHeading name="#" clickFunction={sortByJSONData} />
								<th>Image</th>								
								<ClickableHeading name="Name" clickFunction={sortByName} />
								<ClickableHeading name="Category" clickFunction={sortByCategory} />
								<ClickableHeading name="Price" clickFunction={sortByPrice} />	
								<ClickableHeading name="Manufacturer" clickFunction={sortByManufacturer} />																	
								<ClickableHeading name="Production Date" clickFunction={sortByDate} />
							</tr>
						</thead>
						
						<tbody>
							{
								(products && products.length>0) ? products.map((item, i)=> {
									return (
										<tr key={i+1}>
											<td>{i+1}</td>
											<td><img src={item.image} alt={item.name}/></td>
											<td>{item.name}</td>
											<td>{item.category}</td>
											<td>{item.price}</td>	
											<td>{item.manufacturer}</td>	
											<td>{new Date(item.production_date).toLocaleDateString()}</td>																						
										</tr>
									)
								}) :
								(
									<tr>
										<td colspan="7">No data found.</td>
									</tr>						
								)
							} 
						</tbody>
					</table> 
				</div>
				
				<div className={ optionsOpen ? 'block' : 'none' } >
					<Sidepanel setProducts={setProducts} setOptionsOpen={setOptionsOpen}/>
				</div>
			</div>
			
			<footer>Made by Reuben Daniel E. Domondon</footer>			
    </div>
  );
}

export default App;
