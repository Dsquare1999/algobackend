"use client"
import { newsType, news_1, news_2 } from "@/data/news";
import { useEffect, useRef, useState } from "react";
import BreakingNews from "./breaking-news";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


interface BreakingNewsSideBarProps {
    side: number
}

const BreakingNewsSideBar = ({ side }: BreakingNewsSideBarProps) => {

    const newNews = side === 1 ? news_1 : news_2;
    const initialNews = side === 1 ? [news_1[0]] : [news_2[0]];
    
    const [news, setNews] = useState<newsType[]>(initialNews);
    const newsContainerRef = useRef<HTMLDivElement>(null);
    const [scrolling, setScrolling] = useState<boolean>(true)

    useEffect(() => {
        if(scrolling){
            const interval = setInterval(() => {
                
                setNews(prevNews => {
                    const nextIndex = prevNews.length % newNews.length;
                    const updatedNews = [...prevNews, newNews[nextIndex]];
                    scrollToBottom();
                    return updatedNews;
                });
                
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [news, newNews, scrolling]);

    const scrollToBottom = () => {
        if (newsContainerRef.current) {
            const scrollHeight = newsContainerRef.current.scrollHeight;
            newsContainerRef.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth"
            });
        }
    };

    return (    
        <ScrollArea ref={newsContainerRef} className="max-h-[80vh] w-full">
            {news?.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                    <BreakingNews 
                        src="/assets/image/logo.png"
                        title={item.title}
                        description={item.description}
                        since={item.since}

                        scrolling = {scrolling}
                        setScrolling = {setScrolling}
                    />
                </div>
            ))}
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
}

export default BreakingNewsSideBar;
