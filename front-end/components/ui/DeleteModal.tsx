type Props={
    id: number,
    handler: ()=>void,
    onClose: (id: number)=>void
    message: string
};

const ConfirmModal = ({id, handler, onClose, message}: Props)=>{

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 opacity-100 pointer-events-auto`}
        >
            <div className="bg-bg2 rounded-lg p-6 w-full max-w-sm shadow-md transform transition-transform duration-200">
                {message && <h2 className="text-xl font-bold text-text2 mb-4">{message}</h2>}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={()=>onClose(id)}
                        className="px-4 py-2 rounded-lg text-sm bg-text1 text-text2 hover:bg-text2 hover:text-text1 transition-colors duration-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handler}
                        className="px-4 py-2 rounded-lg text-sm bg-red-500 text-text2 hover:bg-text2 hover:text-red-500 transition-colors duratin-100"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
