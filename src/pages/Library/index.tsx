import ASMRList from "../../components/ASMRList";
import asmrlist from "../../_mock/asmr.json";
import NewList from "../../components/NewList";

const Library = () => {
    return (
        <div className="flex overflow-x-scroll items-center justify-start w-screen h-full scrollbar-hide  mt-[2.5rem] mb-[1.38rem]">
            <div className="flex flex-row space-x-[1.88rem] pl-[calc(50vw-14.845rem)] pr-[calc(50vw-14.845rem)]">
                {asmrlist.map((asmr) => (
                    <ASMRList key={asmr.id} asmr={asmr} />
                ))}
                <NewList />
            </div>
        </div>
    );
};

export default Library;
