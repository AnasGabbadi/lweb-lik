import Script from "next/script";
import "../styles/globals.css";
import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";
import { getSeo } from "utils/getSeo";

export default async function Home() {
    const data = await getPage("/");

    if (!data) {
        notFound();
    }

    return (
        <>
            {/* Chargement de GSAP après le chargement de la page */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
                strategy="lazyOnload"
                integrity="sha512-gmwBmiTVER57N3jYS3LinA9eb8aHrJua5iQD7yqYCKa5x6Jjc7VDVaEA0je0Lu0bP9j7tEjV3+1qUm6loO99Kw=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />

            {/* Rendu des blocs */}
            <BlockRenderer blocks={data} />
        </>
    );
}


// export async function generateMetadata() {
//     const seo = await getSeo("/");
//     return {
//         title: seo?.title || "",
//         description: seo?.metaDesc || "",
//     };
// }