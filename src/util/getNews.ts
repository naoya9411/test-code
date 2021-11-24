import axios from "axios";

type Response = {
  result: boolean;
  data: { [key: string]: any } | null;
};

export const getNews = async (country: string): Promise<Response> => {
  const ret: Response = {
    result: false,
    data: null,
  };
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=ja&apiKey=${apiKey}`;
  try {
    const res = await axios.get(url);
    ret.data = res.data;
  } catch (e) {
    console.log(e);
  }

  return ret;
};
