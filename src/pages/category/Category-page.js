import React from 'react';
import { Route} from 'react-router-dom';
import Categories from '../../components/categories/Categories'

import './Category-page.scss'
function CategoryPage({match}) {
    return (
        <div className ='category-page-container'>
            
    
          <Route path={`${match.path}/:categoryId`} component={Categories} />
            
        </div>
    );
}

export default CategoryPage;