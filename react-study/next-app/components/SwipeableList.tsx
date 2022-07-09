import { useState } from "react";
import styled from "styled-components";
import { Pack } from "../types/Pack";
import SwipeablelistItem from "./SwipeablelistItem";
import { useQuery } from "react-query";
import axios from "axios";

export default function SwipeableList() {
  const { isLoading, data, error } = useQuery("packingList", async () => {
    const { data } = await axios.get("/api/pack");
    return data as Pack[];
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(data?.length).fill(false)
  );

  const handleIsDragged = (tmpArr: boolean[]) => {
    setIsDragged(tmpArr);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <span>Error : {error.message}</span>;

  return (
    <StWrapper>
      <button onClick={() => setIsEdit((prev) => !prev)}>수정하기</button>
      {data?.map((pack: Pack) => (
        <SwipeablelistItem
          isEdit={isEdit}
          id={pack.id}
          key={pack.id}
          isDragged={isDragged[pack.id]}
          handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
        />
      ))}
    </StWrapper>
  );
}

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  & > button {
    width: fit-content;
  }
`;
