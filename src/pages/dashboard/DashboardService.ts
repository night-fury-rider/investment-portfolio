import { iCategory } from "$/dashboard/dashboard.types";
import LoggerService from "services/LoggerService";
import { getTotalAmountInSelectedUnit } from "services/UtilService";

const getTotalAmount = (categories: iCategory[]) => {
  if (!Array.isArray(categories)) {
    LoggerService.error(`Incorrect Number is passed for getting total amount`);
    return 0;
  }
  const totalAmount = categories.reduce(
    (acc, currentObj) => acc + (Number(currentObj.value) || 0),
    0
  );

  return getTotalAmountInSelectedUnit(totalAmount);
};

export { getTotalAmount };
