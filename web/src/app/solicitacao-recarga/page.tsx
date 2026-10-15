import Image from "next/image";
import icone from '../../../public/icons/icon-approximation.svg' 
import FormSolicitacaoRecarga from "@/components/formSolicitacaoRecarga";
import Navbar from "@/components/navBar";

export default function SolicitacaoRecarga() {
  return (<>
    <Navbar notButtonCash={true} notButtonNewB={true}/>

    <main className="flex min-h-screen flex-col items-center justify-between p-19">
        <div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
            priority
            src={icone}    
            className="fill-icone-default mx-auto "
            alt="Icone Pagamento"
            height={82}
            width={82}  
          />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-default-txt-color ">
            Solicitar Recargar
            </h2>
          </div>
          <FormSolicitacaoRecarga/>
        </div>
        </div>
    </main>
    </>
  );
}
