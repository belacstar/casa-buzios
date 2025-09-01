import backgroundImage from '../assets/img/background_new.png';

function BackgroundWrapper({ children }) {
    return (
        <div className="relative min-h-screen w-full bg-background text-textPrimary">
            {/* Imagem de fundo */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center z-0"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Camada de gradiente sobre a imagem */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-blue-50/40 to-white/60 z-10"></div>

            {/* Conteúdo sobreposto */}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}

export default BackgroundWrapper;
