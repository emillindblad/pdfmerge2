import { type NextPage } from "next";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownAZ, faFilePdf, faUpload } from '@fortawesome/free-solid-svg-icons'

import { api } from "../utils/api";

const Home: NextPage = () => {

    const hello = api.example.hello.useQuery({
        text: "me"
    })


    return (
        <>
            <Head>
                <title>PDF Merger</title>
                <meta name="description" content="A simple app for merging pdf files" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex items-center justify-center h-screen bg-[#171717] text-white">

                <div className="flex flex-col md:flex-row bg-[#222222] rounded-3xl w-[1000px] p-10 m-10">
                    <div className="flex flex-col flex-1 items-center justify-center md:border-r border-[#555] md:pr-10">
                        <h2 className="text-2xl font-medium leading-normal mb-5 text-white">
                            PDF Merger
                        </h2>
                        <p>{hello.data ? hello.data.greeting : "Loading tRPC"}</p>
                        <form action="/merge" method="POST" className="flex flex-col" >
                            <div className="my-[10px] w-full">
                                <label className="font-medium mb-1 inline-block">Välj dina filer:</label>
                                <input className="w-full p-[10px] bg-transparent border-2 border-main-blue rounded-md" type="file" name="pdffiles[]" accept="application/pdf"/>
                            </div>
                            <input className="mt-5 mb-5 p-[10px] rounded-md bg-main-blue" type="submit" value="Kombinera"/>
                        </form>
                    </div>
                    <div className="md:pl-10 flex-[1.5]">
                        <InfoSection
                            icon={faArrowDownAZ}
                            title="Förbered dina filer"
                            description="Se till att ha döpt dina filer i den ordning du vill att de ska komma i dokumentet. Tex Sida1.pdf Sida2.pdf osv."
                            />
                        <InfoSection
                            icon={faUpload}
                            title="Ladda upp för att kombinera"
                            description="Ladda upp dina pdf filer till vänster för att kombinera dom till en fil. Välj flera filer genom att hålla in CTRL och klicka på de filer som ska kombineras."
                            />
                        <InfoSection
                            icon={faFilePdf}
                            title="Kombinerad fil"
                            description="Din nya pdf fil öppnas automatiskt där du kan kolla igenom att allt stämmer och ladda ner den"
                            />
                    </div>
                </div>
            </main>
            </>
    );
};

export default Home;

type InfoSectionProps = {
    icon: IconProp;
    title: string;
    description: string;
};

const InfoSection = ({
    icon,
    title,
    description,
}: InfoSectionProps ) => {
    return (
        <section className="mt-10 mb-10 relative pl-[30px]">
            <FontAwesomeIcon icon={icon} width="16" className="text-main-blue absolute left-0 top-[5px]"/>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm leading-[1.8]">{description}</p>
        </section>
    );
};
