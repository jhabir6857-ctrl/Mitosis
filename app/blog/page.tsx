"use client";

import ParallaxBanner from "@/components/ParallaxBanner";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 7,
    title: "শীতের ফ্লু বারবার ফিরে আসছে? কারণটা লুকিয়ে থাকতে পারে আপনার ঘুমে",
    summary: "শীতের ফ্লু ও ইমিউন সিস্টেম: ভালো ঘুম কেন এত জরুরি",
    image: "https://www.mitosislabltd.com/storage/blog/17670098332222.png",
    category: "Health Tips",
    date: "Dec 12, 2024",
    link: "https://www.mitosislabltd.com/blog-details/7",
  },
  {
    id: 6,
    title: "মাইটোসিস ল্যাবের হেলথ কার্ড",
    summary: "একটি হেলথ কার্ডের মাধ্যমে পরিবারের সকলের স্বাস্থ্য সুবিধা !",
    image: "https://www.mitosislabltd.com/storage/blog/17641600686707.png",
    category: "Updates",
    date: "Nov 25, 2024",
    link: "https://www.mitosislabltd.com/blog-details/6",
  },
  {
    id: 3,
    title: "স্ক্যাবিস: একটি ছোট পরজীবী, বড় যন্ত্রণার নাম",
    summary: "স্ক্যাবিস: ঘা নয়, ছোঁয়াচে চর্মরোগ—সচেতন হোন, সুস্থ থাকুন",
    image: "https://www.mitosislabltd.com/storage/blog/17511816862867.jpg",
    category: "Awareness",
    date: "Sep 14, 2024",
    link: "https://www.mitosislabltd.com/blog-details/3",
  },
  {
    id: 2,
    title: "বাংলাদেশে থাইরয়েড সমস্যা শুধু চিকিৎসা নয়, প্রয়োজন সচেতনতা !",
    summary: "সুস্থ থাইরয়েড, সুস্থ জীবন: রুটিন চেকআপ ও সঠিক পরামর্শই প্রথম ধাপ।",
    image: "https://www.mitosislabltd.com/storage/blog/17501440356897.png",
    category: "Awareness",
    date: "Aug 20, 2024",
    link: "https://www.mitosislabltd.com/blog-details/2",
  },
  {
    id: 1,
    title: "Why Regular Health Check-Ups Are Essential for a Healthier Bangladesh",
    summary: "Why Regular Health Check-Ups Matter",
    image: "https://www.mitosislabltd.com/storage/blog/17442771106448.jpg",
    category: "Health Tips",
    date: "Jun 05, 2024",
    link: "https://www.mitosislabltd.com/blog-details/1",
  }
];

export default function BlogPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <ParallaxBanner
        title="Our Blog & News"
        subtitle="Latest health tips, medical updates, and news from Mitosis Lab."
        imageSrc="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[40vh]"
      />

      <section className="section">
        <div className="container" style={{ padding: "3rem 1rem 6rem" }}>
          
          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card">
                
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-image" />
                </div>
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-category">
                      {post.category}
                    </span>
                    <span className="blog-date">
                      <Calendar size={14} /> {post.date}
                    </span>
                  </div>
                  
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-summary">{post.summary}</p>
                  
                  <div className="blog-footer">
                    <span className="blog-read-more">
                      Read Article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

              </a>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
