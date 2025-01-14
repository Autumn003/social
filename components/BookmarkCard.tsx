import React from "react"
import Image from "next/image"
import { FaBookmark} from "react-icons/fa6";
import { Tweet } from "@/gql/graphql";
import avatar from "@/public/user.png"
import Link from "next/link";
import { useDeleteBookmark } from "@/hooks/user";
import { motion } from "motion/react";


interface bookmarkCardProp {
    data: Tweet
}


const BookmarkCard: React.FC<bookmarkCardProp> = (props) => {
    const { data } = props;
    const {mutate} = useDeleteBookmark();

    const handleDeleteBookmark = async() => {
        if (!data.id) return;

        mutate(data.id);
    }

    const postCreatedDate = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Unknown';

    const feedcardAnimation = {
        initial: {opacity: 0},
        inView: {opacity: 1}
    }

    return (
        <>
            <motion.div
            initial='initial'
            whileInView='inView'
            transition={{
              opacity: { duration: 0.25 , ease: 'easeIn', }, 
             }}
            viewport={{once: true}}
            variants={feedcardAnimation}
            className=" px-4 py-2 border-b border-gray-900 hover:bg-opacity-20 hover:bg-stone-900 cursor-pointer transition-all ease-linear duration-200">
                <div className="flex gap-2 items-center">
                    <Link href={`/${data.author?.id}`}>
                    <Image
                    src={data.author?.profileImageURL || avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full w-8 md:w-10 hover:brightness-75 duration-200 transition-all ease-linear"
                    />
                    </Link>
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <Link 
                            href={`/${data.author?.id}`}
                            className="font-semibold hover:underline "
                            >
                                {data.author?.firstName} {data.author?.lastName}
                            </Link>
                            <p className="text-sm font-thin text-gray-600">{postCreatedDate}</p>
                        </div>
                        <button
                        onClick={() => handleDeleteBookmark()}
                        className="p-2 text-lg hover:text-neutral-400 transition-all ease-linear duration-200"
                        >
                            <FaBookmark />
                        </button>
                    </div>
                </div>
                <Link
                href={`/post/${data.id}`}
                className="">
                    <div className="my-2 mx-10 max-h-96 overflow-hidden">
                        {data.content}
                        {
                            data.imageURL && 
                            <Image
                                src={data.imageURL}
                                alt="Post Image"
                                width={300}
                                height={200}
                                className="my-1 w-full rounded-lg"
                            />
                        }
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

export default BookmarkCard;