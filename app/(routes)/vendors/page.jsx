"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GlobalApi from '../../_utils/GlobalApi'
import { Phone, Mail, MapPin, Star, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductItem from '../../_components/ProductItem'

function VendorsPage() {
    const [vendors, setVendors] = useState([])
    const [selectedVendor, setSelectedVendor] = useState(null)
    const [vendorProducts, setVendorProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getAllVendors()
    }, [])

    const getAllVendors = async () => {
        try {
            setLoading(true)
            const vendorList = await GlobalApi.getAllVendors()
            setVendors(vendorList)
        } catch (error) {
            console.error('Error fetching vendors:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleVendorSelect = async (vendor) => {
        setSelectedVendor(vendor)
        try {
            const products = await GlobalApi.getProductsByVendor(vendor.id)
            setVendorProducts(products)
        } catch (error) {
            console.error('Error fetching vendor products:', error)
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

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading vendors...</div>
                </div>
            </div>
        )
    }

    if (selectedVendor) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Button 
                    onClick={() => setSelectedVendor(null)}
                    variant="outline"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Vendors
                </Button>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {selectedVendor.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-3">
                                {renderStars(selectedVendor.rating)}
                                <span className="text-lg text-gray-600">
                                    ({selectedVendor.rating})
                                </span>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {selectedVendor.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-gray-800 font-medium">{selectedVendor.phone}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-800 font-medium">{selectedVendor.email}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-red-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="text-gray-800 font-medium leading-relaxed">
                                    {selectedVendor.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Specialties
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedVendor.specialties.map((specialty, index) => (
                                <span 
                                    key={index}
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            onClick={() => window.open(`mailto:${selectedVendor.email}`)}
                            className="flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            Email Vendor
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => window.open(`tel:${selectedVendor.phone}`)}
                            className="flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            Call Vendor
                        </Button>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Products from {selectedVendor.name}
                    </h2>
                    {vendorProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {vendorProducts.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">
                                No products available from this vendor at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Our Trusted Vendors
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Meet our quality suppliers who bring you the finest products with exceptional service and reliability.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vendors.map((vendor) => (
                    <div 
                        key={vendor.id} 
                        className="bg-white border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                        onClick={() => handleVendorSelect(vendor)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {vendor.name}
                            </h3>
                            <div className="flex items-center gap-1">
                                {renderStars(vendor.rating)}
                                <span className="text-sm text-gray-600 ml-1">
                                    ({vendor.rating})
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {vendor.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-green-600" />
                                <span className="text-gray-700">{vendor.phone}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-700">{vendor.email}</span>
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
                                        +{vendor.specialties.length - 2} more
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <Button className="w-full">
                            View Details & Products
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VendorsPage
