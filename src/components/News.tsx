import { useState } from "react";
import { getNews } from "src/util/getNews";
import axios from "axios";
import moment from "moment";

export const News = () => {
  const [newsList, setNewsList] = useState<any[]>([]);

  const getNewsList = async (country: string): Promise<void> => {
    const res = await axios.get(`/api/get-news?country=${country}`);
    setNewsList([...res.data.data.articles]);
  };

  const news = newsList.map((item, id) => {
    return (
      <a
        href={item.url}
        target="blank"
        className="block hover:opacity-70"
        key={item.description}
      >
        <div className="flex mb-8">
          <div className="w-32 mr-6">
            <img src={item.urlToImage} alt="image" />
          </div>
          <div className="w-2/3">
            <div className="flex justify-between mb-2">
              <p className="text-sm">{item.author || "No Author"}</p>
              <p className="text-xs text-gray-500">
                {moment(item.publishedAt).format("YYYY-MM-DD")}
              </p>
            </div>
            <p className="text-left line-clamp-3">{item.description}</p>
          </div>
        </div>
      </a>
    );
  });

  return (
    <div className="mt-16 mx-auto text-center w-3/5 max-w-2xl">
      <div className="flex justify-center mb-12">
        <div
          className="w-24 py-2 mr-4 bg-purple-600 text-purple-100 text-center hover:opacity-70 rounded-full cursor-pointer"
          onClick={() => getNewsList("us")}
        >
          US
        </div>
        <div
          className="w-24 py-2 mr-2 bg-pink-600 text-pink-100 text-center hover:opacity-70 rounded-full cursor-pointer"
          onClick={() => getNewsList("jp")}
        >
          JP
        </div>
      </div>
      {news}
    </div>
  );
};
