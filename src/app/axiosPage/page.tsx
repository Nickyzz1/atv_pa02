"use client"
import { useState, useEffect } from "react"
import { api } from "@/constants/api"
import React, { Suspense } from "react"

interface IData {
    name: string;
    image: string;
    race: string;
    description: string;
}

const axios = () => {
    const [data, setData] = useState<IData[]>([])
    const [erro, setErro] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>("Não foi possível buscar dados")
    const [page, setPage] = useState<string>("1")
    const [personName, setName] = useState<string>("")

    const style =
    {
        boxInp: "flex flex-wrap items-center justify-center",
        img: "h-[350px] w-auto mt-6 w-[460px] rounded ",
        input: "p-2 bg-purple-800 text-white rounded m-2",
        // card: "flex flex-wrap bg-purple-800 p-2 rounded flex-col justify-center items-center min-h-80 object-cover min-w-36 w-auto shadow-[0_10px_33px_1px_rgba(0,0,0,0.4)]"
        card: "flex flex-wrap flex-col bg-purple-800  text-white h-auto w-60 p-4 rounded-lg text-center shadow-[0_10px_33px_1px_rgba(0,0,0,0.4)] hover:scale-[1.05] ease-linear"
    }

    useEffect(() => {
      
        if ((parseInt(page) < 7 && page != "" )|| personName) {
            console.log("Buscando dados..."); 
            const url = `/characters?${personName ? `&name=${encodeURIComponent(personName)}` : ''}${page ? `&page=${encodeURIComponent(page)}` : ''}`;
            console.log("URL da requisição:", url); 

            api.get(url)
                .then((res) => {
                    setErro(false);
                    console.log(res.data); 
                    let items = null;

                    items = res.data.items

                    if(personName)
                    {
                        items = res.data || [];
                    }
                    else{

                        items = res.data.items || [];
                    }

                    setData(items)

                    if(items.length == 0)
                    {
                        setMsg("Dados não encontrados");
                        setErro(true);
                    }
                })
                .catch((error) => {
                    console.log("Erro:", error); 
                    if (error.response) {
                        console.log("Resposta do servidor:", error.response);
                        setMsg(error.response.status === 404 ? "Página não encontrada" : "Erro ao buscar dados");
                    } else {
                        setMsg("Erro na requisição");
                    }
                    setErro(true);
                });
        } else {
            setMsg("Digite um nome ou uma página válida.");
            setErro(true);
        }
    }, [personName, page]);

    return (
        <>
            <div className="h-screen overflow-y-auto object-cover overflow-hidden bg-gradient-to-r from-violet-950 to-indigo-950 text-white">

            <div className="mb-4">
                <h1 className="text-center text-white m-4 text-medium ">Personagens(axios)</h1>
                    {erro && <div className="flex flex-wrap justify-center items-center">
                        <h5 className="flex flex-wrap w-auto text-center bg-rose-700 p-3 rounded">{msg}</h5>
                    </div>}
                    <div className={style.boxInp}>
                        <input
                            type="text"
                            value={page}
                            onChange={(e) => setPage(e.target.value)}
                            placeholder="1/6"
                            className={style.input}
                        />
                        <input
                            type="text"
                            value={personName}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Pesquise por nome"
                            className={style.input}
                        />
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center items-center mt-4">
                
                    <Suspense fallback = { <div> Loading..</div>}>
                        {
                            data.map((item, index) => (
                                <div className={style.card} key={index}>
                                {/* h-96 w-auto object-cover rounded-lg */  }
                                {/* h-40 w-auto rounded-lg */}
                                <h2 className="mb-4">{item.name}</h2>
                                <img
                                    className={style.img}
                                    src={item.image}
                                    alt={item.name}
                                    width={300}
                                    height={300}
                                />
                                <p>{item.race}</p>
                            </div>
                        ))}
            </Suspense>
                    </div>
            </div>
            </div>
        </>
    )
}

export default axios;
