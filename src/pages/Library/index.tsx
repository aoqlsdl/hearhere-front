import ASMRList from "../../components/ASMRList";
import asmrlist from "../../_mock/asmr.json";
import NewList from "../../components/NewList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Library = () => {
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
                {asmrlist.map((asmr) => (
                    <SwiperSlide key={asmr.id}>
                        <div className="w-full flex items-center">
                            <ASMRList key={asmr.id} asmr={asmr} />
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
