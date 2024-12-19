import { Plus, Trash, Copy, ClipboardPaste, Heart } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  onAddNewMeal?: () => void;
  onAddExistingMeal?: () => void;
  onAddFavoriteMeal?: () => void;
  onDeleteMeal?: () => void;
  onCopyMeal?: () => void;
  onPasteMeal?: () => void;
};

const RightClickMenu: React.FC<Props> = ({
  children,
  onAddNewMeal,
  onAddExistingMeal,
  onAddFavoriteMeal,
  onDeleteMeal,
  onCopyMeal,
  onPasteMeal,
}) => {
  const { t } = useTranslation();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onAddNewMeal}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addNewMeal')}
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddExistingMeal}>
          {t('addExistingMeal')}
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddFavoriteMeal}>
          <Heart className="mr-2 h-4 w-4" />
          {t('addFavoriteMeal')}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDeleteMeal}>
          <Trash className="mr-2 h-4 w-4" />
          {t('deleteMeal')}
        </ContextMenuItem>
        <ContextMenuItem onClick={onCopyMeal}>
          <Copy className="mr-2 h-4 w-4" />
          {t('copyMeal')}
        </ContextMenuItem>
        <ContextMenuItem onClick={onPasteMeal}>
          <ClipboardPaste className="mr-2 h-4 w-4" />
          {t('pasteMeal')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RightClickMenu;