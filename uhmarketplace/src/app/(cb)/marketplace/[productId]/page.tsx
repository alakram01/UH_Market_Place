import { prisma } from "../../../../../prisma/prisma";
import Link from "next/link";
import SellerCarousel from "@/components/sellerCarousel";
import SellerSummaryCard from '../../../../components/sellerCard';
// import ProductCard from "@/components/product/ProductCard";

export default async function Product({
    params,
}: {
    params: Promise<{ productId: number }>
}) {
    const paramData = Number((await params).productId);
    const rating = 4.5
    const listSellers = [
        {
          id: 1,
          sellerName: "John Doe",
          sellerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNtLnYEqvhKKHET_JzfYOv5hZNV1cngGuY_A&s",
          rating: 4.8,
          totalProducts: 22,
          bio: "My new pet cougar had quickly become my new best friend!!!",
        },
        {
          id: 2,
          sellerName: "Jane Smith",
          sellerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfd9IjkNatR5vQCZOJcYizXm-H6s8zheDIQw&s",
          rating: 4.5,
          totalProducts: 18,
          bio: "Taking my cougar into battle is the experience of a lifetime!",
        },
        {
          id: 3,
          sellerName: "Tom Johnson",
          sellerImage: "data:image/jpeg;base64,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",
          rating: 3.9,
          totalProducts: 15,
          bio: "My cougar is such a great companion. Little hesistent of having a wild animal as a pet",
        },
      ];

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: paramData
            }
        })

        if(post) {
            return (
                <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-md mt-10">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2">
                            <img src={post.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s"} alt={post.title} className="w-full h-auto rounded-lg" />
                        </div>
                        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
                            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                            <p className="text-gray-700 mb-6">{post.description}</p>
                            <p className="text-3xl font-semibold text-black-600 mb-6">${post.price.toString()}</p>
                            <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">Buy Now</button>
                            <p className="text-gray-700 mb-6 pt-5">Created by: {post.authorName}</p>
                            <p className="text-gray-700 mb-6">Authors Email: {post.authorEmail}</p>
                            <p className="text-gray-700 mb-6">{post.createdAt.toLocaleDateString()}</p>
                            <Link href="/marketplace">
                                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                    Back to Marketplace
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl">Reviews:</p>
                        <div className="flex items-center text-3xl text-yellow-500 mt-1 gap-x-1">
                            {/* Render rating stars */}
                            {Array.from({ length: 5 }, (_, i) => (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                            >
                                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.172L12 18.897l-7.336 3.86 1.402-8.172L.132 9.211l8.2-1.193z" />
                            </svg>
                            
                                ))}
                            <span className="ml-2 text-[20px] text-gray-500">({rating}/5)</span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-columns-3">
                        <SellerCarousel
                            sellers={listSellers.map((seller) => ({
                                ...seller,
                            }))}
                        />
                    </div>
                </div>
            )
        } else {
            return <h1 className="text-center text-2xl mt-10">404 - Page Not Found.</h1>
        }

    } catch (error) {
        return <h2 className="text-center text-2xl mt-10">Wrong turn partner.</h2>
    }
}