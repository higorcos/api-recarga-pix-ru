import Image from "next/image";
import icone from '../../../public/icons/clock-history.svg' 
import Historico from "@/components/historico";
import Navbar from '@/components/navBar';

export default function PagamentoQRcode() {
  return (<>
    <main className="grid grid-cols-1">
       <div>
      
        <Navbar />
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
            <h2 className="mt-10 text-center  text-2xl font-bold leading-9 tracking-tight text-default-txt-color ">
            Histórico
            </h2>
          </div>
        </div>
          
        </div>
    </main>
        <div className="sdsd">
        <Historico/>
        </div>
        </>
  );
}
