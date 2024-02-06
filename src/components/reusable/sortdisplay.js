export default function sortDisplay(type, data) {
  switch (type) {
    case "date-created-ascending":
      return [...data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))];

    case "date-created-descending":
      return [...data.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))];

    case "date-modified-ascending":
      return [...data.sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))];
    case "date-modified-descending":
      return [...data.sort((a, b) => new Date(a.dateModified) - new Date(b.dateModified))];

    // ? Group Sort
    case "alphabetical-group-ascending":
      return [...data.sort((a, b) => a.name.localeCompare(b.name))];
    case "alphabetical-group-descending":
      return [...data.sort((a, b) => b.name.localeCompare(a.name))];

    // ? Cards Sort
    case "alphabetical-question-ascending":
      return [...data.sort((a, b) => a.question.localeCompare(b.question))];
    case "alphabetical-question-descending":
      return [...data.sort((a, b) => b.question.localeCompare(a.question))];

    case "alphabetical-answer-ascending":
      return [...data.sort((a, b) => a.answer.localeCompare(b.answer))];
    case "alphabetical-answer-descending":
      return [...data.sort((a, b) => b.answer.localeCompare(a.answer))];
  }
}
