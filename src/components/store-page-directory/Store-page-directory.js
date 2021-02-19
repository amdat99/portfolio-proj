import React ,{useState} from 'react';
import ShopMenu from '../shop-menu/Shop-menu'


function StorePageDirectory(props) {

    const[categories] = useState([
 {
    title: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib',
    id: 1,
    linkUrl: 'electronics'
  },
  {
    title: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    id: 2,
    linkUrl: 'clothes'
  },
  {
    title: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    id: 3,
    linkUrl: 'shoes'
  },
  {
    title: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1587815073078-f636169821e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    id: 4,
    linkUrl: 'food'
  },
  {
    title: 'general',
    imageUrl: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80',
    id: 5,
    linkUrl: 'general'
  }
])

return (
    <div className='shop-page-directory'>   
        {
            categories.map(category => {    
             
            return <ShopMenu key= {category.id} title={category.title} imageUrl = {category.imageUrl}
                linkUrl = {category.linkUrl}/>

            }) }
    </div>
);
        }

export default StorePageDirectory;
