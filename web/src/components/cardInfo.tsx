'use client'

import Image from 'next/image';
import icone from '../../public/icons/copy.svg' 
import iconePerson from '../../public/icons/person-fill.svg' 
import iconeError from '../../public/icons/exclamation-octagon-fill.svg' 
// import CopyInfo from './ultis/copy';
interface Props{
  card: DataCard,
  error: boolean
}
interface DataCard {
  cod_ru: string;
  value: string;
  created_on: string;
  updated_on: string;
  matriculation: string;
}
export default function showQRcode(data:Props) {
  const {card:purchase, error} = data

    return (<>
     {/* <Loading padding='p-36'/> */}

     <div className="box-border text-default-txt-color rounded-lg min-w-full h-30 min-h-20 p-4 border border-color-segundaria ">
      {error ? <ShowError/> : <>
        <Image
            priority
            src={iconePerson}    
            className="fill-icone-default mx-auto "
            alt="copiar link"
            height={90}
            width={280}  
            />

            <p className="py-2 m-0 text-center text-2xl  leading-6 tracking-tight text-default-txt-color text-sm uppercase">
              A sua carteira tem:
            </p>
             
            <p className="py-2 m-0 text-center text-2xl  leading-6 tracking-tight text-default-txt-color text-sm uppercase" 
           >
              Valor: {purchase.value} 
            </p>
           
       
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
              Carteira não encontrada !
            </p>

</>
  )
}
