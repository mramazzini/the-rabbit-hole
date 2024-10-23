"use client";

import { updateRoute } from "@/lib/update.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const PageRoute = ({
  route,
  handleRouteChange,
}: {
  route: string;
  handleRouteChange: (route: string, newRoute: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [newRoute, setNewRoute] = useState("");
  const router = useRouter();
  return (
    <Fragment>
      <Link
        href={`/app/edit/${route}`}
        style={{
          color: "blue",
          textDecoration: "underline",
        }}
      >
        {route}
      </Link>
      <input
        type="text"
        value={newRoute}
        onChange={(e) => setNewRoute(e.target.value)}
        className="border p-1 m-4"
      />
      <button
        className="border p-1 m-4"
        onClick={() => {
          setLoading(true);
          handleRouteChange(route, newRoute);
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Change Route"}
      </button>
    </Fragment>
  );
};

export default PageRoute;
