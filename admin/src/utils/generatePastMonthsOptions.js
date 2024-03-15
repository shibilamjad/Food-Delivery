export function generatePastMonthsOptions() {
  const currentDate = new Date();
  const options = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const month = date.toLocaleString("default", { month: "long" });
    options.push({ value: date.getMonth(), label: month });
  }

  return options;
}
