import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Querytest: NextPage = () => {
    const router = useRouter();
    const { foo } = router.query;
    console.log({foo})

    //if (!foobar || typeof foobar !== "string") {
        //return <div>No query</div>
    //}


    const hello = api.example.hello.useQuery({
        text: "dab"
    })

    return (
        <>
            <p>{hello.data ? hello.data.greeting : "Loading tRPC..."}</p>
        </>
    );

};

export function getServerSideProps() {
    console.log("ssr")
    return {
        props: {}
    }

}


export default Querytest;
