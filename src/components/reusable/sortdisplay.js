export default function sortDisplay(type, data) {
  switch (type) {
    case "date-created-ascending":
      return [...data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))];

    case "date-created-descending":
      return [...data.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))];

    case "date-modified-ascending":
      return [...data.sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))];

      break;
    case "date-modified-descending":
      return [...data.sort((a, b) => new Date(a.dateModified) - new Date(b.dateModified))];

      break;
    case "alphabetical-modified-ascending":
      return [...data.sort((a, b) => b.name.localeCompare(a.name))];
      break;
    case "alphabetical-modified-descending":
      return [...data.sort((a, b) => a.name.localeCompare(b.name))];

      break;
  }
}
