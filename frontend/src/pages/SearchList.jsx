import BlogCard from "@/components/BlogCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = (params.get("q") || "").trim().toLowerCase();
  const { blog } = useSelector((store) => store.blog);
  const blogs = Array.isArray(blog) ? blog : [];

  const filteredBlogs = blogs.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const subtitle = (item.subtitle || "").toLowerCase();
    const category = (item.category || "").toLowerCase();
    return title.includes(query) || subtitle.includes(query) || category.includes(query);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-5">Search Results for: &quot;{query}&quot;</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10">
          {filteredBlogs.map((item) => (
            <BlogCard key={item._id} blog={item} />
          ))}
          {filteredBlogs.length === 0 && (
            <p className="col-span-full text-center">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
