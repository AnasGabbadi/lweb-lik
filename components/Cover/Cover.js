import Image from "next/image";

export const Cover = ({ children, background, blocks }) => {
    let coverClasses = "relative flex justify-center items-center h-screen ";
    let imageClasses = " ";

        if (blocks === 255) {
            coverClasses += " mb-[-350px] mt-[-100px]";
            imageClasses = " ";

        } else {
            coverClasses += " mt-[-550px]";
            imageClasses = "object-cover w-full h-full ";
        }

    return (
        <div className={coverClasses.trim()}>
            <div> 
                <Image 
                    alt="cover" 
                    src={background} 
                    fill    
                    className={imageClasses}
                />
            </div>
            <div className="max-w-5xl z-10">
                {children}
            </div>
        </div>
    );
};