import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Recipe } from "@/types/recipes";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (recipe: Recipe) => void;
  date: Date;
  existingMeals: Recipe[];
};

const AddExistingMealPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  date,
  existingMeals,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Existing Meal</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {existingMeals.map((meal) => (
            <div
              key={meal.id}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelect(meal)}
            >
              <div className="relative h-40">
                <Image
                  src={meal.imageUrl || "/placeholder.svg"}
                  alt={meal.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{meal.title}</h3>
                <p className="text-sm text-gray-600">{meal.category}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExistingMealPopup;
