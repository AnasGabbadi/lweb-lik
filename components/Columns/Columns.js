export const Columns = ({ id, isStackedOnMobile, children, textColor, backgroundColor, classColumns }) => {
    const textColorStyle = textColor ? { color: textColor } : {};
    const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

    return (
        <div className="my-10 " style={{...textColorStyle, ...backgroundColorStyle}} id = {id}>
            <div className={`max-w-5xl mx-auto ${isStackedOnMobile ? "block md:flex" : "flex"} ${classColumns}`}>
                {children}
            </div>
        </div>
    );
}
