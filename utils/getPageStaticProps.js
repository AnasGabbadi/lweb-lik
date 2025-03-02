import { gql } from "@apollo/client";
import client from "client";
import { cleanAndtransformBlocks } from "./cleanAndtransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
console.log("CONTEXT:", context);
const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
const { data } = await client.query({
    query: gql`
        query PageQuery($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Page {
                    id
                    title   
                    blocks(postTemplate: false)
                }
            }
            acfOptionsMainMenu {
                mainMenu {
                    callToActionButton {
                        destination {
                            ... on Page {
                                uri
                            }
                        }
                        label
                    }
                    menuItems {
                        menuItem {
                            destination {
                                ... on Page {
                                    uri
                                }
                            }
                            label
                        }
                        items {
                            destination {
                                ... on Page {
                                    uri
                                }
                            }
                            label
                        }
                    }
                }
            }
        }   
    `,
    variables: {
        uri,
    }
});
const blocks = cleanAndtransformBlocks(data.nodeByUri.blocks);
return {    
    props: {
        title: data.nodeByUri.title,
    mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.menuItems
    ),
    callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
    callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    blocks,
    },
};
};