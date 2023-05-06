import debounce from "lodash/debounce";
import useRouter from "@hooks/useRouter";
import { Input } from "antd";
import { useCallback } from "react";

export const SearchBar = () => {
  const { navigate } = useRouter();

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (!value) navigate("/");
      else navigate(`/search?query=${value}`);
    }, 500),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <Input.Search
      placeholder="Input your search text"
      onChange={onChange}
      allowClear
      className="min-w-[700px]"
    />
  );
};
