import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList';

// Generate static params for all categories
export async function generateStaticParams() {
  const categoryList = await GlobalApi.getCategoryList();
  
  return categoryList.map((category) => ({
    categoryName: category.attributes.name,
  }));
}

async function ProductCategory({ params }) {

  const productList = await GlobalApi.getProductsByCategory(params.categoryName)
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className='bg-primary text-white p-4 font-bold text-3xl text-center'>{params.categoryName}</h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />

      <div className='p-5 md:p-10'>
        <ProductList productList={productList} />
      </div>

    </div>
  )
}

export default ProductCategory