import Select from "../../reusable/Select";
export default function Sort() {
  return (
    <Select>
      <option value="date-created-ascending">Show New Groups First</option>
      <option value="date-created-descending">Show Old Groups First</option>
      <option value="date-modified-ascending">Show Recently Modified First</option>
      <option value="date-modified-descending">Show Last Modified First</option>
      <option value="alphabetical-modified-dscending">Alphabetical A-Z</option>
      <option value="alphabetical-modified-descending">Alphabetical Z-A</option>
    </Select>
  );
}
