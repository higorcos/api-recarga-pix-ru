'use client'

import Image from 'next/image';
import icone from '../../public/icons/copy.svg' 
import iconeError from '../../public/icons/exclamation-octagon-fill.svg' 
// import CopyInfo from './ultis/copy';
interface Props{
  purchaseOrder: DataPurchaseOrder,
  error: boolean
}
interface DataPurchaseOrder {
  devedor_txid: string;
  matriculation: string;
  devedor_loc: string;
  devedor_cpf: string;
  devedor_location: string;
  devedor_valor: string;
  devedor_data_criacao: string;
  pagamento_data: string | null;
  pagamento_endtoendid: string | null;
  status: number;
  type: number;
  created_on: string;
  expiration: string;
  updated: string;
  pagamento_cod_pix: string;
  id_order_status_type: number;
  name: string;
  description: string;
  update_on: string;
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}
export default function showQRcode(data:Props) {
  const {purchaseOrder:purchase, error} = data

  const handleCopy = (value:string):void => {
      navigator.clipboard.writeText(value);
    
  };

    return (<>
     {/* <Loading padding='p-36'/> */}

     <div className="box-border text-default-txt-color rounded-lg min-w-full h-30 min-h-20 p-4 border border-color-segundaria ">
      {error ? <ShowError/> : <>
        <Image
            priority
            src={`${purchase.imagemQrcode}`}    
            className="fill-icone-default mx-auto "
            alt="copiar link"
            height={90}
            width={280}  
            />

            <p className="py-2 m-0 text-center text-2xl  leading-6 tracking-tight text-default-txt-color text-sm uppercase">
              Abra o seu app do banco e realize o pagamento via pix!
            </p>
             
            <p className="py-2 m-0 text-center text-2xl  leading-6 tracking-tight text-default-txt-color text-sm uppercase" 
           >
              Valor: {purchase.devedor_valor} 
            </p>
           
            <Image
            priority
            src={icone}    
            className="fill-icone-default mx-auto cursor-pointer"
            alt="copiar link"
            onClick={ ()=>handleCopy(`${purchase.pagamento_cod_pix}`)}
            />
            </>}
         
      
      </div>
    </>)
  }


function ShowError(){

  return(
<>
          <Image    
            priority
            src={iconeError}    
            className="fill-icone-default mx-auto "
            alt="copiar link"
            height={90}
            width={280}  
            />

            <p className="py-2 m-0 text-center text-2xl  leading-6 tracking-tight text-default-txt-color text-sm uppercase">
              Não foi encontrado informações sobre essa pedido !
            </p>

</>
  )
}
