import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import axios from "axios";
import logo from "../assets/img/logo.png";
import backForm from "../assets/img/back-form.png";

export default function ReservaModal({ isOpen, onClose }) {
    const [form, setForm] = useState({
        nome: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        cpf: "",
        dataReserva: "",
        numeroDias: 3,
        adultos: 1,
        criancas: 0,
        formaPagamento: "",
        indicacao: false,
        nomeIndicador: "",
        telefoneIndicador: "",
        aceitaRegras: false,
    });

    const [mensagem, setMensagem] = useState("");
    const [mostrarRegras, setMostrarRegras] = useState(false);
    const [erroDiarias, setErroDiarias] = useState(false);

    const formatarCPF = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const formatarTelefone = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    const buscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.data.erro) {
                setForm((prev) => ({
                    ...prev,
                    rua: response.data.logradouro,
                    bairro: response.data.bairro,
                    cidade: response.data.localidade,
                }));
            }
        } catch (error) {
            console.error("Erro ao buscar CEP", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let novoValor = value;

        if (name === "cpf") novoValor = formatarCPF(value);
        if (name === "telefone" || name === "telefoneIndicador") novoValor = formatarTelefone(value);
        if (name === "cep") {
            novoValor = value.replace(/\D/g, "").slice(0, 8);
            if (novoValor.length === 8) buscarEndereco(novoValor);
        }

        if (name === "numeroDias") {
            const val = parseInt(value);
            if (!isNaN(val) && val >= 3) {
                setErroDiarias(false);
                novoValor = val;
            } else {
                setErroDiarias(true);
                novoValor = value; // ainda permite digitar, mas sinaliza erro
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : novoValor,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.aceitaRegras) {
            setMensagem("Você precisa aceitar as regras da casa.");
            return;
        }
        if (form.numeroDias < 3) {
            setErroDiarias(true);
            return;
        }
        try {
            await axios.post("http://localhost:3000/reserva", form);
            setMensagem("Reserva enviada com sucesso!");
            onClose();
        } catch (err) {
            console.error(err);
            setMensagem("Erro ao enviar reserva. Tente novamente.");
        }
    };

    return (
        <>

            <Dialog as="div" open={isOpen} onClose={onClose} className="fixed inset-0 z-[1000]">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <Dialog.Panel
                            className="relative border border-white/40 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto bg-white/90"
                            style={{ backgroundImage: `url(${backForm})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                            <button onClick={onClose} className="absolute top-4 right-4 text-primary hover:text-secondary text-xl font-bold">&times;</button>
                            <div className="flex justify-center mb-3">
                                <img src={logo} alt="Logo Casa Alegria" className="h-14" />
                            </div>
                            <Dialog.Title className="text-xl text-primary font-extrabold text-center mb-4 drop-shadow-md">Solicitar Reserva</Dialog.Title>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-textPrimary">
                                <label className="font-semibold drop-shadow-sm">Nome completo
                                    <input type="text" name="nome" required value={form.nome} onChange={handleChange} placeholder="Nome completo" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Data de nascimento
                                    <input type="date" name="dataNascimento" required value={form.dataNascimento} onChange={handleChange} className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Telefone
                                    <input type="text" name="telefone" required value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Email
                                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="seu@email.com" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">CEP
                                    <input type="text" name="cep" required value={form.cep} onChange={handleChange} placeholder="00000000" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Rua
                                    <input type="text" name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Bairro
                                    <input type="text" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Cidade
                                    <input type="text" name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">CPF
                                    <input type="text" name="cpf" required value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Data da reserva
                                    <input type="date" name="dataReserva" required value={form.dataReserva} onChange={handleChange} className="input mt-1" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Número de dias
                                    <input type="number" name="numeroDias" min="3" required value={form.numeroDias} onChange={handleChange} className="input mt-1 w-24" />
                                    {erroDiarias && <p className="text-xs text-red-600">Mínimo 3 diárias</p>}
                                </label>
                                <label className="font-semibold drop-shadow-sm">Adultos
                                    <input type="number" name="adultos" min="1" required value={form.adultos} onChange={handleChange} className="input mt-1 w-20" />
                                </label>
                                <label className="font-semibold drop-shadow-sm">Crianças
                                    <input type="number" name="criancas" min="0" value={form.criancas} onChange={handleChange} className="input mt-1 w-20" />
                                </label>
                                <label className="sm:col-span-2 font-semibold drop-shadow-sm">Forma de pagamento
                                    <select name="formaPagamento" required value={form.formaPagamento} onChange={handleChange} className="input mt-1 w-48">
                                        <option value="">Selecione</option>
                                        <option value="PIX">PIX</option>
                                        <option value="Transferência">Transferência</option>
                                        <option value="Cartão">Cartão</option>
                                    </select>
                                </label>
                                <label className="sm:col-span-2 flex items-center gap-2">
                                    <input type="checkbox" name="indicacao" checked={form.indicacao} onChange={handleChange} />
                                    Chegou até a casa por indicação?
                                </label>
                                {form.indicacao && (
                                    <>
                                        <label className="font-semibold drop-shadow-sm">Nome da pessoa que te indicou
                                            <input type="text" name="nomeIndicador" value={form.nomeIndicador} onChange={handleChange} className="input mt-1" />
                                        </label>
                                        <label className="font-semibold drop-shadow-sm">Telefone da pessoa que indicou
                                            <input type="text" name="telefoneIndicador" value={form.telefoneIndicador} onChange={handleChange} placeholder="(00) 00000-0000" className="input mt-1" />
                                        </label>
                                    </>
                                )}
                                <label className="col-span-2 flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="aceitaRegras" checked={form.aceitaRegras} onChange={handleChange} />
                                    Li e aceito as <button type="button" className="text-primary underline" onClick={() => setMostrarRegras(true)}>observações importantes</button>
                                </label>
                                <div className="col-span-2 flex justify-end gap-4 mt-4">
                                    <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-white/80 border border-white/40 hover:bg-white">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="px-6 py-2 rounded bg-primary hover:bg-secondary text-white font-semibold">
                                        Solicitar Reserva
                                    </button>
                                </div>
                            </form>
                            {mensagem && <p className="mt-4 text-center text-textSecondary font-medium">{mensagem}</p>}
                        </Dialog.Panel>
                    </motion.div>
                </div>
            </Dialog>

            <Dialog open={mostrarRegras} onClose={() => setMostrarRegras(false)} className="fixed inset-0 z-[9999]">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
                    <Dialog.Panel className="relative bg-white px-4 py-6 sm:p-6 rounded-xl w-full max-w-lg sm:max-w-2xl text-sm shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setMostrarRegras(false)}
                            className="absolute top-3 right-4 text-xl sm:text-2xl font-bold text-primary hover:text-secondary"
                        >
                            &times;
                        </button>
                        <Dialog.Title className="text-base sm:text-lg font-extrabold text-primary text-center mb-4 underline decoration-primary/30">
                            Observações Importantes
                        </Dialog.Title>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-snug text-sm sm:text-base">
                            <li><strong>Acomodações:</strong> 4 suítes para até 8 hóspedes + 2 crianças (até 7 anos), além de 1 quarto de serviço para colaborador.</li>
                            <li><strong>Banheiros:</strong> 6 no total — 4 nas suítes, 1 lavabo e 1 de serviço.</li>
                            <li><strong>Vagas de garagem:</strong> 3.</li>
                            <li><strong>Diária padrão:</strong> R$ 4.800,00 (mínimo de 3 diárias). Valores podem sofrer ajustes em feriados.</li>
                            <li><strong>Aluguel Full (opcional):</strong> inclui suíte master no piso superior, elevando a capacidade para 10 hóspedes + 2 crianças. Acréscimo de R$ 1.700,00 por diária.</li>
                            <li><strong>Facilidade extra:</strong> A funcionária da casa pode realizar as compras iniciais de supermercado pelo valor adicional de uma diária.</li>
                            <li><strong>Funcionários:</strong> O imóvel é alugado com 2 profissionais de confiança (arrumadeira e cozinheira) — R$ 220,00 por diária cada (não incluso).</li>
                            <li><strong>Hóspedes extras:</strong> Acima de 8 pessoas, é necessário contratar uma arrumadeira adicional (indicação disponível).</li>
                            <li><strong>Contas:</strong> Consumo de energia elétrica e água serão cobrados à parte.</li>
                            <li><strong>Depósito caução:</strong> devolvido em até 2 dias úteis após o check-out.</li>
                            <li><strong>Restrições:</strong> Proibido festas, eventos, grupo de jovens e animais de estimação.</li>
                            <li><strong>Responsabilidade:</strong> O hóspede titular responde por todos os presentes no imóvel e eventuais danos à propriedade, bens ou regras do condomínio.</li>
                            <li><strong>Fumo:</strong> Não é permitido fumar nos quartos.</li>
                            <li><strong>Check-in/out fora do horário:</strong> Antes das 9h ou após as 17h, aplica-se valor adicional e taxa de conveniência.</li>
                        </ul>
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setMostrarRegras(false)}
                                className="px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white font-medium shadow-sm w-full sm:w-auto"
                            >
                                Confirmar Leitura
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>

    );
}