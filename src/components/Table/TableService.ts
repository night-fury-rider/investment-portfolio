import { iData } from "./Table.types";

const descendingComparator = (a: iData, b: iData, orderBy: string): number => {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  // Handle type safety for comparison (in case string or number)
  if (typeof aValue === "string" && typeof bValue === "string") {
    return aValue.localeCompare(bValue);
  } else if (typeof aValue === "number" && typeof bValue === "number") {
    return aValue - bValue;
  }
  return 0;
};

// Get comparator based on sorting order
const getComparator = (order: "asc" | "desc", orderBy: string) => {
  return order === "desc"
    ? (a: iData, b: iData) => descendingComparator(a, b, orderBy)
    : (a: iData, b: iData) => -descendingComparator(a, b, orderBy);
};

// Stable sort function
const stableSort = (
  rawData: iData[],
  comparator: (a: iData, b: iData) => number
): iData[] => {
  const stabilizedArray = rawData.map(
    (el, index) => [el, index] as [iData, number]
  );
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedArray.map((el) => el[0]);
};
export { descendingComparator, getComparator, stableSort };
