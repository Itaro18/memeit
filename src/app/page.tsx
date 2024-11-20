"use client";
import Appbar from "@/components/Appbar";
import Image from "next/image";
import React, { useState } from "react";

type Position = {
    x: number;
    y: number;
};

type ImgText = {
    id: string;
    text: string;
    position: Position;
    readonly:boolean
};

export default function Home() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [imageText, setImageText] = useState<ImgText >({id:"1",text:"text",position:{x:10,y:10},readonly:true});
    const [dragging,setDragging] = useState<boolean>(false)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length === 1) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);

            if (selectedImg) {
                URL.revokeObjectURL(selectedImg);
            }

            setSelectedImg(imageUrl);
        }
    };

    const clearImage = () => {
        if (selectedImg) {
            URL.revokeObjectURL(selectedImg);
            setSelectedImg(null);
        }
    };
    return (
        <div className="h-screen  flex flex-col items-center relative sm:static "
         
        >
            <Appbar />
            <div className="p-4 max-w-md mx-auto" 
            >

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    multiple={false}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="inline-block mb-4 px-4 py-2 
        bg-blue-500 text-white rounded-full 
        cursor-pointer hover:bg-blue-600"
                >
                    Choose Image
                </label>

                {selectedImg && (
                  <div>
                    <div 
                      onMouseMove={(e: React.MouseEvent<HTMLDivElement>)=>{
                        if(dragging){
                          const container = e.currentTarget.getBoundingClientRect();
                          const newX = e.clientX - container.left;
                          const newY = e.clientY - container.top;
                          setImageText((prev)=>{
                            return {...prev,position:{x:newX,y:newY}}
                          })
                        }
                        
                      }}
                    className="mt-4 relative">
                        <Image
                            src={selectedImg}
                            alt="Uploaded"
                            width={500}
                            height={300}
                            className="max-w-full h-auto rounded-lg shadow-md"
                        />
                        <div className="absolute"
                          style={{
                            left:`${imageText.position.x}px`,
                            top:`${imageText.position.y}px`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onMouseDown={()=>setDragging(true)}
                          onMouseUp={()=>setDragging(false)}
                          onDoubleClick={ ()=> {
                            console.log("clicked*2")
                            setImageText((prev)=>{
                              return {...prev,readonly:false}
                            })
                          }}
                        >
                          <input
                            value={imageText.text }
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                              setImageText((prev)=>{
                                return {...prev ,text:e.target.value}
                              
                              })
                            }}
                            // onClick={(e)=>{
                            //   e.target.preventDe
                            // }}  
                            readOnly={imageText.readonly}
                            
                            className="bg-transparent"
                          />
                        </div>


                        <button
                            onClick={clearImage}
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Clear Image
                        </button>
                    </div>
                    <div>
                      
                    </div>  
                  </div>
                    
                )}
            </div>
            <input
              readOnly={true}
              value={"SJDFHH"}
            />
        </div>
        
    );
}
