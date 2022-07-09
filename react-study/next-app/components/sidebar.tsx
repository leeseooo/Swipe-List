import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <StNav>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/${input}`);
        }}
      >
        <StInput
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/list">
        <a>Packing List</a>
      </Link>
    </StNav>
  );
}

const StNav = styled.nav`
  position: sticky;
  top: 0;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 32px;
  border-right: 1px solid #eaeaea;

  & > a {
    margin: 8px 0;
    text-decoration: none;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 12px 16px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.025em;
    color: #333;
    border: 1px solid #eaeaea;
    transition: all 0.125s ease;

    &:hover {
      background-color: #eaeaea;
    }
  }
`;

const StInput = styled.input`
  margin: 32px 0;
  text-decoration: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  font-size: 14px;
  padding: 8px 16px;
  height: 28px;
`;
