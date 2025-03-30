"use client"
import { useEffect, useState } from "react";

const PortfolioPage = () => {
  const [portfolioHTML, setPortfolioHTML] = useState("");

  useEffect(() => {
    const html = localStorage.getItem("portfolioHTML");
    if (html) {
      setPortfolioHTML(html);
    }
  }, []);

  return (
    <div className="p-5">
      <div dangerouslySetInnerHTML={{ __html: portfolioHTML }} />
    </div>
  );
};

export default PortfolioPage;
