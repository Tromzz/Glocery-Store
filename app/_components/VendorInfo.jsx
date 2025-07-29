"use client"

import React from 'react'
import { Phone, Mail, MapPin, Star, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function VendorInfo({ vendor }) {
    if (!vendor) {
        return null
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-3 h-3 ${
                    index < Math.floor(rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                }`}
            />
        ))
    }

    return (
        <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Sold by</h3>
                <div className="flex items-center gap-1">
                    {renderStars(vendor.rating)}
                    <span className="text-xs text-gray-600 ml-1">
                        ({vendor.rating})
                    </span>
                </div>
            </div>
            
            <h4 className="text-lg font-bold text-primary mb-2">
                {vendor.name}
            </h4>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {vendor.description}
            </p>
            
            <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-3 h-3 text-green-600" />
                    <span className="text-gray-700">{vendor.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span className="text-gray-700">{vendor.email}</span>
                </div>
            </div>
            
            <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                    {vendor.specialties?.slice(0, 2).map((specialty, index) => (
                        <span 
                            key={index}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                            {specialty}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => window.open(`mailto:${vendor.email}`)}
                >
                    Email
                </Button>
                <Link href="/vendors" className="flex-1">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs"
                    >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default VendorInfo
