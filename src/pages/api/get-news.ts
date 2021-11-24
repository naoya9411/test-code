// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Response = {
  result: boolean;
  data: { [key: string]: any } | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const ret: Response = {
    result: false,
    data: null,
  };
  const country = req.query.country;
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  try {
    const res = await axios.get(url);
    ret.result = true;
    ret.data = res.data;
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }

  res.status(200).json(ret);
}
