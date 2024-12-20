import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "next-i18next";

type Props = {
  currentDate: Date;
  viewMode: "month" | "week"; // not implemented yet
  selectionModeActive: boolean;
  selectedDatesCount: number;
  onChangeMonth: (value: number) => void;
  onToggleSelectionMode: () => void;
  onChangeViewMode: (mode: "month" | "week") => void; // not implemented yet
  onDeleteMeals: () => void;
  onAddToShoppingList: () => void;
  onToday: () => void;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; // make type?

const CalendarHeader: React.FC<Props> = ({
  currentDate,
  viewMode,
  selectionModeActive,
  selectedDatesCount,
  onChangeMonth,
  onToggleSelectionMode,
  onChangeViewMode,
  onDeleteMeals,
  // onAddToShoppingList,
  onToday,
}) => {
  const { t } = useTranslation("common");

  return (
    <section className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => onChangeMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="m-0 text-lg font-semibold">
          {t(months[currentDate.getMonth()])} {currentDate.getFullYear()}
        </p>
        <Button variant="ghost" size="icon" onClick={() => onChangeMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            onToday();
          }}
        >
          {t("today")}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={selectionModeActive ? "default" : "outline"}
          onClick={onToggleSelectionMode}
        >
          {selectionModeActive ? t("cancelSelection") : t("select")}
        </Button>
        <Button
          variant="outline"
          disabled={selectedDatesCount === 0}
          onClick={onDeleteMeals}
        >
          {t("deleteMeals")}
        </Button>
        <Select
          onValueChange={(value) => onChangeViewMode(value as "month" | "week")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={viewMode} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">{t("month")}</SelectItem>
            <SelectItem value="week">{t("week")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default CalendarHeader;
