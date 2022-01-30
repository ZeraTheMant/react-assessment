import React, { useState } from 'react';
import './Sidepanel.css'

import PRODUCTS_JSON from '../../products.json';

const categories_pre_filter = PRODUCTS_JSON.map(item => item.category)
const CATEGORIES = [...new Set(categories_pre_filter)]

const manufacturers_pre_filter = PRODUCTS_JSON.map(item => item.manufacturer)
const MANUFACTURERS = [...new Set(manufacturers_pre_filter)]

const CheckboxFilter = ({ name, value, class_name, checked, handleCheckChange, index }) => {
	return (
		<div>
			<input 
				type="checkbox" 
				id={name + index} 
				name={name + index} 
				className={class_name} 
				checked={checked} 
				value={value}
				onChange={() => handleCheckChange(index-1)}
			/>
			
			<label htmlFor={name + index}>{value}</label>
		</div>
	)
}

const Sidepanel = ({ setProducts, setOptionsOpen }) => {
	const [minPriceFilter, setMinPriceFilter] = useState(0)
	const [maxPriceFilter, setMaxPriceFilter] = useState(0)
	
	const [checkedCategoryState, setCheckedCategoryState] = useState(
		new Array(CATEGORIES.length + 1).fill(false)
	)
	
	const handleCategoryCheckChange = (position) => {
		const updatedCategoryCheckedState = checkedCategoryState.map((item, index) =>
			index === position ? !item : item
		)
		
		setCheckedCategoryState(updatedCategoryCheckedState)
	}
	
	const [checkedManufacturerState, setCheckedManufacturerState] = useState(
		new Array(MANUFACTURERS.length + 1).fill(false)
	)	
	
	const handleManufacturerCheckChange = (position) => {
		const updatedManufacturerCheckedState = checkedManufacturerState.map((item, index) =>
			index === position ? !item : item
		)
		
		setCheckedManufacturerState(updatedManufacturerCheckedState)
	}	
	
	
	const handleMinPriceChange = (e) => {
		setMinPriceFilter(e.target.value)
	}
	
	const handleMaxPriceChange = (e) => {
		setMaxPriceFilter(e.target.value)
	}	
	
	const handleReset = () => {
		setCheckedCategoryState(
			new Array(CATEGORIES.length + 1).fill(false)
		)	
		
		setCheckedManufacturerState(
			new Array(MANUFACTURERS.length + 1).fill(false)
		)		
		
		setMinPriceFilter(0)
		setMaxPriceFilter(0)
		setProducts(PRODUCTS_JSON)
		setOptionsOpen(false)			
	}
	
	const handleFilter = () => {
		let newFilteredProducts = PRODUCTS_JSON
					
		
		const hasSelectedCategory = checkedCategoryState.find(item => item === true)		
		
		if (hasSelectedCategory) {
			const filteredCategories = CATEGORIES.filter((item, index) => checkedCategoryState[index])
			const allExceptSelected = checkedCategoryState[CATEGORIES.length] // if 'All Except' is selected
			const filteredCategoryProducts = newFilteredProducts.filter(item => {
				return allExceptSelected ? !filteredCategories.includes(item.category) : filteredCategories.includes(item.category)
			})			
			
			newFilteredProducts = filteredCategoryProducts
		}
		
		
		const hasSelectedManufacturer = checkedManufacturerState.find(item => item === true)	
		if (hasSelectedManufacturer) {
			const filteredManufacturers = MANUFACTURERS.filter((item, index) => checkedManufacturerState[index])
			const allExceptSelected2 = checkedManufacturerState[MANUFACTURERS.length] // if 'All Except' is selected
			const filteredManufacturersProducts = newFilteredProducts.filter(item => {
				return allExceptSelected2 ? !filteredManufacturers.includes(item.manufacturer) : filteredManufacturers.includes(item.manufacturer)
			})
			
			newFilteredProducts = filteredManufacturersProducts
		}			

		if (minPriceFilter > 0)
			newFilteredProducts = newFilteredProducts.filter(item => item.price >= minPriceFilter)
			
		if (maxPriceFilter > 0)
			newFilteredProducts = newFilteredProducts.filter(item => item.price <= maxPriceFilter)

		setProducts(newFilteredProducts)
		setOptionsOpen(false)			
	}
	
	return (
		<div id="sidepanel">
			<div className="flex sidepanel-gap">
				<div className="flex">
					<button className="button apply-btn" onClick={handleFilter} >Apply</button>
					<button className="button reset-btn" onClick={handleReset}>Reset</button>
				</div>
				
				<div className="flex sidepanel-gap">
					<fieldset>
						<legend>Filter by Category:</legend>
						<div className="fieldset-divider">
							{
								CATEGORIES && CATEGORIES.length>0 && CATEGORIES.map((item, i)=> {
									return (
										<div key={i + 1}>
											<CheckboxFilter
												name="category-"
												value={item}
												class_name="category-checkbox"
												checked={checkedCategoryState[i]}
												handleCheckChange={handleCategoryCheckChange}
												index={i + 1}									
											/>
										</div>
									)
								})
							}
							
							<CheckboxFilter
								name="all-except-category"
								value="All except"
								class_name="category-checkbox"	
								checked={checkedCategoryState[CATEGORIES.length + 1]}
								handleCheckChange={handleCategoryCheckChange}													
								index={CATEGORIES.length + 1}
							/>
						</div>
					</fieldset>
					
					<fieldset>
						<legend>Filter by Price (enter 0 for default):</legend>		
						<div className="fieldset-divider">
							<div>
								<label>Min:</label>
								<input type="number" id="min-price" name="min-price" value={minPriceFilter} min="0" onChange={handleMinPriceChange}/>
							</div>
							
							<div>
								<label>Max:</label>
								<input type="number" id="max-price" name="max-price" value={maxPriceFilter} min="0" onChange={handleMaxPriceChange}/>
							</div>						
						</div>							
					</fieldset>
					
					<fieldset>
						<legend>Filter by Manufacturer:</legend>
						<div className="fieldset-divider">
							{
								MANUFACTURERS && MANUFACTURERS.length>0 && MANUFACTURERS.map((item, i)=> {
									return (
										<div key={i + 1}>
											<CheckboxFilter
												name="manufacturer-"
												value={item}
												class_name="manufacturer-checkbox"
												checked={checkedManufacturerState[i]}
												handleCheckChange={handleManufacturerCheckChange}																							
												index={i + 1}									
											/>
										</div>
									)
								})
							}
							
							<CheckboxFilter
								name="all-except-manufacturer"
								value="All except"
								class_name="manufacturer-checkbox"	
								checked={checkedManufacturerState[MANUFACTURERS.length + 1]}
								handleCheckChange={handleManufacturerCheckChange}													
								index={MANUFACTURERS.length + 1}
							/>									
						</div>
					</fieldset>				
				</div>
			</div>
		</div>
	)
}

export default Sidepanel
