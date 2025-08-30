import logoHorizontal from "../assets/img/logo-horizontal.png";

function Footer() {
    return (
        <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src={logoHorizontal}
                        alt="Casa Alegria Logo"
                        className="h-10 w-auto object-contain object-center"
                    />
                </div>
                {/* Direitos autorais */}
                <div className="text-xs text-blue-900/70 text-center md:text-right flex flex-col md:items-end gap-1">
                    <span>© {new Date().getFullYear()} Casa Alegria Búzios. Todos os direitos reservados.</span>
                    <span className="flex items-center gap-1 justify-center md:justify-end">
                        Desenvolvido por: Isabela Camara
                        <a
                            href="https://www.linkedin.com/in/isabela-camara-"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn de Isabela Camara"
                            className="ml-1 text-blue-700 hover:text-blue-900 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.599v5.597z" />
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;