export default function SaveCollectionBtnUI({
        onSaveButtonClick,
        onMouseDown,
        onMouseUp
}: {
        onSaveButtonClick: () => void;
        onMouseDown: () => void;
        onMouseUp: () => void;
}) {
        return (
                <button
                        className='bg-gray-800 hover:bg-green-800 simpleButton'
                        onClick={onSaveButtonClick}
                        onMouseOver={onMouseDown}
                        onMouseLeave={onMouseUp}
                        type='button'>
                        Зберегти
                </button>
        );
}
