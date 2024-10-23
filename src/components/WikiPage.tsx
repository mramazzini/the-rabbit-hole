"use client";
import { getPage } from "@/lib/read.actions";
import { Page } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "./Markdown";
import Link from "next/link";

const WikiPage = () => {
  const { route } = useParams();
  const [page, setPage] = useState<Page | null | undefined>(undefined);

  useEffect(() => {
    getPage(route as string).then((res) => {
      setPage(res);
    });
  }, [route]);

  if (page === undefined) {
    return <div>Loading...</div>;
  } else if (page === null) {
    return <div>Page not found</div>;
  } else if (!page.published) {
    return <div>Page not found</div>;
  } else {
    return (
      <div>
        <Link href="/">Front Page</Link>
        <Markdown content={page.content} />
      </div>
    );
  }
};

export default WikiPage;
