"use client"

import React from 'react'
import { Star, Store, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function VendorSection({ vendorList }) {
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

    // Show only first 3 vendors on homepage
    const featuredVendors = vendorList?.slice(0, 3) || []

    return (
        <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-green-600 font-bold text-3xl flex items-center gap-2">
                        <Store className="w-8 h-8" />
                        Our Trusted Vendors
                    </h2>
                    <p className="text-gray-600 mt-2">Meet our quality suppliers who bring you the finest products</p>
                </div>
                <Link href="/vendors">
                    <Button variant="outline" className="flex items-center gap-2">
                        View All Vendors
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVendors.map((vendor) => (
                    <div 
                        key={vendor.id} 
                        className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                    >
                        <div className="flex items-center justify-between mb-3">
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
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {vendor.description}
                        </p>
                        
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-800 mb-2">
                                Specialties:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {vendor.specialties?.slice(0, 2).map((specialty, index) => (
                                    <span 
                                        key={index}
                                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                                {vendor.specialties?.length > 2 && (
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                        +{vendor.specialties.length - 2} more
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
                                Contact
                            </Button>
                            <Link href="/vendors" className="flex-1">
                                <Button 
                                    size="sm" 
                                    className="w-full"
                                >
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {vendorList?.length > 3 && (
                <div className="text-center mt-8">
                    <Link href="/vendors">
                        <Button className="px-8">
                            Explore All {vendorList.length} Vendors
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default VendorSection
