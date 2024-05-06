import Image from "next/image";
import icone from '../../public/icons/copy.svg' 


interface TypeDataHistory {
  created_on: string;
  description: string;
  devedor_cpf: string;
  devedor_data_criacao: string;
  devedor_loc: string;
  devedor_location: string;
  devedor_txid: string;
  devedor_valor: string;
  expiration: string;
  id_order_status_type: number;
  matriculation: string;
  name: string;
  pagamento_cod_pix: string;
  pagamento_data: string | null;
  pagamento_endtoendid: string | null;
  status: number;
  type: number;
  update_on: string;
  updated: string;
}
export default function CardHistorico(props: { data: TypeDataHistory }) {
  const { data } = props;


  const handleCopy = (value:string):void => {
    navigator.clipboard.writeText(value);
  
  };

  interface DateTimeFormatOptions {
    localeMatcher?: 'best fit' | 'lookup';
    weekday?: 'long' | 'short' | 'narrow';
    era?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    timeZoneName?: 'long' | 'short';
    formatMatcher?: 'basic' | 'best fit';
    hour12?: boolean;
    timeZone?: string;
  }
  
  function converterDataHoraParaBrasilia(dataHoraUTC: string): string {
    const dataUTC = new Date(dataHoraUTC);
    const fusoHorarioBrasilia = 'America/Sao_Paulo';
  
    const opcoesFormato: DateTimeFormatOptions = {
      timeZone: fusoHorarioBrasilia,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return dataUTC.toLocaleString('pt-BR', opcoesFormato);
  }

  return (<>
    <a href={`/pagamento-qrcode/${data.devedor_txid}`} className="box-border text-default-txt-color rounded-lg min-w-full h-30 min-h-20 p-4 border border-color-segundaria  hover:-translate-y-1 hover:scale-101 duration-300 "> 
      <div className="grid">
        <div className="grid grid-cols-1 gap-4 justify-items-end ">
          {data.name == "PENDENTE" ? <>
          <p className="bg-color-pendente rounded-lg p-1 uppercase text-xs">{data.name}</p>
          </> : <>
          <p className={`bg-color-finalizado rounded-lg p-1 uppercase text-xs`}>{data.name}</p>
          </> }

        </div>
        <div className="grid grid-cols-1 items-end ">
          <div className="">
            <p>Valor: {data.devedor_valor}</p>
            <p>Data: {converterDataHoraParaBrasilia(data.devedor_data_criacao)}</p>
          </div>

          <div className="grid justify-end">
          <Image
            priority
            src={icone}    
            className="fill-icone-default mx-auto cursor-pointer"
            alt="copiar link"
            onClick={ ()=>handleCopy(data.pagamento_cod_pix)}
            />
          </div>
        </div>




      </div>

    </a>

  </>)
}
