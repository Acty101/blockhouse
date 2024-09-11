interface ChartItem {
  title: string;
  content: React.ReactNode;
}

interface ChartSectionsProps {
  items: ChartItem[];
}

export default function ChartSections({ items }: ChartSectionsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {items.map((item, index) => (
        <section key={index} className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {item.title}
          </h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            {item.content}
          </div>
        </section>
      ))}
    </div>
  );
}
