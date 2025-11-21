import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useConfig } from "../contexts/ConfigContext";
import { fetchBlogBySlug, type BlogDetail as BlogDetailType } from "../lib/strapi";

const formatDate = (value: string | null) => {
  if (!value) return "";
  const iso = String(value);
  const datePart = iso.includes("T") ? iso.split("T")[0] : iso.slice(0, 10);
  return datePart;
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cfg = useConfig();
  const loadingText = cfg?.extra?.blog?.loadingText || "Loading...";
  const errorText = cfg?.extra?.blog?.errorText || "Error loading blog";
  const notFoundText = cfg?.extra?.blog?.detailNotFoundText || "Not found";

  useEffect(() => {
    let mounted = true;
    if (!slug) return;
    fetchBlogBySlug(slug)
      .then((data) => {
        if (mounted) setPost(data);
      })
      .catch((e: any) => {
        if (mounted) setError(e?.message || "Error loading blog");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
      {loading && <p>{loadingText}</p>}
      {!!error && <p className="text-red-500">{errorText}</p>}
      {!loading && !error && !post && <p>{notFoundText}</p>}
      {!loading && !error && post && (
        <article>
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <small className="text-brand-gray-light">{formatDate(post.createdAt)}</small>
          <div className="mt-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.contentMarkdown}</ReactMarkdown>
          </div>
        </article>
      )}
    </main>
  );
};

export default BlogDetail;