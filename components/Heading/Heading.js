import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

export const Heading = ({ textAlign, content, level = 2, textColor, style}) => {

    const tag = React.createElement(
        `h${level}`,
        {
            className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`,
            style: { color: textColor, ...style },
            dangerouslySetInnerHTML: { __html: content } 
        }
    );

    return tag;
};
