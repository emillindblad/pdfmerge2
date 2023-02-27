import { type NextPage } from "next";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownAZ, faFilePdf, faUpload, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler } from 'react-hook-form';
import type { FC } from "react";

const schema = z.object({
    //file: z.custom<File>().refine((files) => ["application/pdf"].includes(files?.[0]?.type))
    file: z.any()
        .refine((files: FileList) => files?.length >= 2, "Minst 2 filer behövs")
        .refine((files: FileList) => [...files].every(file => file.type === 'application/pdf'), "Du kan endast ladda upp pdf-filer")
})
type FormSchemaType = z.infer<typeof schema>;

const Home: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });
    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        foo(data.file as FileList);
    };

    const foo = (data: FileList) => {
        [...data].forEach(file => console.log(file))

    }

    return (
        <>
            <Head>
                <title>PDF Merger</title>
                <meta name="description" content="A simple app for merging pdf files" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center h-screen bg-[#171717] text-white">

                <div className="flex flex-col md:flex-row bg-[#222222] rounded-3xl w-[1000px] p-10 m-10">
                    <div className="flex flex-col flex-1 items-center justify-center md:border-r border-[#555] md:pr-10">
                        <h2 className="text-2xl font-medium leading-normal mb-5 text-white">
                            PDF Merger
                        </h2>
                        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} >
                            <div className="my-[10px] w-full">
                                <label className="font-medium inline-block">Välj dina filer:</label>
                                <input
                                    className="w-full my-1 p-[10px] bg-transparent border-2 border-main-blue rounded-md"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    {...register('file', {
                                        required: true
                                    })}
                                />
                                {errors.file?.message && <ErrorText text={errors.file?.message.toString()}/>}
                            </div>
                            <input
                                className="mt-5 mb-5 p-[10px] rounded-md bg-main-blue hover:cursor-pointer"
                                type="submit"
                                value="Kombinera"
                            />
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
                <noscript>Du har inte JavaScript aktiverat, viss funktionalitet kommer inte vara tillgänglig</noscript>
            </main>
            </>
    );
};

export const ErrorText: FC<{text: string}> = ({ text }) => {
    return (
        <>
            <FontAwesomeIcon icon={faCircleExclamation} width="16" className="inline" />
            <p className="font-medium align-middle inline ml-2">{text}</p>
        </>
    )
}

export default Home;

type InfoSectionProps = {
    icon: IconProp;
    title: string;
    description: string;
};

const InfoSection = ({ icon, title, description, }: InfoSectionProps ) => {
    return (
        <section className="mt-10 mb-10 relative pl-[30px]">
            <FontAwesomeIcon icon={icon} width="16" className="text-main-blue absolute left-0 top-[5px]"/>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm leading-[1.8]">{description}</p>
        </section>
    );
};
