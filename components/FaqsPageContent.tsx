"use client";

import { useCallback, useState } from "react";
import { FaqSearch } from "./FaqSearch";
import { FaqBrowse } from "./FaqBrowse";

export function FaqsPageContent() {
  const [activeQuery, setActiveQuery] = useState("");

  const handleActiveQueryChange = useCallback((next: string) => {
    setActiveQuery(next);
  }, []);

  const isSearching = activeQuery.length > 0;

  return (
    <>
      <div className="mb-10 sm:mb-12">
        <FaqSearch onActiveQueryChange={handleActiveQueryChange} />
      </div>

      <div hidden={isSearching}>
        <FaqBrowse />
      </div>
    </>
  );
}
