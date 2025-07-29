import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({categoryList}) {
  return (
    <div className='mt-5'>
        <h2 className='text-primary font-bold text-2xl'>Shopping by Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2' >
            {categoryList.map((category, index)=>(
                <Link href={'/product-category/'+category.attributes.name} className='flex flex-col  items-center bg-green-50  gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600  '>
                    <Image src={category.attributes.icon.data.attributes.url || '/placeholder-icon.png'}
                    width={50}
                    height={50}
                    alt='icon'
                    className='group-hover:scale-125 transition-all ease-in-out'
                    />
                    <h2 className='text-green-800'>{category.attributes.name}</h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategoryList