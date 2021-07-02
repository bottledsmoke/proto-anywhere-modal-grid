import styled from "styled-components";
import { animated as a } from "@react-spring/web";
import shuffle from "./shuffle";

import { useSprings } from "@react-spring/web";

import type { PointerEvent } from "react";

// STYLED COMPONENTS

const AppContainer = styled.div`
  font-family: "sans-serif";
  position: relative;
`;

const FlexRow = styled.div<{ height: string }>`
  display: flex;
  flex-direction: row;
  height: ${(props) => (props.height ? props.height : "auto")};
`;

const FlexItem = styled(a.div)<{ bgcolor: string }>`
  flex: 1 1 33%;
  background-color: ${({ bgcolor }) => bgcolor || "none"};
  margin: 1em;
`;

const colors = ["cadetblue", "tomato", "mediumseagreen"];

// END STYLED COMPONENTS

export default function App() {
  // todo: extract to component and make this a prop
  const rows = 3;
  const cells = colors.length;

  const [springs, api] = useSprings(rows * cells, (index) => ({ scale: 1 }));

  const handlePointerEnter = (
    e: PointerEvent<HTMLDivElement>,
    row: number,
    item: number
  ) => {
    e.preventDefault();

    const springIndex = row * rows + item;
    console.log(springIndex);
  };

  return (
    <AppContainer>
      {[...Array(3)].map((_, i) => (
        <FlexRow key={`flex-row-${i}`} height={"400px"}>
          {shuffle(colors).map((color, j) => (
            <FlexItem
              bgcolor={color}
              key={`flexitem-${j}`}
              onPointerEnter={(e) => handlePointerEnter(e, i, j)}
            ></FlexItem>
          ))}
        </FlexRow>
      ))}
    </AppContainer>
  );
}
