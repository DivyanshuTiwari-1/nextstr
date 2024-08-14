'use client';

import { useState } from "react";

export default function Page() {
  type Formats = {
    thumbnail: {
      url: string;
    };
  };

  type ImageAttributes = {
    formats: Formats;
    url: string;
  };

  type ImageData = {
    attributes: ImageAttributes;
  };

  type Image = {
    data: ImageData[];
  };

  type Attributes = {
    Name: string;
    paragraph: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string | null;
    image: Image;
    profile: { data: null };
  };

  type DataItem = {
    id: number;
    attributes: Attributes;
  };

  const [data, setData] = useState<DataItem[]>([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentButton, setCurrentButton] = useState('');

  async function fetchData(): Promise<DataItem[]> {
    const response = await fetch('https://honorable-badge-80846c0229.strapiapp.com/api/indeeds?populate=*');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  }

  function getParagraphByName(data: DataItem[], name: string): string {
    const item = data.find(element => element.attributes.Name === name);
    return item ? item.attributes.paragraph : 'Name not found';
  }

  function getImageUrlByName(data: DataItem[], name: string): string | undefined {
    const item = data.find(element => element.attributes.Name === name);
    return item?.attributes.image.data[0].attributes.formats.thumbnail.url;
  }

  const handleOnClick = async (newTitle: string) => {
    if (currentButton === newTitle) {
      return; // Do nothing if the same button is clicked again
    }

    setLoading(true);
    const res = await fetchData();
    setData(res);
    const paragraph = getParagraphByName(res, newTitle);
    const imgUrl = getImageUrlByName(res, newTitle);
    
    setTitle(newTitle);
    setMessage(paragraph);
    setImgUrl(imgUrl || '');
    setLoading(false);
    setCurrentButton(newTitle);
  };

  return (
    <div className="container mx-auto p-6 md: items-center">
      {/* <!-- Title Section --> */}
      <div className="text-center mb-8">
        <h2 className="text-pink-600 font-semibold">WHY CHOOSE US</h2>
        <h1 className="text-4xl font-bold">We Different From Others</h1>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col  md : ml-16 md:flex-row">
        {/* <!-- Content Section --> */}
        <div className=" flex flex-row md:flex-row items-center z- 1 overflow-visible justify-center">
          {/* <!-- Left Section --> */}
          <div className="bg-pink-600  md:w-64 md:h-64  sm: h-40 sm:w-40 text-white md:p-8 rounded-full items-center relative  ">
            <h3 className="text-xl font-bold mb-4 px-4">{title}</h3>
            <p className="px-4">{message}</p>
          </div>

          {/* <!-- Right Section --> */}
          <div className="flex-1 relative md:-ml-[9.6%]  mr-10">
            {loading ? (
              <div className=" flex items-center justify-center ">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <img src={imgUrl} alt={title} className=" md:w-64 md:h-64 rounded-full sm: h-40 sm:w-40 " loading="lazy" />
            )}
          </div>
        </div>
        {/* <!-- Navigation Section --> */}
        <div className="mt-8 flex flex-col space-y-4">
          <button
            className="py-2 px-4 text-left hover:bg-pink-600 bg-gray-200 text-white rounded-full"
            onClick={() => handleOnClick("Industry Experts")}
          >
            Industry Experts
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-pink-600 bg-gray-200 text-gray-900 rounded-full"
            onClick={() => handleOnClick("Dedicated Team")}
          >
            Dedicated Team
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-pink-600 bg-gray-200 text-gray-900 rounded-full"
            onClick={() => handleOnClick("Outcome Focused")}
          >
            Outcome Focused
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-pink-600 bg-gray-200 text-gray-900 rounded-full"
            onClick={() => handleOnClick("High Quality Service")}
          >
            High Quality Service
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-pink-600 bg-gray-200 text-gray-900 rounded-full"
            onClick={() => handleOnClick("Cyber Security Expert")}
          >
            Cyber Security Expert
          </button>
        </div>
      </div>
    </div>
  );
}