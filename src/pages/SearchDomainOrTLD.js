import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchDomainOrTLD() {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("type");

  return <div>SearchDomainOrTLD</div>;
}

export default SearchDomainOrTLD;
