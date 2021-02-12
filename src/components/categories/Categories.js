import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { isCategoryDataLoaded,selectCategory } from '../../redux/shop/shop.selectors'
 import ItemsCollection from '../items-collection/Items-collection'


 import ShopHeader from '../../components/shop-header/Shop-header'
 
 import { createStructuredSelector } from 'reselect';
 import {  fetchCategoryPending} from '../../redux/shop/shop.actions'

 import './Categories.scss'
function Categories({match,isLoaded,categoryItems,fetchCategoryPending}) {


    // useEffect(()=>{

    //     if (match.url !==  '/category/shoes' || '/category/clothes' || '/category/electronis' || '/category/food' || '/category/general' ){
    //       return  history.push('/store')
    //     }
    // },[categoryItems])

    useEffect(()=>{


    if( match.url === '/category/shoes' ){
        fetchCategoryPending('shoes')}
           
    },[match.url,fetchCategoryPending])

    useEffect(()=>{
        if( match.url === '/category/clothes' ){
            fetchCategoryPending('clothes')}
          
    },[fetchCategoryPending,match.url])

    useEffect(()=>{
        if( match.url === '/category/food' ){
            fetchCategoryPending('food')}
       
    },[fetchCategoryPending,match.url])

    useEffect(()=>{
        if( match.url === '/category/electronics' ){
            fetchCategoryPending('electronics')}
    
    },[fetchCategoryPending,match.url])

    useEffect(()=>{
        if( match.url === '/category/general' ){
            fetchCategoryPending('general')}
    },[fetchCategoryPending,match.url])

    
    
    if(isLoaded){
    console.log(match.params.categoryId)
    }

    return (

        <div>
        <ShopHeader />

    <h1 id="categories-title"> {match.params.categoryId}</h1>
        { isLoaded
    ?<div id='categories-container'>
        {categoryItems.map((item, i) => (
            <ItemsCollection key={i} item={item} className='collection-item' />
          ))}
        </div>
        :null
        }  
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