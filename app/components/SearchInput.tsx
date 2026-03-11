"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

useEffect(() => {
  const query = {
    title: debouncedValue,
  };

  const url = qs.stringifyUrl({
    url: "/search",
    query: query,
  });

  router.push(url);
}, [debouncedValue, router]);

return (
  <Input
    placeholder="Cosa vuoi sentire?"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
);
};

export default SearchInput;