import React,{useEffect,useState} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { isCategoryDataLoaded,selectCategory } from '../../redux/shop/shop.selectors'
 import ItemsCollection from '../items-collection/Items-collection'


 import ShopHeader from '../../components/shop-header/Shop-header'
 
 import { createStructuredSelector } from 'reselect';
 import {  fetchCategoryPending} from '../../redux/shop/shop.actions'

 import './Categories.scss'
    export function Categories({match,isLoaded,categoryItems,fetchCategoryPending}) {
    
    const [categoryList]=useState(['clothes','shoes','electronics','food','general'])


    useEffect(()=>{
    categoryList.map( category =>{
    if( match.url === '/category/'+category ){
       return fetchCategoryPending(category)} 
       })
    },[match,fetchCategoryPending,categoryList])
     
    return (
    <div>
        <ShopHeader />
        
  
        <div>
        <h1 id="categories-title"> {match.params.categoryId}</h1>
        { isLoaded
    ?<div id='categories-container'>
        {categoryItems.map((item, i) => (
            <ItemsCollection key={i} item={item} className='collection-item'/>
          ))}
    </div>
        :<h1>loading...</h1>
        }  
        </div>      
        
    </div>
    );
}

const mapStateToProps = (createStructuredSelector)({
    categoryItems: selectCategory,
    isLoaded: isCategoryDataLoaded,
    })

  
const mapDispatchToProps = (dispatch) => ({
    fetchCategoryPending: (category) => dispatch(fetchCategoryPending(category)),
}) 

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Categories));