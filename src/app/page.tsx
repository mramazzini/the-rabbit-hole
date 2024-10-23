"use client";

import { getPages } from "@/lib/read.actions";
import { Page } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [pages, setPages] = useState<Page[]>([]);
  useEffect(() => {
    getPages().then((res) => {
      setPages(
        res.filter((page) => page.published).filter((page) => page.frontpage)
      );
    });
  }, []);
  return (
    <div>
      <h1>The Rabbit Hole</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.route}>
            <a href={`/page/${page.route}`}>{page.route}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
