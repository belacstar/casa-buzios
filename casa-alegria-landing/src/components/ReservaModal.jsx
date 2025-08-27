import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import logo from "../assets/img/logo.png";
import backForm from "../assets/img/back-form.png";

const WHATSAPP_NUMBER = "5531999980958";

export default function ReservaModal({ isOpen, open, onClose }) {
    const shown = typeof isOpen === "boolean" ? isOpen : Boolean(open);

    const [form, setForm] = useState({
        nome: "",
        telefone: "",
        email: "",
        dataInteresse: "",
        numeroDias: 3,
        totalHospedes: "",
        indicacao: false,
        nomeIndicador: "",
    });

    const [erroDiarias, setErroDiarias] = useState(false);

    const formatarTelefone = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let novoValor = value;

        if (name === "telefone") novoValor = formatarTelefone(value);

        if (name === "numeroDias") {
            const val = parseInt(value);
            if (!isNaN(val) && val >= 3) {
                setErroDiarias(false);
                novoValor = val;
            } else {
                setErroDiarias(true);
                novoValor = value;
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : novoValor,
        }));
    };

    // Gera a mensagem formatada para o WhatsApp
    const gerarMensagemWhatsApp = () => {
        let msg = `Olá! Gostaria de entrar em contato sobre a Casa Alegria.\n\n`;
        msg += `*Nome completo:* ${form.nome}\n`;
        msg += `*Telefone:* ${form.telefone}\n`;
        msg += `*Email:* ${form.email}\n`;
        msg += `*Data de interesse:* ${form.dataInteresse}\n`;
        msg += `*Número de diárias de interesse:* ${form.numeroDias}\n`;
        msg += `*Total de hóspedes:* ${form.totalHospedes}\n`;
        msg += `*Cheguei até a casa por indicação?* ${form.indicacao ? "Sim" : "Não"}\n`;
        if (form.indicacao && form.nomeIndicador) {
            msg += `*Nome da pessoa que indicou:* ${form.nomeIndicador}\n`;
        }
        return encodeURIComponent(msg);
    };

    // Ao enviar, abre o WhatsApp com a mensagem preenchida
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.numeroDias < 3) {
            setErroDiarias(true);
            return;
        }
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${gerarMensagemWhatsApp()}`;
        window.open(url, "_blank");
        onClose();
    };

    return (
        <Dialog as="div" open={shown} onClose={onClose} className="fixed inset-0 z-[1000]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-2">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                    <Dialog.Panel
                        className="relative border border-white/40 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto bg-white/90"
                        style={{ backgroundImage: `url(${backForm})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-primary hover:text-secondary text-xl font-bold">&times;</button>
                        <div className="flex justify-center mb-2">
                            <img src={logo} alt="Logo Casa Alegria" className="h-14" />
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 text-sm text-textPrimary mt-2">
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Nome completo
                                <input
                                    type="text"
                                    name="nome"
                                    required
                                    value={form.nome}
                                    onChange={handleChange}
                                    placeholder="Nome completo"
                                    className="input mt-1"
                                />
                            </label>
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Telefone
                                <input
                                    type="text"
                                    name="telefone"
                                    required
                                    value={form.telefone}
                                    onChange={handleChange}
                                    placeholder="(00) 00000-0000"
                                    className="input mt-1"
                                />
                            </label>
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    className="input mt-1"
                                />
                            </label>
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Data de interesse da reserva
                                <input
                                    type="date"
                                    name="dataInteresse"
                                    value={form.dataInteresse}
                                    onChange={handleChange}
                                    className="input mt-1"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                />
                            </label>
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Número de diárias de interesse
                                <input
                                    type="number"
                                    name="numeroDias"
                                    min="3"
                                    required
                                    value={form.numeroDias}
                                    onChange={handleChange}
                                    className="input mt-1"
                                />
                                {erroDiarias && (
                                    <span className="text-xs text-red-600">Mínimo 3 diárias</span>
                                )}
                            </label>
                            <label className="font-semibold drop-shadow-sm flex flex-col">
                                Total de hóspedes
                                <input
                                    type="number"
                                    name="totalHospedes"
                                    min="1"
                                    required
                                    value={form.totalHospedes}
                                    onChange={handleChange}
                                    className="input mt-1"
                                />
                            </label>
                            <label className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="indicacao"
                                    checked={form.indicacao}
                                    onChange={handleChange}
                                />
                                Cheguei até a Casa Alegria por indicação de alguém
                            </label>
                            {form.indicacao && (
                                <label className="font-semibold drop-shadow-sm flex flex-col">
                                    Nome da pessoa que indicou
                                    <input
                                        type="text"
                                        name="nomeIndicador"
                                        value={form.nomeIndicador}
                                        onChange={handleChange}
                                        className="input mt-1"
                                    />
                                </label>
                            )}
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded bg-white/80 border border-white/40 hover:bg-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded bg-primary hover:bg-secondary text-white font-semibold"
                                >
                                    Enviar contato
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </motion.div>
            </div>
        </Dialog >
    )
}
