import Image from "next/image";
import iconePerson from '../../../public/icons/person-fill.svg' 
import FormLogin from "@/components/formLogin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-19">
        <div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
            priority
            src={iconePerson}    
            className="fill-icone-default mx-auto "
            alt="Icone Login"
            height={82}
            width={82}  
          />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-default-txt-color ">
              Login
            </h2>
          </div>
          <FormLogin/>
        </div>
        </div>
    </main>
  );
}
