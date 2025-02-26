import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Group } from "components/Group";
import { Heading } from "components/Heading";
import { Html } from "components/Html";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {    
    return blocks.map(block => {
        switch(block.name){
            case "core/gallery" : {
                return (
                    <Gallery 
                        key={block.id} 
                        columns={block.attributes.columns || 3}
                        cropImages={block.attributes.imageCrop}
                        items={block.innerBlocks}
                    />
                );
            }
            case "acf/formspreeform" : {
                return <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
            }
            case "acf/ctabutton" : {
                return (
                    <CallToActionButton 
                        key={block.id}
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || "/"}
                        align={block.attributes.data.align}
                    />
                );
            }
            case "core/cover" : {
                // console.log("Cover id: ", block.attributes.id);
                return (
                <Cover key={block.id} background={block.attributes.url} blocks={block.attributes.id}>
                    <BlockRenderer blocks={block.innerBlocks}/>
                </Cover>
                );
            }
            case "core/image" : {   
                // console.log("Image id: ", block.attributes.id);

                // let imageClasses = block.attributes.id === 299 ? "w-[350px]" : " ";
                let imageClasses = "w-[350px]";
                let imageStyle = block.attributes.id === 299 ? { float: "right" } : " ";

                return (
                    <Image
                        src={block.attributes.url}
                        height={block.attributes.height}
                        width={block.attributes.width}
                        alt={block.attributes.alt || ""}
                        className={imageClasses}
                        style={imageStyle}
                    />
                );
            }
            case "core/paragraph" : {
                return (
                    <Paragraph
                        key={block.id}
                        textAlign={block.attributes.textAlign}
                        content={block.attributes.content}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                    />
                );
            }
            case "core/post-title" :
            case "core/heading" : {
                const style = { fontFamily: "inherit" };
                return (
                    <Heading 
                        key={block.id} 
                        textAlign={block.attributes.textAlign}
                        level={block.attributes.level}
                        content={block.attributes.content}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                        style={style}
                    />
                );
            }
            case "core/columns" : {
                // console.log("Columns :", block.attributes?.metadata?.name);
                
                return (
                    <Columns 
                        id = {block.attributes?.metadata?.name}
                        key={block.id}
                        isStackedOnMobile = {block.attributes.isStackedOnMobile}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                        backgroundColor = {
                            theme[block.attributes.backgroundColor] || 
                            block.attributes.style?.color?.background
                        }
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Columns>
                );
            }
            case "core/column" : {
                // console.log("Column :", block.attributes?.metadata?.name);
                return (    
                    <Column 
                        id = {block.attributes?.metadata?.name}
                        key={block.id} 
                        width={block.attributes ? block.attributes.width : undefined}
                        textColor={block.attributes ? block.attributes.textColor : undefined}
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Column>
                );
            }
            case "core/group" : 
            case "core/block" : {
                return (
                    <Group 
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                        backgroundColor = {
                            theme[block.attributes.backgroundColor] || 
                            block.attributes.style?.color?.background
                        }
                    >
                        <BlockRenderer key={block.id} blocks={block.innerBlocks} />
                    </Group>
                );
            }
            case 'core/html' : {
                // console.log("html :", block);
                const blockName = block?.attributes?.metadata?.name;
                return (                    
                    <Html 
                        block = {blockName}
                        key={block.id}
                        blockId={block.id}
                    />
                );
            }            
            default: {
                console.log("UNKNOWN:", block);
                return null;
            } 
        }
    });
};