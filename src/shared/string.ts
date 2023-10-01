export function convertCurrencyToVND(value: number | string, replaceStr = "Đồng") {
  return typeof value === "number"
    ? value.toLocaleString("it-IT", { style: "currency", currency: "VND" }).replace("VND", replaceStr)
    : parseFloat(value).toLocaleString("it-IT", { style: "currency", currency: "VND" }).replace("VND", replaceStr);
}
