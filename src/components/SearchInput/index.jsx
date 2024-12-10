import { useEffect, useState } from "react";
import './index.scss'

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const SearchInput = ({onChange}) => {
  const [value, setValue] = useState('');
  const debouncedSearchTerm = useDebouncedValue(value, 500);

  useEffect(() => {
    onChange(debouncedSearchTerm)
    console.log(debouncedSearchTerm)
  }, [debouncedSearchTerm, onChange]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search rocket name"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          
        }}
      />
    </div>
  );
}

export {SearchInput}