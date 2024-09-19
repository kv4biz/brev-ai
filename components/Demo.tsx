"use client";
import { useState, useEffect } from "react";
import { Copy, CheckCheck, Link2, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLazyGetSummaryQuery } from "@/services/article";

// Define the Article interface
interface Article {
  url: string;
  summary: string;
}

// Schema validation for URL input
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

const Demo = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [copied, setCopied] = useState("");

  // Fetch summary lazily from the API
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load articles from local storage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );
    if (articlesFromLocalStorage.length) {
      setAllArticles(articlesFromLocalStorage as Article[]);
    }
  }, []);

  // Submit handler for form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  // Handles the form submission and fetches the article summary
  const onSubmit = async (values: { url: string }) => {
    const existingArticle = allArticles.find((item) => item.url === values.url);

    if (existingArticle) {
      return setArticle(existingArticle); // Set existing article if already found
    }

    const { data } = await getSummary({ articleUrl: values.url });
    if (data?.summary) {
      const newArticle = { url: values.url, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];

      // Update state and localStorage
      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  // Copy the URL to clipboard
  const handleCopy = (url: string) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(""), 3000); // Reset after 3 seconds
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search Form */}
      <div className="flex flex-col w-full justify-center gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article URL</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-between gap-4">
                      <Input placeholder="Paste the article link" {...field} />
                      <Link2 className="absolute right-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center mb-4">
              <Button
                type="submit"
                className="w-full max-w-[240px] peer-focus:border-gray-700 peer-focus:text-gray-700"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                {copied === item.url ? (
                  <CheckCheck className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </div>
              <p className="flex-1 font-medium text-blue-700 text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <LoaderCircle className="w-20 h-20 object-contain text-rose-300 animate-spin duration-800" />
        ) : error ? (
          <p className="text-center text-red-500">An error occurred</p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600">
                Article <span className="text-primary">Summary</span>
              </h2>
              <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                <p className="text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
