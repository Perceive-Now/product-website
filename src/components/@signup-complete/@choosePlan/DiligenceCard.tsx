/**
 *
 */
export default function DiligenceCard({ title, description, icon }: IDiligenceCardProps) {
  return (
    <div className="bg-gray-100 px-2 py-3">
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>

        <span className="text-xl">{title}</span>
      </div>

      <div className="mt-2 mr-4">{description}</div>
    </div>
  );
}

interface IDiligenceCardProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}
