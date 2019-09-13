const radialLineChartData = [];
let value1 = 500;
let value2 = 600;

for (let i = 0; i < 12; i++) {
  const date = new Date();
  date.setMonth(i, 1);
  value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
  value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
  radialLineChartData.push({ name: date, value1, value2 });
}

export default radialLineChartData;
