"use client";

import { createPage } from "@/lib/create.actions";
import { getPages } from "@/lib/read.actions";
import { updateRoute } from "@/lib/update.actions";
import { Page } from "@prisma/client";
import { useEffect, useState } from "react";
import PageRoute from "./PageRoute";

const Dashboard = () => {
  const [pages, setPages] = useState<Page[] | null>(null);
  useEffect(() => {
    getPages().then((res) => {
      setPages(res);
    });
  }, []);
  const generateRandomRoute = () => {
    return Math.random().toString(36).substring(7);
  };

  const handleCreatePage = async () => {
    await createPage({ route: generateRandomRoute(), content: "" });
    const newPages = await getPages();
    setPages(newPages);
  };

  const handleRouteChange = async (route: string, newRoute: string) => {
    if (newRoute === "") {
      return;
    }
    setPages(null);
    try {
      await updateRoute({ oldRoute: route, newRoute: newRoute });
    } catch (error) {
      console.error(error);
    } finally {
      getPages().then((res) => {
        setPages(res);
      });
      setPages(null);
    }
  };
  return (
    <div className="p-8">
      <h1>Editor</h1>
      <button className="border p-1 my-4" onClick={handleCreatePage}>
        Create Page
      </button>
      <h2>Pages</h2>
      {pages === null ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {pages.map((page) => (
            <li key={page.route}>
              <PageRoute
                route={page.route}
                handleRouteChange={(route: string, newRoute: string) => {
                  try {
                    if (newRoute.includes(" ")) {
                      alert("Route cannot contain spaces");
                    } else if (newRoute === "") {
                      alert("Route cannot be empty");
                    }

                    handleRouteChange(route, newRoute);
                    getPages().then((res) => {
                      setPages(res);
                    });
                  } catch (error) {
                    console.error(error);
                    alert("Error updating route");
                  }
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
