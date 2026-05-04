const PriceChart = ({ data }) => {
  if (!data.length) {
    return (
      <div className="grid h-44 place-items-center rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-500">
        Chart data unavailable for this live backend asset.
      </div>
    );
  }

  // Lightweight visual chart for mock market data.
  return (
    <div className="grid h-44 grid-cols-7 items-end gap-2 rounded-2xl bg-slate-50 p-4">
      {data.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="rounded-t-md bg-[#0052ff]"
          style={{ height: `${value * 8}%` }}
        />
      ))}
    </div>
  );
};

export default PriceChart;
