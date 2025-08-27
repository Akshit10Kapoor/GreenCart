import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const {products} = useAppContext()
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-meduim'>Best Seller</p>
        <div className='flex gap-8 flex-wrap mt-8'>
          {products.filter((product) => product.inStock).slice(0,5).map((product, index) => (

            <ProductCard key={index} product={product} />

          ))}

        </div>

    </div>
  )
}

export default BestSeller