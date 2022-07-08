import { NextApiRequest, NextApiResponse } from "next";

const packingList = [
  {
    id: 0,
    date: "2021.08.15",
    title: "혼자 밀라노 여행",
    bag: 20,
    isCheck: false,
  },
  {
    id: 1,
    date: "2021.03.01",
    title: "미국 할리우드 여행",
    bag: 20,
    isCheck: false,
  },
  {
    id: 2,
    date: "2021.08.15",
    title: "크리스마스 캐나다 여행",
    bag: 20,
    isCheck: false,
  },
  {
    id: 3,
    date: "2021.08.15",
    title: "생일 일본 여행",
    bag: 15,
    isCheck: false,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(packingList);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    res.status(200).json(packingList.splice(id, 1));
  }
}
