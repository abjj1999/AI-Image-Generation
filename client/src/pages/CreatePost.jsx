import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Loader, Form } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form)
  };
  const generateImage  = async() => {
    
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      }
      finally{
        setGeneratingImg(false);
      }
    }
    else {
      alert("Please enter a prompt");
    }
  };
  const handleSurpriseMe = (e) => {
    e.preventDefault();
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(form.name && form.photo){
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/v1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
        await res.json();
        // setLoading(false);
        navigate("/");
      } catch (error) {
        alert(error);
      }
      finally{
        setLoading(false);
      }
    }else {
      alert("Please enter your name and generate an image");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[#22328] text-[32px]">
          <span className="text-[#6469ff]">Create</span>
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative images with the help of AI, and share them with the
          world.
        </p>
      </div>

      <form onSubmit={handleSubmit}  className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <Form
            label="Your name"
            type="text"
            value={form.name}
            handleChange={handleChange}
            name="name"
            placeholder="Enter your name"
          />
          <Form
            label="Prompt"
            type="text"
            name="prompt"
            value={form.prompt}
            handleChange={handleChange}
            placeholder="A Space Shuttle flying above Cape Town, digital art"
            isSurprise
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="w-64 h-64 p-3 flex justify-center items-center relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.photo}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt=""
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button onClick={generateImage } type="button"  className="
            text-white bg-[#6469ff]  rounded-md text-sm font-semibold w-full sm:w-auto px-5 py-2.5
          ">

            {generatingImg? "Generating..." : "Generate Image"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have generated an image, you can share it with the world.
          </p>
          <button type="submit" className="mt-3 text-white 
            bg-[#000]   rounded-md text-sm font-semibold w-full sm:w-auto px-5 py-2.5
          ">
              {Loading ? "Sharing..." : "Share Image"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
