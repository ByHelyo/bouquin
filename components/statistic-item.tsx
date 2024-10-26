interface StatisticItemProps {
  label: string;
  value: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col border border-border p-3 shadow-sm">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
};

export default StatisticItem;
