import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetsStatsCard } from "@/types/dashboard_types";
import { motion } from "framer-motion";

interface StatsCardProps {
  dataBulk: any;
  data: AssetsStatsCard[];
}

const StatsCard = ({ dataBulk, data }: StatsCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((card, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="dark:border-gray-800 dark:bg-gray-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 dark:text-white/90">
                {card.icon}
                <span>{card.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold dark:text-white/90">
                  {card.getValue(dataBulk)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {card.getPercentage(dataBulk)}% of total
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;
