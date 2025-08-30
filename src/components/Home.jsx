import { useState, useEffect } from "react";
import { FaWifi, FaUtensils, FaCar, FaShieldAlt, FaWineBottle, FaUmbrellaBeach, FaBed, FaBroom, FaHotTub, FaSnowflake, FaGamepad, FaBath } from "react-icons/fa";
import { MdOutlinePool, MdOutdoorGrill } from "react-icons/md";
import { PiBroomFill } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import logoHorizontal from '../assets/img/logo-horizontal.png';
import frente from '../assets/destaque/frente-casa-principal.png';
import jantar from '../assets/destaque/sala-jantar-estrela.png';
import deck from '../assets/destaque/area-deck-redinha2.png';
import suite from '../assets/galeria/suite-master-mar.png';
import piscina from '../assets/galeria/piscina2.png';
import ReservaModal from "./ReservaModal";

function Home() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const images = [frente, jantar, deck, suite, piscina];
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, isPlaying]);

    const prevSlide = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };


    return (
        <section className="px-4 pt-24 pb-16 text-textPrimary">
            {/* Apresentação aprimorada */}
            <div className="flex justify-center mb-16 animate-fade-in">
                <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-xl rounded-3xl px-8 py-10 max-w-2xl text-center space-y-4">
                    <img
                        src={logoHorizontal}
                        alt="Logo Casa Alegria"
                        className="mx-auto mb-2 w-36 sm:w-44"
                    />
                    <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary">Bem-vindo à Casa Alegria Búzios</h1>
                    <p className="text-base sm:text-lg text-textSecondary leading-relaxed">
                        Um refúgio de paz, sofisticação e conforto. Localizada a poucos passos do mar, nossa casa oferece uma experiência inesquecível em Búzios. Aproveite dias ensolarados, noites aconchegantes e momentos que ficarão para sempre na memória.
                    </p>
                </div>
            </div>

            {/* Destaques */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto mb-16">
                <div className="flex flex-col items-center gap-2">
                    <FaUmbrellaBeach className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Casa à Beira da Praia</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaBed className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Suítes Privativas</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaBath className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Suíte Master com Hidro</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaSnowflake className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Ar-Condicionado</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaUtensils className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Cozinha Equipada</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <MdOutdoorGrill className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Churrasqueira</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaWineBottle className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Adega</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <PiBroomFill className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Ambiente Limpo</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaCar className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Estacionamento</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaWifi className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Wi-Fi</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaShieldAlt className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Segurança 24h</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <MdOutlinePool className="text-2xl sm:text-3xl text-primary" />
                    <span className="text-sm">Lazer Completo</span>
                </div>
            </div>

            {/* Galeria com carrossel e mapa */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 px-4">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-white/60 to-primary/10 backdrop-blur-sm">
                    <div
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{
                            width: `${images.length * 100}%`,
                            transform: `translateX(-${(100 / images.length) * currentImage}%)`,
                        }}
                    >
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="h-full flex-shrink-0"
                                style={{ width: `${100 / images.length}%` }}
                            >
                                <img
                                    src={img}
                                    alt={`Slide ${index}`}
                                    className="object-cover w-full h-full rounded-xl shadow-lg"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/60 p-1.5 rounded-full shadow-md hover:bg-white transition"
                    >
                        <FaChevronLeft className="text-primary text-base" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/60 p-1.5 rounded-full shadow-md hover:bg-white transition"
                    >
                        <FaChevronRight className="text-primary text-base" />
                    </button>


                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className={`p-1.5 rounded-full bg-white/60 shadow-md hover:bg-white transition ${isPlaying ? 'opacity-40' : ''}`}
                            aria-label="Play slideshow"
                        >
                            <FaPlay className="text-primary text-xs" />
                        </button>
                        <button
                            onClick={() => setIsPlaying(false)}
                            className={`p-1.5 rounded-full bg-white/60 shadow-md hover:bg-white transition ${!isPlaying ? 'opacity-40' : ''}`}
                            aria-label="Pause slideshow"
                        >
                            <FaPause className="text-primary text-xs" />
                        </button>
                    </div>


                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-primary' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-64 w-full rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Mapa Casa Alegria"
                        src="https://www.google.com/maps?q=Av.+Jos%C3%A9+Bento+Ribeiro+Dantas+-+Vila+Luiza,+Arma%C3%A7%C3%A3o+dos+B%C3%BAzios+-+RJ,+28950-000&output=embed"
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Texto adicional elegante */}
            <div className="flex justify-center mb-16 animate-fade-in">
                <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-xl rounded-3xl px-8 py-10 max-w-2xl text-center">
                    <p className="text-base sm:text-lg text-textSecondary italic leading-relaxed font-serif">
                        Cada canto da Casa Alegria foi cuidadosamente planejado para encantar. Deixe-se envolver por uma atmosfera acolhedora, com detalhes que transmitem charme e serenidade. Aqui, o tempo desacelera e a alma agradece.
                    </p>
                </div>
            </div>

            {/* Chamada para ação */}
            <div className="text-center">
                <button
                    onClick={() => setModalAberto(true)}
                    className="group relative inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-sm text-white bg-primary hover:bg-secondary shadow-md transition-all duration-300 overflow-hidden"
                >
                    <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-500 rounded-full animate-pulse"></span>
                    <span className="relative z-10 flex items-center gap-2">
                        Entrar em Contato!
                        <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>

                <ReservaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
            </div>
        </section>
    );
}

export default Home;
