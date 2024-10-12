interface Props {
    asmr: { readonly id: number; title: string };
}

const ASMRList = ({ asmr }: Props) => {
    const handleRedirect = (url: string) => {
        window.location.href = url;
    };
    return (
        <div className="w-[29.69rem] h-[33.5rem] 1440:h-[38.63rem] rounded-[49px] bg-primary-GRAY400 flex flex-col items-center justify-center cursor-pointer">
            <div className="w-[20rem] h-[20rem] 1440:w-[24rem] 1440:h-[24rem] rounded-full bg-lp_cover bg-cover flex justify-center items-center drop-shadow-[14px_14px_4px_rgba(0,0,0,0.25)] cursor-default">
                <div className="w-[9rem] h-[9rem] font-Luxurious 1440:w-[10.63rem] 1440:h-[10.63rem] rounded-full bg-white text-center leading-[9rem] 1440:leading-[10.63rem] select-none cursor-default">
                    {asmr.title}
                </div>
            </div>
            <div className="w-[23.5rem] text-primary-PINK font-semibold text-[2rem] 1440:text-[2.81rem] mt-[2.68rem] mb-[1.06rem] whitespace-nowrap text-ellipsis overflow-hidden text-center">
                {asmr.title}
            </div>
            <button
                type="button"
                className="bg-white hover:bg-primary-PINK text-primary-PINK hover:text-white w-[7rem] h-[3rem] 1440:w-[7.63rem] 1440:h-[3.19rem] rounded-[15px] text-lg 1440:text-[1.56rem] drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
                onClick={() => handleRedirect(`/player/${asmr.id}`)}
            >
                Hear
            </button>
        </div>
    );
};

export default ASMRList;
