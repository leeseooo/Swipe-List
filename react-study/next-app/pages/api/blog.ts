import { NextApiRequest, NextApiResponse } from "next";

const blogData = [
  { id: 0, title: "오늘은 절거운 금요일", body: "오늘은 절거운 금요일이다." },
  { id: 1, title: "오늘은 절거운 토요일", body: "토요일은 팩맨 정기회의날" },
  { id: 2, title: "오늘은 Not절거운 월요일", body: "빨리 합숙하고 싶다!" },
  { id: 3, title: "오늘은 Not절거운 화요일", body: "배고픈데?? 저녁뭐먹지." },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(blogData);
  } else if (req.method === "POST") {
    const { title, body } = req.body;

    res.status(200).json([
      ...blogData,
      {
        id: blogData.length,
        title,
        body,
      },
    ]);
  }
}
