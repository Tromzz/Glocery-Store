"use client"
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import VendorInfo from './VendorInfo'


function ProductItemDetail({ product }) {

    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check for sessionStorage only on client side
        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem("jwt");
            const userData = sessionStorage.getItem('user');
            setJwt(token);
            setUser(userData ? JSON.parse(userData) : null);
        }
    }, []);

    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingPrice ?
            product.attributes.sellingPrice :
            product.attributes.mrp
    );

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false)

    const addToCart = () => {
        setLoading(true)
        if (!jwt) {
            router.push('/sign-in')
            setLoading(false)
            return;
        }

        // data for send
        const data = {
            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                products: product.id,
                users_permissions_user: user.id,
                userId: user.id
            }
        }
        console.log(data);
        GlobalApi.addToCart(data, jwt).then(resp => {
            console.log(resp)
            toast('Added to Cart')
            setLoading(false)

        }, (e) => {
            toast('Error while adding into cart')
            setLoading(false)
        })
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            {/* Image */}
            <Image src={product.attributes.images.data[0].attributes.url || '/placeholder-product.png'}
                alt='image'
                width={300}
                height={300}
                className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
            />

            {/* Information */}
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.attributes.description}</h2>
                <div className='flex gap-3'>
                    {product.attributes.sellingPrice && (
                        <h2 className='font-bold text-3xl'>${product.attributes.sellingPrice}</h2>
                    )}
                    <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>${product.attributes.mrp}</h2>
                </div>
                <h2 className='font-medium text-lg'>Quantity ({product.attributes.itemQuantityType})</h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> = ${(quantity * productTotalPrice).toFixed(2)}</h2>
                    </div>
                    <Button disabled={loading} className="flex gap-3" onClick={() => addToCart()}>
                        <ShoppingBasket />
                        {loading? <LoaderCircle className='animate-spin' /> : 'Add To Cart'}
                    </Button>
                </div>
                <h2><span className='font-bold'>Category:</span> {product.attributes.categories.data[0].attributes.name}</h2>
                
                {/* Vendor Information */}
                {product.attributes.vendor && (
                    <div className="mt-4">
                        <VendorInfo vendor={product.attributes.vendor} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductItemDetail