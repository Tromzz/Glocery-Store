// COMMENTED OUT FOR STATIC WEBSITE VIEWING
// import { data } from "autoprefixer";
// const { default: axios } = require("axios");
// const axiosClient = axios.create({
//     baseURL: 'http://127.0.0.1:1337/api'
// })

// IMPORT MOCK DATA FROM JSON
import mockData from './mockData.json';

// MOCK DATA FOR STATIC WEBSITE
const mockSliders = mockData.sliders;
const mockCategories = mockData.categories;
const mockVendors = mockData.vendors;
const mockProducts = mockData.products;

// LEGACY MOCK DATA (keeping for backward compatibility)
const legacyMockCategories = [
    {
        id: 1,
        attributes: {
            name: "Vegetables",
            icon: {
                data: {
                    attributes: {
                        url: "/vegetable-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 2,
        attributes: {
            name: "Fruits",
            icon: {
                data: {
                    attributes: {
                        url: "/fruit-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 3,
        attributes: {
            name: "Dairy",
            icon: {
                data: {
                    attributes: {
                        url: "/dairy-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 4,
        attributes: {
            name: "Meat & Seafood",
            icon: {
                data: {
                    attributes: {
                        url: "/meat-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 5,
        attributes: {
            name: "Bakery",
            icon: {
                data: {
                    attributes: {
                        url: "/bakery-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 6,
        attributes: {
            name: "Beverages",
            icon: {
                data: {
                    attributes: {
                        url: "/beverage-icon.png"
                    }
                }
            }
        }
    },
    {
        id: 7,
        attributes: {
            name: "Snacks",
            icon: {
                data: {
                    attributes: {
                        url: "/snacks-icon.png"
                    }
                }
            }
        }
    }
];

// VENDOR DATA - Using data from mockData.json

// PRODUCT DATA - Using data from mockData.json

// MOCK FUNCTIONS THAT RETURN STATIC DATA
// Client Side
const getCategory = () => Promise.resolve({ data: { data: mockCategories } });

// Server Side
const getSliders = () => Promise.resolve(mockSliders);

// Server Side
const getCategoryList = () => Promise.resolve(mockCategories);

// Function to add vendor information to products
const addVendorToProducts = (products) => {
    return products.map(product => {
        const vendorId = product.attributes.vendorId;
        const vendor = mockVendors.find(v => v.id === vendorId);
        return {
            ...product,
            attributes: {
                ...product.attributes,
                vendor: vendor
            }
        };
    });
};

// All Products
const getAllProducts = () => {
    const productsWithVendors = addVendorToProducts(mockProducts);
    return Promise.resolve(productsWithVendors);
};

// Get Product By Category
const getProductsByCategory = (category) => {
    const filteredProducts = mockProducts.filter(product => 
        product.attributes.categories.data.some(cat => 
            cat.attributes.name.toLowerCase() === category.toLowerCase()
        )
    );
    const productsWithVendors = addVendorToProducts(filteredProducts);
    return Promise.resolve(productsWithVendors);
};

// COMMENTED OUT DATABASE FUNCTIONS
// Register User
// const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
//     username:username,
//     email:email,
//     password:password
// })

// Sign In User
// const SignIn = (email, password)=> axiosClient.post('/auth/local',{
//     identifier: email,
//     password:password
// })

// Add To Cart
// const addToCart = (data, jwt)=> axiosClient.post('/user-carts', data, {
//     headers:{
//         Authorization: 'Bearer ' +jwt
//     }
// })

// Use to get total cart item counter
// const getCartItems = (userId, jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&populate=*', {
//     headers: {
//         Authorization: 'Bearer '+jwt
//     }
// }).then(resp=>{
//     return data.data;
// })

// VENDOR FUNCTIONS
const getAllVendors = () => Promise.resolve(mockVendors);

const getVendorById = (vendorId) => {
    const vendor = mockVendors.find(v => v.id === vendorId);
    return Promise.resolve(vendor);
};

const getVendorByProductId = (productId) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product && product.attributes.vendorId) {
        const vendor = mockVendors.find(v => v.id === product.attributes.vendorId);
        return Promise.resolve(vendor);
    }
    return Promise.resolve(null);
};

const getProductsByVendor = (vendorId) => {
    const filteredProducts = mockProducts.filter(product => {
        const pid = product.attributes.vendorId;
        if (Array.isArray(pid)) {
            return pid.includes(vendorId);
        }
        return pid === vendorId;
    });
    const productsWithVendors = addVendorToProducts(filteredProducts);
    return Promise.resolve(productsWithVendors);
};

const getVendorsByCategory = (categoryName) => {
    const categoryProducts = mockProducts.filter(product => 
        product.attributes.categories.data.some(cat => 
            cat.attributes.name.toLowerCase() === categoryName.toLowerCase()
        )
    );
    
    const vendorIds = [...new Set(categoryProducts.map(product => product.attributes.vendorId))];
    const vendors = mockVendors.filter(vendor => vendorIds.includes(vendor.id));
    return Promise.resolve(vendors);
};

// MOCK FUNCTIONS FOR AUTH (return empty/false for static site)
const registerUser = () => Promise.resolve({ data: null });
const SignIn = () => Promise.resolve({ data: null });
const addToCart = () => Promise.resolve({ data: null });
const getCartItems = () => Promise.resolve([]);

export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    getAllVendors,
    getVendorById,
    getVendorByProductId,
    getProductsByVendor,
    getVendorsByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItems,
}