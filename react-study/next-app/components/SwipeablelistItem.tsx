import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

interface ItemProps {
  isEdit: boolean;
  id: number;
}

export default function SwipeablelistItem({ isEdit, id }: ItemProps) {
  const [isDragged, setIsDragged] = useState(false);
  const { isLoading, data, error } = useQuery("packingList", async () => {
    const { data } = await axios.get("/api/pack");
    return data;
  });
  const { date, title, bag, isCheck } = data[id];

  const onMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    let endX = e.clientX;

    function Move(e: MouseEvent) {
      endX = e.clientX;
    }
    function Up() {
      if (startX > endX) {
        setIsDragged(true);
      } else if (startX < endX) {
        setIsDragged(false);
      }
      document.removeEventListener("mousemove", Move);
    }
    document.addEventListener("mousemove", Move);
    document.addEventListener("mouseup", Up);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const startX = e.targetTouches[0].clientX;
    let endX = e.targetTouches[0].clientX;

    function Move(e: TouchEvent) {
      endX = e.targetTouches[0].clientX;
    }
    function End() {
      if (startX > endX) {
        setIsDragged(true);
      } else if (startX < endX) {
        setIsDragged(false);
      }
      document.removeEventListener("touchmove", Move);
    }
    document.addEventListener("touchmove", Move);
    document.addEventListener("touchend", End);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <span>Error : {error.message}</span>;

  return (
    <Wrapper>
      {isEdit && (
        <StCheckToDelete isChecked={isCheck !== undefined && isCheck}>
          ✅
        </StCheckToDelete>
      )}
      <StWrapper
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        isDragged={isDragged}
      >
        <StInfo>
          <p>{date}</p>
          <p>{title}</p>
          <span>{bag}개의 짐</span>
        </StInfo>
        <b>▶️</b>
      </StWrapper>
      <StDelete isDragged={isDragged}>x</StDelete>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 335px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;
`;

const StCheckToDelete = styled.button<{ isChecked: boolean }>`
  padding: 5px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: ${({ isChecked }) => (isChecked ? "green" : "#fff")};
`;

const StWrapper = styled.article<{ isDragged: boolean }>`
  position: relative;
  width: ${({ isDragged }) => (!isDragged ? "inherit" : "270px")};
  height: inherit;
  background-color: #d1d1d1;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  transition: 0.4s ease-in-out;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  & > span {
    width: 100px;
    background-color: #fff;
    border: 1px solid #30ccd8;
    border-radius: 20px;
    padding: 5px;
    text-align: center;
  }
  & > p {
    margin: 0;
  }
`;
const StDelete = styled.div<{ isDragged: boolean }>`
  position: absolute;
  z-index: 0;
  right: ${({ isDragged }) => (!isDragged ? "-52px" : "0px")};
  width: 52px;
  /* width: ${({ isDragged }) => (isDragged ? "52px" : "0px")}; */
  height: inherit;
  background-color: #ff0000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: 0.4s ease-in-out;
`;
