import Link from "next/link";

export const Footer = ({op1, op2} : { op1: string; op2: string; }

) =>{

    const style = 
    {
    container:"text-white bg-violet-800 p-2 bottom-0 w-screen  ",
    }

    return(
        <>
         <footer className={style.container}>
          <p>{op1}</p>
          <p>{op2}</p>
        </footer>
        </>
    );
}