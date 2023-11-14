import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({
  page,
  pages,
  keyword = "",
  categoryName = "",
}) {
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <>
              <li
                className={`page-item ${
                  x + 1 === parseInt(page) ? "active" : ""
                }`}
                key={x + 1}
              >
                <Link
                  className="page-link"
                  to={`/products/all/?keyword=${keyword}&pageNumber=${
                    x + 1
                  }&categoryName=${categoryName}`}
                >
                  {x + 1}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    )
  );
}
