const barChartLegendOptions = {
  dataFrom: "keys",
  anchor: "top-left",
  direction: "row",
  justify: false,
  translateX: 0,
  translateY: -40,
  itemsSpacing: 10,
  itemWidth: 100,
  itemHeight: 20,
  itemDirection: "left-to-right",
  itemOpacity: 0.85,
  symbolSize: 15,
  symbolShape: "circle",
  effects: [
    {
      on: "hover",
      style: {
        itemOpacity: 1,
      },
    },
  ],
};

export { barChartLegendOptions };
