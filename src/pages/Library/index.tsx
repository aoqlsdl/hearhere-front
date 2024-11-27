import ASMRList from "../../components/ASMRList";
import NewList from "../../components/NewList";
import { useAsmrList } from "../../hooks/asmr/useAsmrList";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Library = () => {
    const { data: asmrList, error } = useAsmrList();

    if (error) {
        console.log(error);
    }
    if (!asmrList || asmrList.length === 0)
        return (
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={3}
                centeredSlides={true}
                grabCursor={true}
                spaceBetween={30}
            >
                <SwiperSlide>
                    <NewList key="new-list" />
                </SwiperSlide>
            </Swiper>
        );
    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={3}
                centeredSlides={true}
                grabCursor={true}
                spaceBetween={30}
            >
                {asmrList.map((asmr) => (
                    <SwiperSlide key={asmr.asmrId}>
                        <div className="w-full flex items-center">
                            <ASMRList
                                key={asmr.asmrId}
                                asmrTitle={asmr.title}
                                asmrId={asmr.asmrId}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <NewList key="new-list" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Library;
