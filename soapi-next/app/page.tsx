// "use client";
import Image from "next/image";
import hero from "../public/hero_image.png";
import {
     BlocksRenderer,
     type BlocksContent,
} from "@strapi/blocks-react-renderer";

const getResponse = async () => {
     let response = await fetch(
          `${process.env.strapiAdress}/api/tests/${process.env.testId}?populate=*`,
          {
               headers: {
                    Authorization: `bearer ${process.env.bearerToken}`,
               },
          }
     );
     if (!response.ok) {
          throw new Error("Nie udało się pobrać danych");
     }
     response = await response.json();

     return response.data.attributes;
};

const getForm = async () => {
     let response = await fetch(
          `${process.env.strapiAdress}/api/tests/${process.env.testId}`,
          {
               headers: {
                    Authorization: `bearer ${process.env.bearerToken}`,
               },
          }
     );
     if (!response.ok) {
          throw new Error("Nie udało się pobrać danych");
     }
     response = await response.json();

     let res = await fetch(
          `${process.env.serverAdress}/forms/${response.data.attributes.form_id}`
     );
     if (!res.ok) {
          throw new Error("Nie udało się pobrać danych");
     }
     res = await res.json();

     return res;
};

export default async function Home() {
     const data = await getResponse();
     //  console.log(data);
     const form = await getForm();
     //  console.log(form);

     const content: BlocksContent = data.description;

     const handleSubmit = () => {
          console.log(1);
     };

     return (
          <main className="flex min-h-screen flex-col items-center justify-start py-2">
               <Image
                    className="w-full"
                    src={`${process.env.strapiAdress}${data.hero_image.data.attributes.url}`}
                    // src={hero}
                    alt="hero image"
                    width={data.hero_image.data.attributes.width}
                    height={data.hero_image.data.attributes.height}
               />
               <div className="py-12 flex content-center flex-col items-center">
                    <p className="text-5xl text-center pb-12 w-[470px]">
                         {data.title}
                    </p>
                    <BlocksRenderer content={content} />
                    {/* <p className="text-center">
                         Czeski producent odchodzi od klasycznych zasad
                         wyprzedaży. Teraz możesz liczyć na <br />
                         rabat zarówno dla wybranych samochodów z rocznika 2023
                         jak i 2024! <br />
                         <br />
                         Zobacz z bliska modele dostępne od ręki albo
                         skonfiguruj swoją wymarzoną Škodę. <br />
                         Skorzystaj z naszej wyjątkowej wyprzedaży i bądź rok do
                         przodu! Zapraszamy do salonów
                    </p> */}
               </div>
               <div className="flex flex-col align-center justify-center bg-slate-300 w-full py-10 px-60">
                    <form className="flex flex-col">
                         <p className="text-3xl font-bold pb-12">
                              Uzupełnij formularz kontaktowy i umów się na jazdę
                              próbną
                         </p>
                         {form.cdpFields.map((formField: any) => (
                              <div key={formField.cdpFieldId}>
                                   <input
                                        placeholder={formField.name}
                                        id="name"
                                        type="text"
                                        name={formField.name}
                                   />
                              </div>
                         ))}
                         <p className="text-sm font-thin pt-12">
                              W związku z realizacją wymogów Rozporządzenia
                              Parlamentu Europejskiego i Rady (UE) 2016/679 z
                              dnia 27 kwietnia 2016 r. w sprawie ochrony osób
                              fizycznych w związku z przetwarzaniem danych
                              osobowych i w sprawie swobodnego przepływu takich
                              danych oraz uchylenia dyrektywy 95/46/WE (ogólne
                              rozporządzenie o ochronie danych „RODO”),
                              informujemy o zasadach przetwarzania Państwa
                              danych osobowych oraz o przysługujących Państwu
                              prawach z tym związanych.
                         </p>
                         <div className="flex flex-row justify-start items-center">
                              <input
                                   type="checkbox"
                                   style={{ width: 10, marginRight: "10px" }}
                              />
                              <label className="text-sm">
                                   Nie jestem robotem
                              </label>
                         </div>

                         <button
                              style={{
                                   width: 200,
                                   background: "#590E18",
                                   color: "white",
                                   padding: "8px 0px",
                              }}
                         >
                              Wyślij formularz
                         </button>
                    </form>
               </div>
          </main>
     );
}
