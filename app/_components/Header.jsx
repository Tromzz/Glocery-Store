"use client"

import { Button } from '@/components/ui/button'
import { CircleUserRound, LayoutGrid, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartDialog from './CartDialog'


function Header() {
    const [categoryList, setCategoryList] = useState([])
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [totalCartItem, setTotalCartItem] = useState(0)
    const router = useRouter()

    useEffect(() => {
        getCategorylist();
        // Check for sessionStorage only on client side
        if (typeof window !== 'undefined') {
            const jwt = sessionStorage.getItem('jwt');
            const userData = sessionStorage.getItem('user');
            setIsLogin(jwt ? true : false);
            setUser(userData ? JSON.parse(userData) : null);
        }
    }, [])

    const getCategorylist = () => {
        GlobalApi.getCategory().then(resp => {
            setCategoryList(resp.data.data);
        })
    }

    // COMMENTED OUT FOR STATIC SITE - Total counter
    // const getCartItems = async ()=>{
    //     const cartItemList = await GlobalApi.getCartItems(user)
    // }

    const OnSignOut = ()=>{
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
        }
        setIsLogin(false);
        setUser(null);
        router.push("/sign-in")
    }

    return (
        <div className='p-5 shadow-md flex justify-between'>
            {/* Left */}
            <div className='flex items-center gap-8'>
                <Image
                    src={"/logo.png"}
                    alt='logo'
                    width={150}
                    height={100}
                />
                {/* Category */}

                {/* COMMENTED OUT - Category dropdown
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='hidden md:flex items-center gap-2 border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' /> Category
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categoryList.map((category, index) => (
                            <Link key={index} href={'/product-category/' + category.attributes.name}>
                                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                                    <Image src={
                                        category?.attributes?.icon?.data?.attributes?.url || '/placeholder-icon.png'}
                                        alt='icon'
                                        width={30}
                                        height={30}
                                        unoptimized={true}
                                    />
                                    <h2 className='text-lg'>{category?.attributes?.name}</h2>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                */}

                {/* Search */}
                <div className='hidden md:flex gap-3 items-center border rounded-full p-2 px-5'>
                    <Search />
                    <input
                        type="text"
                        placeholder='Search'
                        className='outline-none'
                    />
                </div>

                {/* Vendors Link */}
                <Link href="/vendors">
                    <Button variant="outline" className="hidden md:flex">
                        Our Vendors
                    </Button>
                </Link>
            </div>

            {/* Right */}
            <div className='flex gap-5 items-center'>
                <CartDialog />
                {!isLogin ? (
                    <Link href={'/sign-in'}>
                        <Button>Login</Button>
                    </Link>
                ) :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserRound className='h-12 w-12 bg-green-100 text-primary rounded-full p-2 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My order</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => OnSignOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }

            </div>
        </div>
    )
}

export default Header