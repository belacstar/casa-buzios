import { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Masonry from "react-masonry-css";

// Destaque
import destaque1 from "../assets/destaque/frente-casa-principal.png";
import destaque2 from "../assets/destaque/sala-estar-frente.jpeg";
import destaque3 from "../assets/destaque/ambiente-integrado-colorido.jpeg";
import destaque4 from "../assets/destaque/area-deck-redinha.jpeg";
import destaque5 from "../assets/destaque/area-deck-redinha2.png";
import destaque6 from "../assets/destaque/area-estar-deck.jpeg";
import destaque7 from "../assets/destaque/area-estar-externa.jpeg";
import destaque8 from "../assets/destaque/copa-cafe.jpeg";
import destaque9 from "../assets/destaque/lareira-tv.jpeg";
import destaque10 from "../assets/destaque/sala-estar-costas.jpeg";
import destaque11 from "../assets/destaque/sala-jantar-estrela.png";

// Detalhes
import detalhes1 from "../assets/detalhes/detalhe-bar.jpeg";
import detalhes2 from "../assets/detalhes/detalhe-decor-verde.jpeg";
import detalhes3 from "../assets/detalhes/detalhe-filtro-agua.jpeg";
import detalhes4 from "../assets/detalhes/detalhe-luminaria.jpeg";
import detalhes5 from "../assets/detalhes/detalhe-mesa-centro.jpeg";
import detalhes6 from "../assets/detalhes/detalhe-mini-casinhas.jpeg";
import detalhes7 from "../assets/detalhes/hall-surf.jpeg";
import detalhes8 from "../assets/detalhes/por-do-sol-dentro.jpeg";
import detalhes9 from "../assets/detalhes/por-do-sol-lateral.jpeg";
import detalhes10 from "../assets/detalhes/vista-interna-total.jpeg";

// Por do sol
import porDoSol1 from "../assets/por-do-sol/lua-nascendo-mar.jpeg";
import porDoSol2 from "../assets/por-do-sol/por-do-sol-jardim.jpeg";
import porDoSol3 from "../assets/por-do-sol/por-do-sol-profundo.jpeg";
import porDoSol4 from "../assets/por-do-sol/por-do-sol-vista-jantar.jpeg";

// Galeria
import galeria1 from "../assets/galeria/acesso-praia.jpeg";
import galeria2 from "../assets/galeria/banheiro-master.jpeg";
import galeria3 from "../assets/galeria/casa-por-do-sol.jpeg";
import galeria4 from "../assets/galeria/copa-principal.jpeg";
import galeria5 from "../assets/galeria/cozinha-branca.jpeg";
import galeria6 from "../assets/galeria/deck-coberto.jpeg";
import galeria7 from "../assets/galeria/hall-segundo-andar.jpeg";
import galeria8 from "../assets/galeria/lavabo.jpeg";
import galeria9 from "../assets/galeria/piscina.png";
import galeria10 from "../assets/galeria/piscina2.png";
import galeria11 from "../assets/galeria/quadra-esportes.jpeg";
import galeria12 from "../assets/galeria/sala-colorida.jpeg";
import galeria13 from "../assets/galeria/sala-tv.jpg.jpeg";
import galeria14 from "../assets/galeria/suite-1.jpeg";
import galeria15 from "../assets/galeria/suite-2.jpeg";
import galeria16 from "../assets/galeria/suite-3.jpeg";
import galeria17 from "../assets/galeria/suite-master-mar.png";
import galeria18 from "../assets/galeria/suite-master-tv.jpeg";
import galeria19 from "../assets/galeria/suite-rosa.jpeg";
import galeria20 from "../assets/galeria/vista-costa-lateral.jpeg";
import galeria21 from "../assets/galeria/vista-decor-mar.jpeg";

// Helper to transform imports into objects with caption
const makeItems = (arr, catName) =>
    arr.map((src, i) => ({
        src,
        alt: `${catName} ${i + 1}`,
        caption: `${catName} — imagem ${i + 1}`,
    }));

// Arrays de imagens por categoria (agora com objetos)
const categorias = [
    {
        nome: "Destaques",
        imagens: makeItems(
            [destaque1, destaque2, destaque3, destaque4, destaque5, destaque6,
                destaque7, destaque8, destaque9, destaque10, destaque11],
            "Destaques"
        ),
    },
    {
        nome: "Detalhes",
        imagens: makeItems(
            [detalhes1, detalhes2, detalhes3, detalhes4, detalhes5,
                detalhes6, detalhes7, detalhes8, detalhes9, detalhes10],
            "Detalhes"
        ),
    },
    {
        nome: "Pôr do Sol",
        imagens: makeItems([porDoSol1, porDoSol2, porDoSol3, porDoSol4], "Pôr do Sol"),
    },
    {
        nome: "Ambientes",
        imagens: makeItems(
            [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6, galeria7,
                galeria8, galeria9, galeria10, galeria11, galeria12, galeria13, galeria14,
                galeria15, galeria16, galeria17, galeria18, galeria19, galeria20, galeria21],
            "Ambientes"
        ),
    },
];


// Flat list para navegação global
const flatImages = categorias.flatMap((c) => c.imagens);


// Não precisa mais do getSpanClass, grid será uniforme


// Não precisa mais do Masonry breakpoints


export default function Galeria() {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(0); // índice da categoria

    // Flat list para lightbox global
    const imagensAtuais = categorias[categoriaSelecionada].imagens;
    const globalOffset = categorias
        .slice(0, categoriaSelecionada)
        .reduce((acc, cat) => acc + cat.imagens.length, 0);

    const openLightbox = (index) => setLightboxIndex(index + globalOffset);

    return (
        <section id="galeria" className="w-full py-12 bg-gradient-to-b from-white/80 to-blue-50/60">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary text-center mb-8 drop-shadow">Galeria</h2>

                {/* Abas de categorias */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categorias.map((cat, idx) => (
                        <button
                            key={cat.nome}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm border 
                                ${idx === categoriaSelecionada ? 'bg-primary text-white border-primary' : 'bg-white/80 text-primary border-primary/30 hover:bg-primary/10'}`}
                            onClick={() => setCategoriaSelecionada(idx)}
                        >
                            {cat.nome}
                        </button>
                    ))}
                </div>

                {/* Grid responsivo de imagens da categoria selecionada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {imagensAtuais.map((img, idx) => (
                        <div
                            key={img.alt}
                            className="rounded-xl overflow-hidden shadow-lg cursor-pointer group transition-all duration-300"
                            onClick={() => openLightbox(idx)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                <p className="text-center text-blue-900/70 mt-4 text-sm">Clique em uma foto para ampliar.</p>

                {/* Lightbox novo */}
                <Lightbox
                    open={lightboxIndex !== null}
                    close={() => setLightboxIndex(null)}
                    slides={flatImages.map(img => ({
                        src: img.src,
                        alt: img.alt,
                        description: img.caption,
                    }))}
                    index={lightboxIndex ?? 0}
                    plugins={[Zoom]}
                    on={{
                        view: ({ index }) => setLightboxIndex(index),
                    }}
                />
            </div>
        </section>
    );
}

