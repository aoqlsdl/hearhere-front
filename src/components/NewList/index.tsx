const NewList = () => {
    const handleRedirect = (url: string) => {
        window.location.href = url;
    };
    return (
        <div
            className="w-[29.69rem] h-[33.5rem] 1440:h-[38.63rem] rounded-[49px] bg-primary-GRAY500 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleRedirect(`/`)}
        >
            <button
                type="button"
                className="bg-primary-BEIGE100 text-primary-PINK w-[7.35rem] h-[7.35rem] 1440:w-[10.31rem] 1440:h-[10.31rem] rounded-full text-[1.56rem] drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)] flex justify-center items-center"
            >
                <img
                    src="/assets/icons/library_add.svg"
                    className="w-[3.5rem] h-[3.5rem] 1440:w-[5.44rem] 1440:h-[5.44rem]"
                />
            </button>
            <span className="text-primary-PINK font-light text-[1.75rem] 1440:text-[2.5rem] mt-[2.63rem]">
                Create New
            </span>
        </div>
    );
};

export default NewList;
