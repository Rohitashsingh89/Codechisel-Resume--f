import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Top 10 Algorithm Challenges to Boost Your Skills",
    paragraph:
      "Explore these carefully selected algorithm problems that will help you sharpen your problem-solving skills and prepare for coding interviews.",
    image: "/images/blog/blog-04.png",
    author: {
      name: "Amit Sharma",
      image: "/images/blog/author-05.png",
      designation: "Senior Developer",
    },
    tags: ["algorithms"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "How to Approach Dynamic Programming Problems",
    paragraph:
      "Dynamic Programming is a vital topic for any coder. Learn step-by-step techniques to break down and solve DP challenges efficiently.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Sneha Verma",
      image: "/images/blog/author-04.png",
      designation: "Coding Instructor",
    },
    tags: ["dynamic-programming"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Mastering Data Structures for Competitive Programming",
    paragraph:
      "From arrays to trees and graphs, get a clear understanding of essential data structures that every programmer must master.",
    image: "/images/blog/blog-05.png",
    author: {
      name: "Rahul Gupta",
      image: "/images/blog/author-05.png",
      designation: "Software Engineer",
    },
    tags: ["data-structures"],
    publishDate: "2025",
  },
];
export default blogData;
