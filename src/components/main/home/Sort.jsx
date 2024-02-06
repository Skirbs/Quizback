import Select from "../../reusable/Select";
export default function Sort({onSort, type}) {
  return (
    <Select onChange={onSort} defaultValue="date-modified-ascending">
      <option value="date-modified-ascending">Show Recently Modified First</option>
      <option value="date-modified-descending">Show Last Modified First</option>
      <option value="date-created-ascending">Show New {type} First</option>
      <option value="date-created-descending">Show Old {type} First</option>
      {type === "Groups" && (
        <>
          <option value="alphabetical-group-ascending">Alphabetical A-Z</option>
          <option value="alphabetical-group-descending">Alphabetical Z-A</option>
        </>
      )}
      {type === "Cards" && (
        <>
          <option value="date-quiz-ascending">Closest Quiz Date First</option>
          <option value="date-quiz-descending">Furthest Quiz Date First</option>

          <option value="alphabetical-question-ascending">Question Alphabetical A-Z</option>
          <option value="alphabetical-question-descending">Question Alphabetical Z-A</option>

          <option value="alphabetical-answer-ascending">Answers Alphabetical A-Z</option>
          <option value="alphabetical-answer-descending">Answers Alphabetical Z-A</option>
        </>
      )}
    </Select>
  );
}
