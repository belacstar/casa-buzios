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
                <div className="text-xs text-blue-900/70 text-center md:text-right">
                    © {new Date().getFullYear()} Casa Alegria Búzios. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;