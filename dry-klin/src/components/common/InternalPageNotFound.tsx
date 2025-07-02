import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

const InternalPageNotFound = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{desc}</p>
      <Button
        variant="outline"
        className="dark:bg-gray-800/50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default InternalPageNotFound;
