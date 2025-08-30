import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoHorizontal from "../assets/img/logo-horizontal.png";
import ReservaModal from "../components/ReservaModal";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <header
            className={`
                fixed top-0 w-full z-50 transition-all duration-300
                bg-[url('/src/assets/img/header-mar-areia.png')] bg-no-repeat bg-center bg-[length:100%_auto]
                bg-white/50 backdrop-blur-sm shadow-md animate-fade-in-down

                before:absolute before:bottom-[-10px] before:left-0 before:w-full before:h-6
                before:bg-gradient-to-b before:from-white/70 before:to-transparent before:blur-md
            `}
        >
            <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between relative h-20">
                {/* Logo */}
                <Link to="/" className="relative flex items-center group flex-shrink-0">
                    <span className="absolute inset-0 z-[-1] rounded-full blur-xl opacity-80 bg-white group-hover:blur-2xl group-hover:opacity-100 transition-all duration-500"></span>
                    <img
                        src={logoHorizontal}
                        alt="Casa Alegria Logo"
                        className="h-12 lg:h-14 w-auto object-contain object-center brightness-[1.2] transition-all duration-500 ease-in-out leading-none"
                        style={{ display: 'block', verticalAlign: 'top' }}
                    />
                </Link>

                {/* Navegação Desktop */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <div className="flex gap-8 font-semibold text-primary tracking-wide px-6 py-2 rounded-full bg-white/70 backdrop-blur-md shadow-sm">
                        <Link to="/casa" className="hover:text-secondary transition duration-300">A Casa</Link>
                        <Link to="/galeria" className="hover:text-secondary transition duration-300">Galeria</Link>
                    </div>
                </nav>

                {/* Botão Entrar em Contato (desktop) */}
                <button
                    onClick={() => setModalAberto(true)}
                    className="group relative hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full font-medium text-sm text-white bg-primary hover:bg-secondary shadow-md transition-all duration-300 overflow-hidden ml-4"
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

                {/* Menu Hamburguer Mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-primary focus:outline-none z-50 transition-transform duration-300 ease-in-out transform bg-white/70 backdrop-blur-sm p-1 rounded-md shadow-md ml-2"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6 rotate-180 scale-110 transition-all duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 transition-all duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <ReservaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
            </div>

            {/* Mobile Menu */}
            <div
                className={`
                    md:hidden absolute top-full left-0 w-full z-40
                    transition-all duration-500 ease-in-out transform
                    ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'}
                `}
            >
                <div className="flex flex-col items-center text-center px-6 pb-4 pt-3 space-y-3 text-primary font-semibold text-base bg-white/80 backdrop-blur-lg shadow-md rounded-b-xl transition-opacity duration-500">
                    <Link to="/casa" className="block hover:text-secondary transition" onClick={() => setIsMobileMenuOpen(false)}>A Casa</Link>
                    <Link to="/galeria" className="block hover:text-secondary transition" onClick={() => setIsMobileMenuOpen(false)}>Galeria</Link>
                    <button
                        onClick={() => { setModalAberto(true); setIsMobileMenuOpen(false); }}
                        className="w-full mt-2 px-4 py-2 rounded-full font-medium text-sm text-white bg-primary hover:bg-secondary shadow-md transition-all duration-300"
                    >
                        Entrar em Contato!
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
