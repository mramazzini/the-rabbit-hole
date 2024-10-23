"use client";
import Markdown from "@/components/Markdown";
import { getPage } from "@/lib/read.actions";
import {
  toggleFrontPage,
  togglePublishPage,
  updatePage,
} from "@/lib/update.actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { route } = useParams();
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [frontpage, setFrontpage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    getPage(route as string).then((res) => {
      if (!res) return;
      setContent(res.content);
      setPublished(res.published);
      setLastUpdated(res.updatedAt);
      setFrontpage(res.frontpage);
      setLoading(false);
    });
  }, [route]);

  const handleSave = async () => {
    setLoading(true);
    await updatePage(route as string, content);
    setLoading(false);
  };

  const togglePublish = async () => {
    setLoading(true);
    await togglePublishPage(route as string);
    const res = await getPage(route as string);
    if (!res) return;
    setPublished(res.published);
    setLoading(false);
  };

  const toggleFrontpage = async () => {
    setLoading(true);
    await toggleFrontPage(route as string);
    const res = await getPage(route as string);
    if (!res) return;
    setFrontpage(res.frontpage);
    setLoading(false);
  };

  //ctrl s event listener
  useEffect(() => {
    const handleSave = async (
      e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setLoading(true);
        await updatePage(route as string, content);
        setLoading(false);
      }
    };
    window.addEventListener("keydown", handleSave);
    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, []);

  return (
    <div>
      <h1>Editor</h1>
      <div className="flex flex-row gap-4 my-4 items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowPreview(!showPreview);
              }}
            >
              Preview Markdown
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              Save
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                togglePublish();
              }}
            >
              Publish
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                toggleFrontpage();
              }}
            >
              Toggle Frontpage
            </button>
            |
            {published ? (
              <span className="text-green-500">Published</span>
            ) : (
              <span className="text-red-500">Not Published</span>
            )}{" "}
            |
            {
              <span className="text-gray-500">
                Frontpage: {frontpage ? "true" : "false"}
              </span>
            }{" "}
            |<span className="text-gray-500">Route: /page/{route}</span> |
            <span className="text-gray-500">
              Last Updated: {lastUpdated?.toLocaleString()}
            </span>{" "}
            |
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/page/${route}`}
            >
              View Page
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/app/edit`}
            >
              View all Pages
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/`}
            >
              Front Page
            </Link>
          </>
        )}
      </div>
      {showPreview ? (
        <Markdown content={content} />
      ) : (
        <textarea
          className="bg-gray-900 w-full min-h-screen text-white p-8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
    </div>
  );
}
