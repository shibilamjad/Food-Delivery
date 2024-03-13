import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, onChage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={currentSortBy}
      onChage={handleChange}
    />
  );
}

export default SortBy;
