import { type NextPage } from "next";
import { api } from "../utils/api";

const Querytest: NextPage = () => {
    const hello = api.example.hello.useQuery({
        text: "me"
    })

    return (
        <>
            <p>{hello.data ? hello.data.greeting : "Loading tRPC..."}</p>
        </>
    );

};

export default Querytest;
