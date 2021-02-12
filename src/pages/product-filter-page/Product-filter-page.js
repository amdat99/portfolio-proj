import React ,{useEffect,useState}from 'react';
import ItemsCollection from '../../components/items-collection/Items-collection'
import SharedHeader from '../../components/shared-header/Shared-header'

import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux'

import { selectItems, isItemDataLoaded, selectErrorMessage } from '../../redux/shop/shop.selectors'

import { setHeaderRoute } from '../../redux/header/header.actions'

import './Product-filter-page.scss'


function ProductsFilterPage({
  collections,setHeaderRoute}) {
    const [route] = useState('store')
    const [filteredCollections, setFilteredCollections] = useState(collections)
    


  useEffect(()=>{
        setHeaderRoute(route)
    },[setHeaderRoute, route])

  useEffect(()=>{
      setFilteredCollections(collections)
    },[collections])

    
    const filterCollections = (params) => {
        switch(params){
          case 'electronics':
            return setFilteredCollections(collections.filter( collection => {
              return collection.category.includes('electronics')}))
          case 'clothes':
            return setFilteredCollections(collections.filter( collection => {
              return collection.category.includes('clothes')}))
          case 'shoes':
            return setFilteredCollections(collections.filter( collection => {
              return collection.category.includes('shoes')}))
          case 'food':
            return setFilteredCollections(collections.filter( collection => {
              return collection.category.includes('food')}))
          case 'general':
              return setFilteredCollections(collections.filter( collection => {
                return collection.category.includes('general')}))
         default:
              return setFilteredCollections(collections)
            }
        }

   console.log(collections)
return (
    <div className="products-filter-page">  
    <SharedHeader />
        <h1>Products</h1>
  
      <div id="product-filter-filter-container">
      <span className= 'product-filter-filter-item' params= 'electronics' onClick={()=>filterCollections('electronics')}> electronics</span>  
      <span className= 'product-filter-filter-item' params= 'clothes' onClick={()=>filterCollections('clothes')}> clothes</span>  
      <span className= 'product-filter-filter-item' params= 'shoes' onClick={()=>filterCollections('shoes')}> shoes</span>  
      <span className= 'product-filter-filter-item' params= 'food' onClick={()=>filterCollections('food')}> food</span>  
      <span className= 'product-filter-filter-item' params= 'general' onClick={()=>filterCollections('general')}> general</span>  
        <span  onClick={() => filterCollections()}> reset</span>
      </div>

    <div className= "products-filter-spacing">
    {!collections === []
    ? <h1>cant find your product</h1>
    
     : filteredCollections.map(( item, i ) => (
        <ItemsCollection key={i} item={item}/>
      ))
   
    }
    </div>
    </div>
    )

}
    const mapDispatchToProps = (dispatch) => ({
    setHeaderRoute: (route) => dispatch(setHeaderRoute(route)),
   
 }) 

 const mapStateToProps = (createStructuredSelector)({
     collections: selectItems,
     isloaded: isItemDataLoaded,
     error: selectErrorMessage
     })

  
export default connect(mapStateToProps,mapDispatchToProps)(ProductsFilterPage);