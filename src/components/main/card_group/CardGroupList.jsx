import CardGroupElem from "./CardGroupElem";

// ! Testing Purposes. It is to produce CardGroupElems. REMOVE THIS AFTER CREATING A DATA STUCTURE
const testArray = [1, 2, 3, 4, 5, 6, 7];

export default function CardGroupList() {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2 ">
      {testArray.map((elem, i) => {
        return (
          <CardGroupElem
            style={{animationDelay: `${i * 0.05}s`}}
            sideColor="cornflowerblue"
            key={i}
          />
        );
      })}
    </div>
  );
  // TODO: Use the correct array (the main data) for the array
  // TODO: Use the correct key for each element
}
