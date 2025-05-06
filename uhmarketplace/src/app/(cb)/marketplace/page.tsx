/*
// 
import { Card, Image, CardBody, CardFooter, Spacer } from '@nextui-org/react'
import Link from "next/link";
*/

import { prisma } from "../../../../prisma/prisma";
import Sidebar from "@/components/sideBar";
import ItemCarousel from "@/components/itemCarousel";
import DiscoverList from "@/components/discoverItems";
import SellerCarousel from "@/components/sellerCarousel";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Image from "next/image";
import tutorimage from "@/components/images/marketplace-image.png";
import ScrollFadeInNoRepeat from "@/components/ScrollFadeInNoRepeat";

// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default async function Marketplace() {
  /*
    const posts = await prisma.post.findMany();
    return (
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {posts.map((post) => (
            <Link href={`/marketplace/${post.id}`} key={post.id}>
              <Card shadow="sm" key={post.id}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={post.title}
                    className="w-full object-cover h-[140px]"
                    src={post.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA-3SEkzvkpZZxyJoONE7BQSnv7ruH8vNZQ&s"}
                  />
                  <CardFooter className="text-small justify-between">
                      <b>{post.title}</b>
                      <p>Created by: {post.authorName}</p>
                  </CardFooter>
                </CardBody>
              </Card>
              <Spacer></Spacer>
            </Link>
          ))}
        </div>
    );
    */

  const items = await prisma.post.findMany();

  const listSellers = [
    {
      id: 1,
      sellerName: "John Doe",
      sellerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNtLnYEqvhKKHET_JzfYOv5hZNV1cngGuY_A&s",
      rating: 4.8,
      totalProducts: 22,
      bio: "Experienced seller of vintage goods. Passionate about curating unique items.",
    },
    {
      id: 2,
      sellerName: "Jane Smith",
      sellerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfd9IjkNatR5vQCZOJcYizXm-H6s8zheDIQw&s",
      rating: 4.5,
      totalProducts: 18,
      bio: "Curating hand-made jewelry with a personal touch. Customer satisfaction is my top priority.",
    },
    {
      id: 3,
      sellerName: "Tom Johnson",
      sellerImage: "data:image/jpeg;base64,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",
      rating: 3.9,
      totalProducts: 15,
      bio: "Tech enthusiast selling the latest gadgets and accessories.",
    },
    {
      id: 4,
      sellerName: "Emma Brown",
      sellerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGMsN89v10SLQRZvXZTQJ4rUS1dNfN5ihNg&s",
      rating: 4.7,
      totalProducts: 30,
      bio: "Eco-friendly products that make a difference. Join me in creating a greener world.",
    },
    {
      id: 5,
      sellerName: "Michael Lee",
      sellerImage: "data:image/jpeg;base64,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",
      rating: 4.2,
      totalProducts: 10,
      bio: "Your one-stop shop for all things home decor. Fresh styles for your living space.",
    },
  ];

  return (
    <div className="bg-white flex">
      <Sidebar/>
      <div className="flex flex-col w-full m-4">
        <div className="relative w-fit">
            <Image
              src={tutorimage}
              alt="deafult image"
              width={1480} 
              height={300}
              className="rounded shadow mb-4"
            />

            <div className="absolute text-black z-20 top-8 left-12 text-2xl p-2">
                Cougar
            </div>
            <div className="absolute text-black z-20 top-12 left-10 text-[60px] p-2 font-bold">
                Marketplace
            </div>

        </div>
        <h1 className="text-cougRed text-3xl decoration-4 underline-offset-8 p-2 underline">
          Popular Items
        </h1>

        <ItemCarousel
          items={items.map((item) => ({ ...item}))}
        />
        <h1 className="text-cougRed text-3xl decoration-4 underline-offset-8 p-2 underline">
          Nearby Listings
        </h1>
        <ItemCarousel
          items={items.map((item) => ({ ...item}))}
        />
        {/* <h1 className="text-cougRed text-2xl underline decoration-4 underline-offset-8 p-4">
          Top Sellers
        </h1> */}
        <SellerCarousel
          sellers={listSellers.map((seller) => ({
            ...seller,
          }))}
        />
        <DiscoverList items={items} />
      </div>
    </div>
  );
}
