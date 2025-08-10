function BackgroundWrapper({ children }) {
    return (
        <div className="relative min-h-screen w-full bg-background text-textPrimary">
            {/* Imagem de fundo */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center z-0"
                style={{ backgroundImage: "url('/src/assets/img/background.png')" }}
            ></div>

            {/* Camada de gradiente sobre a imagem */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#dbeeff]/30 to-white/40 z-10"></div>

            {/* Conteúdo sobreposto */}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}

export default BackgroundWrapper;
