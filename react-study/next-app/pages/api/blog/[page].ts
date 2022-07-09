import { NextApiRequest, NextApiResponse } from "next";
import { Blog } from "../../../types/Blog";

const blogData = [
  {
    id: 0,
    title: "오늘은 절거운 금요일1",
    body: "오늘은 절거운 금요일이다.",
    page: 1,
  },
  {
    id: 1,
    title: "오늘은 절거운 토요일2",
    body: "토요일은 팩맨 정기회의날",
    page: 1,
  },
  {
    id: 2,
    title: "오늘은 Not절거운 월요일3",
    body: "빨리 합숙하고 싶다!",
    page: 1,
  },
  {
    id: 3,
    title: "오늘은 Not절거운 화요일4",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 1,
  },
  {
    id: 4,
    title: "오늘은 Not절거운 화요일5",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 1,
  },

  {
    id: 5,
    title: "오늘은 절거운 금요일6",
    body: "오늘은 절거운 금요일이다.",
    page: 2,
  },
  {
    id: 6,
    title: "오늘은 절거운 토요일7",
    body: "토요일은 팩맨 정기회의날",
    page: 2,
  },
  {
    id: 7,
    title: "오늘은 Not절거운 월요일8",
    body: "빨리 합숙하고 싶다!",
    page: 2,
  },
  {
    id: 8,
    title: "오늘은 Not절거운 화요일9",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 2,
  },
  {
    id: 9,
    title: "오늘은 Not절거운 화요일10",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 2,
  },

  {
    id: 10,
    title: "오늘은 절거운 금요일11",
    body: "오늘은 절거운 금요일이다.",
    page: 3,
  },
  {
    id: 11,
    title: "오늘은 절거운 토요일12",
    body: "토요일은 팩맨 정기회의날",
    page: 3,
  },
  {
    id: 12,
    title: "오늘은 Not절거운 월요일13",
    body: "빨리 합숙하고 싶다!",
    page: 3,
  },
  {
    id: 13,
    title: "오늘은 Not절거운 화요일14",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 3,
  },
  {
    id: 14,
    title: "마지막 데이터15",
    body: "배고픈데?? 저녁뭐먹지.",
    page: 3,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // const { page } = req.query;
    // console.log(page);

    // if (typeof page === undefined) return;

    // let response: Blog[] = [];

    // [...blogData].forEach((data) => {
    //   if (data.page === Number(page)) response.push(data);
    // });
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
