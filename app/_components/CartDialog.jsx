"use client"

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingBag, Phone, Mail, MapPin, Star, Store } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function CartDialog() {
    const [vendors, setVendors] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        getAllVendors()
    }, [])

    const getAllVendors = async () => {
        try {
            const vendorList = await GlobalApi.getAllVendors()
            setVendors(vendorList)
        } catch (error) {
            console.error('Error fetching vendors:', error)
        }
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < Math.floor(rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                }`}
            />
        ))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <h2 className='flex gap-2 items-center text-lg cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors'>
                    <ShoppingBag className='w-7 h-7' />
                    <span className='bg-primary text-white px-2 rounded-full'>0</span>
                </h2>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
                        <Store className="w-8 h-8 text-primary" />
                        Our Trusted Vendor Network
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                        Connect with our quality suppliers and explore their specialties
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {vendors.map((vendor) => (
                        <div 
                            key={vendor.id} 
                            className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:border-primary/20"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800 truncate">
                                    {vendor.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                    {renderStars(vendor.rating)}
                                    <span className="text-sm text-gray-600 ml-1">
                                        ({vendor.rating})
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                                {vendor.description}
                            </p>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700 truncate">{vendor.phone}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <span className="text-gray-700 truncate">{vendor.email}</span>
                                </div>
                                
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed line-clamp-2">
                                        {vendor.address}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">
                                    Specialties:
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {vendor.specialties.slice(0, 2).map((specialty, index) => (
                                        <span 
                                            key={index}
                                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                    {vendor.specialties.length > 2 && (
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                            +{vendor.specialties.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => window.open(`mailto:${vendor.email}`)}
                                >
                                    Email
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => window.open(`tel:${vendor.phone}`)}
                                >
                                    Call
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 text-center space-y-4">
                    <Link href="/vendors">
                        <Button 
                            variant="default"
                            className="px-8 mr-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <Store className="w-4 h-4 mr-2" />
                            Explore All Vendors
                        </Button>
                    </Link>
                    <Button 
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="px-8"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CartDialog
