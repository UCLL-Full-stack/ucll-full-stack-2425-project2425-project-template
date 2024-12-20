import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    warning?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, warning, onConfirm, onCancel }) => {
    const { t } = useTranslation(['common']);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                {warning && (
                    <p className="text-sm text-red-500 font-semibold mb-4">{warning}</p>
                )}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                    >
                        {t('actions.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                    >
                        {t('actions.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
