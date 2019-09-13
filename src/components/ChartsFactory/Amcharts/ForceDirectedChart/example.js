const forceDirectedChartData = [];
for (let i = 0; i < 15; i++) {
  forceDirectedChartData.push({ name: `Node ${i}`, value: Math.random() * 50 + 10 });
}

export default forceDirectedChartData;
