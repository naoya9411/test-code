import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "src/pages/api/get-news";
import axios from "axios";

jest.mock("axios");

const mockReq = httpMocks.createRequest<NextApiRequest>({
  query: {
    country: "us",
  },
});

// const mockRes = httpMocks.createResponse<NextApiResponse>();

describe("/api/news", () => {
  test("test normal", () => {
    (axios.get as jest.Mock).mockReturnValue({
      data: {
        articles: [
          {
            author: "tester1",
            description: "this is test",
            publishedAt: "2021-11-11",
            url: "https://test.com",
            urlToImage: "https://test.com/image1",
          },
        ],
      },
    });
    const test = httpMocks.createResponse();
    expect(handler(mockReq, test)).toStrictEqual("aa");
  });
});
