import React, { useState } from "react";
import ReservaModal from "./ReservaModal"; // estava RservaModal/../modals

function Card({ title, icon, children, className = "" }) {
    return (
        <div className={`group relative rounded-2xl border border-white/40 bg-white/80 backdrop-blur shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 ${className}`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative p-6 flex flex-col gap-3">
                {title && (
                    <div className="flex items-center gap-2">
                        {icon ? (
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg">
                                {icon}
                            </span>
                        ) : null}
                        <h3 className="text-xl font-semibold text-primary">{title}</h3>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default function Casa() {
    const [openReserva, setOpenReserva] = useState(false);

    return (
        <section className="relative max-w-6xl mx-auto py-14 px-4">
            {/* Fundo decorativo suave */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-3xl opacity-40" />

            {/* Header */}
            <div className="text-center space-y-4 mb-10">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-primary/20">
                    Frente ao mar em Manguinhos
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                        Casa Alegria
                    </span>
                </h2>

                {/* Frase destacada e reescrita para evitar repetição */}
                <p className="max-w-3xl mx-auto">
                    <span className="inline-block rounded-2xl bg-gradient-to-r from-primary/10 to-rose-100 px-5 py-3 text-base md:text-lg font-medium text-slate-700 ring-1 ring-primary/20 shadow-sm">
                        Pé na areia no Condomínio Villa Branca, em Manguinhos — exclusividade, conforto e sofisticação, com guarita e segurança 24h.
                    </span>
                </p>
            </div>

            {/* Grid de cartões */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sobre a Casa */}
                <Card className="md:col-span-2">
                    <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>
                            Localizada no Condomínio Villa Branca, no ponto mais nobre da praia de Manguinhos, a Casa Alegria combina exclusividade, conforto e sofisticação.
                            O condomínio é um dos mais prestigiados de Búzios, com poucas casas, guarita na praia e segurança 24 horas, garantindo total privacidade e tranquilidade.
                        </p>
                        <p>
                            A suíte principal possui uma varanda privativa a menos de 20 metros da areia, de onde se contempla uma vista deslumbrante de 180º para o mar — o cenário perfeito para acordar com o nascer do sol e relaxar ao fim do dia.
                        </p>
                    </div>
                </Card>

                {/* Estrutura da Casa */}
                <Card title="Estrutura da Casa" icon="🏡">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 marker:text-primary">
                        <li>4 suítes privativas que acomodam até 8 hóspedes + 2 crianças (até 7 anos)</li>
                        <li>1 quarto de serviço para colaborador</li>
                        <li>6 banheiros (4 suítes, 1 lavabo e 1 de serviço)</li>
                        <li>3 vagas de estacionamento</li>
                        <li>
                            <span className="font-medium">Suíte Master opcional:</span> equipada com cama king, sofá, TV, hidromassagem individual e uma ampla varanda privativa com vista de 180º para o mar
                        </li>
                    </ul>
                </Card>

                {/* Conforto e Comodidades */}
                <Card title="Conforto e Comodidades" icon="✨">
                    <p className="text-gray-700">Cada detalhe foi pensado para tornar sua estadia inesquecível:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 marker:text-primary">
                        <li>Ar-condicionado em todos os quartos</li>
                        <li>Blackout nas cortinas</li>
                        <li>Cofres individuais</li>
                        <li>TV a cabo</li>
                        <li>Wi-Fi de alta qualidade</li>
                        <li>Churrasqueira e adega</li>
                        <li>Cozinha totalmente equipada</li>
                        <li>Geladeira extra na varanda</li>
                        <li>Máquina de gelo</li>
                        <li>Ambiente limpo, organizado e aconchegante</li>
                    </ul>
                </Card>

                {/* Lazer e Condomínio */}
                <Card title="Lazer e Condomínio" icon="🎯">
                    <p className="text-gray-700">No Villa Branca, lazer é sinônimo de exclusividade:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 marker:text-primary">
                        <li>Piscina ampla</li>
                        <li>Quadra de beach tênis</li>
                        <li>Quadra de tênis</li>
                        <li>Rede de basquete</li>
                        <li>Sauna</li>
                        <li>Sinuca</li>
                        <li>Serviço de cadeiras na praia</li>
                    </ul>
                    <p className="text-gray-700">Um refúgio de bem-estar e diversão, ideal para famílias e amigos.</p>
                </Card>

                {/* Observações Importantes */}
                <Card title="Observações Importantes" icon="⚠️">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 marker:text-primary">
                        <li>O imóvel pode ser alugado com funcionários de confiança (arrumadeira e cozinheira).</li>
                        <li>Para grupos acima de 8 hóspedes, é necessária funcionária extra.</li>
                        <li>Consumo de energia e água é cobrado à parte.</li>
                        <li>Caução obrigatória (devolvida em até 2 dias úteis após o check-out).</li>
                        <li>Não é permitido: festas, eventos, grupos de jovens e animais de estimação.</li>
                        <li>Proibido fumar nos quartos.</li>
                        <li>Check-in antes das 9h e check-out após as 17h possuem custo adicional.</li>
                    </ul>
                </Card>

                {/* Reservas e Valores */}
                <Card className="md:col-span-2">
                    <div className="text-center space-y-3">
                        <h3 className="text-xl font-semibold text-primary">Reservas e Valores</h3>
                        <p className="text-gray-700">Para valores, entre em contato.</p>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => setOpenReserva(true)}
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-white font-medium shadow-lg shadow-primary/30 transition hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Entrar em contato
                                <span aria-hidden>💬</span>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Modal controlado por props (sempre renderizado) */}
            <ReservaModal open={openReserva} onClose={() => setOpenReserva(false)} />
        </section>
    );
}